"use client";

import { useState } from "react";
import ToolWorkspace from "@/components/ToolWorkspace";
import { removePagesPDF } from "@/lib/pdfEngine";

export default function RemovePagesPage() {
  const [pagesToRemove, setPagesToRemove] = useState("1");

  return (
    <ToolWorkspace
      title="Remove PDF Pages"
      description="Select and delete unnecessary pages from your PDF document. Download the clean, pruned PDF instantly."
      categoryLabel="Organize PDF"
      actionButtonText="Remove Pages"
      optionsPanel={() => (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Pages to Delete
            </label>
            <input
              type="text"
              value={pagesToRemove}
              onChange={(e) => setPagesToRemove(e.target.value)}
              placeholder="e.g. 1, 3, 5"
              className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e5322d]"
            />
            <p className="text-[11px] text-slate-500 mt-1">
              Enter the page numbers you wish to delete (e.g. 1, 4).
            </p>
          </div>
        </div>
      )}
      onProcess={async (files) => {
        const file = files[0];
        const pageNums = pagesToRemove
          .split(",")
          .map((s) => parseInt(s.trim(), 10))
          .filter((n) => !isNaN(n) && n > 0);

        if (pageNums.length === 0) {
          throw new Error("Please specify at least one valid page number to remove.");
        }

        const data = await removePagesPDF(file, pageNums);
        return {
          downloadData: data,
          filename: `cleaned-${file.name}`,
          extraMessage: `Removed page(s) ${pageNums.join(", ")} successfully!`,
        };
      }}
    />
  );
}
