"use client";

import ToolWorkspace from "@/components/ToolWorkspace";
import { mergePDFs } from "@/lib/pdfEngine";

export default function PdfMergePage() {
  return (
    <ToolWorkspace
      title="Merge PDF files"
      description="Combine multiple PDFs in the exact order you want with the fastest, easiest PDF merger available. 100% private in your browser."
      categoryLabel="Organize PDF"
      badge="Popular"
      allowMultiple={true}
      actionButtonText="Merge PDF"
      optionsPanel={(files) => (
        <div className="space-y-4">
          <p className="text-xs text-slate-600">
            {files.length} PDF files ready to be synthesized in sequential order into one single document.
          </p>
          <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-xs text-slate-700">
            <strong>Pro Tip:</strong> Files will be combined in the order displayed on the left.
          </div>
        </div>
      )}
      onProcess={async (files) => {
        if (files.length < 2) {
          throw new Error("Please select at least 2 PDF files to merge.");
        }
        const mergedData = await mergePDFs(files);
        return {
          downloadData: mergedData,
          filename: `merged-${Date.now()}.pdf`,
          extraMessage: `Successfully merged ${files.length} PDF files into a single unified document!`,
        };
      }}
    />
  );
}
