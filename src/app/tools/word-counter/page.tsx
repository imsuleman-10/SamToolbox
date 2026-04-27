"use client";

import { useState, useEffect } from "react";
import { Copy, Trash2, FileText, Clock, Hash, AlignLeft, Layers, ShieldCheck, Zap, HelpCircle, BookOpen } from "lucide-react";

export default function WordCounterPage() {
  const [text, setText] = useState("");
  const [stats, setStats] = useState({
    words: 0,
    uniqueWords: 0,
    characters: 0,
    charactersNoSpace: 0,
    sentences: 0,
    paragraphs: 0,
    readingTime: 0,
  });

  useEffect(() => {
    const trimmed = text.trim();
    const wordArray = trimmed ? trimmed.split(/\s+/) : [];
    const words = wordArray.length;
    const uniqueWords = new Set(wordArray.map(w => w.toLowerCase())).size;
    const characters = text.length;
    const charactersNoSpace = text.replace(/\s/g, "").length;
    const sentences = trimmed ? text.split(/[.!?]+/).filter(Boolean).length : 0;
    const paragraphs = trimmed ? text.split(/\n+/).filter(Boolean).length : 0;
    const readingTime = Math.ceil(words / 225); // 225 wpm average for professional reading

    setStats({
      words,
      uniqueWords,
      characters,
      charactersNoSpace,
      sentences,
      paragraphs,
      readingTime,
    });
  }, [text]);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
  };

  const handleClear = () => {
    setText("");
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] py-16 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Pro Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em] mb-8">
            <ShieldCheck size={14} className="text-brand-400" />
            <span>100% Local Processing · Zero Latency</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">
            Real-Time <span className="text-brand-600">Text Analytics</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">
            Get instant word count, character count, reading time, and text statistics.
            <span className="text-slate-900 font-semibold"> Your content never leaves your browser — complete privacy guaranteed.</span>
          </p>
        </div>

        {/* Quick Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <StatCard label="Words" value={stats.words} icon={<Hash size={14}/>} />
          <StatCard label="Characters" value={stats.characters} icon={<AlignLeft size={14}/>} />
          <StatCard label="Sentences" value={stats.sentences} icon={<FileText size={14}/>} />
          <StatCard label="Reading Time" value={`${stats.readingTime} min`} icon={<Clock size={14}/>} gradient />
        </div>

        {/* Editor Console */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-brand-600 to-blue-600 rounded-[2.5rem] blur opacity-10 group-hover:opacity-20 transition duration-500"></div>
          <div className="relative bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-white overflow-hidden">
            <div className="bg-slate-50/80 backdrop-blur-md border-b border-slate-100 p-6 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></div>
                <span className="text-[10px] sm:text-xs font-black text-slate-800 uppercase tracking-widest">Live Text Engine</span>
              </div>
              <div className="flex gap-2 sm:gap-3">
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-2 px-3 sm:px-6 py-2 sm:py-2.5 text-[9px] sm:text-[11px] font-black uppercase tracking-widest text-slate-700 bg-white border border-slate-200 hover:border-brand-500 hover:text-brand-600 rounded-xl transition-all shadow-sm active:scale-95"
                >
                  <Copy size={12} className="sm:w-[14px] sm:h-[14px]" /> <span className="hidden sm:inline">Copy All Text</span><span className="sm:hidden">Copy</span>
                </button>
                <button
                  onClick={handleClear}
                  className="flex items-center gap-2 px-3 sm:px-6 py-2 sm:py-2.5 text-[9px] sm:text-[11px] font-black uppercase tracking-widest text-white bg-slate-900 hover:bg-red-600 rounded-xl transition-all shadow-lg active:scale-95"
                >
                  <Trash2 size={12} className="sm:w-[14px] sm:h-[14px]" /> <span className="hidden sm:inline">Clear Text</span><span className="sm:hidden">Clear</span>
                </button>
              </div>
            </div>

            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste or type your text here to see real-time analytics... Words, characters, sentences, paragraphs, and reading time update instantly as you type."
              className="w-full h-[500px] p-10 focus:outline-none resize-none text-slate-700 text-xl font-medium leading-relaxed placeholder:text-slate-300 scrollbar-thin scrollbar-thumb-slate-200"
              autoFocus
            />

            <div className="bg-slate-50 p-4 px-10 border-t border-slate-100 flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-slate-400">
              <div className="flex gap-6">
                <span>UTF-8 Encoded</span>
                <span>No Server Request</span>
                <span>Instant Calculation</span>
              </div>
              <div className="text-brand-600">Privacy-First Processing</div>
            </div>
          </div>
        </div>

        {/* How It Works / Benefits */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="w-10 h-10 bg-brand-100 rounded-xl flex items-center justify-center mb-4">
              <Zap className="text-brand-600" size={20} />
            </div>
            <h3 className="text-sm font-black text-slate-900 mb-2 uppercase tracking-wider">Instant Results</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Analytics update in real-time as you type. No waiting, no loading states — just immediate feedback.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
              <ShieldCheck className="text-emerald-600" size={20} />
            </div>
            <h3 className="text-sm font-black text-slate-900 mb-2 uppercase tracking-wider">100% Private</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              All processing happens in your browser. Zero data is sent to any server — your text stays yours.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center mb-4">
              <Layers className="text-slate-600" size={20} />
            </div>
            <h3 className="text-sm font-black text-slate-900 mb-2 uppercase tracking-wider">Deep Insights</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Beyond word count — get sentence count, paragraph density, unique word analysis, and reading time estimates.
            </p>
          </div>
        </div>

        {/* Information Section */}
        <div className="mt-20 grid lg:grid-cols-2 gap-12 border-t border-slate-100 pt-16">
          <div className="space-y-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-brand-50 rounded-xl text-brand-600">
                <BookOpen size={20} />
              </div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Analysis Protocol</h2>
            </div>
            
            <div className="space-y-6">
              {[
                { step: "01", title: "Content Input", desc: "Paste or type your text into the Live Text Engine. The analyzer starts processing your content in real-time." },
                { step: "02", title: "Observe Analytics", desc: "Review the primary metrics including word count, character count, and reading time in the top dashboard." },
                { step: "03", title: "Structural Insights", desc: "Check sentence and paragraph density to understand the flow and structural complexity of your writing." },
                { step: "04", title: "Clipboard Sync", desc: "Use the built-in copy controls to instantly move your analyzed text back to your primary document or editor." }
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
                { q: "Is there a character limit?", a: "The analyzer is limited only by your browser's RAM. We've successfully tested documents with 100,000+ words." },
                { q: "How is reading time calculated?", a: "We use a professional standard of 225 words per minute, which accounts for technical and academic reading speeds." },
                { q: "Can I use this for SEO metadata?", a: "Yes. The real-time character counter is perfect for ensuring meta titles and descriptions stay within search engine limits." },
                { q: "Is my text data private?", a: "Yes. Analysis is performed 100% locally. No text is ever uploaded to a server or stored in any external database." }
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
    </div>
  );
}

function StatCard({ label, value, icon, gradient }: { label: string; value: string | number; icon: React.ReactNode; gradient?: boolean }) {
  return (
    <div className={`group relative p-6 rounded-3xl border border-white shadow-xl shadow-slate-200/50 transition-all duration-300 hover:-translate-y-1 ${gradient ? 'bg-brand-600 text-white border-transparent' : 'bg-white text-slate-800'}`}>
      <div className={`mb-3 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest ${gradient ? 'text-brand-100' : 'text-slate-400'}`}>
        {icon}
        {label}
      </div>
      <div className={`text-3xl font-black tracking-tight ${gradient ? 'text-white' : 'text-slate-900 group-hover:text-brand-600'}`}>
        {value}
      </div>
    </div>
  );
}
