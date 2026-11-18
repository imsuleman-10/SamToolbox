"use client";

import { useState, useMemo } from "react";
import {
  Code,
  Check,
  Copy,
  Trash2,
  AlertCircle,
  ShieldCheck,
  Sparkles,
  BookOpen,
} from "lucide-react";

const COMMON_PATTERNS = [
  { name: "Email Address", pattern: "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}" },
  { name: "URL / Link", pattern: "https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)" },
  { name: "IPv4 Address", pattern: "\\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\b" },
  { name: "Phone Number (Intl)", pattern: "\\+?[0-9]{1,4}?[-.\\s]?\\(?\\d{1,3}?\\)?[-.\\s]?\\d{1,4}[-.\\s]?\\d{1,4}[-.\\s]?\\d{1,9}" },
  { name: "Hex Color Code", pattern: "#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})" },
];

export default function RegexTesterPage() {
  const [pattern, setPattern] = useState<string>("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}");
  const [flags, setFlags] = useState<{ g: boolean; i: boolean; m: boolean; s: boolean }>({
    g: true,
    i: true,
    m: false,
    s: false,
  });
  const [testText, setTestText] = useState<string>(
    "Contact our engineering team at support@samtoolbox.com or billing@yourdomain.org for enterprise inquiries."
  );

  const activeFlagsString = Object.entries(flags)
    .filter(([_, active]) => active)
    .map(([flag]) => flag)
    .join("");

  const matchResults = useMemo(() => {
    if (!pattern || !testText) return { matches: [], error: null };
    try {
      const regex = new RegExp(pattern, activeFlagsString);
      const matches: Array<{ text: string; index: number }> = [];

      if (flags.g) {
        let match;
        while ((match = regex.exec(testText)) !== null) {
          matches.push({ text: match[0], index: match.index });
          if (match.index === regex.lastIndex) regex.lastIndex++; // avoid infinite loops
        }
      } else {
        const match = regex.exec(testText);
        if (match) matches.push({ text: match[0], index: match.index });
      }

      return { matches, error: null };
    } catch (err: any) {
      return { matches: [], error: err.message };
    }
  }, [pattern, activeFlagsString, testText, flags.g]);

  const toggleFlag = (flag: "g" | "i" | "m" | "s") => {
    setFlags((prev) => ({ ...prev, [flag]: !prev[flag] }));
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-100 text-[#e5322d] text-xs font-bold mb-4">
          <Code className="w-3.5 h-3.5" />
          JavaScript RegExp Debugger
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-3">
          Online Regular Expression (RegEx) Tester
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Test and debug regular expressions with real-time match highlighting, flag toggles, and pre-built patterns. 100% private in-browser evaluation.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        {/* Pattern Input & Flags Bar */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700">
            <span>Regular Expression Pattern</span>
            <div className="flex items-center gap-2">
              <span className="text-slate-400 font-semibold mr-1">Flags:</span>
              {(["g", "i", "m", "s"] as const).map((flag) => (
                <button
                  key={flag}
                  type="button"
                  onClick={() => toggleFlag(flag)}
                  className={`px-2 py-0.5 rounded font-mono text-xs font-bold cursor-pointer transition-colors ${
                    flags[flag]
                      ? "bg-red-600 text-white"
                      : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                  }`}
                  title={`Toggle ${flag} flag`}
                >
                  {flag}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 focus-within:ring-2 focus-within:ring-red-500 focus-within:border-red-500 font-mono text-sm">
            <span className="text-slate-400 font-bold select-none">/</span>
            <input
              type="text"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              placeholder="e.g. [a-zA-Z0-9._%+-]+@..."
              className="flex-1 bg-transparent text-slate-900 focus:outline-none"
              spellCheck={false}
            />
            <span className="text-slate-400 font-bold select-none">/{activeFlagsString}</span>
          </div>

          {matchResults.error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              <span>Regex Syntax Error: {matchResults.error}</span>
            </div>
          )}
        </div>

        {/* Common Patterns Quick Bar */}
        <div className="flex flex-wrap items-center gap-2 pt-1 pb-2 border-b border-slate-100 text-xs">
          <span className="text-slate-400 font-bold flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5" /> Presets:
          </span>
          {COMMON_PATTERNS.map((p) => (
            <button
              key={p.name}
              type="button"
              onClick={() => setPattern(p.pattern)}
              className="px-2.5 py-1 bg-slate-50 hover:bg-red-50 border border-slate-200 hover:border-red-200 text-slate-700 hover:text-red-600 rounded-lg text-[11px] font-medium transition-colors cursor-pointer"
            >
              {p.name}
            </button>
          ))}
        </div>

        {/* Test Text Input */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700">
            <span>Test Text String</span>
            <span className="text-[11px] text-emerald-600 font-semibold">
              {matchResults.matches.length} Match{matchResults.matches.length === 1 ? "" : "es"} Found
            </span>
          </div>
          <textarea
            value={testText}
            onChange={(e) => setTestText(e.target.value)}
            placeholder="Type or paste text string to test regex against..."
            className="w-full h-44 p-4 font-mono text-xs sm:text-sm bg-slate-50 text-slate-900 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500 leading-relaxed resize-y"
            spellCheck={false}
          />
        </div>

        {/* Matches Chips List */}
        {matchResults.matches.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Captured Matches</h4>
            <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto p-3 bg-slate-50 rounded-2xl border border-slate-200">
              {matchResults.matches.map((m, idx) => (
                <div
                  key={idx}
                  className="px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-xs font-mono text-slate-800 flex items-center gap-2 shadow-2xs"
                >
                  <span className="font-bold text-red-600">#{idx + 1}</span>
                  <span className="font-bold bg-amber-50 text-amber-900 px-1 rounded">{m.text}</span>
                  <span className="text-[10px] text-slate-400">(pos: {m.index})</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Privacy Note */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
          <span className="flex items-center gap-1.5 text-emerald-600 font-medium">
            <ShieldCheck className="w-4 h-4" /> 100% In-Browser JavaScript RegExp Engine
          </span>
          <span className="text-[11px] text-slate-400">ECMA-262 Standard Compliant</span>
        </div>
      </div>
    </div>
  );
}
