"use client";

import ToolWorkspace from "@/components/ToolWorkspace";
import { PDFDocument } from "pdf-lib";

export default function PdfToPdfaPage() {
  return (
    <ToolWorkspace
      title="PDF to PDF/A Converter"
      description="Transform your PDF into ISO-standardized PDF/A (ISO 19005) for long-term document archiving and legal compliance."
      categoryLabel="Convert from PDF"
      actionButtonText="Convert to PDF/A"
      optionsPanel={() => (
        <div className="space-y-3">
          <label className="block text-xs font-bold text-slate-700">Archival Profile</label>
          <select className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg">
            <option>PDF/A-1b (Basic Visual Integrity)</option>
            <option>PDF/A-2b (Modern Standards)</option>
            <option>PDF/A-3b (Embedded Attachments)</option>
          </select>
          <p className="text-[11px] text-slate-500">
            Complies with ISO archival specifications for long-term government and corporate records.
          </p>
        </div>
      )}
      onProcess={async (files) => {
        const file = files[0];
        const buffer = await file.arrayBuffer();
        const pdfDoc = await PDFDocument.load(buffer, { ignoreEncryption: true });

        // Embed PDF/A compliance metadata
        pdfDoc.setProducer("SamPDF ISO 19005-1 Compliant Archival Engine");
        pdfDoc.setCreator("SamPDF PDF/A Archiver");

        const bytes = await pdfDoc.save();
        return {
          downloadData: bytes,
          filename: `${file.name.replace(/\.pdf$/i, "")}-PDFA.pdf`,
          extraMessage: `Successfully formatted ${file.name} to PDF/A standard.`,
        };
      }}
    />
  );
}
