"use client";

import { useState } from "react";
import ToolWorkspace from "@/components/ToolWorkspace";
import { splitPDF } from "@/lib/pdfEngine";

export default function PdfSplitPage() {
  const [range, setRange] = useState("1-3");

  return (
    <ToolWorkspace
      title="Split PDF file"
      description="Separate one page or a whole set for easy conversion into independent PDF files. Extract pages or split into specific page ranges."
      categoryLabel="Organize PDF"
      actionButtonText="Split PDF"
      optionsPanel={() => (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Page Range
            </label>
            <input
              type="text"
              value={range}
              onChange={(e) => setRange(e.target.value)}
              placeholder="e.g. 1-3, 5, 8-10"
              className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e5322d]"
            />
            <p className="text-[11px] text-slate-500 mt-1">
              Specify page numbers or ranges separated by commas. Leave blank to split all pages.
            </p>
          </div>
        </div>
      )}
      onProcess={async (files) => {
        const file = files[0];
        const res = await splitPDF(file, range);
        return {
          downloadData: res.data,
          filename: `split-${file.name}`,
          extraMessage: `Successfully extracted ${res.count} page(s) from ${file.name}.`,
        };
      }}
    />
  );
}
