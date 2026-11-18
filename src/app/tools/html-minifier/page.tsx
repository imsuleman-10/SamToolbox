"use client";

import { useState } from "react";
import {
  FileCode2,
  Copy,
  Check,
  Download,
  Trash2,
  Minimize2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export default function HtmlMinifierPage() {
  const [inputHtml, setInputHtml] = useState<string>(
    `<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <!-- Document Metadata -->\n    <meta charset="UTF-8" />\n    <title>Sample Web Page</title>\n  </head>\n  <body>\n    <!-- Main Page Header -->\n    <header class="hero-section">\n      <h1>Welcome to SamToolbox</h1>\n      <p>100% Client-Side Privacy Architecture.</p>\n    </header>\n  </body>\n</html>`
  );
  const [outputHtml, setOutputHtml] = useState<string>("");
  const [removeComments, setRemoveComments] = useState<boolean>(true);
  const [copied, setCopied] = useState(false);
  const [stats, setStats] = useState<{ origSize: number; newSize: number; saved: string } | null>(null);

  const handleMinify = () => {
    if (!inputHtml) return;
    const origSize = new Blob([inputHtml]).size;
    let min = inputHtml;

    if (removeComments) {
      min = min.replace(/<!--[\s\S]*?-->/g, "");
    }

    min = min
      .replace(/\r?\n|\r/g, "") // strip linebreaks
      .replace(/\s{2,}/g, " ") // collapse multiple spaces
      .replace(/>\s+</g, "><") // strip whitespace between tags
      .trim();

    setOutputHtml(min);
    const newSize = new Blob([min]).size;
    const saved = origSize > 0 ? (((origSize - newSize) / origSize) * 100).toFixed(1) + "%" : "0%";
    setStats({ origSize, newSize, saved });
  };

  const handleCopy = () => {
    if (!outputHtml) return;
    navigator.clipboard.writeText(outputHtml);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!outputHtml) return;
    const blob = new Blob([outputHtml], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "index.min.html";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-100 text-[#e5322d] text-xs font-bold mb-4">
          <FileCode2 className="w-3.5 h-3.5" />
          HTML5 Compression Engine
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-3">
          HTML Minifier &amp; Code Compressor
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Minify HTML markup by stripping comments, tags spacing, and redundant line breaks for faster page load times and Core Web Vitals optimization.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        {/* Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-4">
            <button
              onClick={handleMinify}
              className="px-4 py-2 bg-[#e5322d] hover:bg-[#cc241f] text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Minimize2 className="w-3.5 h-3.5" /> Minify HTML Now
            </button>

            <label className="flex items-center gap-1.5 text-xs text-slate-600 cursor-pointer">
              <input
                type="checkbox"
                checked={removeComments}
                onChange={(e) => setRemoveComments(e.target.checked)}
                className="rounded border-slate-300 text-red-600"
              />
              <span>Strip HTML Comments</span>
            </label>
          </div>

          <div className="flex items-center gap-2">
            {outputHtml && (
              <>
                <button
                  onClick={handleCopy}
                  className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1 cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? "Copied!" : "Copy Output"}
                </button>
                <button
                  onClick={handleDownload}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" /> Save .html
                </button>
              </>
            )}
            <button
              onClick={() => {
                setInputHtml("");
                setOutputHtml("");
                setStats(null);
              }}
              className="p-2 text-slate-400 hover:text-red-600 transition-colors"
              title="Clear all"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Compression Badge */}
        {stats && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-xs text-emerald-800">
            <span className="font-semibold flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-emerald-600" /> HTML Minified Successfully!
            </span>
            <span className="font-mono">
              Original: {stats.origSize} B → Minified: {stats.newSize} B ({stats.saved} saved)
            </span>
          </div>
        )}

        {/* Text Areas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 block">Raw HTML Code</label>
            <textarea
              value={inputHtml}
              onChange={(e) => setInputHtml(e.target.value)}
              placeholder="Paste HTML code here..."
              className="w-full h-80 p-4 font-mono text-xs sm:text-sm bg-slate-50 text-slate-900 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500 leading-relaxed resize-y"
              spellCheck={false}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 block">Minified HTML Output</label>
            <textarea
              readOnly
              value={outputHtml}
              placeholder="Compressed HTML markup will appear here..."
              className="w-full h-80 p-4 font-mono text-xs sm:text-sm bg-slate-900 text-slate-100 rounded-2xl border border-slate-800 leading-relaxed resize-y focus:outline-none selection:bg-red-500/40"
              spellCheck={false}
            />
          </div>
        </div>

        {/* Privacy Note */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
          <span className="flex items-center gap-1.5 text-emerald-600 font-medium">
            <ShieldCheck className="w-4 h-4" /> 100% In-Browser Compression (Zero Server Transmissions)
          </span>
          <span className="text-[11px] text-slate-400">Strict HTML5 Spec Compliance</span>
        </div>
      </div>
    </div>
  );
}
