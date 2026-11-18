"use client";

import { useState, useMemo } from "react";
import {
  FileText,
  Copy,
  Check,
  RefreshCw,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const LOREM_WORDS = [
  "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
  "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore",
  "magna", "aliqua", "ut", "enim", "ad", "minim", "veniam", "quis", "nostrud",
  "exercitation", "ullamco", "laboris", "nisi", "ut", "aliquip", "ex", "ea",
  "commodo", "consequat", "duis", "aute", "irure", "in", "reprehenderit", "in",
  "voluptate", "velit", "esse", "cillum", "dolore", "eu", "fugiat", "nulla",
  "pariatur", "excepteur", "sint", "occaecat", "cupidatat", "non", "proident",
  "sunt", "in", "culpa", "qui", "officia", "deserunt", "mollit", "anim", "id",
  "est", "laborum", "curabitur", "pretium", "tincidunt", "lacus", "nulla",
  "gravida", "orci", "a", "odio", "nullam", "varius", "turpis", "et", "commodo"
];

export default function LoremIpsumGeneratorPage() {
  const [count, setCount] = useState<number>(3);
  const [type, setType] = useState<"paragraphs" | "sentences" | "words">("paragraphs");
  const [startWithLorem, setStartWithLorem] = useState<boolean>(true);
  const [wrapWithHtml, setWrapWithHtml] = useState<boolean>(false);
  const [copied, setCopied] = useState(false);

  const generatedText = useMemo(() => {
    let result = "";

    const generateSentence = () => {
      const len = Math.floor(Math.random() * 8) + 8; // 8 to 15 words
      const words = [];
      for (let i = 0; i < len; i++) {
        words.push(LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)]);
      }
      const str = words.join(" ");
      return str.charAt(0).toUpperCase() + str.slice(1) + ".";
    };

    const generateParagraph = (isFirst: boolean) => {
      const sentenceCount = Math.floor(Math.random() * 3) + 4; // 4 to 6 sentences
      const sentences = [];
      for (let i = 0; i < sentenceCount; i++) {
        sentences.push(generateSentence());
      }
      let para = sentences.join(" ");
      if (isFirst && startWithLorem) {
        para = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. " + para;
      }
      return wrapWithHtml ? `<p>${para}</p>` : para;
    };

    if (type === "words") {
      const words = [];
      if (startWithLorem && count >= 5) {
        words.push("Lorem", "ipsum", "dolor", "sit", "amet");
      }
      while (words.length < count) {
        words.push(LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)]);
      }
      result = words.slice(0, count).join(" ");
    } else if (type === "sentences") {
      const sentences = [];
      for (let i = 0; i < count; i++) {
        sentences.push(generateSentence());
      }
      result = sentences.join(" ");
      if (startWithLorem) {
        result = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. " + result;
      }
    } else {
      const paras = [];
      for (let i = 0; i < count; i++) {
        paras.push(generateParagraph(i === 0));
      }
      result = paras.join(wrapWithHtml ? "\n\n" : "\n\n");
    }

    return result;
  }, [count, type, startWithLorem, wrapWithHtml]);

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-100 text-[#e5322d] text-xs font-bold mb-4">
          <FileText className="w-3.5 h-3.5" />
          Dummy Content Generator
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-3">
          Lorem Ipsum &amp; Placeholder Text Generator
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Generate classic dummy text for web mockups, wireframes, typography testing, and design layouts.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        {/* Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="1"
                max="50"
                value={count}
                onChange={(e) => setCount(Math.max(1, Math.min(50, parseInt(e.target.value) || 1)))}
                className="w-16 p-2 text-center text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl"
              />
              <select
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                className="p-2 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl"
              >
                <option value="paragraphs">Paragraphs</option>
                <option value="sentences">Sentences</option>
                <option value="words">Words</option>
              </select>
            </div>

            <label className="flex items-center gap-1.5 text-xs text-slate-600 cursor-pointer">
              <input
                type="checkbox"
                checked={startWithLorem}
                onChange={(e) => setStartWithLorem(e.target.checked)}
                className="rounded border-slate-300 text-red-600 focus:ring-red-500"
              />
              <span>Start with "Lorem ipsum..."</span>
            </label>

            <label className="flex items-center gap-1.5 text-xs text-slate-600 cursor-pointer">
              <input
                type="checkbox"
                checked={wrapWithHtml}
                onChange={(e) => setWrapWithHtml(e.target.checked)}
                className="rounded border-slate-300 text-red-600 focus:ring-red-500"
              />
              <span>Wrap with &lt;p&gt; tags</span>
            </label>
          </div>

          <button
            onClick={handleCopy}
            className="px-4 py-2 bg-[#e5322d] hover:bg-[#cc241f] text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? "Copied!" : "Copy Text"}
          </button>
        </div>

        {/* Text Area */}
        <textarea
          readOnly
          value={generatedText}
          className="w-full h-80 p-5 font-sans text-xs sm:text-sm text-slate-800 bg-slate-50 rounded-2xl border border-slate-200 focus:outline-none leading-relaxed resize-y selection:bg-red-500 selection:text-white"
        />

        <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
          <span className="flex items-center gap-1.5 text-emerald-600 font-medium">
            <ShieldCheck className="w-4 h-4" /> 100% In-Browser Generation
          </span>
          <span className="text-[11px] text-slate-400">
            {generatedText.split(/\s+/).filter(Boolean).length} words • {generatedText.length} characters
          </span>
        </div>
      </div>
    </div>
  );
}
