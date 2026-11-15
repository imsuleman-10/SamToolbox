"use client";

import { useState } from "react";
import ToolWorkspace from "@/components/ToolWorkspace";
import { imagesToPDF } from "@/lib/pdfEngine";

export default function ImageToPdfPage() {
  const [orientation, setOrientation] = useState<"portrait" | "landscape">("portrait");
  const [pageSize, setPageSize] = useState<"a4" | "fit">("a4");
  const [margin, setMargin] = useState<number>(20);

  return (
    <ToolWorkspace
      title="JPG to PDF Converter"
      description="Convert JPG, PNG, WebP images to PDF in seconds. Easily adjust orientation, margins, and page size."
      categoryLabel="Convert to PDF"
      badge="Popular"
      acceptedFileTypes="image/*,.jpg,.jpeg,.png,.webp,.gif,.bmp"
      allowMultiple={true}
      actionButtonText="Convert to PDF"
      optionsPanel={() => (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Page Orientation</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setOrientation("portrait")}
                className={`py-2 text-xs font-semibold rounded-lg border cursor-pointer ${
                  orientation === "portrait"
                    ? "bg-amber-50 border-amber-500 text-amber-700"
                    : "bg-white border-slate-200 text-slate-600"
                }`}
              >
                Portrait
              </button>
              <button
                type="button"
                onClick={() => setOrientation("landscape")}
                className={`py-2 text-xs font-semibold rounded-lg border cursor-pointer ${
                  orientation === "landscape"
                    ? "bg-amber-50 border-amber-500 text-amber-700"
                    : "bg-white border-slate-200 text-slate-600"
                }`}
              >
                Landscape
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Page Size</label>
            <select
              value={pageSize}
              onChange={(e) => setPageSize(e.target.value as any)}
              className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg"
            >
              <option value="a4">Standard A4</option>
              <option value="fit">Fit to Image Size</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Page Margins ({margin}px)
            </label>
            <input
              type="range"
              min={0}
              max={50}
              value={margin}
              onChange={(e) => setMargin(parseInt(e.target.value, 10))}
              className="w-full accent-amber-500"
            />
          </div>
        </div>
      )}
      onProcess={async (files) => {
        const data = await imagesToPDF(files, { orientation, pageSize, margin });
        return {
          downloadData: data,
          filename: `converted-images-${Date.now()}.pdf`,
          extraMessage: `Successfully transformed ${files.length} image(s) into PDF format.`,
        };
      }}
    />
  );
}
