"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { 
  Play, Pause, RotateCcw, Trophy, Clock, TrendingUp, Calendar, 
  BookOpen, HelpCircle, Activity, ShieldCheck, Cpu, ArrowRight,
  Target, Award, History, Layers, Shield, Zap, Bell, Volume2,
  Terminal, Timer, BarChart3, Settings2
} from "lucide-react";
import Link from "next/link";
import { generateSoftwareApplicationSchema } from "@/lib/structuredData";

interface StudySession {
  date: string;
  minutes: number;
  sessions: number;
}

export default function StudyTimerPage() {
  const [timeLeft, setTimeLeft] = useState(25 * 60); 
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState<"work" | "short" | "long">("work");
  const [completedSessions, setCompletedSessions] = useState(0);
  const [history, setHistory] = useState<StudySession[]>([]);

  const schema = useMemo(() => generateSoftwareApplicationSchema("study-timer", "Professional Pomodoro study timer with local history tracking and productivity analytics."), []);

  const modes = {
    work: { label: "Deep Focus", minutes: 25, color: "from-blue-600 to-indigo-700", accent: "text-blue-400" },
    short: { label: "Short Break", minutes: 5, color: "from-emerald-500 to-teal-600", accent: "text-emerald-400" },
    long: { label: "Strategic Rest", minutes: 15, color: "from-purple-500 to-indigo-600", accent: "text-purple-400" },
  };

  useEffect(() => {
    const saved = localStorage.getItem("study-timer-history");
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load history");
      }
    }
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleComplete();
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const handleComplete = useCallback(() => {
    setIsRunning(false);
    
    if (mode === "work") {
      const newSessions = completedSessions + 1;
      setCompletedSessions(newSessions);
      
      const today = new Date().toISOString().split("T")[0];
      const todaySession = history.find(h => h.date === today);
      
      let newHistory: StudySession[];
      if (todaySession) {
        newHistory = history.map(h =>
          h.date === today
            ? { ...h, minutes: h.minutes + 25, sessions: h.sessions + 1 }
            : h
        );
      } else {
        newHistory = [...history, { date: today, minutes: 25, sessions: 1 }];
      }
      
      setHistory(newHistory);
      localStorage.setItem("study-timer-history", JSON.stringify(newHistory));
      
      setMode(newSessions % 4 === 0 ? "long" : "short");
      setTimeLeft(newSessions % 4 === 0 ? 15 * 60 : 5 * 60);
    } else {
      setMode("work");
      setTimeLeft(25 * 60);
    }
    
    if (typeof window !== "undefined" && "Notification" in window) {
      Notification.requestPermission().then(permission => {
        if (permission === "granted") {
          new Notification(mode === "work" ? "Session Concluded! 🎉" : "Rest Period Finished! 📚", {
            body: mode === "work" ? "Take a breath, you've earned it." : "Ready to re-enter deep focus?"
          });
        }
      });
    }
  }, [mode, completedSessions, history]);

  const toggleTimer = () => setIsRunning(!isRunning);

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(modes[mode].minutes * 60);
  };

  const switchMode = (newMode: "work" | "short" | "long") => {
    setIsRunning(false);
    setMode(newMode);
    setTimeLeft(modes[newMode].minutes * 60);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const totalMinutes = history.reduce((sum, h) => sum + h.minutes, 0);
  const totalSessions = history.reduce((sum, h) => sum + h.sessions, 0);
  const todayDate = new Date().toISOString().split("T")[0];
  const todaySession = history.find(h => h.date === todayDate);

  const progress = ((modes[mode].minutes * 60 - timeLeft) / (modes[mode].minutes * 60)) * 100;

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
            <Timer size={14} className="animate-pulse" />
            Focus Chronometer v9.6
          </div>
          <h1 className="text-6xl md:text-[7rem] font-black text-white tracking-tighter mb-8 leading-none">
            Focus <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 italic">Flow.</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-3xl mx-auto font-medium leading-relaxed">
            Industrial-grade Pomodoro utility for high-performance cognition. 
            <span className="text-slate-200 font-bold block mt-2">Local Flow Ledger. Zero Surveillance. Deep Logic Execution.</span>
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          MAIN UTILITY INTERFACE
      ══════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-6 -mt-16 relative z-20 mb-32">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Main Display Area */}
          <div className="lg:col-span-8">
            <div className={`bg-gradient-to-br ${modes[mode].color} rounded-[4.5rem] p-12 md:p-24 text-white shadow-[0_40px_100px_rgba(0,0,0,0.4)] relative overflow-hidden transition-all duration-1000 group`}>
               {/* Ambient Effects */}
               <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-[100px] group-hover:scale-125 transition-transform duration-1000" />
               <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-black/20 rounded-full blur-[100px]" />
               
               <div className="relative z-10 flex flex-col items-center">
                  {/* Tab Selector */}
                  <div className="flex bg-black/20 backdrop-blur-2xl p-2 rounded-[2.5rem] border border-white/10 mb-20 w-full max-w-xl">
                    {Object.entries(modes).map(([key, value]) => (
                      <button
                        key={key}
                        onClick={() => switchMode(key as "work" | "short" | "long")}
                        className={`flex-1 py-4 px-6 rounded-[2rem] text-[10px] font-black uppercase tracking-widest transition-all duration-500 ${
                          mode === key
                            ? "bg-white text-slate-900 shadow-2xl scale-105"
                            : "text-white/60 hover:text-white"
                        }`}
                      >
                        {value.label}
                      </button>
                    ))}
                  </div>

                  {/* Visual Timer Core */}
                  <div className="relative mb-20">
                     <svg className="w-72 h-72 md:w-[26rem] md:h-[26rem] mx-auto transform -rotate-90">
                        <circle
                          cx="50%"
                          cy="50%"
                          r="45%"
                          stroke="rgba(255,255,255,0.1)"
                          strokeWidth="16"
                          fill="none"
                        />
                        <circle
                          cx="50%"
                          cy="50%"
                          r="45%"
                          stroke="white"
                          strokeWidth="16"
                          fill="none"
                          strokeLinecap="round"
                          strokeDasharray={`${2 * Math.PI * 45}%`}
                          strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}%`}
                          className="transition-all duration-1000 ease-linear shadow-white"
                        />
                     </svg>
                     
                     <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <p className="text-7xl md:text-[9rem] font-black tracking-tighter leading-none mb-4 italic">{formatTime(timeLeft)}</p>
                        <p className="text-[10px] font-black uppercase tracking-[0.6em] opacity-60 italic">{modes[mode].label} MODE</p>
                     </div>
                  </div>

                  {/* Control Console */}
                  <div className="flex items-center justify-center gap-12">
                    <button
                      onClick={toggleTimer}
                      className="w-28 h-28 flex items-center justify-center rounded-full bg-white text-slate-900 transition-all hover:scale-110 active:scale-95 shadow-[0_20px_80px_rgba(255,255,255,0.3)] group/btn"
                    >
                      {isRunning ? <Pause size={48} strokeWidth={3} /> : <Play size={48} strokeWidth={3} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />}
                    </button>
                    <button
                      onClick={resetTimer}
                      className="w-18 h-18 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all hover:scale-105 active:scale-95 border border-white/20 backdrop-blur-md"
                    >
                      <RotateCcw size={28} />
                    </button>
                  </div>

                  <div className="mt-16 flex items-center gap-4 text-[10px] font-black text-white/50 uppercase tracking-[0.3em]">
                     <div className={`w-2.5 h-2.5 rounded-full ${isRunning ? "bg-emerald-400 animate-pulse shadow-[0_0_15px_rgba(52,211,153,0.8)]" : "bg-white/20"}`} />
                     <span>Engine State: {isRunning ? "Active Focus" : "Idle Buffer"}</span>
                  </div>
               </div>
            </div>
          </div>

          {/* Productivity Sidebar */}
          <div className="lg:col-span-4 space-y-10 lg:sticky lg:top-24">
             {/* Performance Card */}
             <div className="bg-[#0f172a] rounded-[3.5rem] border border-white/5 shadow-3xl shadow-black p-12 relative overflow-hidden group">
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-blue-600 rounded-full blur-[100px] opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-1000" />
                
                <div className="relative space-y-12">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex items-center justify-center text-blue-400">
                      <BarChart3 size={22} />
                    </div>
                    <h2 className="text-xl font-black text-white tracking-tighter uppercase italic">Flow Analytics</h2>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                     <div className="p-8 bg-white/5 rounded-[2.5rem] border border-white/5">
                        <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-3 italic">Today&apos;s Output</p>
                        <p className="text-3xl font-black text-white tracking-tighter italic">{todaySession?.minutes || 0} <span className="text-[10px] text-slate-500">MIN</span></p>
                     </div>
                     <div className="p-8 bg-white/5 rounded-[2.5rem] border border-white/5">
                        <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-3 italic">Total Load</p>
                        <p className="text-3xl font-black text-white tracking-tighter italic leading-none">{totalMinutes}</p>
                     </div>
                     <div className="col-span-2 p-10 bg-blue-600 rounded-[3rem] text-white shadow-2xl shadow-blue-900/40 border border-white/10 group-hover:scale-[1.02] transition-transform">
                        <div className="flex items-center justify-between">
                           <div>
                              <p className="text-[9px] font-black text-blue-100 uppercase tracking-widest mb-2 italic">Lifetime Cycles</p>
                              <p className="text-5xl font-black tracking-tighter italic">{totalSessions}</p>
                           </div>
                           <Trophy size={48} className="text-white/20" />
                        </div>
                     </div>
                  </div>
                </div>
             </div>

             {/* Protocol Notes */}
             <div className="p-10 bg-white/5 rounded-[3rem] border border-white/5 space-y-8">
                <div className="flex items-center gap-4 mb-2">
                   <Zap size={20} className="text-blue-400" />
                   <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">Flow Protocol</span>
                </div>
                <div className="space-y-6">
                   {[
                     "Hydrate during rest cycles for synaptic health.",
                     "After 4 focus cycles, Rest Mode scales to 15m.",
                     "Local ledger persists automatically to vault."
                   ].map((tip, i) => (
                     <div key={i} className="flex gap-4">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 shrink-0" />
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic leading-relaxed">{tip}</p>
                     </div>
                   ))}
                </div>
             </div>

             {/* Privacy Vault */}
             <div className="p-10 bg-emerald-500/5 rounded-[3rem] border border-emerald-500/10 flex items-center gap-6 shadow-2xl">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shadow-sm">
                   <ShieldCheck size={28} />
                </div>
                <div>
                   <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest leading-none mb-1.5 italic">Local Ledger Active</p>
                   <p className="text-[10px] font-bold text-slate-500 leading-tight">Flow data strictly confined to browser vault.</p>
                </div>
             </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════
            DOCUMENTATION
        ══════════════════════════════════════════ */}
        <div className="mt-40 border-t border-slate-800 pt-40">
           
           {/* Focus History Grid */}
           {history.length > 0 && (
             <div className="mb-40 animate-in fade-in slide-in-from-bottom-10 duration-1000">
                <div className="flex items-center gap-6 mb-20">
                  <div className="w-16 h-16 bg-blue-500/10 border border-blue-500/20 rounded-[1.5rem] flex items-center justify-center text-blue-400">
                    <History size={32} />
                  </div>
                  <div>
                    <h2 className="text-4xl font-black text-white uppercase tracking-tight leading-none italic">Focus <span className="text-blue-400">Ledger</span></h2>
                    <p className="text-slate-500 font-bold text-[10px] uppercase tracking-widest mt-2">Historical Cognition Data</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {history.slice(-4).reverse().map((session, i) => (
                    <div key={i} className="p-10 bg-[#0f172a] rounded-[3rem] border border-white/5 group hover:border-blue-500/30 transition-all duration-500 shadow-2xl">
                      <div className="flex items-center justify-between mb-10">
                         <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                            <Calendar size={22} />
                         </div>
                         <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest italic">{new Date(session.date).toLocaleDateString("en-US", { weekday: "short" })}</span>
                      </div>
                      <p className="text-[11px] font-black text-white uppercase tracking-widest mb-3 italic">{new Date(session.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</p>
                      <div className="flex items-baseline gap-3">
                         <p className="text-4xl font-black text-blue-400 tracking-tighter italic">{session.minutes}</p>
                         <span className="text-[9px] font-black text-slate-600 uppercase tracking-[0.4em]">Minutes Focus</span>
                      </div>
                    </div>
                  ))}
                </div>
             </div>
           )}

           <div className="grid lg:grid-cols-2 gap-24 items-start">
              <div className="space-y-16">
                 <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-blue-500/10 rounded-[1.5rem] flex items-center justify-center text-blue-400 border border-blue-500/20">
                      <BookOpen size={32} />
                    </div>
                    <div>
                      <h2 className="text-4xl font-black text-white uppercase tracking-tight leading-none italic">Cognitive <span className="text-blue-400">Protocol</span></h2>
                      <p className="text-slate-500 font-bold text-[10px] uppercase tracking-widest mt-2">System Manual</p>
                    </div>
                 </div>

                 <div className="space-y-10">
                    {[
                      { step: "01", title: "Sustained Synthesis", desc: "Select 'Deep Focus' (25m) to initialize a concentration sprint optimized for high-density mental output." },
                      { step: "02", title: "Local Ledger Sync", desc: "Our chronometer tracks your minutes with 100% local persistence. No surveillance, just performance." },
                      { step: "03", title: "Strategic Rest", desc: "The engine enforces rest periods (5m/15m) to maintain peak cognitive agility and avoid terminal fatigue." },
                      { step: "04", title: "Session Audit", desc: "Review your performance ledger to monitor consistency and iterate on your study architecture." }
                    ].map((item, i) => (
                      <div key={i} className="flex gap-8 group">
                        <span className="text-5xl font-black text-white/5 group-hover:text-blue-500/20 transition-all duration-500 italic">{item.step}</span>
                        <div className="space-y-2">
                           <h3 className="font-black text-white uppercase tracking-widest text-xs">{item.title}</h3>
                           <p className="text-slate-500 text-sm leading-relaxed font-medium">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                 </div>
              </div>

              <div className="bg-[#0f172a] rounded-[4.5rem] p-16 md:p-24 text-white relative overflow-hidden border border-white/5">
                 <div className="absolute top-0 right-0 w-full h-full opacity-[0.03] pointer-events-none" style={{ backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
                 <div className="relative z-10 text-center sm:text-left">
                    <div className="w-24 h-24 bg-blue-500/10 border border-blue-500/20 rounded-[2.5rem] flex items-center justify-center mb-12 shadow-[0_0_80px_rgba(37,99,235,0.2)] mx-auto sm:mx-0">
                      <ShieldCheck size={48} className="text-blue-400" />
                    </div>
                    <h3 className="text-4xl font-black mb-10 tracking-tight uppercase leading-[0.9] italic">Sovereign <span className="text-blue-400">Focus.</span></h3>
                    <p className="text-slate-400 font-medium mb-16 leading-relaxed text-xl">
                       Focus Flow operates on a zero-persistence model. 
                       No signups, no data mining, no surveillance. 
                       Your cognition is your business.
                    </p>
                    
                    <div className="grid grid-cols-2 gap-12">
                       <div className="space-y-4">
                          <div className="text-4xl font-black text-white tracking-tighter italic">RAM-ONLY</div>
                          <div className="text-[10px] font-bold text-blue-400 uppercase tracking-[0.3em]">Processing</div>
                       </div>
                       <div className="space-y-4">
                          <div className="text-4xl font-black text-white tracking-tighter italic">0-SURV</div>
                          <div className="text-[10px] font-bold text-blue-400 uppercase tracking-[0.3em]">Cloud Security</div>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Explore More Tools */}
        <div className="mt-40 text-center">
           <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mb-10">Access further industrial capabilities</p>
           <Link href="/tools" className="inline-flex items-center gap-6 px-20 py-8 bg-white text-slate-900 rounded-[2.5rem] font-black uppercase tracking-widest text-[10px] hover:bg-blue-600 hover:text-white transition-all shadow-3xl group">
             Explore All Systems <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
           </Link>
        </div>
      </section>
    </div>
  );
}
