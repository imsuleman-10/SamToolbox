"use client";

import { useState } from "react";
import ToolWorkspace from "@/components/ToolWorkspace";
import { watermarkPDF } from "@/lib/pdfEngine";

export default function PdfWatermarkPage() {
  const [text, setText] = useState("CONFIDENTIAL");
  const [position, setPosition] = useState<"center" | "top" | "bottom">("center");
  const [opacity, setOpacity] = useState(0.35);

  return (
    <ToolWorkspace
      title="Add Watermark to PDF"
      description="Stamp custom text watermarks over your PDF pages in seconds. Choose transparency, position, and text."
      categoryLabel="Edit PDF"
      actionButtonText="Add Watermark"
      optionsPanel={() => (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Watermark Text</label>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="e.g. CONFIDENTIAL, DRAFT"
              className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Position</label>
            <select
              value={position}
              onChange={(e) => setPosition(e.target.value as any)}
              className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg"
            >
              <option value="center">Diagonal Center</option>
              <option value="top">Top Header</option>
              <option value="bottom">Bottom Footer</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Opacity ({Math.round(opacity * 100)}%)
            </label>
            <input
              type="range"
              min="0.1"
              max="0.9"
              step="0.05"
              value={opacity}
              onChange={(e) => setOpacity(parseFloat(e.target.value))}
              className="w-full accent-purple-500"
            />
          </div>
        </div>
      )}
      onProcess={async (files) => {
        const file = files[0];
        if (!text.trim()) {
          throw new Error("Please specify watermark text.");
        }
        const bytes = await watermarkPDF(file, { text, position, opacity });
        return {
          downloadData: bytes,
          filename: `watermarked-${file.name}`,
          extraMessage: `Applied watermark "${text}" to all pages!`,
        };
      }}
    />
  );
}
