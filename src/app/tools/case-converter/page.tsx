"use client";

import { useState } from "react";
import { Copy, Trash2, Type, Settings2, Zap, ShieldCheck, BookOpen, HelpCircle } from "lucide-react";

export default function CaseConverterPage() {
  const [text, setText] = useState("");

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
  };

  const handleClear = () => {
    setText("");
  };

  const convertCase = (type: string) => {
    switch (type) {
      case "uppercase":
        setText(text.toUpperCase());
        break;
      case "lowercase":
        setText(text.toLowerCase());
        break;
      case "titlecase":
        setText(
          text
            .toLowerCase()
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")
        );
        break;
      case "sentencecase":
        setText(
          text
            .toLowerCase()
            .replace(/(^\s*\w|[\.\!\?]\s*\w)/g, (c) => c.toUpperCase())
        );
        break;
      case "camelcase":
        setText(
          text
            .toLowerCase()
            .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase())
        );
        break;
      case "snakecase":
        setText(
          text
            .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
            ?.map((x) => x.toLowerCase())
            .join("_") || text
        );
        break;
    }
  };

  return (
    <>
      <div className="max-w-4xl mx-auto py-8 sm:py-12 px-4">
      <div className="text-center mb-8 sm:mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 text-slate-700 text-[10px] font-black uppercase tracking-[0.2em] mb-6 sm:mb-8 border border-slate-200">
          <Settings2 size={14} />
          <span>Text Formatting Simplified</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-slate-800 mb-4 tracking-tight">
          Smart <span className="text-slate-900">Case Converter</span>
        </h1>
        <p className="text-sm sm:text-lg md:text-xl text-slate-600 max-w-2xl mx-auto font-medium leading-relaxed">
          Transform text between uppercase, lowercase, title case, sentence case, camelCase, and snake_case in one click.
          <span className="text-slate-900 font-semibold"> Perfect for developers, writers, and content creators. All processed locally.</span>
        </p>
      </div>

      {/* Conversion Buttons */}
      <div className="flex flex-wrap gap-2 sm:gap-3 justify-center mb-8">
        <CaseButton onClick={() => convertCase("sentencecase")} label="Sentence case" />
        <CaseButton onClick={() => convertCase("lowercase")} label="lower case" />
        <CaseButton onClick={() => convertCase("uppercase")} label="UPPER CASE" />
        <CaseButton onClick={() => convertCase("titlecase")} label="Title Case" />
        <CaseButton onClick={() => convertCase("camelcase")} label="camelCase" />
        <CaseButton onClick={() => convertCase("snakecase")} label="snake_case" />
      </div>

      {/* Editor */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden mx-[-1rem] sm:mx-0">
        <div className="bg-slate-50 border-b border-slate-100 p-3 sm:p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="bg-slate-100 p-2 rounded-lg text-slate-600">
              <Type size={20} />
            </div>
            <span className="font-semibold text-slate-700 text-sm sm:text-base">Your Text</span>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <button
              onClick={handleCopy}
              disabled={!text}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-brand-600 bg-brand-50 hover:bg-brand-100 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition"
            >
              <Copy size={16} /> Copy
            </button>
            <button
              onClick={handleClear}
              disabled={!text}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition"
            >
              <Trash2 size={16} /> Clear
            </button>
          </div>
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste or type your text here, then click any case button above to transform it instantly. Works with code snippets, paragraphs, lists, and more."
          className="w-full h-64 sm:h-80 p-4 sm:p-6 focus:outline-none resize-none text-slate-700 text-base sm:text-lg font-medium bg-white"
          autoFocus
        />
      </div>

      {/* Benefits Section */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition">
          <div className="w-9 h-9 bg-brand-100 rounded-lg flex items-center justify-center mb-3">
            <Zap size={18} className="text-brand-600" />
          </div>
          <h3 className="text-sm font-black text-slate-800 mb-1.5 uppercase tracking-wide">6 Formats Instantly</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Uppercase, lowercase, title case, sentence case, camelCase, snake_case — all one click away.
          </p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition">
          <div className="w-9 h-9 bg-emerald-100 rounded-lg flex items-center justify-center mb-3">
            <ShieldCheck size={18} className="text-emerald-600" />
          </div>
          <h3 className="text-sm font-black text-slate-800 mb-1.5 uppercase tracking-wide">Completely Private</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            No data leaves your browser. Your text is never uploaded or stored anywhere.
          </p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition">
          <div className="w-9 h-9 bg-slate-100 rounded-lg flex items-center justify-center mb-3">
            <Copy size={18} className="text-slate-600" />
          </div>
          <h3 className="text-sm font-black text-slate-800 mb-1.5 uppercase tracking-wide">One-Click Copy</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Instantly copy transformed text and paste it into your code, documents, or social media.
          </p>
        </div>
      </div>
    </div>

      {/* Information Section */}
      <div className="max-w-4xl mx-auto px-4 mt-20 grid lg:grid-cols-2 gap-12 border-t border-slate-100 pt-16">
        <div className="space-y-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-brand-50 rounded-xl text-brand-600">
              <BookOpen size={20} />
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Transformation Protocol</h2>
          </div>
          
          <div className="space-y-6">
            {[
              { step: "01", title: "Text Entry", desc: "Paste or type the text you wish to transform into the editor. It supports paragraphs, code, and lists." },
              { step: "02", title: "Select Case", desc: "Choose your target format from the dashboard. Options include standard text and programming conventions." },
              { step: "03", title: "Instant Engine", desc: "The transformation logic executes immediately in your browser with zero latency or server requests." },
              { step: "04", title: "Export Result", desc: "Use the global copy control to move your reformatted text back to your primary editor or documentation." }
            ].map((item, i) => (
              <div key={i} className="flex gap-6 group">
                <span className="text-3xl font-black text-slate-100 group-hover:text-brand-100 transition-colors duration-300">{item.step}</span>
                <div className="space-y-1">
                  <h3 className="font-black text-slate-800 uppercase tracking-wide text-sm">{item.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-slate-900 rounded-xl text-white">
              <HelpCircle size={20} />
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Linguistic FAQ</h2>
          </div>

          <div className="space-y-4">
            {[
              { q: "What is camelCase?", a: "A naming convention where the first letter of each word is capitalized except for the first word, common in coding." },
              { q: "Supports special characters?", a: "Yes. Our engine preserves punctuation and numeric data while identifying word boundaries for case logic." },
              { q: "Is there a length limit?", a: "No. Since processing is 100% local, the tool can handle massive text blocks without performance degradation." },
              { q: "Privacy guarantee?", a: "Your text never leaves your browser. We utilize local state management to ensure complete data isolation." }
            ].map((faq, i) => (
              <div key={i} className="p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300">
                <h3 className="font-black text-slate-900 text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
                  {faq.q}
                </h3>
                <p className="text-slate-500 text-xs leading-relaxed font-medium">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      </div>
    </>
  );
}

function CaseButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="px-5 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl font-medium hover:border-brand-500 hover:text-brand-600 hover:shadow-sm transition"
    >
      {label}
    </button>
  );
}
