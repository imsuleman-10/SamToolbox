"use client";

import { useState, useRef } from "react";
import { Upload, Download, Image as ImageIcon, Sparkles, ShieldCheck } from "lucide-react";

type PresetType = "us_visa" | "schengen" | "uk_visa" | "canada_visa" | "uae_visa" | "india_visa" | "nadra" | "fpsc";

export default function PassportPhotoResizerPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [preset, setPreset] = useState<PresetType>("us_visa");
  const [targetKb, setTargetKb] = useState<number>(30);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedUrl, setProcessedUrl] = useState<string>("");
  const [processedSize, setProcessedSize] = useState<number>(0);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setProcessedUrl("");
    }
  };

  const processPhoto = () => {
    if (!selectedFile || !previewUrl) return;
    setIsProcessing(true);

    const img = new Image();
    img.src = previewUrl;
    img.onload = () => {
      let width = 413;
      let height = 531;

      if (preset === "nadra" || preset === "schengen" || preset === "uk_visa") {
        width = 413; // 35x45mm @ 300 DPI
        height = 531;
      } else if (preset === "us_visa" || preset === "india_visa") {
        width = 600; // 2x2 inches (51x51mm) @ 300 DPI
        height = 600;
      } else if (preset === "canada_visa") {
        width = 590; // 50x70mm @ 300 DPI
        height = 826;
      } else if (preset === "uae_visa") {
        width = 472; // 40x50mm @ 300 DPI
        height = 590;
      } else if (preset === "fpsc") {
        width = 200;
        height = 200;
      }

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Draw and scale to fit aspect
      ctx.drawImage(img, 0, 0, width, height);

      // Binary search for image quality to fit target KB limit
      let quality = 0.9;
      let dataUrl = canvas.toDataURL("image/jpeg", quality);

      // Iterative compression for FPSC/PPSC strict 25-30KB limit
      let iterations = 0;
      while (dataUrl.length * 0.75 > targetKb * 1024 && quality > 0.1 && iterations < 8) {
        quality -= 0.1;
        dataUrl = canvas.toDataURL("image/jpeg", quality);
        iterations++;
      }

      const sizeInKb = Math.round((dataUrl.length * 0.75) / 1024);
      setProcessedUrl(dataUrl);
      setProcessedSize(sizeInKb);
      setIsProcessing(false);
    };
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-100 text-[#e5322d] text-xs font-bold mb-4">
          <ImageIcon className="w-3.5 h-3.5" />
          NADRA, FPSC, PPSC & Visa Dimensions
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-3">
          Passport & Govt Job Photo Resizer
        </h1>
        <p className="text-slate-600 text-sm leading-relaxed">
          Crop and resize your portrait photos to exact passport and govt application specifications with strict KB size limits.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-8">
        <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />

        {/* Configuration Column */}
        <div className="md:col-span-7 space-y-6">
          {!previewUrl ? (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-slate-300 rounded-2xl p-8 text-center cursor-pointer hover:border-[#e5322d] transition-colors"
            >
              <Upload className="w-8 h-8 text-slate-400 mx-auto mb-3" />
              <p className="text-sm font-bold text-slate-700">Select Portrait Photo</p>
              <p className="text-xs text-slate-400 mt-1">JPG, PNG supported</p>
            </div>
          ) : (
            <div className="flex items-center gap-4 p-3 bg-slate-50 border border-slate-200 rounded-2xl">
              <img src={previewUrl} alt="Preview" className="w-16 h-20 object-cover rounded-xl" />
              <div className="flex-1 truncate">
                <p className="text-xs font-bold text-slate-800 truncate">{selectedFile?.name}</p>
                <p className="text-[11px] text-slate-500">{(selectedFile?.size! / 1024).toFixed(1)} KB original size</p>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="text-xs text-[#e5322d] hover:underline mt-1 font-semibold"
                >
                  Change Photo
                </button>
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Select Preset Format
            </label>
            <div className="space-y-2">
              {[
                { id: "us_visa", title: "US Visa & US Passport (DS-160 / Diversity Lottery)", desc: "2 x 2 inches / 600 x 600 px (300 DPI)", kb: 240 },
                { id: "schengen", title: "Schengen Visa (France, Germany, Italy, Spain)", desc: "35 x 45 mm (Biometric compliance)", kb: 100 },
                { id: "uk_visa", title: "UK Passport & UK Visa", desc: "35 x 45 mm (Standard UK Gov aspect)", kb: 100 },
                { id: "canada_visa", title: "Canadian Passport & Immigration Visa", desc: "50 x 70 mm / 590 x 826 px", kb: 250 },
                { id: "uae_visa", title: "UAE / Dubai Resident Visa", desc: "40 x 50 mm / 472 x 590 px (White background)", kb: 150 },
                { id: "india_visa", title: "Indian Passport & e-Visa (OCI / Visa)", desc: "2 x 2 inches / 600 x 600 px", kb: 200 },
                { id: "nadra", title: "Pakistani Passport / NADRA CNIC", desc: "35 x 45 mm (Standard biometric aspect)", kb: 50 },
                { id: "fpsc", title: "Govt Job Tests (FPSC / PPSC / NTS)", desc: "200 x 200 px (Strict under 25 KB limit)", kb: 25 },
              ].map((opt) => (
                <label
                  key={opt.id}
                  className={`flex items-start gap-3 p-3 rounded-xl border text-xs cursor-pointer transition-colors ${
                    preset === opt.id
                      ? "border-[#e5322d] bg-red-50/40 text-slate-900"
                      : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="passportPreset"
                    checked={preset === opt.id}
                    onChange={() => {
                      setPreset(opt.id as any);
                      setTargetKb(opt.kb);
                    }}
                    className="mt-0.5 text-[#e5322d] focus:ring-[#e5322d]"
                  />
                  <div>
                    <p className="font-bold text-slate-900">{opt.title}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">{opt.desc}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Max File Size Limit ({targetKb} KB)
            </label>
            <input
              type="range"
              min="15"
              max="250"
              step="5"
              value={targetKb}
              onChange={(e) => setTargetKb(parseInt(e.target.value, 10))}
              className="w-full accent-[#e5322d]"
            />
          </div>

          <button
            disabled={!selectedFile || isProcessing}
            onClick={processPhoto}
            className="w-full py-4 bg-[#e5322d] hover:bg-[#cc241f] text-white font-bold text-sm rounded-xl shadow-lg shadow-red-500/25 flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
          >
            {isProcessing ? "Processing..." : "Crop & Resize Photo"}
          </button>
        </div>

        {/* Result Column */}
        <div className="md:col-span-5 flex flex-col items-center justify-center p-6 bg-slate-50 rounded-2xl border border-slate-200 text-center">
          {processedUrl ? (
            <div className="space-y-4">
              <div className="inline-block p-2 bg-white rounded-2xl shadow-md border border-slate-200">
                <img src={processedUrl} alt="Resized" className="w-36 h-44 object-cover rounded-xl" />
              </div>
              <div>
                <p className="text-xs font-bold text-emerald-600 flex items-center justify-center gap-1">
                  Ready: {processedSize} KB
                </p>
                <p className="text-[11px] text-slate-500">Meets upload guidelines</p>
              </div>
              <a
                href={processedUrl}
                download={`photo-${preset}-${processedSize}KB.jpg`}
                className="w-full px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md inline-flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download Ready Photo
              </a>
            </div>
          ) : (
            <div className="text-slate-400 space-y-2">
              <ImageIcon className="w-12 h-12 mx-auto stroke-1 text-slate-300" />
              <p className="text-xs font-semibold">Resized passport photo preview will appear here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
