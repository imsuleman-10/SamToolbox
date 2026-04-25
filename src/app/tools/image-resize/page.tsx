"use client";

import { useState, useRef, useEffect } from "react";
import { Upload, Download, FileImage, Settings, Settings2, Zap, ShieldCheck } from "lucide-react";

export default function ImageResizerPage() {
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [maintainRatio, setMaintainRatio] = useState(true);
  const [originalRatio, setOriginalRatio] = useState<number>(1);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      const url = URL.createObjectURL(selectedFile);
      setImageUrl(url);

      // Load image to get dimensions
      const img = new Image();
      img.onload = () => {
        setWidth(img.width);
        setHeight(img.height);
        setOriginalRatio(img.width / img.height);
      };
      img.src = url;
    }
  };

  const handleWidthChange = (val: number) => {
    setWidth(val);
    if (maintainRatio) {
      setHeight(Math.round(val / originalRatio));
    }
  };

  const handleHeightChange = (val: number) => {
    setHeight(val);
    if (maintainRatio) {
      setWidth(Math.round(val * originalRatio));
    }
  };

  const handleDownload = () => {
    if (!imageUrl || !canvasRef.current || !file) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);
      
      const newUrl = canvas.toDataURL(file.type);
      const a = document.createElement("a");
      a.href = newUrl;
      a.download = `resized-${file.name}`;
      a.click();
    };
    img.src = imageUrl;
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-50 text-cyan-700 text-[10px] font-black uppercase tracking-[0.2em] mb-8 border border-cyan-100">
          <Settings size={14} />
          <span>Pixel-Perfect Control</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-slate-800 mb-4 tracking-tight">
          Image <span className="text-cyan-600">Resizer</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto font-medium leading-relaxed">
          Resize images to exact pixel dimensions with precision control.
          <span className="text-slate-900 font-semibold"> Maintain aspect ratio, preserve quality, and get instant results — no uploads, zero quality loss, completely free.</span>
        </p>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-slate-200 mb-8">
        {!file ? (
          <div
            className="border-2 border-dashed border-slate-300 rounded-xl p-12 text-center hover:border-cyan-300 hover:bg-cyan-50/20 transition cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="mx-auto h-14 w-14 text-cyan-500 mb-5" />
            <h3 className="text-xl font-bold text-slate-800 mb-2">Select an Image to Resize</h3>
            <p className="text-slate-500 max-w-md mx-auto">
              Choose JPG, PNG, or WEBP. Enter exact dimensions and download instantly.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Preview */}
            <div className="flex flex-col items-center justify-center p-4 bg-slate-50 rounded-xl border border-slate-200">
              <img src={imageUrl!} alt="Original" className="max-h-80 object-contain rounded-lg mb-4 shadow-md" />
              <p className="text-sm font-medium text-slate-600">{file.name}</p>
              <button
                onClick={() => { setFile(null); setImageUrl(null); }}
                className="mt-3 text-sm text-cyan-600 hover:text-cyan-700 font-medium transition"
              >
                Choose different image
              </button>
            </div>

            {/* Controls */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                <Settings2 size={24} className="text-cyan-600" /> Resize Settings
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Width (px)</label>
                  <input
                    type="number"
                    value={width}
                    onChange={(e) => handleWidthChange(parseInt(e.target.value) || 0)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/10 outline-none font-semibold text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Height (px)</label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => handleHeightChange(parseInt(e.target.value) || 0)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/10 outline-none font-semibold text-slate-800"
                  />
                </div>
              </div>

              <label className="flex items-center gap-3 cursor-pointer p-3 rounded-xl hover:bg-slate-50 transition">
                <input
                  type="checkbox"
                  checked={maintainRatio}
                  onChange={(e) => setMaintainRatio(e.target.checked)}
                  className="w-5 h-5 text-cyan-600 rounded focus:ring-cyan-500"
                />
                <span className="text-slate-700 font-bold">Lock aspect ratio (prevent distortion)</span>
              </label>

              <button
                onClick={handleDownload}
                className="w-full py-4 bg-cyan-600 text-white rounded-xl font-bold shadow-md hover:bg-cyan-700 transition flex items-center justify-center gap-2"
              >
                <Download size={20} /> Download Resized Image
              </button>
            </div>
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileChange}
        />
        {/* Hidden canvas for drawing */}
        <canvas ref={canvasRef} className="hidden"></canvas>
      </div>

      {/* Benefits */}
      {!file && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center mb-3">
              <Zap size={20} className="text-cyan-600" />
            </div>
            <h3 className="text-sm font-black text-slate-800 mb-1 uppercase">Precise Dimensions</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Exact pixel control. Resize to any width/height you need.
            </p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center mb-3">
              <ShieldCheck size={20} className="text-emerald-600" />
            </div>
            <h3 className="text-sm font-black text-slate-800 mb-1 uppercase">Quality Preserved</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              No compression or quality loss. Original fidelity maintained.
            </p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center mb-3">
              <Settings2 size={20} className="text-slate-600" />
            </div>
            <h3 className="text-sm font-black text-slate-800 mb-1 uppercase">Aspect Ratio Lock</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Prevent distortion with optional aspect ratio preservation.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
