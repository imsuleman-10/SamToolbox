"use client";

import { useState } from "react";
import ToolWorkspace from "@/components/ToolWorkspace";
import { addPageNumbers } from "@/lib/pdfEngine";

export default function PageNumbersPage() {
  const [format, setFormat] = useState<"page_x_of_y" | "numbers_only" | "clean">("page_x_of_y");
  const [position, setPosition] = useState<"bottom-center" | "bottom-right" | "top-right">("bottom-center");

  return (
    <ToolWorkspace
      title="Add Page Numbers to PDF"
      description="Insert clean, professional page numbers into your PDF with ease. Select typography, positioning, and format."
      categoryLabel="Edit PDF"
      actionButtonText="Add Page Numbers"
      optionsPanel={() => (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Numbering Format</label>
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value as any)}
              className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg"
            >
              <option value="page_x_of_y">Page X of Y (e.g. Page 1 of 12)</option>
              <option value="numbers_only">Numbers Only (e.g. 1, 2, 3)</option>
              <option value="clean">Decorative (e.g. — 1 —)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Position</label>
            <select
              value={position}
              onChange={(e) => setPosition(e.target.value as any)}
              className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg"
            >
              <option value="bottom-center">Bottom Center</option>
              <option value="bottom-right">Bottom Right</option>
              <option value="top-right">Top Right</option>
            </select>
          </div>
        </div>
      )}
      onProcess={async (files) => {
        const file = files[0];
        const bytes = await addPageNumbers(file, { format, position });
        return {
          downloadData: bytes,
          filename: `numbered-${file.name}`,
          extraMessage: `Added page numbering (${format}) to all pages.`,
        };
      }}
    />
  );
}
