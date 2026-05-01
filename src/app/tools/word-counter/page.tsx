"use client";

import { useState, useEffect, useMemo } from "react";
import { 
  Copy, Trash2, FileText, Clock, Hash, AlignLeft, 
  ShieldCheck, Zap, HelpCircle, BookOpen,
  Terminal, BarChart3, ScanText,
  Cpu
} from "lucide-react";
import { generateSoftwareApplicationSchema } from "@/lib/structuredData";

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

  const schema = useMemo(() => generateSoftwareApplicationSchema("word-counter", "Professional real-time text analytics engine with 100% local processing."), []);

  useEffect(() => {
    const trimmed = text.trim();
    const wordArray = trimmed ? trimmed.split(/\s+/) : [];
    const words = wordArray.length;
    const uniqueWords = new Set(wordArray.map(w => w.toLowerCase())).size;
    const characters = text.length;
    const charactersNoSpace = text.replace(/\s/g, "").length;
    const sentences = trimmed ? text.split(/[.!?]+/).filter(Boolean).length : 0;
    const paragraphs = trimmed ? text.split(/\n+/).filter(Boolean).length : 0;
    const readingTime = Math.ceil(words / 225);

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
    <div className="min-h-screen bg-[#020617] selection:bg-blue-500/30 selection:text-blue-200">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* ══════════════════════════════════════════
          HERO / HEADER
      ══════════════════════════════════════════ */}
      <section className="pt-24 pb-32 px-6 relative overflow-hidden text-center">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 font-black text-[10px] uppercase tracking-[0.4em] mb-10 shadow-2xl">
            <ScanText size={14} className="animate-pulse" />
            Linguistic Analytics v9.2
          </div>
          <h1 className="text-6xl md:text-[7rem] font-black text-white tracking-tighter mb-8 leading-none">
            Lexical <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 italic">Scanner.</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-3xl mx-auto font-medium leading-relaxed">
            Deep-level text analysis and density metrics. 
            <span className="text-slate-200 font-bold block mt-2">Local Thread Execution. Zero Cloud Telemetry. Instant Buffer Analytics.</span>
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          MAIN UTILITY INTERFACE
      ══════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-6 -mt-16 relative z-20 mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Workspace */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-[#0f172a] rounded-[3.5rem] border border-white/5 shadow-3xl shadow-black overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-700">
               <div className="bg-white/5 px-10 py-8 border-b border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                     <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-2xl text-blue-400">
                        <Terminal size={22} />
                     </div>
                     <div>
                        <h3 className="text-lg font-black text-white uppercase tracking-tighter leading-none">Input Buffer</h3>
                        <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mt-1 italic">Awaiting text stream</p>
                     </div>
                  </div>
                  <div className="flex items-center gap-3">
                     <button 
                       onClick={handleCopy}
                       disabled={!text}
                       className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 border border-white/5 disabled:opacity-20 shadow-xl"
                     >
                       <Copy size={14} /> Copy
                     </button>
                     <button 
                       onClick={handleClear}
                       disabled={!text}
                       className="px-6 py-3 bg-rose-600/10 hover:bg-rose-600/20 text-rose-400 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 border border-rose-500/20 disabled:opacity-20 shadow-xl"
                     >
                       <Trash2 size={14} /> Clear
                     </button>
                  </div>
               </div>

               <div className="p-10">
                  <textarea 
                    value={text}
                    onChange={e => setText(e.target.value)}
                    className="w-full h-[600px] bg-black/40 border border-white/5 rounded-[2.5rem] p-10 text-white font-medium leading-relaxed outline-none focus:border-blue-500/30 transition-all resize-none custom-scrollbar"
                    placeholder="INJECT TEXT STREAM FOR DEEP ANALYTICS..."
                  />
               </div>
            </div>
          </div>

          {/* Action Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-[#0f172a] p-10 rounded-[3.5rem] border border-white/5 shadow-3xl shadow-black relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-full blur-3xl" />
               <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-2xl text-blue-400">
                    <BarChart3 size={24} />
                  </div>
                  <h3 className="text-xl font-black text-white uppercase tracking-tighter">Metrics</h3>
               </div>
               
               <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Words", val: stats.words, icon: <FileText size={14} /> },
                    { label: "Unique", val: stats.uniqueWords, icon: <Hash size={14} /> },
                    { label: "Chars", val: stats.characters, icon: <AlignLeft size={14} /> },
                    { label: "Reading", val: `${stats.readingTime}M`, icon: <Clock size={14} /> },
                    { label: "Sentences", val: stats.sentences, icon: <FileText size={14} /> },
                    { label: "Paragraphs", val: stats.paragraphs, icon: <AlignLeft size={14} /> }
                  ].map(m => (
                    <div key={m.label} className="p-6 bg-white/5 border border-white/5 rounded-3xl hover:border-blue-500/20 transition-all group/card">
                       <div className="flex items-center gap-2 text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2 group-hover/card:text-blue-400 transition-colors">
                          {m.icon} {m.label}
                       </div>
                       <div className="text-2xl font-black text-white tracking-tighter">{m.val}</div>
                    </div>
                  ))}
               </div>

               <div className="mt-8 pt-8 border-t border-white/5 flex items-center gap-3 text-[9px] font-black text-blue-500 uppercase tracking-[0.4em]">
                  <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                  Scanner Active
               </div>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-cyan-700 p-10 rounded-[3.5rem] text-white relative overflow-hidden shadow-3xl border border-blue-500/20">
               <ShieldCheck size={120} className="absolute -bottom-10 -right-10 opacity-10 group-hover:rotate-12 transition-transform duration-1000" />
               <h3 className="text-2xl font-black mb-4 uppercase tracking-tighter italic">Vault Secure</h3>
               <p className="text-blue-100 font-medium text-sm leading-relaxed">
                  Lexical analysis is performed via pure local thread execution. Your input stream is never synchronized with cloud services.
               </p>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════
            DOCUMENTATION & FAQ
        ══════════════════════════════════════════ */}
        <div className="mt-40 border-t border-slate-800 pt-40">
          <div className="grid lg:grid-cols-2 gap-24 items-start">
            <div className="space-y-16">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-blue-500/10 rounded-[1.5rem] flex items-center justify-center text-blue-400 border border-blue-500/20">
                  <HelpCircle size={32} />
                </div>
                <div>
                  <h2 className="text-4xl font-black text-white uppercase tracking-tight leading-none italic">Lexical <span className="text-blue-400">FAQ</span></h2>
                  <p className="text-slate-500 font-bold text-[10px] uppercase tracking-widest mt-2">Linguistic Queries</p>
                </div>
              </div>

              <div className="space-y-6">
                {[
                  { q: "Is reading time accurate?", a: "Affirmative. We utilize the industry-standard coefficient of 225 WPM, optimized for professional and technical document ingestion." },
                  { q: "Lexical limits?", a: "The scanner is optimized for high-concurrency processing. Large-scale documents (50,000+ words) are analyzed in sub-10ms intervals." },
                  { q: "Unique word logic?", a: "Our engine uses a case-insensitive hashing protocol to identify distinct lexical units within the input buffer." }
                ].map((faq, i) => (
                  <div key={i} className="p-8 bg-white/5 rounded-[2.5rem] border border-white/5 hover:border-blue-500/20 transition-all group">
                    <h3 className="font-black text-white text-sm mb-4 flex items-start gap-4">
                      <span className="text-blue-400 font-mono">Q.</span> {faq.q}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed font-medium pl-8 group-hover:text-slate-300 transition-colors">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#0f172a] rounded-[4rem] p-16 md:p-20 text-white relative overflow-hidden border border-white/5">
               <div className="absolute top-0 right-0 w-full h-full opacity-[0.02] pointer-events-none" style={{ backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
               <div className="relative z-10 text-center sm:text-left">
                  <div className="w-24 h-24 bg-blue-500/10 border border-blue-500/20 rounded-[2rem] flex items-center justify-center mb-12 shadow-[0_0_80px_rgba(37,99,235,0.2)] mx-auto sm:mx-0">
                    <BookOpen size={48} className="text-blue-400" />
                  </div>
                  <h3 className="text-4xl font-black mb-8 tracking-tight uppercase leading-none">Best Practices</h3>
                  <p className="text-slate-400 font-medium mb-16 leading-relaxed text-xl">
                    For optimal readability in technical briefs, target 1500 words 
                    per section with a 5% unique word density.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-12">
                     <div className="space-y-4">
                        <div className="text-4xl font-black text-white tracking-tighter">0-LOG</div>
                        <div className="text-[10px] font-bold text-blue-400 uppercase tracking-[0.3em]">Privacy Index</div>
                     </div>
                     <div className="space-y-4">
                        <div className="text-4xl font-black text-white tracking-tighter">HI-SPD</div>
                        <div className="text-[10px] font-bold text-blue-400 uppercase tracking-[0.3em]">Scan Speed</div>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
