"use client";

import { useState, useEffect, useMemo } from "react";
import { 
  Target, Plus, CheckCircle2, Circle, Trash2, Calendar, 
  Trophy, TrendingUp, Sparkles, Zap, BookOpen, HelpCircle, 
  Terminal, ShieldCheck, Cpu, Activity, ArrowRight,
  Layers, BarChart3
} from "lucide-react";
import Link from "next/link";
import { generateSoftwareApplicationSchema } from "@/lib/structuredData";

interface Goal {
  id: string;
  text: string;
  completed: boolean;
  type: "daily" | "weekly";
  createdAt: string;
}

export default function GoalPlannerPage() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [newGoal, setNewGoal] = useState("");
  const [activeTab, setActiveTab] = useState<"daily" | "weekly">("daily");

  useEffect(() => {
    const saved = localStorage.getItem("samtoolbox-goals");
    if (saved) {
      try {
        setGoals(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load goals");
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("samtoolbox-goals", JSON.stringify(goals));
  }, [goals]);

  const addGoal = () => {
    if (!newGoal.trim()) return;
    const goal: Goal = {
      id: Date.now().toString(),
      text: newGoal,
      completed: false,
      type: activeTab,
      createdAt: new Date().toISOString(),
    };
    setGoals([...goals, goal]);
    setNewGoal("");
  };

  const toggleGoal = (id: string) => {
    setGoals(goals.map(g => g.id === id ? { ...g, completed: !g.completed } : g));
  };

  const removeGoal = (id: string) => {
    setGoals(goals.filter(g => g.id !== id));
  };

  const filteredGoals = goals.filter(g => g.type === activeTab);
  const completedCount = filteredGoals.filter(g => g.completed).length;
  const progress = filteredGoals.length > 0 ? (completedCount / filteredGoals.length) * 100 : 0;

  const schema = useMemo(() => generateSoftwareApplicationSchema("goal-planner", "Professional strategic execution engine with local-first data sovereignty."), []);

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
            <Target size={14} className="animate-pulse" />
            Strategic Forge v3.2
          </div>
          <h1 className="text-6xl md:text-[7rem] font-black text-white tracking-tighter mb-8 leading-none">
            Goal <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 italic">Architect.</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-3xl mx-auto font-medium leading-relaxed">
            Precision planning for industrial execution. 
            <span className="text-slate-200 font-bold block mt-2">Local Vault Sovereignty. Multi-Vector Sprints. Zero Cloud Telemetry.</span>
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          MAIN UTILITY INTERFACE
      ══════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-6 -mt-16 relative z-20 mb-32">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Workspace Area */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* Tab Switcher */}
            <div className="bg-[#0f172a] p-2 rounded-[2.5rem] border border-white/5 shadow-3xl shadow-black flex">
              <button
                onClick={() => setActiveTab("daily")}
                className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-[2rem] text-[10px] font-black uppercase tracking-[0.3em] transition-all ${
                  activeTab === "daily" ? "bg-blue-600 text-white shadow-xl shadow-blue-900/40" : "text-slate-500 hover:text-white"
                }`}
              >
                <Zap size={14} /> Daily Sprints
              </button>
              <button
                onClick={() => setActiveTab("weekly")}
                className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-[2rem] text-[10px] font-black uppercase tracking-[0.3em] transition-all ${
                  activeTab === "weekly" ? "bg-blue-600 text-white shadow-xl shadow-blue-900/40" : "text-slate-500 hover:text-white"
                }`}
              >
                <Calendar size={14} /> Weekly Milestones
              </button>
            </div>

            {/* Goal Input */}
            <div className="bg-[#0f172a] p-3 rounded-[3rem] border border-white/5 shadow-3xl shadow-black flex items-center group">
               <input
                 type="text"
                 value={newGoal}
                 onChange={(e) => setNewGoal(e.target.value)}
                 onKeyDown={(e) => e.key === "Enter" && addGoal()}
                 placeholder={`INITIALIZE NEW ${activeTab.toUpperCase()} VECTOR...`}
                 className="flex-1 bg-transparent border-none outline-none px-8 text-sm font-black text-white uppercase tracking-widest placeholder:text-slate-800"
               />
               <button
                 onClick={addGoal}
                 className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center hover:bg-blue-500 transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-blue-900/40"
               >
                 <Plus size={28} strokeWidth={3} />
               </button>
            </div>

            {/* Goals List */}
            <div className="space-y-4">
              {filteredGoals.length > 0 ? (
                filteredGoals.map((goal) => (
                  <div
                    key={goal.id}
                    className={`group flex items-center gap-6 p-8 rounded-[2.5rem] border transition-all duration-500 ${
                      goal.completed
                        ? "bg-white/[0.02] border-white/5 opacity-40"
                        : "bg-[#0f172a] border-white/5 shadow-2xl shadow-black hover:border-blue-500/30"
                    }`}
                  >
                    <button
                      onClick={() => toggleGoal(goal.id)}
                      className={`shrink-0 transition-all ${
                        goal.completed ? "text-emerald-500 scale-110" : "text-slate-700 group-hover:text-blue-500"
                      }`}
                    >
                      {goal.completed ? <CheckCircle2 size={32} /> : <Circle size={32} />}
                    </button>
                    <span className={`flex-1 text-lg font-bold tracking-tight transition-all uppercase ${
                      goal.completed ? "line-through text-slate-500 italic" : "text-white"
                    }`}>
                      {goal.text}
                    </span>
                    <button
                      onClick={() => removeGoal(goal.id)}
                      className="p-3 text-slate-800 hover:text-rose-500 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                ))
              ) : (
                <div className="py-32 text-center space-y-8 bg-[#0f172a] rounded-[4rem] border border-white/5 border-dashed">
                  <div className="w-24 h-24 bg-white/[0.03] rounded-[2.5rem] flex items-center justify-center mx-auto text-slate-800">
                    <Target size={48} strokeWidth={1} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-black text-slate-700 uppercase tracking-widest italic">No Active Vectors</h3>
                    <p className="text-slate-600 text-[10px] font-black uppercase tracking-[0.4em]">Initialize strategy above</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Intelligence Sidebar */}
          <div className="lg:col-span-4 space-y-10 lg:sticky lg:top-24">
             {/* Progress Dashboard */}
             <div className="bg-[#0f172a] rounded-[3.5rem] border border-white/5 shadow-3xl shadow-black p-12 relative overflow-hidden group">
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-blue-600 rounded-full blur-[100px] opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-1000" />
                
                <div className="relative space-y-12">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex items-center justify-center text-blue-400">
                      <BarChart3 size={22} />
                    </div>
                    <h2 className="text-xl font-black text-white tracking-tighter uppercase italic">Execution Metrics</h2>
                  </div>

                  <div className="flex flex-col items-center justify-center py-6">
                    <div className="relative w-48 h-48 flex items-center justify-center">
                      <svg className="absolute inset-0 w-full h-full -rotate-90">
                        <circle cx="50%" cy="50%" r="42%" stroke="rgba(255,255,255,0.03)" strokeWidth="12" fill="none" />
                        <circle
                          cx="50%"
                          cy="50%"
                          r="42%"
                          stroke="url(#blue-grad)"
                          strokeWidth="12"
                          fill="none"
                          strokeLinecap="round"
                          strokeDasharray={`${2 * Math.PI * 42}%`}
                          strokeDashoffset={`${2 * Math.PI * 42 * (1 - progress / 100)}%`}
                          className="transition-all duration-[1.5s] ease-out"
                        />
                        <defs>
                          <linearGradient id="blue-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#3b82f6" />
                            <stop offset="100%" stopColor="#818cf8" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="text-center relative z-10">
                        <p className="text-6xl font-black text-white italic tracking-tighter leading-none">{Math.round(progress)}<span className="text-2xl">%</span></p>
                        <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mt-2">Efficiency</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                     <div className="p-8 bg-white/5 rounded-[2.5rem] border border-white/5 text-center">
                        <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-3">Completed</p>
                        <p className="text-3xl font-black text-white tracking-tighter italic">{completedCount} <span className="text-[10px] text-slate-500 font-bold uppercase">Vectors</span></p>
                     </div>
                     <div className="p-8 bg-white/5 rounded-[2.5rem] border border-white/5 text-center">
                        <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-3">Focus</p>
                        <p className="text-3xl font-black text-blue-400 tracking-tighter italic">{filteredGoals.length - completedCount}</p>
                     </div>
                  </div>
                </div>
             </div>

             {/* Tips / Logic */}
             <div className="bg-blue-600 rounded-[3.5rem] shadow-3xl p-12 text-white relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-full h-full opacity-20 pointer-events-none" 
                     style={{ backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
                
                <div className="relative z-10 space-y-8">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/10 border border-white/20 rounded-2xl flex items-center justify-center text-white">
                      <Zap size={22} />
                    </div>
                    <h2 className="text-xl font-black tracking-tighter uppercase italic">Strategic Intel</h2>
                  </div>
                  <p className="text-blue-100 text-sm leading-relaxed font-bold italic">
                    &quot;The secret of getting ahead is getting started. Deconstruct your complex overwhelming tasks into small manageable vectors.&quot;
                  </p>
                  <div className="h-px bg-white/20 w-full" />
                  <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest">
                     <TrendingUp size={16} /> Vertical Integration Active
                  </div>
                </div>
             </div>

             {/* Privacy Vault */}
             <div className="p-10 bg-emerald-500/5 rounded-[3rem] border border-emerald-500/10 flex items-center gap-6 shadow-2xl">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shadow-sm">
                   <ShieldCheck size={28} />
                </div>
                <div>
                   <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest leading-none mb-1.5 italic">Local Vault Active</p>
                   <p className="text-[10px] font-bold text-slate-500 leading-tight">Data strictly localized to device storage.</p>
                </div>
             </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════
            DOCUMENTATION
        ══════════════════════════════════════════ */}
        <div className="mt-40 border-t border-slate-800 pt-40">
           <div className="grid lg:grid-cols-2 gap-24 items-start">
              <div className="space-y-16">
                 <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-blue-500/10 rounded-[1.5rem] flex items-center justify-center text-blue-400 border border-blue-500/20">
                      <BookOpen size={32} />
                    </div>
                    <div>
                      <h2 className="text-4xl font-black text-white uppercase tracking-tight leading-none italic">Execution <span className="text-blue-400">Protocol</span></h2>
                      <p className="text-slate-500 font-bold text-[10px] uppercase tracking-widest mt-2">Strategic Workflow</p>
                    </div>
                 </div>

                 <div className="space-y-8">
                    {[
                      { step: "01", title: "Vector Initialization", desc: "Define your tactical objectives for the current sprint cycle." },
                      { step: "02", title: "Scope Calibration", desc: "Switch between Daily Sprints and Weekly Milestones for scale awareness." },
                      { step: "03", title: "Efficiency Mapping", desc: "Monitor the real-time completion radial to maintain execution momentum." },
                      { step: "04", title: "Sovereign Persistence", desc: "All strategic data is hashed and stored in your browser's private vault." }
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
                    <h3 className="text-4xl font-black mb-10 tracking-tight uppercase leading-[0.9] italic">Strategic <span className="text-blue-400">Privacy.</span></h3>
                    <p className="text-slate-400 font-medium mb-16 leading-relaxed text-xl">
                       Goal Architect operates on a strictly local delivery model. 
                       No signups, no cloud syncing, no data harvesting. 
                       Your ambition is your business.
                    </p>
                    
                    <div className="grid grid-cols-2 gap-12">
                       <div className="space-y-4">
                          <div className="text-4xl font-black text-white tracking-tighter italic">OFF-GRID</div>
                          <div className="text-[10px] font-bold text-blue-400 uppercase tracking-[0.3em]">No Cloud Sync</div>
                       </div>
                       <div className="space-y-4">
                          <div className="text-4xl font-black text-white tracking-tighter italic">HARDENED</div>
                          <div className="text-[10px] font-bold text-blue-400 uppercase tracking-[0.3em]">Encrypted Storage</div>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Explore More Tools */}
        <div className="mt-40 text-center">
           <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mb-10">Access further industrial utilities</p>
           <Link href="/tools" className="inline-flex items-center gap-6 px-20 py-8 bg-white text-slate-900 rounded-[2.5rem] font-black uppercase tracking-widest text-[10px] hover:bg-blue-600 hover:text-white transition-all shadow-3xl group">
             Explore All Systems <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
           </Link>
        </div>
      </section>
    </div>
  );
}
