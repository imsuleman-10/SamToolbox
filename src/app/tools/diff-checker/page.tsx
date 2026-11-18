"use client";

import { useState, useMemo } from "react";
import {
  GitCompare,
  Copy,
  Check,
  Trash2,
  ShieldCheck,
  Split,
  FileText,
  Sparkles,
} from "lucide-react";

export default function DiffCheckerPage() {
  const [originalText, setOriginalText] = useState<string>(
    `function calculateTax(salary) {\n  let rate = 0.15;\n  let deduction = 1000;\n  return (salary * rate) - deduction;\n}`
  );
  const [modifiedText, setModifiedText] = useState<string>(
    `function calculateTax(salary, country = "PK") {\n  let rate = 0.18;\n  let deduction = 1200;\n  let bonus = 500;\n  return (salary * rate) - deduction + bonus;\n}`
  );
  const [view, setView] = useState<"split" | "unified">("split");

  // Simple line-by-line diff algorithm
  const diffLines = useMemo(() => {
    const orig = originalText.split("\n");
    const mod = modifiedText.split("\n");
    const maxLen = Math.max(orig.length, mod.length);
    const result = [];

    for (let i = 0; i < maxLen; i++) {
      const origLine = orig[i] !== undefined ? orig[i] : null;
      const modLine = mod[i] !== undefined ? mod[i] : null;

      let type: "same" | "changed" | "added" | "removed" = "same";
      if (origLine === null && modLine !== null) type = "added";
      else if (origLine !== null && modLine === null) type = "removed";
      else if (origLine !== modLine) type = "changed";

      result.push({
        lineNum: i + 1,
        origLine,
        modLine,
        type,
      });
    }

    const changedCount = result.filter((r) => r.type !== "same").length;
    return { lines: result, changedCount };
  }, [originalText, modifiedText]);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-100 text-[#e5322d] text-xs font-bold mb-4">
          <GitCompare className="w-3.5 h-3.5" />
          Side-by-Side Visual Diff Engine
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-3">
          Text &amp; Code Diff Checker Online
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Compare two text blocks, code snippets, or document revisions to highlight additions, removals, and changes. 100% private in-browser comparison.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        {/* Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="inline-flex rounded-xl bg-slate-100 p-1">
              <button
                onClick={() => setView("split")}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                  view === "split" ? "bg-[#e5322d] text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Split Comparison
              </button>
              <button
                onClick={() => setView("unified")}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                  view === "unified" ? "bg-[#e5322d] text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Unified Diff
              </button>
            </div>

            <span className="text-xs font-medium text-slate-500">
              {diffLines.changedCount} difference{diffLines.changedCount === 1 ? "" : "s"} detected
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setOriginalText("");
                setModifiedText("");
              }}
              className="p-2 text-slate-400 hover:text-red-600 transition-colors"
              title="Clear all"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Input Editors */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 block">Original Text / Code (Before)</label>
            <textarea
              value={originalText}
              onChange={(e) => setOriginalText(e.target.value)}
              placeholder="Paste original text here..."
              className="w-full h-48 p-4 font-mono text-xs sm:text-sm bg-slate-50 text-slate-900 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500 leading-relaxed resize-y"
              spellCheck={false}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 block">Modified Text / Code (After)</label>
            <textarea
              value={modifiedText}
              onChange={(e) => setModifiedText(e.target.value)}
              placeholder="Paste modified text here..."
              className="w-full h-48 p-4 font-mono text-xs sm:text-sm bg-slate-50 text-slate-900 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500 leading-relaxed resize-y"
              spellCheck={false}
            />
          </div>
        </div>

        {/* Diff Output Display */}
        <div className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-950 font-mono text-xs">
          <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 flex items-center justify-between text-slate-400 text-[11px]">
            <span>Line-by-Line Visual Comparison</span>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-500" /> Additions
              </span>
              <span className="flex items-center gap-1 text-red-400">
                <span className="w-2 h-2 rounded-full bg-red-500" /> Modifications
              </span>
            </div>
          </div>

          <div className="max-h-96 overflow-y-auto divide-y divide-slate-900">
            {diffLines.lines.map((item) => (
              <div
                key={item.lineNum}
                className={`grid ${
                  view === "split" ? "grid-cols-2" : "grid-cols-1"
                } text-[12px] leading-relaxed transition-colors ${
                  item.type === "changed"
                    ? "bg-amber-950/30"
                    : item.type === "added"
                    ? "bg-emerald-950/30"
                    : item.type === "removed"
                    ? "bg-red-950/30"
                    : "hover:bg-slate-900/50"
                }`}
              >
                {/* Left (Original) */}
                {(view === "split" || item.origLine !== null) && (
                  <div
                    className={`p-2 pl-4 flex gap-3 ${
                      view === "split" ? "border-r border-slate-800" : ""
                    } ${item.type === "removed" || item.type === "changed" ? "text-red-300" : "text-slate-400"}`}
                  >
                    <span className="text-slate-600 select-none w-6 text-right shrink-0">{item.lineNum}</span>
                    <span className="whitespace-pre-wrap truncate">{item.origLine ?? ""}</span>
                  </div>
                )}

                {/* Right (Modified) */}
                {(view === "split" || item.modLine !== null) && (
                  <div
                    className={`p-2 pl-4 flex gap-3 ${
                      item.type === "added" || item.type === "changed" ? "text-emerald-300" : "text-slate-400"
                    }`}
                  >
                    <span className="text-slate-600 select-none w-6 text-right shrink-0">{item.lineNum}</span>
                    <span className="whitespace-pre-wrap truncate">{item.modLine ?? ""}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Privacy Note */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
          <span className="flex items-center gap-1.5 text-emerald-600 font-medium">
            <ShieldCheck className="w-4 h-4" /> 100% In-Browser Diffing (Zero Server Logging)
          </span>
          <span className="text-[11px] text-slate-400">Confidential Legal &amp; Source Code Safe</span>
        </div>
      </div>
    </div>
  );
}
