"use client";

import { useState, useMemo } from "react";
import { 
  Type, Copy, RefreshCw, Sparkles, BookOpen, 
  HelpCircle, Terminal, ShieldCheck, Zap, 
  Cpu, Activity, Check 
} from "lucide-react";
import { generateSoftwareApplicationSchema } from "@/lib/structuredData";

const UNICODE_FONTS = [
  {
    name: "Industrial Bold",
    map: {
      a: "𝐚", b: "𝐛", c: "𝐜", d: "𝐝", e: "𝐞", f: "𝐟", g: "𝐠", h: "𝐡", i: "𝐢", j: "𝐣", k: "𝐤", l: "𝐥", m: "𝐦", n: "𝐧", o: "𝐨", p: "𝐩", q: "𝐪", r: "𝐫", s: "𝐬", t: "𝐭", u: "𝐮", v: "𝐯", w: "𝐰", x: "𝐱", y: "𝐲", z: "𝐳",
      A: "𝐀", B: "𝐁", C: "𝐂", D: "𝐃", E: "𝐄", F: "𝐅", G: "𝐆", H: "𝐇", I: "𝐈", J: "𝐉", K: "𝐊", L: "𝐋", M: "𝐌", N: "𝐍", O: "𝐎", P: "𝐏", Q: "𝐐", R: "𝐑", S: "𝐒", T: "𝐓", U: "𝐔", V: "𝐕", W: "𝐖", X: "𝐗", Y: "𝐘", Z: "𝐙",
      0: "𝟎", 1: "𝟏", 2: "𝟐", 3: "𝟑", 4: "𝟒", 5: "𝟟", 6: "𝟔", 7: "𝟕", 8: "𝟖", 9: "𝟗"
    }
  },
  {
    name: "Vector Italic",
    map: {
      a: "𝑎", b: "𝑏", c: "𝑐", d: "𝑑", e: "𝑒", f: "𝑓", g: "𝑔", h: "ℎ", i: "𝑖", j: "𝑗", k: "𝑘", l: "𝑙", m: "𝑚", n: "𝑛", o: "𝑜", p: "𝑝", q: "𝑞", r: "𝑟", s: "𝑠", t: "𝑡", u: "𝑢", v: "𝑣", w: "𝑤", x: "𝑥", y: "𝑦", z: "𝑧",
      A: "𝐴", B: "𝐵", C: "𝐶", D: "𝐷", E: "𝐸", F: "𝐹", G: "𝐺", H: "𝐻", I: "𝐼", J: "𝐽", K: "𝐾", L: "𝐿", M: "𝑀", N: "𝑁", O: "𝑂", P: "𝑃", Q: "𝑄", R: "𝑅", S: "𝑆", T: "𝑇", U: "𝑈", V: "𝑉", W: "𝑊", X: "𝑋", Y: "𝑌", Z: "𝑍"
    }
  },
  {
    name: "Cyber Script",
    map: {
      a: "𝒂", b: "𝒃", c: "𝒄", d: "𝒅", e: "𝒆", f: "𝒇", g: "𝒈", h: "𝒉", i: "𝒊", j: "𝒋", k: "𝒌", l: "𝒍", m: "𝒎", n: "𝒏", o: "𝒐", p: "𝒑", q: "𝒒", r: "𝒓", s: "𝒔", t: "𝒕", u: "𝒖", v: "𝒗", w: "𝒘", x: "𝒙", y: "𝒚", z: "𝒛",
      A: "𝑨", B: "𝑩", C: "𝑪", D: "𝑫", E: "𝑬", F: "𝑭", G: "𝑮", H: "𝑯", I: "𝑰", J: "𝑱", K: "𝑲", L: "𝑳", M: "𝑴", N: "𝑵", O: "𝑶", P: "𝑷", Q: "𝑸", R: "𝑹", S: "𝑺", T: "𝑻", U: "𝑼", V: "𝑽", W: "𝑾", X: "𝑿", Y: "𝒀", Z: "𝒁"
    }
  },
  {
    name: "Void Monospace",
    map: {
      a: "𝚊", b: "𝚋", c: "𝚌", d: "𝚍", e: "𝚎", f: "𝚏", g: "𝚐", h: "𝚑", i: "𝚒", j: "𝚓", k: "𝚔", l: "𝚕", m: "𝚖", n: "𝚗", o: "𝚘", p: "𝚙", q: "𝚚", r: "𝚛", s: "𝚜", t: "𝚝", u: "𝚞", v: "𝚟", w: "𝚠", x: "𝚡", y: "𝚢", z: "𝚣",
      A: "𝙰", B: "𝙱", C: "𝙲", D: "𝙳", E: "𝙴", F: "𝙵", G: "𝙶", H: "𝙷", I: "𝙸", J: "𝙹", K: "𝙺", L: "𝙻", M: "𝙼", N: "𝙽", O: "𝙾", P: "𝙿", Q: "𝚀", R: "𝚁", S: "𝚂", T: "𝚃", U: "𝚄", V: "𝚅", W: "𝚆", X: "𝚇", Y: "𝚈", Z: "𝚉",
      0: "𝟶", 1: "𝟷", 2: "𝟸", 3: "𝟹", 4: "𝟺", 5: "𝟻", 6: "𝟼", 7: "𝟽", 8: "𝟾", 9: "𝟿"
    }
  },
  {
    name: "Logic Double-Struck",
    map: {
      a: "𝕒", b: "𝕓", c: "𝕔", d: "𝕕", e: "𝕖", f: "𝕗", g: "𝕘", h: "𝕙", i: "𝕚", j: "𝕛", k: "𝕜", l: "𝕝", m: "𝕞", n: "𝕟", o: "𝕠", p: "𝕡", q: "𝕢", r: "𝕣", s: "𝕤", t: "𝕥", u: "𝕦", v: "𝕧", w: "𝕨", x: "𝕩", y: "𝕪", z: "𝕫",
      A: "𝔸", B: "𝔹", C: "ℂ", D: "𝔻", E: "𝔼", F: "𝔽", G: "𝔾", H: "ℍ", I: "𝕀", J: "𝕁", K: "𝕂", L: "𝕃", M: "𝕄", N: "ℕ", O: "𝕆", P: "ℙ", Q: "ℚ", R: "ℝ", S: "𝕊", T: "𝕋", U: "𝕌", V: "𝕍", W: "𝕎", X: "𝕏", Y: "𝕐", Z: "ℤ",
      0: "𝟘", 1: "𝟙", 2: "𝟚", 3: "𝟛", 4: "𝟟", 5: "𝟝", 6: "𝟞", 7: "𝟟", 8: "𝟠", 9: "𝟡"
    }
  }
];

export default function FontGeneratorPage() {
  const [text, setText] = useState("Sovereign Node v9.0");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const applyMapping = (input: string, map: Record<string, string | undefined>) => {
    return input.split('').map(char => map[char] || char).join('');
  };

  const handleCopy = (convertedText: string, index: number) => {
    navigator.clipboard.writeText(convertedText);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const schema = useMemo(() => generateSoftwareApplicationSchema("font-generator", "Professional Unicode style architect for high-impact social and technical branding."), []);

  return (
    <div className="min-h-screen bg-[#020617] selection:bg-cyan-500/30 selection:text-cyan-200">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* ══════════════════════════════════════════
          HERO / HEADER
      ══════════════════════════════════════════ */}
      <section className="pt-24 pb-32 px-6 relative overflow-hidden text-center">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 font-black text-[10px] uppercase tracking-[0.4em] mb-10 shadow-2xl">
            <Sparkles size={14} className="animate-pulse" />
            Style Architect v4.1
          </div>
          <h1 className="text-6xl md:text-[7rem] font-black text-white tracking-tighter mb-8 leading-none">
            Unicode <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 italic">Forge.</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-3xl mx-auto font-medium leading-relaxed">
            High-impact character synthesis for digital identity. 
            <span className="text-slate-200 font-bold block mt-2">Zero Font Loading. Native Unicode Re-Mapping. Privacy-First Logic.</span>
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
               <div className="bg-white/5 px-10 py-8 border-b border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                     <div className="p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-2xl text-cyan-400">
                        <Terminal size={22} />
                     </div>
                     <div>
                        <h3 className="text-lg font-black text-white uppercase tracking-tighter leading-none">Input Buffer</h3>
                        <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mt-1 italic">Stream text for re-mapping</p>
                     </div>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/5">
                     <Activity size={14} className="text-cyan-500" />
                     <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{text.length} CHR</span>
                  </div>
               </div>

               <div className="p-10">
                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="ENTER TEXT FOR SYNTHESIS..."
                    className="w-full h-40 bg-white/[0.03] border border-white/5 rounded-[2rem] p-10 text-xl font-bold text-white outline-none focus:bg-white/[0.05] focus:border-cyan-500/30 transition-all resize-none placeholder:text-slate-800 tracking-tight"
                  />
               </div>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-1 gap-6">
               {UNICODE_FONTS.map((font, idx) => {
                 const converted = applyMapping(text, font.map);
                 return (
                   <div key={idx} className="bg-[#0f172a] p-8 rounded-[2.5rem] border border-white/5 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-8 group hover:border-cyan-500/20 transition-all">
                      <div className="flex-1 min-w-0">
                         <p className="text-[9px] font-black text-cyan-500 uppercase tracking-[0.3em] mb-4 italic opacity-50">{font.name}</p>
                         <p className="text-2xl font-bold text-white tracking-tight break-words font-mono">
                           {converted || "---"}
                         </p>
                      </div>
                      <button
                        onClick={() => handleCopy(converted, idx)}
                        className={`shrink-0 flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${copiedIndex === idx ? "bg-emerald-500 text-white shadow-[0_0_30px_rgba(16,185,129,0.4)]" : "bg-white/5 text-slate-400 hover:bg-white hover:text-slate-900 shadow-xl"}`}
                      >
                        {copiedIndex === idx ? (
                          <>
                            <Check size={16} /> Copied
                          </>
                        ) : (
                          <>
                            <Copy size={16} /> Harvest Style
                          </>
                        )}
                      </button>
                   </div>
                 );
               })}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-8">
             <div className="bg-[#0f172a] p-12 rounded-[3.5rem] border border-white/5 shadow-3xl shadow-black relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-600 rounded-full blur-[80px] opacity-10" />
                <div className="relative z-10 space-y-10">
                   <div className="flex items-center gap-4">
                      <div className="p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-2xl text-cyan-400">
                        <Cpu size={22} />
                      </div>
                      <h3 className="text-xl font-black text-white tracking-tighter uppercase italic">Synthesis Engine</h3>
                   </div>
                   <p className="text-slate-400 text-sm leading-relaxed font-medium">
                      Unicode Forge utilizes native browser character mapping to bypass external font dependencies. 
                      Perfect for:
                   </p>
                   <div className="space-y-4">
                      {["Social Branding", "Game Identities", "Professional Tagging", "System Aesthetics"].map((item, i) => (
                        <div key={i} className="flex items-center gap-3 text-[10px] font-black text-white uppercase tracking-widest italic">
                           <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full shadow-[0_0_10px_rgba(6,182,212,1)]" />
                           {item}
                        </div>
                      ))}
                   </div>
                </div>
             </div>

             <div className="p-10 bg-emerald-500/5 rounded-[3rem] border border-emerald-500/10 flex items-center gap-6">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shadow-sm">
                   <ShieldCheck size={28} />
                </div>
                <div>
                   <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest leading-none mb-1.5 italic">Zero Injection</p>
                   <p className="text-[10px] font-bold text-slate-500 leading-tight">No script injection. Safe character re-mapping.</p>
                </div>
             </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-40 border-t border-slate-800 pt-40">
           <div className="grid lg:grid-cols-2 gap-24 items-start">
              <div className="space-y-16">
                 <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-cyan-500/10 rounded-[1.5rem] flex items-center justify-center text-cyan-400 border border-cyan-500/20">
                      <HelpCircle size={32} />
                    </div>
                    <div>
                      <h2 className="text-4xl font-black text-white uppercase tracking-tight leading-none italic">Style <span className="text-cyan-400">Intel</span></h2>
                      <p className="text-slate-500 font-bold text-[10px] uppercase tracking-widest mt-2">Protocol Queries</p>
                    </div>
                 </div>

                 <div className="space-y-6">
                    {[
                      { q: "Why use Unicode styles?", a: "Unicode styles work everywhere plain text is accepted, without requiring custom font files. They are compatible with social media, messaging apps, and gaming consoles." },
                      { q: "Are these accessible?", a: "While visually distinct, screen readers may interpret these characters differently. Use sparingly for decorative purposes only." },
                      { q: "Is this secure?", a: "Yes. All transformations happen locally in your browser memory. No text is ever uploaded to our servers. Pure static logic." }
                    ].map((faq, i) => (
                      <div key={i} className="p-10 bg-white/5 rounded-[3rem] border border-white/5 hover:border-cyan-500/20 transition-all group">
                        <h3 className="font-black text-white text-sm mb-6 flex items-start gap-4">
                          <span className="text-cyan-400 font-mono italic">Q.</span> {faq.q}
                        </h3>
                        <p className="text-slate-400 text-sm leading-relaxed font-medium pl-8 group-hover:text-slate-300 transition-colors">{faq.a}</p>
                      </div>
                    ))}
                 </div>
              </div>

              <div className="bg-[#0f172a] rounded-[4.5rem] p-16 md:p-24 text-white relative overflow-hidden border border-white/5">
                 <div className="absolute top-0 right-0 w-full h-full opacity-[0.03] pointer-events-none" style={{ backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
                 <div className="relative z-10 text-center sm:text-left">
                    <div className="w-24 h-24 bg-cyan-500/10 border border-cyan-500/20 rounded-[2.5rem] flex items-center justify-center mb-12 shadow-[0_0_80px_rgba(6,182,212,0.2)] mx-auto sm:mx-0">
                      <Sparkles size={48} className="text-cyan-400" />
                    </div>
                    <h3 className="text-4xl font-black mb-10 tracking-tight uppercase leading-[0.9] italic">Native <span className="text-cyan-400">Identity.</span></h3>
                    <p className="text-slate-400 font-medium mb-16 leading-relaxed text-xl">
                       Unicode Forge operates on a strictly local delivery model. 
                       No trackers, no font payloads, no data harvesting. 
                       Your identity, hardened.
                    </p>
                    
                    <div className="grid grid-cols-2 gap-12">
                       <div className="space-y-4">
                          <div className="text-4xl font-black text-white tracking-tighter italic">NATIVE</div>
                          <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-[0.3em]">Unicode Logic</div>
                       </div>
                       <div className="space-y-4">
                          <div className="text-4xl font-black text-white tracking-tighter italic">ZERO-LOAD</div>
                          <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-[0.3em]">No External Fonts</div>
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
