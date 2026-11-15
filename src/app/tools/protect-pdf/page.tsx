"use client";

import { useState } from "react";
import ToolWorkspace from "@/components/ToolWorkspace";
import { protectPDF } from "@/lib/pdfEngine";

export default function ProtectPdfPage() {
  const [password, setPassword] = useState("");

  return (
    <ToolWorkspace
      title="Protect PDF file"
      description="Encrypt your PDF document with a strong password to prevent unauthorized viewing and maintain confidentiality."
      categoryLabel="PDF Security"
      actionButtonText="Protect PDF"
      optionsPanel={() => (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Set Security Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter strong password..."
              className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <p className="text-[11px] text-slate-500">
            Recipient will need this password to open and view the document.
          </p>
        </div>
      )}
      onProcess={async (files) => {
        const file = files[0];
        if (!password) {
          throw new Error("Please enter a password to protect the document.");
        }
        const bytes = await protectPDF(file, password);
        return {
          downloadData: bytes,
          filename: `protected-${file.name}`,
          extraMessage: `Document protected with password encryption!`,
        };
      }}
    />
  );
}
