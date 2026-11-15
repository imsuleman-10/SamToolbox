"use client";

import { useState } from "react";
import ToolWorkspace from "@/components/ToolWorkspace";
import { rotatePDF } from "@/lib/pdfEngine";

export default function RotatePdfPage() {
  const [angle, setAngle] = useState<90 | 180 | 270>(90);

  return (
    <ToolWorkspace
      title="Rotate PDF pages"
      description="Rotate your PDF pages 90, 180, or 270 degrees. Save permanently aligned and rotated documents in seconds."
      categoryLabel="Edit PDF"
      actionButtonText="Rotate PDF"
      optionsPanel={() => (
        <div className="space-y-4">
          <label className="block text-xs font-bold text-slate-700">Rotation Angle</label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { deg: 90, label: "90° Clockwise" },
              { deg: 180, label: "180° Flip" },
              { deg: 270, label: "270° Counter-CW" },
            ].map((opt) => (
              <button
                key={opt.deg}
                type="button"
                onClick={() => setAngle(opt.deg as any)}
                className={`py-2 text-xs font-semibold rounded-lg border cursor-pointer ${
                  angle === opt.deg
                    ? "bg-purple-50 border-purple-500 text-purple-700"
                    : "bg-white border-slate-200 text-slate-600"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
          <p className="text-[11px] text-slate-500">
            Selected rotation will be applied to all pages across the PDF.
          </p>
        </div>
      )}
      onProcess={async (files) => {
        const file = files[0];
        const bytes = await rotatePDF(file, angle);
        return {
          downloadData: bytes,
          filename: `rotated-${file.name}`,
          extraMessage: `Rotated all pages by ${angle} degrees!`,
        };
      }}
    />
  );
}
