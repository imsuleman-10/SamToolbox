"use client";

import { useState, useMemo } from "react";
import {
  Link as LinkIcon,
  Copy,
  Check,
  Trash2,
  ArrowRightLeft,
  ShieldCheck,
  CheckCircle2,
  Layers,
  Sparkles,
} from "lucide-react";

export default function UrlEncoderPage() {
  const [inputText, setInputText] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [componentMode, setComponentMode] = useState<boolean>(true); // encodeURIComponent vs encodeURI
  const [copied, setCopied] = useState(false);

  const outputText = useMemo(() => {
    if (!inputText) return "";
    try {
      if (mode === "encode") {
        return componentMode ? encodeURIComponent(inputText) : encodeURI(inputText);
      } else {
        return componentMode ? decodeURIComponent(inputText) : decodeURI(inputText);
      }
    } catch (err: any) {
      return `Error decoding URL string: ${err.message || "Malformed URI sequence"}`;
    }
  }, [inputText, mode, componentMode]);

  // Extract Query Parameters if valid URL
  const queryParams = useMemo(() => {
    if (!inputText) return [];
    try {
      const urlToParse = inputText.includes("://") ? inputText : `https://example.com?${inputText}`;
      const urlObj = new URL(urlToParse);
      const params: Array<{ key: string; value: string }> = [];
      urlObj.searchParams.forEach((value, key) => {
        params.push({ key, value });
      });
      return params;
    } catch {
      return [];
    }
  }, [inputText]);

  const handleCopy = () => {
    if (!outputText) return;
    navigator.clipboard.writeText(outputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLoadSample = () => {
    setInputText("https://samtoolbox.com/search?q=free pdf tools&category=developer & utility&utm_source=google");
    setMode("encode");
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-100 text-[#e5322d] text-xs font-bold mb-4">
          <LinkIcon className="w-3.5 h-3.5" />
          RFC 3986 URL Encoding Engine
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-3">
          URL Encoder &amp; Decoder Online
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Encode and decode URLs, query strings, and URI components instantly. Free in-browser tool with zero server logging.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        {/* Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex rounded-xl bg-slate-100 p-1">
              <button
                onClick={() => setMode("encode")}
                className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                  mode === "encode"
                    ? "bg-[#e5322d] text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                URL Encode
              </button>
              <button
                onClick={() => setMode("decode")}
                className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                  mode === "decode"
                    ? "bg-[#e5322d] text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                URL Decode
              </button>
            </div>

            <label className="flex items-center gap-2 text-xs text-slate-600 font-medium ml-2 cursor-pointer">
              <input
                type="checkbox"
                checked={componentMode}
                onChange={(e) => setComponentMode(e.target.checked)}
                className="rounded border-slate-300 text-red-600 focus:ring-red-500"
              />
              <span>Encode Component (handles <code>&amp;</code>, <code>=</code>, <code>?</code>, <code>/</code>)</span>
            </label>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleLoadSample}
              className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors font-medium cursor-pointer"
            >
              Load Sample URL
            </button>
            <button
              onClick={() => setInputText("")}
              className="p-2 text-slate-400 hover:text-red-600 transition-colors"
              title="Clear input"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Input / Output Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Box */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700">
              <span>Input {mode === "encode" ? "Raw Text / URL" : "Encoded URL"}</span>
              <span className="text-[11px] text-slate-400 font-normal">
                {inputText.length} characters
              </span>
            </div>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={
                mode === "encode"
                  ? "Paste your URL or text to encode (e.g., https://example.com?query=hello world&user=alice)..."
                  : "Paste encoded URL string here (e.g., https%3A%2F%2Fexample.com%3Fquery%3Dhello%20world)..."
              }
              className="w-full h-56 p-4 font-mono text-xs sm:text-sm bg-slate-50 text-slate-900 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500 leading-relaxed resize-y"
              spellCheck={false}
            />
          </div>

          {/* Output Box */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700">
              <span>Output {mode === "encode" ? "Encoded URL" : "Decoded Text"}</span>
              {outputText && (
                <button
                  onClick={handleCopy}
                  className="px-2.5 py-1 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1 cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? "Copied!" : "Copy Output"}
                </button>
              )}
            </div>
            <textarea
              readOnly
              value={outputText}
              placeholder="Result will appear here automatically..."
              className="w-full h-56 p-4 font-mono text-xs sm:text-sm bg-slate-900 text-slate-100 rounded-2xl border border-slate-800 leading-relaxed resize-y focus:outline-none selection:bg-red-500/40"
              spellCheck={false}
            />
          </div>
        </div>

        {/* Parsed Query Parameters Inspector */}
        {queryParams.length > 0 && (
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-red-600" />
                Detected URL Query Parameters ({queryParams.length})
              </span>
              <span className="text-[11px] text-slate-400">Parsed from input</span>
            </div>
            <div className="divide-y divide-slate-200 border border-slate-200 rounded-xl overflow-hidden bg-white text-xs">
              {queryParams.map((param, idx) => (
                <div key={idx} className="p-2.5 flex items-center justify-between gap-4 hover:bg-slate-50">
                  <span className="font-mono font-bold text-red-600 shrink-0">{param.key}</span>
                  <span className="font-mono text-slate-600 truncate flex-1 text-right">{param.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Privacy Note */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
          <span className="flex items-center gap-1.5 text-emerald-600 font-medium">
            <ShieldCheck className="w-4 h-4" /> 100% In-Browser URI Parsing (Zero Network Uploads)
          </span>
          <span className="text-[11px] text-slate-400">Strict RFC 3986 Standard</span>
        </div>
      </div>
    </div>
  );
}
