"use client";

import { useState } from "react";
import {
  Maximize,
  Copy,
  Check,
  ShieldCheck,
  Sparkles,
  Tv,
  Smartphone,
  Monitor,
} from "lucide-react";

export default function AspectRatioCalculatorPage() {
  const [ratioW, setRatioW] = useState<number>(16);
  const [ratioH, setRatioH] = useState<number>(9);
  const [width, setWidth] = useState<number>(1920);
  const [height, setHeight] = useState<number>(1080);
  const [copied, setCopied] = useState(false);

  // Greatest Common Divisor to calculate reduced ratio
  const gcd = (a: number, b: number): number => {
    return b === 0 ? a : gcd(b, a % b);
  };

  const handleWidthChange = (val: number) => {
    setWidth(val);
    if (ratioW > 0) {
      setHeight(Math.round((val * ratioH) / ratioW));
    }
  };

  const handleHeightChange = (val: number) => {
    setHeight(val);
    if (ratioH > 0) {
      setWidth(Math.round((val * ratioW) / ratioH));
    }
  };

  const setPreset = (w: number, h: number) => {
    setRatioW(w);
    setRatioH(h);
    setHeight(Math.round((width * h) / w));
  };

  const divisor = gcd(width, height);
  const simpleRatio = divisor > 0 ? `${width / divisor}:${height / divisor}` : `${ratioW}:${ratioH}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(`${width} x ${height} (${ratioW}:${ratioH})`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-100 text-[#e5322d] text-xs font-bold mb-4">
          <Maximize className="w-3.5 h-3.5" />
          Display &amp; Video Geometry Calculator
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-3">
          Aspect Ratio &amp; Resolution Calculator
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Calculate image dimensions, video aspect ratios, and pixel scaling for 16:9, 4:3, 1:1, 9:16 (Shorts), and 21:9 ultrawide screens.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-8">
        {/* Presets Bar */}
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Common Aspect Ratio Presets</span>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {[
              { label: "16:9 (HD / 4K / YouTube)", w: 16, h: 9, icon: <Monitor className="w-3.5 h-3.5" /> },
              { label: "9:16 (Reels / TikTok)", w: 9, h: 16, icon: <Smartphone className="w-3.5 h-3.5" /> },
              { label: "1:1 (Square / Instagram)", w: 1, h: 1, icon: <Maximize className="w-3.5 h-3.5" /> },
              { label: "4:3 (Standard TV / iPad)", w: 4, h: 3, icon: <Tv className="w-3.5 h-3.5" /> },
              { label: "21:9 (Ultrawide Cinema)", w: 21, h: 9, icon: <Monitor className="w-3.5 h-3.5" /> },
            ].map((p) => (
              <button
                key={p.label}
                type="button"
                onClick={() => setPreset(p.w, p.h)}
                className={`p-3 rounded-xl border text-xs font-bold transition-all text-left flex flex-col justify-between cursor-pointer ${
                  ratioW === p.w && ratioH === p.h
                    ? "border-red-500 bg-red-50/50 text-red-900 shadow-xs"
                    : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                }`}
              >
                <div className="flex items-center justify-between text-slate-400 mb-1">
                  <span>{p.icon}</span>
                  <span className="font-mono text-red-600">{p.w}:{p.h}</span>
                </div>
                <span className="text-[11px] leading-tight font-medium text-slate-800">{p.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Dimension Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-5 space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">Width (Pixels)</label>
            <input
              type="number"
              min="1"
              value={width}
              onChange={(e) => handleWidthChange(parseInt(e.target.value) || 1)}
              className="w-full p-4 text-xl font-mono font-bold bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div className="md:col-span-2 text-center text-slate-300 font-mono text-3xl font-black">
            ×
          </div>

          <div className="md:col-span-5 space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">Height (Pixels)</label>
            <input
              type="number"
              min="1"
              value={height}
              onChange={(e) => handleHeightChange(parseInt(e.target.value) || 1)}
              className="w-full p-4 text-xl font-mono font-bold bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
        </div>

        {/* Visual Box Simulation & Results */}
        <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Calculated Proportions</span>
            <div className="text-2xl font-black text-slate-900 font-mono">
              {width} × {height} px <span className="text-red-600 text-lg">({ratioW}:{ratioH})</span>
            </div>
            <p className="text-xs text-slate-500">
              Simplified Mathematical Ratio: <span className="font-mono font-bold text-slate-700">{simpleRatio}</span>
            </p>
          </div>

          <button
            onClick={handleCopy}
            className="px-4 py-2.5 bg-white border border-slate-200 hover:border-red-300 text-slate-800 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
            {copied ? "Copied!" : "Copy Dimensions"}
          </button>
        </div>

        {/* Privacy Note */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
          <span className="flex items-center gap-1.5 text-emerald-600 font-medium">
            <ShieldCheck className="w-4 h-4" /> 100% In-Browser Dimensional Scaling
          </span>
          <span className="text-[11px] text-slate-400">SMPTE &amp; ITU Standard Resolutions</span>
        </div>
      </div>
    </div>
  );
}
