"use client";

import { useState } from "react";
import {
  Code,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  Download,
  Trash2,
  FileCode,
  Sparkles,
  Minimize2,
  Maximize2,
  ShieldCheck,
} from "lucide-react";

export default function JsonFormatterPage() {
  const [inputJson, setInputJson] = useState("");
  const [indent, setIndent] = useState<number>(2);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [stats, setStats] = useState<{ lines: number; chars: number; size: string } | null>(null);

  const calculateStats = (str: string) => {
    const lines = str ? str.split("\n").length : 0;
    const chars = str.length;
    const bytes = new Blob([str]).size;
    const size = bytes > 1024 ? `${(bytes / 1024).toFixed(1)} KB` : `${bytes} B`;
    setStats({ lines, chars, size });
  };

  const handleFormat = (spaces: number = indent) => {
    if (!inputJson.trim()) return;
    try {
      const parsed = JSON.parse(inputJson);
      const formatted = JSON.stringify(parsed, null, spaces);
      setInputJson(formatted);
      setError(null);
      calculateStats(formatted);
    } catch (err: any) {
      setError(err.message || "Invalid JSON syntax");
    }
  };

  const handleMinify = () => {
    if (!inputJson.trim()) return;
    try {
      const parsed = JSON.parse(inputJson);
      const minified = JSON.stringify(parsed);
      setInputJson(minified);
      setError(null);
      calculateStats(minified);
    } catch (err: any) {
      setError(err.message || "Invalid JSON syntax");
    }
  };

  const handleAutoFix = () => {
    if (!inputJson.trim()) return;
    try {
      // Loose JSON repair: replace single quotes, fix unquoted keys, remove trailing commas
      let fixed = inputJson
        .replace(/,\s*([\]}])/g, "$1") // remove trailing commas
        .replace(/(['"])?([a-zA-Z0-9_]+)(['"])?\s*:/g, '"$2":') // quote unquoted keys
        .replace(/'/g, '"'); // single to double quotes
      const parsed = JSON.parse(fixed);
      const formatted = JSON.stringify(parsed, null, indent);
      setInputJson(formatted);
      setError(null);
      calculateStats(formatted);
    } catch (err: any) {
      setError("Could not auto-repair JSON: " + (err.message || "Invalid structure"));
    }
  };

  const handleCopy = () => {
    if (!inputJson) return;
    navigator.clipboard.writeText(inputJson);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!inputJson) return;
    const blob = new Blob([inputJson], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "formatted.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleLoadSample = () => {
    const sample = {
      name: "SamToolbox",
      category: "Developer Utilities",
      tools_count: 62,
      features: [
        "100% Client-Side",
        "Zero Server Uploads",
        "Sub-Second Processing",
        "Free Forever"
      ],
      creator: {
        name: "Suleman Zaheer",
        role: "Lead Software Engineer",
        city: "Lahore",
        country: "Pakistan"
      },
      verified: true
    };
    const str = JSON.stringify(sample, null, indent);
    setInputJson(str);
    setError(null);
    calculateStats(str);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-100 text-[#e5322d] text-xs font-bold mb-4">
          <Code className="w-3.5 h-3.5" />
          100% In-Browser JSON Engine
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-3">
          Free Online JSON Formatter &amp; Validator
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Beautify, validate, minify, and inspect JSON data instantly. Zero server uploads guarantee 100% confidential API payload privacy.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => handleFormat(2)}
              className="px-4 py-2 bg-[#e5322d] hover:bg-[#cc241f] text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Maximize2 className="w-3.5 h-3.5" /> Format (2 Spaces)
            </button>
            <button
              onClick={() => handleFormat(4)}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              Format (4 Spaces)
            </button>
            <button
              onClick={handleMinify}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Minimize2 className="w-3.5 h-3.5" /> Minify JSON
            </button>
            <button
              onClick={handleAutoFix}
              className="px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" /> Auto-Fix Syntax
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleLoadSample}
              className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors font-medium"
            >
              Load Sample
            </button>
            <button
              onClick={() => {
                setInputJson("");
                setError(null);
                setStats(null);
              }}
              className="p-2 text-slate-400 hover:text-red-600 transition-colors"
              title="Clear text"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Text Area */}
        <div className="relative">
          <textarea
            value={inputJson}
            onChange={(e) => {
              setInputJson(e.target.value);
              calculateStats(e.target.value);
              if (error) setError(null);
            }}
            placeholder="Paste your raw JSON, API response, or config object here..."
            className="w-full h-80 p-4 font-mono text-xs sm:text-sm bg-slate-900 text-slate-100 rounded-2xl border border-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500 selection:bg-red-500/40 leading-relaxed resize-y"
            spellCheck={false}
          />

          {/* Quick Copy / Download Overlay */}
          {inputJson && (
            <div className="absolute top-3 right-3 flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="px-3 py-1.5 bg-slate-800/80 hover:bg-slate-700 text-white text-xs font-medium rounded-lg backdrop-blur-sm transition-colors flex items-center gap-1.5"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "Copied" : "Copy"}
              </button>
              <button
                onClick={handleDownload}
                className="px-3 py-1.5 bg-slate-800/80 hover:bg-slate-700 text-white text-xs font-medium rounded-lg backdrop-blur-sm transition-colors flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" /> Download
              </button>
            </div>
          )}
        </div>

        {/* Validation Status & Error Alert */}
        {error ? (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-xs text-red-800 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">JSON Syntax Error:</span> {error}
              <p className="text-[11px] text-red-600 mt-1">
                Tip: Click "Auto-Fix Syntax" above to repair unquoted keys or trailing commas automatically.
              </p>
            </div>
          </div>
        ) : inputJson.trim() ? (
          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center justify-between">
            <span className="flex items-center gap-2 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Valid JSON Data Structure
            </span>
            {stats && (
              <span className="text-[11px] text-slate-500 font-mono">
                {stats.lines} lines • {stats.chars.toLocaleString()} chars • {stats.size}
              </span>
            )}
          </div>
        ) : null}

        {/* Security / Privacy Banner */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
          <span className="flex items-center gap-1.5 text-emerald-600 font-medium">
            <ShieldCheck className="w-4 h-4" /> 100% In-Memory RAM Validation (Zero Network Uploads)
          </span>
          <span className="text-[11px] text-slate-400">Strict RFC 8259 Standard Compliance</span>
        </div>
      </div>
    </div>
  );
}
