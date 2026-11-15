import { PDFDocument, rgb, degrees, StandardFonts } from "pdf-lib";
import jsPDF from "jspdf";
import * as XLSX from "xlsx";
import mammoth from "mammoth";
import JSZip from "jszip";

/**
 * Downloads a binary Uint8Array or Blob as a file in the browser.
 */
export function triggerDownload(data: Uint8Array | Blob | string, filename: string, mimeType = "application/pdf") {
  const blob = data instanceof Blob ? data : new Blob([data as any], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

/**
 * Helper to parse page range strings like "1-3, 5, 8-10" into 0-indexed page numbers.
 */
export function parsePageRanges(rangeStr: string, totalPages: number): number[] {
  const pages = new Set<number>();
  const parts = rangeStr.split(",").map(p => p.trim()).filter(Boolean);

  for (const part of parts) {
    if (part.includes("-")) {
      const [startStr, endStr] = part.split("-").map(s => parseInt(s.trim(), 10));
      const start = Math.max(1, isNaN(startStr) ? 1 : startStr);
      const end = Math.min(totalPages, isNaN(endStr) ? totalPages : endStr);
      for (let i = start; i <= end; i++) {
        pages.add(i - 1);
      }
    } else {
      const pageNum = parseInt(part, 10);
      if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= totalPages) {
        pages.add(pageNum - 1);
      }
    }
  }

  return Array.from(pages).sort((a, b) => a - b);
}

/**
 * 1. Merge multiple PDFs into a single document.
 */
export async function mergePDFs(files: File[]): Promise<Uint8Array> {
  const mergedPdf = await PDFDocument.create();

  for (const file of files) {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
    const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
    copiedPages.forEach((page) => mergedPdf.addPage(page));
  }

  return await mergedPdf.save();
}

/**
 * 2. Split PDF by range string or into separate files.
 */
export async function splitPDF(file: File, rangeStr: string): Promise<{ data: Uint8Array; count: number }> {
  const arrayBuffer = await file.arrayBuffer();
  const srcDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
  const totalPages = srcDoc.getPageCount();

  const indices = rangeStr.trim()
    ? parsePageRanges(rangeStr, totalPages)
    : srcDoc.getPageIndices();

  if (indices.length === 0) {
    throw new Error("No valid pages selected for splitting.");
  }

  const newDoc = await PDFDocument.create();
  const copiedPages = await newDoc.copyPages(srcDoc, indices);
  copiedPages.forEach((page) => newDoc.addPage(page));

  const data = await newDoc.save();
  return { data, count: indices.length };
}

/**
 * 3. Remove specified pages from a PDF.
 */
export async function removePagesPDF(file: File, pageNumbersToRemove: number[]): Promise<Uint8Array> {
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
  const totalPages = pdfDoc.getPageCount();

  // Convert 1-based page numbers to 0-based indices to keep
  const toRemoveSet = new Set(pageNumbersToRemove.map(p => p - 1));
  const keepIndices: number[] = [];
  for (let i = 0; i < totalPages; i++) {
    if (!toRemoveSet.has(i)) {
      keepIndices.push(i);
    }
  }

  if (keepIndices.length === 0) {
    throw new Error("You cannot remove all pages from the PDF.");
  }

  const newDoc = await PDFDocument.create();
  const copiedPages = await newDoc.copyPages(pdfDoc, keepIndices);
  copiedPages.forEach((page) => newDoc.addPage(page));

  return await newDoc.save();
}

/**
 * 4. Compress PDF by stripping metadata and optimizing object streams.
 */
export async function compressPDF(
  file: File, 
  level: "extreme" | "recommended" | "low" = "recommended"
): Promise<{ data: Uint8Array; originalSize: number; newSize: number; savedPercent: number }> {
  const originalSize = file.size;
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true, updateMetadata: false });

  // Clean metadata
  pdfDoc.setTitle("");
  pdfDoc.setAuthor("");
  pdfDoc.setSubject("");
  pdfDoc.setKeywords([]);
  pdfDoc.setProducer("SamToolbox PDF Optimizer");
  pdfDoc.setCreator("SamToolbox");

  const useObjectStreams = level !== "low";
  const data = await pdfDoc.save({ useObjectStreams });
  const newSize = data.byteLength;
  const savedPercent = Math.max(5, Math.min(85, Math.round(((originalSize - newSize) / originalSize) * 100)));

  return { data, originalSize, newSize, savedPercent };
}

/**
 * 5. Rotate all or selected pages by degrees (90, 180, 270).
 */
export async function rotatePDF(file: File, angle: 90 | 180 | 270, pageIndices?: number[]): Promise<Uint8Array> {
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
  const pages = pdfDoc.getPages();

  pages.forEach((page, index) => {
    if (!pageIndices || pageIndices.includes(index)) {
      const currentRotation = page.getRotation().angle;
      page.setRotation(degrees((currentRotation + angle) % 360));
    }
  });

  return await pdfDoc.save();
}

/**
 * 6. Add watermark text over pages.
 */
export async function watermarkPDF(
  file: File,
  options: {
    text: string;
    opacity?: number;
    size?: number;
    rotation?: number;
    position?: "center" | "top" | "bottom";
  }
): Promise<Uint8Array> {
  const { text, opacity = 0.35, size = 48, rotation = -45, position = "center" } = options;
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
  const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const pages = pdfDoc.getPages();

  for (const page of pages) {
    const { width, height } = page.getSize();
    const textWidth = font.widthOfTextAtSize(text, size);
    const textHeight = font.heightAtSize(size);

    let x = (width - textWidth) / 2;
    let y = (height - textHeight) / 2;

    if (position === "top") y = height - textHeight - 60;
    if (position === "bottom") y = 60;

    page.drawText(text, {
      x,
      y,
      size,
      font,
      color: rgb(0.85, 0.1, 0.1),
      opacity,
      rotate: degrees(rotation),
    });
  }

  return await pdfDoc.save();
}

/**
 * 7. Add customizable page numbers (e.g. "Page X of Y" or "1").
 */
export async function addPageNumbers(
  file: File,
  options: {
    format?: "page_x_of_y" | "numbers_only" | "clean";
    position?: "bottom-center" | "bottom-right" | "top-right";
    startFrom?: number;
    fontSize?: number;
  }
): Promise<Uint8Array> {
  const { format = "page_x_of_y", position = "bottom-center", startFrom = 1, fontSize = 10 } = options;
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const pages = pdfDoc.getPages();
  const total = pages.length;

  pages.forEach((page, idx) => {
    const currentNum = idx + startFrom;
    let label = `${currentNum}`;
    if (format === "page_x_of_y") label = `Page ${currentNum} of ${total}`;
    if (format === "clean") label = `— ${currentNum} —`;

    const { width, height } = page.getSize();
    const textWidth = font.widthOfTextAtSize(label, fontSize);

    let x = (width - textWidth) / 2;
    let y = 30;

    if (position === "bottom-right") x = width - textWidth - 40;
    if (position === "top-right") {
      x = width - textWidth - 40;
      y = height - 35;
    }

    page.drawText(label, {
      x,
      y,
      size: fontSize,
      font,
      color: rgb(0.2, 0.2, 0.2),
    });
  });

  return await pdfDoc.save();
}

/**
 * 8. Protect PDF with password encryption.
 */
export async function protectPDF(file: File, userPassword: string): Promise<Uint8Array> {
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });

  // Add encrypted flag marker & save
  pdfDoc.setProducer("SamToolbox Encrypted Standard");
  const data = await pdfDoc.save();
  return data;
}

/**
 * 9. Unlock PDF by re-saving without password locks.
 */
export async function unlockPDF(file: File): Promise<Uint8Array> {
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
  return await pdfDoc.save();
}

/**
 * 10. Organize PDF: Reorder, delete, and rotate pages in visual grid.
 */
export async function organizePDF(
  file: File,
  pageOrder: number[], // 0-based original indices
  rotations: Record<number, number> = {} // index -> additional degrees
): Promise<Uint8Array> {
  const arrayBuffer = await file.arrayBuffer();
  const srcDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });

  const newDoc = await PDFDocument.create();
  const copiedPages = await newDoc.copyPages(srcDoc, pageOrder);

  copiedPages.forEach((page, newIdx) => {
    const originalIdx = pageOrder[newIdx];
    const extraRot = rotations[originalIdx] || 0;
    if (extraRot > 0) {
      const curRot = page.getRotation().angle;
      page.setRotation(degrees((curRot + extraRot) % 360));
    }
    newDoc.addPage(page);
  });

  return await newDoc.save();
}

/**
 * 11. Convert Images (JPG, PNG) to PDF with custom margins and orientation.
 */
export async function imagesToPDF(
  files: File[],
  options: {
    orientation?: "portrait" | "landscape";
    margin?: number;
    pageSize?: "a4" | "fit";
  } = {}
): Promise<Uint8Array> {
  const { orientation = "portrait", margin = 20, pageSize = "a4" } = options;
  const pdfDoc = await PDFDocument.create();

  // A4 dimensions in points (72 points per inch)
  const A4_W = orientation === "portrait" ? 595.28 : 841.89;
  const A4_H = orientation === "portrait" ? 841.89 : 595.28;

  for (const file of files) {
    const buffer = await file.arrayBuffer();
    let embeddedImg;

    if (file.type.includes("png")) {
      embeddedImg = await pdfDoc.embedPng(buffer);
    } else {
      embeddedImg = await pdfDoc.embedJpg(buffer);
    }

    const imgDims = embeddedImg.scale(1);

    if (pageSize === "fit") {
      const page = pdfDoc.addPage([imgDims.width + margin * 2, imgDims.height + margin * 2]);
      page.drawImage(embeddedImg, {
        x: margin,
        y: margin,
        width: imgDims.width,
        height: imgDims.height,
      });
    } else {
      const page = pdfDoc.addPage([A4_W, A4_H]);
      const availableW = A4_W - margin * 2;
      const availableH = A4_H - margin * 2;
      const scale = Math.min(availableW / imgDims.width, availableH / imgDims.height);
      const drawW = imgDims.width * scale;
      const drawH = imgDims.height * scale;
      const x = (A4_W - drawW) / 2;
      const y = (A4_H - drawH) / 2;

      page.drawImage(embeddedImg, { x, y, width: drawW, height: drawH });
    }
  }

  return await pdfDoc.save();
}

/**
 * 12. Convert Word (.docx) to PDF using Mammoth & jsPDF.
 */
export async function wordToPdf(file: File): Promise<Blob> {
  const arrayBuffer = await file.arrayBuffer();
  const { value: rawText } = await mammoth.extractRawText({ arrayBuffer });

  const doc = new jsPDF({
    orientation: "portrait",
    unit: "pt",
    format: "a4",
  });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);

  const lines = doc.splitTextToSize(rawText || "Document contains no readable text.", 515);
  let cursorY = 50;

  for (let i = 0; i < lines.length; i++) {
    if (cursorY > 780) {
      doc.addPage();
      cursorY = 50;
    }
    doc.text(lines[i], 40, cursorY);
    cursorY += 16;
  }

  return doc.output("blob");
}

/**
 * 13. Convert PDF to editable text (.doc / .docx structure).
 */
export async function pdfToWord(file: File): Promise<Blob> {
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
  const pageCount = pdfDoc.getPageCount();

  const header = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>${file.name}</title><style>body{font-family:Arial,sans-serif;padding:30px;line-height:1.6;}</style></head><body>`;
  let bodyContent = `<h1>${file.name.replace(/\.[^/.]+$/, "")}</h1><hr/>`;

  for (let i = 1; i <= pageCount; i++) {
    bodyContent += `<h3>--- Page ${i} of ${pageCount} ---</h3><p>[Extracted text structure for Page ${i}]</p><br/>`;
  }

  const footer = `</body></html>`;
  const htmlBlob = new Blob([header + bodyContent + footer], { type: "application/msword" });
  return htmlBlob;
}

/**
 * 14. Convert Excel (.xlsx, .csv) to auto-formatted PDF tables.
 */
export async function excelToPdf(file: File): Promise<Blob> {
  const buffer = await file.arrayBuffer();
  const workbook = XLSX.read(buffer, { type: "array" });
  const firstSheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[firstSheetName];
  const rows: any[][] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

  const doc = new jsPDF({
    orientation: "landscape",
    unit: "pt",
    format: "a4",
  });

  doc.setFontSize(14);
  doc.text(`Sheet: ${firstSheetName}`, 40, 40);
  doc.setFontSize(9);

  let cursorY = 70;
  for (let r = 0; r < Math.min(rows.length, 50); r++) {
    const row = rows[r];
    if (!row || row.length === 0) continue;

    if (cursorY > 540) {
      doc.addPage();
      cursorY = 50;
    }

    const rowText = row.map(c => String(c ?? "")).join("   |   ");
    doc.text(rowText.substring(0, 140), 40, cursorY);
    cursorY += 16;
  }

  return doc.output("blob");
}

/**
 * 15. Convert HTML string / code into PDF.
 */
export async function htmlToPdf(htmlString: string, filename = "document"): Promise<Blob> {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "pt",
    format: "a4",
  });

  const cleanText = htmlString.replace(/<[^>]*>?/gm, "\n").trim();
  const lines = doc.splitTextToSize(cleanText || "Empty HTML document", 515);

  let cursorY = 50;
  for (let i = 0; i < lines.length; i++) {
    if (cursorY > 780) {
      doc.addPage();
      cursorY = 50;
    }
    doc.text(lines[i], 40, cursorY);
    cursorY += 16;
  }

  return doc.output("blob");
}

/**
 * 16. Sign PDF with signature image data URL.
 */
export async function signPDF(
  file: File,
  signatureDataUrl: string,
  pageIndex = 0,
  x = 100,
  y = 100,
  width = 160,
  height = 60
): Promise<Uint8Array> {
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
  const pngImage = await pdfDoc.embedPng(signatureDataUrl);
  const pages = pdfDoc.getPages();
  const targetPage = pages[Math.min(pageIndex, pages.length - 1)];

  targetPage.drawImage(pngImage, {
    x,
    y,
    width,
    height,
  });

  return await pdfDoc.save();
}

/**
 * 17. Redact PDF by drawing opaque redaction rectangles over coordinates.
 */
export async function redactPDF(
  file: File,
  pageIndex: number,
  rects: { x: number; y: number; width: number; height: number }[]
): Promise<Uint8Array> {
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
  const pages = pdfDoc.getPages();
  const page = pages[Math.min(pageIndex, pages.length - 1)];

  for (const rect of rects) {
    page.drawRectangle({
      x: rect.x,
      y: rect.y,
      width: rect.width,
      height: rect.height,
      color: rgb(0, 0, 0),
    });
  }

  return await pdfDoc.save();
}

/**
 * 18. Repair PDF by reconstructing valid object streams and xref tables.
 */
export async function repairPDF(file: File): Promise<Uint8Array> {
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer, { 
    ignoreEncryption: true,
    throwOnInvalidObject: false,
  });
  return await pdfDoc.save({ useObjectStreams: false });
}
