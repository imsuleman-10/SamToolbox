"use client";

import { useState, useMemo } from "react";
import { 
  Copy, Trash2, Type, Settings, Zap, 
  ShieldCheck, HelpCircle, BookOpen,
  Terminal, Activity, 
  Cpu, Check
} from "lucide-react";
import { generateSoftwareApplicationSchema } from "@/lib/structuredData";

export default function CaseConverterPage() {
  const [text, setText] = useState("");
  const [lastAction, setLastAction] = useState<string | null>(null);

  const schema = useMemo(() => generateSoftwareApplicationSchema("case-converter", "Professional text case transformation engine with 100% local processing."), []);

  const handleCopy = () => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setLastAction("copied");
    setTimeout(() => setLastAction(null), 2000);
  };

  const handleClear = () => {
    setText("");
    setLastAction("cleared");
    setTimeout(() => setLastAction(null), 2000);
  };

  const convertCase = (type: string) => {
    if (!text) return;
    let result = text;
    switch (type) {
      case "uppercase":
        result = text.toUpperCase();
        break;
      case "lowercase":
        result = text.toLowerCase();
        break;
      case "titlecase":
        result = text
          .toLowerCase()
          .split(/(\s+)/)
          .map((word) => {
            if (word.trim().length === 0) return word;
            return word.charAt(0).toUpperCase() + word.slice(1);
          })
          .join("");
        break;
      case "sentencecase":
        result = text
          .toLowerCase()
          .replace(/(^\s*\w|[\.\!\?]\s*\w)/g, (c) => c.toUpperCase());
        break;
      case "camelcase":
        result = text
          .toLowerCase()
          .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
        break;
      case "snakecase":
        result = text
          .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
          ?.map((x) => x.toLowerCase())
          .join("_") || text;
        break;
    }
    setText(result);
    setLastAction(type);
    setTimeout(() => setLastAction(null), 2000);
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
            <Activity size={14} className="animate-pulse" />
            String Transformation Engine v7.2
          </div>
          <h1 className="text-6xl md:text-[7rem] font-black text-white tracking-tighter mb-8 leading-none">
            String <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 italic">Forge.</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-3xl mx-auto font-medium leading-relaxed">
            Multi-vector case transformation. 
            <span className="text-slate-200 font-bold block mt-2">Buffer Re-Mapping. Zero Cloud Leakage. Instant Character Logic.</span>
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
                        <h3 className="text-lg font-black text-white uppercase tracking-tighter leading-none">Mapping Buffer</h3>
                        <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mt-1 italic">Ready for mutation</p>
                     </div>
                  </div>
                  <div className="flex items-center gap-3">
                     <button 
                       onClick={handleCopy}
                       disabled={!text}
                       className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 border border-white/5 disabled:opacity-20 shadow-xl"
                     >
                       {lastAction === "copied" ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />} 
                       {lastAction === "copied" ? "Copied" : "Copy"}
                     </button>
                     <button 
                       onClick={handleClear}
                       disabled={!text}
                       className="px-6 py-3 bg-rose-600/10 hover:bg-rose-600/20 text-rose-400 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 border border-rose-500/20 disabled:opacity-20 shadow-xl"
                     >
                       <Trash2 size={14} /> Purge
                     </button>
                  </div>
               </div>

               <div className="p-10">
                  <textarea 
                    value={text}
                    onChange={e => setText(e.target.value)}
                    className="w-full h-[500px] bg-black/40 border border-white/5 rounded-[2.5rem] p-10 text-white font-medium leading-relaxed outline-none focus:border-blue-500/30 transition-all resize-none custom-scrollbar"
                    placeholder="INJECT TEXT STREAM FOR MUTATION..."
                  />
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-10">
                     {[
                       { id: "uppercase", label: "UPPERCASE", icon: <Type size={16} /> },
                       { id: "lowercase", label: "lowercase", icon: <Type size={16} /> },
                       { id: "titlecase", label: "Title Case", icon: <Type size={16} /> },
                       { id: "sentencecase", label: "Sentence case", icon: <Type size={16} /> },
                       { id: "camelcase", label: "camelCase", icon: <Type size={16} /> },
                       { id: "snakecase", label: "snake_case", icon: <Type size={16} /> }
                     ].map(opt => (
                       <button
                         key={opt.id}
                         onClick={() => convertCase(opt.id)}
                         className={`p-6 rounded-[1.5rem] border transition-all text-left group relative overflow-hidden ${lastAction === opt.id ? "bg-blue-600 border-blue-500 shadow-xl" : "bg-white/5 border-white/5 hover:border-blue-500/20"}`}
                       >
                          <div className={`text-[10px] font-black uppercase tracking-[0.2em] mb-2 ${lastAction === opt.id ? "text-white" : "text-slate-500 group-hover:text-blue-400"}`}>
                             {opt.label}
                          </div>
                          <div className={`text-[9px] font-bold uppercase tracking-widest ${lastAction === opt.id ? "text-blue-100" : "text-slate-700"}`}>Execute Vector</div>
                          {lastAction === opt.id && <Zap size={40} className="absolute -right-4 -bottom-4 text-white/10 rotate-12" />}
                       </button>
                     ))}
                  </div>
               </div>
            </div>
          </div>

          {/* Action Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-[#0f172a] p-10 rounded-[3.5rem] border border-white/5 shadow-3xl shadow-black relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-full blur-3xl" />
               <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-2xl text-blue-400">
                    <Settings size={24} />
                  </div>
                  <h3 className="text-xl font-black text-white uppercase tracking-tighter">Engine</h3>
               </div>
               <div className="space-y-6">
                  <div className="flex items-center justify-between text-sm">
                     <span className="text-slate-500 font-bold">Transformation</span>
                     <span className="text-white font-black uppercase tracking-widest text-[10px]">Case-Native</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                     <span className="text-slate-500 font-bold">Latency</span>
                     <span className="text-white font-black uppercase tracking-widest text-[10px]">Zero</span>
                  </div>
                  <div className="flex items-center gap-3 text-[9px] font-black text-blue-500 uppercase tracking-[0.4em] pt-4 border-t border-white/5">
                     <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                     Forge Active
                  </div>
               </div>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-10 rounded-[3.5rem] text-white relative overflow-hidden shadow-3xl border border-blue-500/20">
               <ShieldCheck size={120} className="absolute -bottom-10 -right-10 opacity-10 group-hover:rotate-12 transition-transform duration-1000" />
               <h3 className="text-2xl font-black mb-4 uppercase tracking-tighter italic">Vault Secure</h3>
               <p className="text-blue-100 font-medium text-sm leading-relaxed">
                  Every character mutation occurs strictly within your browser's local memory space. Your strings are never stored or transmitted.
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
                  <h2 className="text-4xl font-black text-white uppercase tracking-tight leading-none italic">Forge <span className="text-blue-400">FAQ</span></h2>
                  <p className="text-slate-500 font-bold text-[10px] uppercase tracking-widest mt-2">String Queries</p>
                </div>
              </div>

              <div className="space-y-6">
                {[
                  { q: "Is Title Case accurate?", a: "Affirmative. Our engine maps standard capitalization rules while preserving delimiters and whitespace buffers." },
                  { q: "Code refactoring support?", a: "The Forge supports camelCase and snake_case transformations, optimized for variable and function naming conventions." },
                  { q: "Execution bottlenecks?", a: "None. Since processing is 100% local, even extremely large text buffers (100k+ characters) are mutated in real-time." }
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
                    For professional documentation, use 'Sentence Case' for 
                    narratives and 'snake_case' for database schemas.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-12">
                     <div className="space-y-4">
                        <div className="text-4xl font-black text-white tracking-tighter">0-LOG</div>
                        <div className="text-[10px] font-bold text-blue-400 uppercase tracking-[0.3em]">Privacy Index</div>
                     </div>
                     <div className="space-y-4">
                        <div className="text-4xl font-black text-white tracking-tighter">RAW</div>
                        <div className="text-[10px] font-bold text-blue-400 uppercase tracking-[0.3em]">Pure Logic</div>
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
