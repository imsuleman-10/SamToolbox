"use client";

import { useState } from "react";
import {
  Palette,
  Copy,
  Check,
  RefreshCw,
  Sliders,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export default function ColorPickerPage() {
  const [color, setColor] = useState("#e5322d");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Convert Hex to RGB
  const hexToRgb = (hex: string) => {
    const clean = hex.replace("#", "");
    const bigint = parseInt(clean, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return { r, g, b };
  };

  // Convert RGB to HSL
  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    };
  };

  // Convert RGB to CMYK
  const rgbToCmyk = (r: number, g: number, b: number) => {
    const c = 1 - (r / 255);
    const m = 1 - (g / 255);
    const y = 1 - (b / 255);
    const k = Math.min(c, m, y);
    if (k === 1) return { c: 0, m: 0, y: 0, k: 100 };
    return {
      c: Math.round(((c - k) / (1 - k)) * 100),
      m: Math.round(((m - k) / (1 - k)) * 100),
      y: Math.round(((y - k) / (1 - k)) * 100),
      k: Math.round(k * 100),
    };
  };

  const rgb = hexToRgb(color);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  const cmyk = rgbToCmyk(rgb.r, rgb.g, rgb.b);

  const formats = [
    { label: "HEX", val: color.toUpperCase() },
    { label: "RGB", val: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` },
    { label: "HSL", val: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` },
    { label: "CMYK", val: `cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)` },
  ];

  // Generate Shades
  const shades = [0.2, 0.4, 0.6, 0.8, 1, 1.2, 1.4, 1.6].map((factor) => {
    const r = Math.min(255, Math.max(0, Math.round(rgb.r * factor)));
    const g = Math.min(255, Math.max(0, Math.round(rgb.g * factor)));
    const b = Math.min(255, Math.max(0, Math.round(rgb.b * factor)));
    const hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    return hex;
  });

  const handleCopy = (val: string, key: string) => {
    navigator.clipboard.writeText(val);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-100 text-[#e5322d] text-xs font-bold mb-4">
          <Palette className="w-3.5 h-3.5" />
          Color Spectrum &amp; Palette Engine
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-3">
          Color Picker &amp; Converter (HEX, RGB, HSL, CMYK)
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Pick colors, extract color codes across all formats, and generate complementary monochromatic palettes.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-8">
        {/* Main Picker Block */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Visual Swatch */}
          <div className="md:col-span-5 flex flex-col items-center">
            <div
              className="w-full h-48 sm:h-56 rounded-2xl shadow-inner border border-slate-200 relative overflow-hidden transition-colors flex items-center justify-center cursor-pointer"
              style={{ backgroundColor: color }}
            >
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
              />
              <span className="px-3 py-1.5 bg-black/40 backdrop-blur-md rounded-xl text-white font-mono text-xs font-bold pointer-events-none">
                Click to Open System Picker
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-2">Pick any screen color or fine-tune below</p>
          </div>

          {/* Formats Grid */}
          <div className="md:col-span-7 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Color Values</h3>
            {formats.map((fmt) => (
              <div
                key={fmt.label}
                className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-xl hover:border-slate-300 transition-colors"
              >
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">{fmt.label}</span>
                  <span className="font-mono text-sm font-bold text-slate-900">{fmt.val}</span>
                </div>
                <button
                  onClick={() => handleCopy(fmt.val, fmt.label)}
                  className="px-2.5 py-1.5 bg-white border border-slate-200 hover:border-red-300 text-slate-700 text-xs font-semibold rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
                >
                  {copiedKey === fmt.label ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                  {copiedKey === fmt.label ? "Copied" : "Copy"}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Monochromatic Shades Palette */}
        <div className="space-y-3 pt-6 border-t border-slate-100">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Harmonized Tints &amp; Shades</h3>
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
            {shades.map((shade, idx) => (
              <div
                key={idx}
                onClick={() => {
                  setColor(shade);
                  handleCopy(shade, `shade-${idx}`);
                }}
                className="h-16 rounded-xl border border-slate-200 cursor-pointer shadow-xs hover:scale-105 transition-transform flex flex-col justify-end p-1.5 text-center group"
                style={{ backgroundColor: shade }}
                title={`Click to use ${shade}`}
              >
                <span className="text-[10px] font-mono font-bold bg-white/80 rounded px-1 text-slate-800 opacity-0 group-hover:opacity-100 transition-opacity">
                  {shade}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Privacy Note */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
          <span className="flex items-center gap-1.5 text-emerald-600 font-medium">
            <ShieldCheck className="w-4 h-4" /> 100% In-Browser Rendering
          </span>
          <span className="text-[11px] text-slate-400">Full Gamut sRGB &amp; Web Palette</span>
        </div>
      </div>
    </div>
  );
}
