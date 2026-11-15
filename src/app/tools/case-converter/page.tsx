"use client";

import { useState } from "react";
import { Copy, Trash2, Type, Check, Sparkles } from "lucide-react";

export default function CaseConverterPage() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const convert = (type: string) => {
    if (!text) return;
    let res = text;
    switch (type) {
      case "upper":
        res = text.toUpperCase();
        break;
      case "lower":
        res = text.toLowerCase();
        break;
      case "title":
        res = text
          .toLowerCase()
          .split(/(\s+)/)
          .map((w) => (w.trim() ? w.charAt(0).toUpperCase() + w.slice(1) : w))
          .join("");
        break;
      case "sentence":
        res = text.toLowerCase().replace(/(^\s*\w|[\.\!\?]\s*\w)/g, (c) => c.toUpperCase());
        break;
      case "camel":
        res = text
          .toLowerCase()
          .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase());
        break;
      case "kebab":
        res = text
          .toLowerCase()
          .replace(/[^a-zA-Z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "");
        break;
      case "snake":
        res = text
          .toLowerCase()
          .replace(/[^a-zA-Z0-9]+/g, "_")
          .replace(/^_+|_+$/g, "");
        break;
    }
    setText(res);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-100 text-[#e5322d] text-xs font-bold mb-4">
          <Type className="w-3.5 h-3.5" />
          Text Transformation Engine
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-3">
          Case Converter & Text Formatter
        </h1>
        <p className="text-slate-600 text-sm leading-relaxed">
          Instantly switch between UPPERCASE, lowercase, Title Case, Sentence case, camelCase, and kebab-case.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2">
          {[
            { id: "upper", label: "UPPERCASE" },
            { id: "lower", label: "lowercase" },
            { id: "title", label: "Title Case" },
            { id: "sentence", label: "Sentence case" },
            { id: "camel", label: "camelCase" },
            { id: "kebab", label: "kebab-case" },
            { id: "snake", label: "snake_case" },
          ].map((btn) => (
            <button
              key={btn.id}
              onClick={() => convert(btn.id)}
              className="px-3.5 py-2 bg-slate-100 hover:bg-[#e5322d] hover:text-white rounded-xl text-xs font-bold text-slate-700 transition-colors cursor-pointer"
            >
              {btn.label}
            </button>
          ))}
        </div>

        <textarea
          rows={10}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste or type your text here to transform cases..."
          className="w-full p-4 text-sm bg-slate-50 border border-slate-200 rounded-2xl leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#e5322d]"
        />

        <div className="flex items-center justify-between pt-2">
          <span className="text-xs text-slate-400">
            {text.length} characters | {text.trim() ? text.trim().split(/\s+/).length : 0} words
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setText("")}
              className="text-xs text-slate-400 hover:text-red-500 flex items-center gap-1 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" /> Clear
            </button>
            <button
              onClick={handleCopy}
              className="px-5 py-2.5 bg-[#e5322d] hover:bg-[#cc241f] text-white rounded-xl text-xs font-bold shadow-md shadow-red-500/20 flex items-center gap-1.5 transition-all cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? "Copied" : "Copy Result"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
