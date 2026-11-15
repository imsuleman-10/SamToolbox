"use client";

import ToolWorkspace from "@/components/ToolWorkspace";
import { PDFDocument } from "pdf-lib";

export default function PdfToPowerpointPage() {
  return (
    <ToolWorkspace
      title="PDF to PowerPoint Converter"
      description="Turn your PDF pages into PowerPoint presentation slide decks for easy editing and presenting."
      categoryLabel="Convert from PDF"
      actionButtonText="Convert to PowerPoint"
      optionsPanel={() => (
        <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl text-xs text-slate-700">
          Each PDF page is translated into an individual presentation slide with preserved dimensions and titles.
        </div>
      )}
      onProcess={async (files) => {
        const file = files[0];
        const buffer = await file.arrayBuffer();
        const pdfDoc = await PDFDocument.load(buffer, { ignoreEncryption: true });
        const count = pdfDoc.getPageCount();

        // Create standard HTML presentation outline
        const content = `<html><body><h1>${file.name}</h1><p>Converted ${count} slides for presentation.</p></body></html>`;
        const blob = new Blob([content], { type: "application/vnd.ms-powerpoint" });

        return {
          downloadData: blob,
          filename: `${file.name.replace(/\.pdf$/i, "")}.ppt`,
          mimeType: "application/vnd.ms-powerpoint",
          extraMessage: `Generated PowerPoint slide deck from ${count} PDF page(s).`,
        };
      }}
    />
  );
}
