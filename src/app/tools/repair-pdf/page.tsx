"use client";

import ToolWorkspace from "@/components/ToolWorkspace";
import { repairPDF } from "@/lib/pdfEngine";

export default function RepairPdfPage() {
  return (
    <ToolWorkspace
      title="Repair PDF file"
      description="Analyze, repair corrupted cross-reference tables, and reconstruct valid object streams from damaged PDF documents."
      categoryLabel="Optimize PDF"
      actionButtonText="Repair PDF"
      optionsPanel={() => (
        <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl text-xs text-slate-700">
          Our browser engine will scan the PDF binary stream, rebuild damaged object tables, and sanitize structural anomalies.
        </div>
      )}
      onProcess={async (files) => {
        const file = files[0];
        const data = await repairPDF(file);
        return {
          downloadData: data,
          filename: `repaired-${file.name}`,
          extraMessage: `Successfully sanitized and repaired ${file.name}.`,
        };
      }}
    />
  );
}
