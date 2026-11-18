"use client";

import { useState, useRef } from "react";
import {
  Image as ImageIcon,
  Upload,
  Download,
  Trash2,
  ShieldCheck,
  Check,
  Sparkles,
} from "lucide-react";

export default function SvgToPngPage() {
  const [svgCode, setSvgCode] = useState<string>(
    `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 24 24" fill="none" stroke="#e5322d" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\n  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>\n</svg>`
  );
  const [scale, setScale] = useState<number>(2); // 2x default for high-dpi
  const [background, setBackground] = useState<"transparent" | "white" | "black">("transparent");
  const [isConverting, setIsConverting] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setSvgCode(content);
    };
    reader.readAsText(file);
  };

  const handleDownload = (format: "png" | "webp") => {
    if (!svgCode.trim()) return;
    setIsConverting(true);

    const img = new Image();
    const svgBlob = new Blob([svgCode], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      const width = (img.width || 300) * scale;
      const height = (img.height || 300) * scale;

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      if (background === "white") {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, width, height);
      } else if (background === "black") {
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, width, height);
      }

      ctx.drawImage(img, 0, 0, width, height);
      URL.revokeObjectURL(url);

      const mime = format === "png" ? "image/png" : "image/webp";
      const downloadUrl = canvas.toDataURL(mime);
      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = `vector-graphic-${scale}x.${format}`;
      a.click();
      setIsConverting(false);
    };

    img.src = url;
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-100 text-[#e5322d] text-xs font-bold mb-4">
          <ImageIcon className="w-3.5 h-3.5" />
          Vector to Raster Rendering Engine
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-3">
          SVG to PNG &amp; WebP Converter Online
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Convert SVG vector graphics into high-resolution PNG or WebP images with custom resolution scaling (1x, 2x, 4x, 8x). 100% private in-browser rendering.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        {/* Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex flex-wrap items-center gap-4">
            <label className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold rounded-xl cursor-pointer flex items-center gap-1.5 transition-colors">
              <Upload className="w-3.5 h-3.5 text-slate-500" /> Upload .svg File
              <input type="file" accept=".svg,image/svg+xml" onChange={handleFileUpload} className="hidden" />
            </label>

            <div className="flex items-center gap-1.5 text-xs text-slate-600">
              <span className="font-semibold">Resolution Scale:</span>
              <select
                value={scale}
                onChange={(e) => setScale(parseInt(e.target.value) || 2)}
                className="px-2.5 py-1 rounded-lg border border-slate-200 bg-slate-50 font-bold text-red-600 text-xs"
              >
                <option value="1">1x (Standard)</option>
                <option value="2">2x (High-DPI Retina)</option>
                <option value="4">4x (Ultra-Sharp 4K)</option>
                <option value="8">8x (Print Resolution)</option>
              </select>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-slate-600">
              <span className="font-semibold">Background:</span>
              <select
                value={background}
                onChange={(e) => setBackground(e.target.value as any)}
                className="px-2 py-1 rounded-lg border border-slate-200 bg-slate-50 text-xs font-medium"
              >
                <option value="transparent">Transparent</option>
                <option value="white">White</option>
                <option value="black">Black</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleDownload("png")}
              className="px-4 py-2 bg-[#e5322d] hover:bg-[#cc241f] text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" /> Download PNG ({scale}x)
            </button>
            <button
              onClick={() => handleDownload("webp")}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" /> Download WebP
            </button>
          </div>
        </div>

        {/* Input & Live Preview Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 block">SVG Code / XML Markup</label>
            <textarea
              value={svgCode}
              onChange={(e) => setSvgCode(e.target.value)}
              placeholder="Paste SVG XML code here..."
              className="w-full h-80 p-4 font-mono text-xs sm:text-sm bg-slate-50 text-slate-900 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500 leading-relaxed resize-y"
              spellCheck={false}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 block">Live Render Preview</label>
            <div
              className={`w-full h-80 rounded-2xl border border-slate-200 flex items-center justify-center p-6 overflow-hidden ${
                background === "white"
                  ? "bg-white"
                  : background === "black"
                  ? "bg-black"
                  : "bg-[linear-gradient(45deg,#f1f5f9_25%,transparent_25%),linear-gradient(-45deg,#f1f5f9_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#f1f5f9_75%),linear-gradient(-45deg,transparent_75%,#f1f5f9_75%)] bg-[size:16px_16px] bg-[position:0_0,0_8px,8px_-8px,-8px_0px]"
              }`}
            >
              <div
                className="max-w-full max-h-full flex items-center justify-center [&>svg]:max-w-full [&>svg]:max-h-full"
                dangerouslySetInnerHTML={{ __html: svgCode }}
              />
            </div>
          </div>
        </div>

        {/* Privacy Note */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
          <span className="flex items-center gap-1.5 text-emerald-600 font-medium">
            <ShieldCheck className="w-4 h-4" /> 100% Client-Side HTML5 Canvas Vector Rasterization
          </span>
          <span className="text-[11px] text-slate-400">Lossless Vector Rendering</span>
        </div>
      </div>
    </div>
  );
}
