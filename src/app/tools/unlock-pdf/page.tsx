"use client";

import ToolWorkspace from "@/components/ToolWorkspace";
import { unlockPDF } from "@/lib/pdfEngine";

export default function UnlockPdfPage() {
  return (
    <ToolWorkspace
      title="Unlock PDF - Remove Password Security"
      description="Remove password security and usage restrictions from protected PDF files so you can freely print, edit, and copy."
      categoryLabel="PDF Security"
      actionButtonText="Unlock PDF"
      optionsPanel={() => (
        <div className="p-3 bg-teal-50 border border-teal-100 rounded-xl text-xs text-slate-700">
          Removes owner locks, printing restrictions, and copy protections. The unlocked PDF is decrypted and saved without security flags.
        </div>
      )}
      onProcess={async (files) => {
        const file = files[0];
        const bytes = await unlockPDF(file);
        return {
          downloadData: bytes,
          filename: `unlocked-${file.name}`,
          extraMessage: `Successfully decrypted and unlocked ${file.name}.`,
        };
      }}
    />
  );
}
