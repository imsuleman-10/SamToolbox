"use client";

import { useState } from "react";
import ToolWorkspace from "@/components/ToolWorkspace";
import { compressPDF } from "@/lib/pdfEngine";

export default function PdfCompressPage() {
  const [level, setLevel] = useState<"extreme" | "recommended" | "low">("recommended");

  return (
    <ToolWorkspace
      title="Compress PDF file"
      description="Reduce PDF file size while maintaining maximum quality and visual fidelity. Select your desired compression level below."
      categoryLabel="Optimize PDF"
      badge="Popular"
      actionButtonText="Compress PDF"
      optionsPanel={() => (
        <div className="space-y-3">
          <label className="block text-xs font-bold text-slate-700">Compression Level</label>
          <div className="space-y-2">
            {[
              { id: "extreme", label: "Extreme Compression", desc: "Less quality, high compression" },
              { id: "recommended", label: "Recommended Compression", desc: "Good quality, good compression" },
              { id: "low", label: "Low Compression", desc: "High quality, less compression" },
            ].map((opt) => (
              <label 
                key={opt.id} 
                className={`flex flex-col p-3 rounded-xl border text-xs cursor-pointer transition-colors ${
                  level === opt.id 
                    ? "border-emerald-500 bg-emerald-50/50 text-slate-900" 
                    : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                }`}
              >
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="compressionLevel"
                    checked={level === opt.id}
                    onChange={() => setLevel(opt.id as any)}
                    className="text-emerald-600 focus:ring-emerald-500"
                  />
                  <span className="font-bold text-slate-900">{opt.label}</span>
                </div>
                <span className="text-[11px] text-slate-500 ml-5 mt-0.5">{opt.desc}</span>
              </label>
            ))}
          </div>
        </div>
      )}
      onProcess={async (files) => {
        const file = files[0];
        const res = await compressPDF(file, level);
        return {
          downloadData: res.data,
          filename: `compressed-${file.name}`,
          savedPercent: res.savedPercent,
          extraMessage: `Reduced from ${(res.originalSize / 1024).toFixed(1)} KB to ${(res.newSize / 1024).toFixed(1)} KB!`,
        };
      }}
    />
  );
}
