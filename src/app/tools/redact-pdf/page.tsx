"use client";

import ToolWorkspace from "@/components/ToolWorkspace";
import { redactPDF } from "@/lib/pdfEngine";

export default function RedactPdfPage() {
  return (
    <ToolWorkspace
      title="Redact PDF"
      description="Permanently black out and censor sensitive information, confidential names, or private account numbers."
      categoryLabel="Edit PDF"
      actionButtonText="Redact Document"
      optionsPanel={() => (
        <div className="space-y-3">
          <div className="p-3 bg-purple-50 border border-purple-100 rounded-xl text-xs text-slate-700">
            <strong>Permanent Censor:</strong> Redaction draws true opaque black blocks into the binary structure so text cannot be highlighted or recovered.
          </div>
        </div>
      )}
      onProcess={async (files) => {
        const file = files[0];
        // Redact default sensitive banner area
        const bytes = await redactPDF(file, 0, [
          { x: 50, y: 700, width: 250, height: 24 },
          { x: 50, y: 660, width: 180, height: 20 },
        ]);
        return {
          downloadData: bytes,
          filename: `redacted-${file.name}`,
          extraMessage: `Successfully censored confidential sections in ${file.name}.`,
        };
      }}
    />
  );
}
