"use client";

import ToolWorkspace from "@/components/ToolWorkspace";
import { wordToPdf } from "@/lib/pdfEngine";

export default function WordToPdfPage() {
  return (
    <ToolWorkspace
      title="Word to PDF Converter"
      description="Make DOC and DOCX files easy to read by converting them to PDF. Preserves text and layout formatting."
      categoryLabel="Convert to PDF"
      acceptedFileTypes=".docx,.doc,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/msword"
      actionButtonText="Convert to PDF"
      optionsPanel={() => (
        <div className="p-3 bg-amber-50 border border-amber-100 rounded-xl text-xs text-slate-700">
          Upload any Microsoft Word document (.docx). Mammoth and jsPDF extract and render formatting directly into an A4 PDF.
        </div>
      )}
      onProcess={async (files) => {
        const file = files[0];
        const blob = await wordToPdf(file);
        return {
          downloadData: blob,
          filename: `${file.name.replace(/\.[^/.]+$/, "")}.pdf`,
          extraMessage: `Successfully converted Word document ${file.name} to PDF!`,
        };
      }}
    />
  );
}
