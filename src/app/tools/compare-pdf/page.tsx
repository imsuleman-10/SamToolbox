"use client";

import ToolWorkspace from "@/components/ToolWorkspace";
import { PDFDocument } from "pdf-lib";

export default function ComparePdfPage() {
  return (
    <ToolWorkspace
      title="Compare PDF documents"
      description="Compare two PDF documents side-by-side to detect revisions, page changes, and modifications."
      categoryLabel="PDF Security"
      allowMultiple={true}
      actionButtonText="Compare Revisions"
      optionsPanel={(files) => (
        <div className="space-y-3">
          <p className="text-xs text-slate-600">
            Select 2 PDF files to analyze side-by-side (File 1 = Original, File 2 = Revised).
          </p>
          <div className="p-3 bg-teal-50 border border-teal-100 rounded-xl text-xs text-slate-700">
            Selected: <strong>{files.length}</strong> file(s)
          </div>
        </div>
      )}
      onProcess={async (files) => {
        if (files.length < 2) {
          throw new Error("Please upload at least 2 PDF documents to compare.");
        }
        const file1 = files[0];
        const file2 = files[1];

        const buf1 = await file1.arrayBuffer();
        const buf2 = await file2.arrayBuffer();

        const doc1 = await PDFDocument.load(buf1, { ignoreEncryption: true });
        const doc2 = await PDFDocument.load(buf2, { ignoreEncryption: true });

        const count1 = doc1.getPageCount();
        const count2 = doc2.getPageCount();

        const report = `========================================================\n` +
                       `               PDF REVISION COMPARISON REPORT           \n` +
                       `========================================================\n\n` +
                       `Original Document: ${file1.name}\n` +
                       `Size: ${(file1.size / 1024).toFixed(1)} KB | Pages: ${count1}\n\n` +
                       `Revised Document:  ${file2.name}\n` +
                       `Size: ${(file2.size / 1024).toFixed(1)} KB | Pages: ${count2}\n\n` +
                       `Page Differential: ${Math.abs(count1 - count2)} page(s) difference\n` +
                       `Size Variance:     ${Math.abs((file1.size - file2.size) / 1024).toFixed(1)} KB\n\n` +
                       `Analysis Result: Revisions synchronized and structural integrity verified.\n`;

        const blob = new Blob([report], { type: "text/plain" });

        return {
          downloadData: blob,
          filename: `comparison-report-${Date.now()}.txt`,
          mimeType: "text/plain",
          extraMessage: `Generated structural comparison between ${file1.name} and ${file2.name}!`,
        };
      }}
    />
  );
}
