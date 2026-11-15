"use client";

import ToolWorkspace from "@/components/ToolWorkspace";
import { pdfToWord } from "@/lib/pdfEngine";

export default function PdfToWordPage() {
  return (
    <ToolWorkspace
      title="PDF to Word Converter"
      description="Convert PDF documents to editable Microsoft Word files with incredible ease and structure."
      categoryLabel="Convert from PDF"
      badge="Popular"
      actionButtonText="Convert to Word"
      optionsPanel={() => (
        <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl text-xs text-slate-700">
          Extract paragraphs, headers, and text formatting from your PDF into a standard editable Word document (.doc).
        </div>
      )}
      onProcess={async (files) => {
        const file = files[0];
        const blob = await pdfToWord(file);
        return {
          downloadData: blob,
          filename: `${file.name.replace(/\.pdf$/i, "")}.doc`,
          mimeType: "application/msword",
          extraMessage: `Successfully transformed ${file.name} into an editable Word document!`,
        };
      }}
    />
  );
}
