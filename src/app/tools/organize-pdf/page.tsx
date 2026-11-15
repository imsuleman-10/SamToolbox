"use client";

import { useState } from "react";
import ToolWorkspace from "@/components/ToolWorkspace";
import { organizePDF } from "@/lib/pdfEngine";

export default function OrganizePdfPage() {
  const [reverseOrder, setReverseOrder] = useState(false);

  return (
    <ToolWorkspace
      title="Organize PDF pages"
      description="Sort, rearrange, or reverse PDF pages with precision. Download your organized PDF document in seconds."
      categoryLabel="Organize PDF"
      actionButtonText="Organize PDF"
      optionsPanel={() => (
        <div className="space-y-4">
          <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-3">
            <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={reverseOrder}
                onChange={(e) => setReverseOrder(e.target.checked)}
                className="rounded text-[#e5322d] focus:ring-[#e5322d]"
              />
              Reverse entire page sequence (Last to First)
            </label>
          </div>
        </div>
      )}
      onProcess={async (files) => {
        const file = files[0];
        // Read file to inspect page count
        const buffer = await file.arrayBuffer();
        const { PDFDocument } = await import("pdf-lib");
        const doc = await PDFDocument.load(buffer, { ignoreEncryption: true });
        const count = doc.getPageCount();

        let order = Array.from({ length: count }, (_, i) => i);
        if (reverseOrder) {
          order = order.reverse();
        }

        const data = await organizePDF(file, order);
        return {
          downloadData: data,
          filename: `organized-${file.name}`,
          extraMessage: `Successfully organized ${count} page(s) in ${file.name}.`,
        };
      }}
    />
  );
}
