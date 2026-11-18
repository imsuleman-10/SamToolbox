"use client";

import { useState, useMemo } from "react";
import {
  Link as LinkIcon,
  Copy,
  Check,
  Trash2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export default function SlugGeneratorPage() {
  const [inputTitle, setInputTitle] = useState(
    "How to Build Enterprise-Level Next.js Web Tools & Scale to Millions of Users!"
  );
  const [separator, setSeparator] = useState<"-" | "_" | ".">("-");
  const [lowercase, setLowercase] = useState<boolean>(true);
  const [removeNumbers, setRemoveNumbers] = useState<boolean>(false);
  const [copied, setCopied] = useState(false);

  const generatedSlug = useMemo(() => {
    if (!inputTitle) return "";
    let str = inputTitle
      // Normalize accented Latin characters
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim();

    if (lowercase) {
      str = str.toLowerCase();
    }

    if (removeNumbers) {
      str = str.replace(/[0-9]/g, "");
    }

    // Replace all non-alphanumeric chars with selected separator
    str = str
      .replace(/[^a-zA-Z0-9]+/g, separator)
      .replace(new RegExp(`^\\${separator}+|\\${separator}+$`, "g"), "");

    return str;
  }, [inputTitle, separator, lowercase, removeNumbers]);

  const handleCopy = () => {
    if (!generatedSlug) return;
    navigator.clipboard.writeText(generatedSlug);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-100 text-[#e5322d] text-xs font-bold mb-4">
          <LinkIcon className="w-3.5 h-3.5" />
          SEO Permalink Optimizer
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-3">
          URL Slug &amp; Permalink Generator
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Convert article titles, product names, and headlines into search-engine-friendly, clean URL slugs instantly.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        {/* Input */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Enter Article Title or Heading
          </label>
          <input
            type="text"
            value={inputTitle}
            onChange={(e) => setInputTitle(e.target.value)}
            placeholder="Type or paste title here..."
            className="w-full p-4 text-base font-semibold bg-slate-50 text-slate-900 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* Options */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
          <div className="flex items-center gap-4">
            <span className="font-bold text-slate-700">Separator:</span>
            <div className="flex items-center gap-2">
              <label className="flex items-center gap-1 cursor-pointer">
                <input
                  type="radio"
                  name="sep"
                  checked={separator === "-"}
                  onChange={() => setSeparator("-")}
                  className="text-red-600"
                />
                <span>Hyphen (-)</span>
              </label>
              <label className="flex items-center gap-1 cursor-pointer">
                <input
                  type="radio"
                  name="sep"
                  checked={separator === "_"}
                  onChange={() => setSeparator("_")}
                  className="text-red-600"
                />
                <span>Underscore (_)</span>
              </label>
              <label className="flex items-center gap-1 cursor-pointer">
                <input
                  type="radio"
                  name="sep"
                  checked={separator === "."}
                  onChange={() => setSeparator(".")}
                  className="text-red-600"
                />
                <span>Dot (.)</span>
              </label>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={lowercase}
                onChange={(e) => setLowercase(e.target.checked)}
                className="rounded border-slate-300 text-red-600"
              />
              <span>Force Lowercase</span>
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={removeNumbers}
                onChange={(e) => setRemoveNumbers(e.target.checked)}
                className="rounded border-slate-300 text-red-600"
              />
              <span>Strip Numbers</span>
            </label>
          </div>
        </div>

        {/* Generated Slug Output */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700">
            <span>Generated SEO URL Slug</span>
            <span className="text-[11px] text-slate-400">{generatedSlug.length} characters</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex-1 p-4 bg-slate-900 text-slate-100 font-mono text-sm sm:text-base font-bold rounded-2xl border border-slate-800 truncate selection:bg-red-500">
              {generatedSlug || "slug-output-preview"}
            </div>
            <button
              onClick={handleCopy}
              className="px-5 py-4 bg-[#e5322d] hover:bg-[#cc241f] text-white font-bold text-xs rounded-2xl shadow-xs transition-colors flex items-center gap-2 shrink-0 cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
              {copied ? "Copied!" : "Copy Slug"}
            </button>
          </div>

          <p className="text-[11px] text-slate-500 font-mono pt-1">
            Example Preview: https://yourdomain.com/blog/<span className="text-red-600 font-bold">{generatedSlug || "your-slug"}</span>
          </p>
        </div>

        {/* Privacy Note */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
          <span className="flex items-center gap-1.5 text-emerald-600 font-medium">
            <ShieldCheck className="w-4 h-4" /> 100% In-Browser String Formatting
          </span>
          <span className="text-[11px] text-slate-400">Strict URL-Safe RFC 3986 Standard</span>
        </div>
      </div>
    </div>
  );
}
