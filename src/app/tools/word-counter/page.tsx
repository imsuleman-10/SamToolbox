"use client";

import { useState, useMemo } from "react";
import { Copy, Trash2, FileText, Clock, Hash, AlignLeft, ShieldCheck, Check } from "lucide-react";

export default function WordCounterPage() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);

  const stats = useMemo(() => {
    const trimmed = text.trim();
    const wordsArray = trimmed ? trimmed.split(/\s+/) : [];
    const words = wordsArray.length;
    const characters = text.length;
    const charactersNoSpace = text.replace(/\s/g, "").length;
    const sentences = trimmed ? text.split(/[.!?]+/).filter(Boolean).length : 0;
    const paragraphs = trimmed ? text.split(/\n+/).filter(Boolean).length : 0;
    const readingTimeMin = Math.ceil(words / 200);
    const speakingTimeMin = Math.ceil(words / 130);

    return {
      words,
      characters,
      charactersNoSpace,
      sentences,
      paragraphs,
      readingTimeMin,
      speakingTimeMin,
    };
  }, [text]);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-100 text-[#e5322d] text-xs font-bold mb-4">
          <FileText className="w-3.5 h-3.5" />
          Text Analysis Standard
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-3">
          Word & Character Counter
        </h1>
        <p className="text-slate-600 text-sm leading-relaxed">
          Real-time text analyzer measuring words, characters without spaces, paragraphs, reading speed, and speaking duration.
        </p>
      </div>

      {/* Stats Counter Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm text-center">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Words</span>
          <div className="text-3xl font-black text-[#e5322d] mt-1">{stats.words}</div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm text-center">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Characters</span>
          <div className="text-3xl font-black text-slate-900 mt-1">{stats.characters}</div>
          <span className="text-[10px] text-slate-500">({stats.charactersNoSpace} no spaces)</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm text-center">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Sentences</span>
          <div className="text-3xl font-black text-slate-900 mt-1">{stats.sentences}</div>
          <span className="text-[10px] text-slate-500">({stats.paragraphs} paragraphs)</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm text-center">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Reading Time</span>
          <div className="text-3xl font-black text-emerald-600 mt-1">{stats.readingTimeMin} min</div>
          <span className="text-[10px] text-slate-500">~{stats.speakingTimeMin} min speaking</span>
        </div>
      </div>

      {/* Editor Box */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Enter / Paste Text</label>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setText("")}
              className="text-xs text-slate-400 hover:text-red-500 flex items-center gap-1 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" /> Clear
            </button>
            <button
              onClick={handleCopy}
              className="px-3 py-1 bg-red-50 text-[#e5322d] rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer"
            >
              {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              {copied ? "Copied" : "Copy Text"}
            </button>
          </div>
        </div>

        <textarea
          rows={12}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Start typing or paste your text here (assignments, essays, articles, or social media posts)..."
          className="w-full p-4 text-sm bg-slate-50 border border-slate-200 rounded-2xl leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#e5322d]"
        />
      </div>
    </div>
  );
}
