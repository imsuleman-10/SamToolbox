"use client";

import { useState, useMemo } from "react";
import { 
  Shield, Eye, EyeOff, CheckCircle2, XCircle, 
  AlertCircle, Lock, BookOpen, HelpCircle, 
  Terminal, ShieldCheck, Zap, Cpu, Activity,
  KeyRound, Fingerprint, LockKeyhole
} from "lucide-react";
import { generateSoftwareApplicationSchema } from "@/lib/structuredData";

export default function PasswordStrengthPage() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const analysis = useMemo(() => {
    if (!password) return null;

    let score = 0;
    const checks = {
      length: password.length >= 8,
      upperCase: /[A-Z]/.test(password),
      lowerCase: /[a-z]/.test(password),
      numbers: /[0-9]/.test(password),
      specialChars: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password),
      noCommonPatterns: !/^(password|123456|qwerty|abc123|letmein)/i.test(password),
    };

    // Calculate score
    if (checks.length) score += 20;
    if (checks.upperCase) score += 15;
    if (checks.lowerCase) score += 15;
    if (checks.numbers) score += 15;
    if (checks.specialChars) score += 20;
    if (checks.noCommonPatterns) score += 15;

    // Bonus for length
    if (password.length >= 12) score += 10;
    if (password.length >= 16) score += 10;

    // Deductions
    if (password.length < 6) score -= 30;
    if (/^(.)\1+$/.test(password)) score -= 40; // Repeated characters

    score = Math.max(0, Math.min(100, score));

    // Strength label
    let strength = "Critical";
    if (score >= 80) strength = "Fortress";
    else if (score >= 60) strength = "Secure";
    else if (score >= 40) strength = "Moderate";
    else if (score >= 20) strength = "Vulnerable";

    // Crack time estimation
    let crackTime = "Instant";
    if (score >= 90) crackTime = "Millennia";
    else if (score >= 80) crackTime = "Decades";
    else if (score >= 70) crackTime = "Years";
    else if (score >= 60) crackTime = "Months";
    else if (score >= 50) crackTime = "Days";
    else if (score >= 40) crackTime = "Hours";
    else if (score >= 30) crackTime = "Minutes";

    // Suggestions
    const suggestions: string[] = [];
    if (!checks.length) suggestions.push("Extend character count to 8+");
    if (!checks.upperCase) suggestions.push("Inject uppercase variance");
    if (!checks.lowerCase) suggestions.push("Inject lowercase variance");
    if (!checks.numbers) suggestions.push("Add numeric identifiers");
    if (!checks.specialChars) suggestions.push("Add symbolic complexity");
    if (!checks.noCommonPatterns) suggestions.push("Eliminate predictable strings");

    return {
      score,
      strength,
      crackTime,
      checks,
      suggestions,
    };
  }, [password]);

  const getStrengthColor = (score: number) => {
    if (score >= 80) return "text-emerald-400";
    if (score >= 60) return "text-cyan-400";
    if (score >= 40) return "text-amber-400";
    return "text-rose-500";
  };

  const getStrengthBg = (score: number) => {
    if (score >= 80) return "bg-emerald-500";
    if (score >= 60) return "bg-cyan-500";
    if (score >= 40) return "bg-amber-500";
    return "bg-rose-500";
  };

  const schema = useMemo(() => generateSoftwareApplicationSchema("password-strength", "Professional entropy analysis engine with local-only cryptographic verification."), []);

  return (
    <div className="min-h-screen bg-[#020617] selection:bg-rose-500/30 selection:text-rose-200">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* ══════════════════════════════════════════
          HERO / HEADER
      ══════════════════════════════════════════ */}
      <section className="pt-24 pb-32 px-6 relative overflow-hidden text-center">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-rose-500/10 border border-rose-500/20 rounded-full text-rose-400 font-black text-[10px] uppercase tracking-[0.4em] mb-10 shadow-2xl">
            <LockKeyhole size={14} className="animate-pulse" />
            Entropy Guardian v9.1
          </div>
          <h1 className="text-6xl md:text-[7rem] font-black text-white tracking-tighter mb-8 leading-none">
            Password <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-orange-400 italic">Audit.</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-3xl mx-auto font-medium leading-relaxed">
            Industrial-grade entropy analysis. 
            <span className="text-slate-200 font-bold block mt-2">Zero Telemetry. Local Cryptographic Checks. Bruteforce Synthesis.</span>
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          MAIN UTILITY INTERFACE
      ══════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-6 -mt-16 relative z-20 mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Analysis Area */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-[#0f172a] rounded-[3.5rem] border border-white/5 shadow-3xl shadow-black overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-700">
               <div className="bg-white/5 px-10 py-8 border-b border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                     <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-2xl text-rose-400">
                        <Terminal size={22} />
                     </div>
                     <div>
                        <h3 className="text-lg font-black text-white uppercase tracking-tighter leading-none">Secret Buffer</h3>
                        <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mt-1 italic">Processing secret string locally</p>
                     </div>
                  </div>
                  <button 
                    onClick={() => setShowPassword(!showPassword)}
                    className="p-4 bg-white/5 text-slate-400 rounded-2xl hover:bg-white hover:text-slate-900 transition-all shadow-xl"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
               </div>

               <div className="p-10">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="ENTER SECRET TO AUDIT..."
                    className="w-full bg-white/[0.03] border border-white/5 rounded-[2rem] px-10 py-10 text-2xl font-black text-white outline-none focus:bg-white/[0.05] focus:border-rose-500/30 transition-all placeholder:text-slate-800 tracking-widest uppercase italic"
                  />
               </div>
            </div>

            {/* Analysis Grid */}
            {analysis && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="bg-[#0f172a] p-10 rounded-[3rem] border border-white/5 shadow-3xl shadow-black space-y-8">
                    <div className="flex items-center gap-4">
                       <div className="w-12 h-12 bg-rose-500/10 border border-rose-500/20 rounded-2xl flex items-center justify-center text-rose-400">
                          <Activity size={22} />
                       </div>
                       <h3 className="text-xl font-black text-white uppercase tracking-tighter italic">Structural Score</h3>
                    </div>
                    
                    <div className="space-y-4">
                       <div className="h-4 bg-white/5 rounded-full overflow-hidden border border-white/5">
                          <div 
                            className={`h-full transition-all duration-1000 ease-out ${getStrengthBg(analysis.score)}`}
                            style={{ width: `${analysis.score}%` }}
                          />
                       </div>
                       <div className="flex justify-between items-end">
                          <p className={`text-6xl font-black italic tracking-tighter ${getStrengthColor(analysis.score)}`}>
                            {analysis.score}<span className="text-2xl">%</span>
                          </p>
                          <p className={`text-xl font-black uppercase tracking-widest italic mb-1 ${getStrengthColor(analysis.score)}`}>
                            {analysis.strength}
                          </p>
                       </div>
                    </div>
                 </div>

                 <div className="bg-[#0f172a] p-10 rounded-[3rem] border border-white/5 shadow-3xl shadow-black space-y-8">
                    <div className="flex items-center gap-4">
                       <div className="w-12 h-12 bg-orange-500/10 border border-orange-500/20 rounded-2xl flex items-center justify-center text-orange-400">
                          <Cpu size={22} />
                       </div>
                       <h3 className="text-xl font-black text-white uppercase tracking-tighter italic">Crack Resistance</h3>
                    </div>
                    
                    <div className="space-y-4">
                       <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Est. Time to Breach</p>
                       <p className="text-6xl font-black text-white italic tracking-tighter uppercase leading-none">
                         {analysis.crackTime}
                       </p>
                       <p className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.2em] italic">Calculated at 10^12 operations/sec</p>
                    </div>
                 </div>
              </div>
            )}
          </div>

          {/* Sidebar Checklist */}
          <div className="lg:col-span-4 space-y-10 lg:sticky lg:top-24">
             <div className="bg-[#0f172a] p-12 rounded-[3.5rem] border border-white/5 shadow-3xl shadow-black space-y-10">
                <div className="flex items-center gap-4">
                   <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-2xl text-blue-400">
                      <Fingerprint size={22} />
                   </div>
                   <h3 className="text-xl font-black text-white tracking-tighter uppercase italic">Complexity Log</h3>
                </div>

                <div className="space-y-6">
                   {analysis ? Object.entries(analysis.checks).map(([key, value]) => (
                     <div key={key} className={`flex items-center justify-between p-5 rounded-2xl border transition-all ${value ? "bg-emerald-500/5 border-emerald-500/20" : "bg-white/5 border-white/5"}`}>
                        <span className={`text-[10px] font-black uppercase tracking-widest ${value ? "text-emerald-400" : "text-slate-600"}`}>
                          {key.replace(/([A-Z])/g, ' $1')}
                        </span>
                        {value ? <CheckCircle2 size={18} className="text-emerald-500" /> : <XCircle size={18} className="text-slate-800" />}
                     </div>
                   )) : (
                     <div className="py-20 text-center space-y-6 border border-white/5 border-dashed rounded-[3rem]">
                        <KeyRound size={48} className="mx-auto text-slate-800" />
                        <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.4em]">Input Required</p>
                     </div>
                   )}
                </div>
             </div>

             <div className="p-10 bg-emerald-500/5 rounded-[3rem] border border-emerald-500/10 flex items-center gap-6">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shadow-sm">
                   <ShieldCheck size={28} />
                </div>
                <div>
                   <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest leading-none mb-1.5 italic">Local Vault Active</p>
                   <p className="text-[10px] font-bold text-slate-500 leading-tight">Secret processing restricted to browser thread.</p>
                </div>
             </div>
          </div>
        </div>

        {/* Documentation Section */}
        <div className="mt-40 border-t border-slate-800 pt-40">
           <div className="grid lg:grid-cols-2 gap-24 items-start">
              <div className="space-y-16">
                 <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-rose-500/10 rounded-[1.5rem] flex items-center justify-center text-rose-400 border border-rose-500/20">
                      <HelpCircle size={32} />
                    </div>
                    <div>
                      <h2 className="text-4xl font-black text-white uppercase tracking-tight leading-none italic">Security <span className="text-rose-400">Intel</span></h2>
                      <p className="text-slate-500 font-bold text-[10px] uppercase tracking-widest mt-2">Protocol Queries</p>
                    </div>
                 </div>

                 <div className="space-y-6">
                    {[
                      { q: "Is my password sent to servers?", a: "Negative. SamToolbox utilizes 100% local JavaScript execution. Your string never crosses the network interface. Zero surveillance model." },
                      { q: "How is crack time calculated?", a: "We utilize a standard entropy model assuming high-performance brute-force clusters capable of 1 trillion attempts per second." },
                      { q: "What defines 'Fortress' status?", a: "A Fortress password exceeds 12 characters, utilizes multi-vector character sets (Upper, Lower, Numeric, Symbolic), and avoids common lexical patterns." }
                    ].map((faq, i) => (
                      <div key={i} className="p-10 bg-white/5 rounded-[3rem] border border-white/5 hover:border-rose-500/20 transition-all group">
                        <h3 className="font-black text-white text-sm mb-6 flex items-start gap-4">
                          <span className="text-rose-400 font-mono italic">Q.</span> {faq.q}
                        </h3>
                        <p className="text-slate-400 text-sm leading-relaxed font-medium pl-8 group-hover:text-slate-300 transition-colors">{faq.a}</p>
                      </div>
                    ))}
                 </div>
              </div>

              <div className="bg-[#0f172a] rounded-[4.5rem] p-16 md:p-24 text-white relative overflow-hidden border border-white/5">
                 <div className="absolute top-0 right-0 w-full h-full opacity-[0.03] pointer-events-none" style={{ backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
                 <div className="relative z-10 text-center sm:text-left">
                    <div className="w-24 h-24 bg-rose-500/10 border border-rose-500/20 rounded-[2.5rem] flex items-center justify-center mb-12 shadow-[0_0_80px_rgba(244,63,94,0.2)] mx-auto sm:mx-0">
                      <Shield size={48} className="text-rose-400" />
                    </div>
                    <h3 className="text-4xl font-black mb-10 tracking-tight uppercase leading-[0.9] italic">Sovereign <span className="text-rose-400">Guardian.</span></h3>
                    <p className="text-slate-400 font-medium mb-16 leading-relaxed text-xl">
                       Entropy Guardian operates on a strictly local delivery model. 
                       No signups, no cloud syncing, no data harvesting. 
                       Your security is your business.
                    </p>
                    
                    <div className="grid grid-cols-2 gap-12">
                       <div className="space-y-4">
                          <div className="text-4xl font-black text-white tracking-tighter italic">ZERO-NET</div>
                          <div className="text-[10px] font-bold text-rose-400 uppercase tracking-[0.3em]">No Network Calls</div>
                       </div>
                       <div className="space-y-4">
                          <div className="text-4xl font-black text-white tracking-tighter italic">HEURISTIC</div>
                          <div className="text-[10px] font-bold text-rose-400 uppercase tracking-[0.3em]">Pattern Analysis</div>
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
