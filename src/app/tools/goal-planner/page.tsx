"use client";

import { useState, useEffect } from "react";
import { Target, Plus, CheckCircle2, Circle, Trash2, Calendar, Trophy, TrendingUp, Sparkles, Zap, BookOpen, HelpCircle } from "lucide-react";

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

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="text-center mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-[10px] font-black uppercase tracking-[0.3em] border border-brand-100">
          <Sparkles size={12} />
          <span>Strategic Execution</span>
        </div>
        <h1 className="text-6xl font-black text-slate-900 tracking-tighter leading-none italic uppercase">
          Goal <span className="text-brand-600">Architect</span>
        </h1>
        <p className="text-slate-500 font-medium max-w-xl mx-auto">
          Precision planning for high-impact professionals. 
          Deconstruct your vision into actionable milestones.
        </p>
      </div>

      <div className="grid md:grid-cols-12 gap-8">
        {/* Left: Input & Stats */}
        <div className="md:col-span-8 space-y-6">
          {/* Tab Switcher */}
          <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200 shadow-inner">
            <button
              onClick={() => setActiveTab("daily")}
              className={`flex-1 py-3 px-6 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                activeTab === "daily" ? "bg-white text-slate-900 shadow-md" : "text-slate-400 hover:text-slate-600"
              }`}
            >
              Daily Sprints
            </button>
            <button
              onClick={() => setActiveTab("weekly")}
              className={`flex-1 py-3 px-6 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                activeTab === "weekly" ? "bg-white text-slate-900 shadow-md" : "text-slate-400 hover:text-slate-600"
              }`}
            >
              Weekly Milestones
            </button>
          </div>

          {/* Goal Input */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-brand-600 to-indigo-600 rounded-3xl blur opacity-20 group-focus-within:opacity-40 transition-opacity" />
            <div className="relative flex items-center bg-white border border-slate-100 rounded-3xl p-2 shadow-2xl">
              <input
                type="text"
                value={newGoal}
                onChange={(e) => setNewGoal(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addGoal()}
                placeholder={`Define your next ${activeTab} goal...`}
                className="flex-1 bg-transparent border-none outline-none px-6 text-sm font-bold text-slate-900 placeholder:text-slate-300"
              />
              <button
                onClick={addGoal}
                className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center hover:bg-brand-600 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-slate-900/20"
              >
                <Plus size={24} />
              </button>
            </div>
          </div>

          {/* Goals List */}
          <div className="space-y-3">
            {filteredGoals.length > 0 ? (
              filteredGoals.map((goal) => (
                <div
                  key={goal.id}
                  className={`group flex items-center gap-4 p-5 rounded-3xl border transition-all duration-500 ${
                    goal.completed
                      ? "bg-slate-50 border-slate-100 opacity-60"
                      : "bg-white border-slate-100 shadow-xl shadow-slate-200/50 hover:border-brand-300"
                  }`}
                >
                  <button
                    onClick={() => toggleGoal(goal.id)}
                    className={`shrink-0 transition-colors ${
                      goal.completed ? "text-emerald-500" : "text-slate-200 group-hover:text-brand-400"
                    }`}
                  >
                    {goal.completed ? <CheckCircle2 size={24} /> : <Circle size={24} />}
                  </button>
                  <span className={`flex-1 text-sm font-bold transition-all ${
                    goal.completed ? "line-through text-slate-400" : "text-slate-800"
                  }`}>
                    {goal.text}
                  </span>
                  <button
                    onClick={() => removeGoal(goal.id)}
                    className="p-2 text-slate-200 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))
            ) : (
              <div className="py-20 text-center space-y-4 animate-in fade-in duration-700">
                <div className="w-20 h-20 bg-slate-50 rounded-[2.5rem] flex items-center justify-center mx-auto text-slate-200">
                  <Target size={40} />
                </div>
                <h3 className="text-xl font-black text-slate-300 uppercase tracking-widest">No Active Vectors</h3>
                <p className="text-slate-400 text-xs font-medium">Initialize your strategy by adding a goal above.</p>
              </div>
            )}
          </div>
        </div>

        {/* Right: Intelligence Panel */}
        <div className="md:col-span-4 space-y-6">
          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-2xl p-8 space-y-10">
            {/* Progress Radial (Simulated with div) */}
            <div className="text-center">
              <div className="relative w-32 h-32 mx-auto flex items-center justify-center">
                <svg className="absolute inset-0 w-full h-full -rotate-90">
                  <circle cx="50%" cy="50%" r="45%" stroke="#f1f5f9" strokeWidth="8" fill="none" />
                  <circle
                    cx="50%"
                    cy="50%"
                    r="45%"
                    stroke="url(#gradient)"
                    strokeWidth="8"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 45}%`}
                    strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}%`}
                    className="transition-all duration-1000"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#2563eb" />
                      <stop offset="100%" stopColor="#4f46e5" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="text-center">
                  <p className="text-2xl font-black text-slate-900">{Math.round(progress)}%</p>
                  <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Efficiency</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shadow-sm">
                    <Trophy size={16} />
                  </div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Completion</span>
                </div>
                <span className="text-sm font-black text-slate-900">{completedCount} / {filteredGoals.length}</span>
              </div>

              <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-sm">
                    <TrendingUp size={16} />
                  </div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Streak</span>
                </div>
                <span className="text-sm font-black text-slate-900">0 Days</span>
              </div>
            </div>

            <div className="pt-8 border-t border-slate-100">
              <h4 className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-4">Strategic Tip</h4>
              <p className="text-[11px] font-medium text-slate-500 leading-relaxed italic">
                &quot;The secret of getting ahead is getting started. The secret of getting started is breaking your complex overwhelming tasks into small manageable tasks.&quot;
              </p>
            </div>
          </div>

          <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-40 h-40 bg-brand-500/10 blur-[80px] -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10 space-y-4">
              <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-brand-400">
                <Zap size={20} fill="currentColor" />
              </div>
              <h3 className="text-xl font-black tracking-tight leading-none uppercase">Vertical Integration</h3>
              <p className="text-xs font-medium text-slate-400 leading-relaxed">
                Connect your daily sprints to your weekly milestones for 100% architectural alignment.
              </p>
            </div>
          </div>
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
            <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Execution Protocol</h2>
          </div>
          
          <div className="space-y-6">
            {[
              { step: "01", title: "Scope Calibration", desc: "Toggle between 'Daily Sprints' for tactical execution and 'Weekly Milestones' for high-level strategic planning." },
              { step: "02", title: "Vector Initialization", desc: "Define your objective. Our engine generates a unique local identifier to track your progress with surgical precision." },
              { step: "03", title: "Momentum Tracking", desc: "Update task status in real-time. The architectural radial calculates your efficiency based on current completions." },
              { step: "04", title: "Strategic Pruning", desc: "Remove completed or depreciated goals to maintain a lean, high-impact focus list in your local vault." }
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
            <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Strategy FAQ</h2>
          </div>

          <div className="space-y-4">
            {[
              { q: "Why separate Daily vs Weekly?", a: "Separating immediate execution (Sprints) from long-term vision (Milestones) prevents cognitive overload and maintains strategic focus." },
              { q: "Are my goals secure?", a: "Yes. SamToolbox utilizes 'Local Vault' technology. Your strategic data never leaves your browser and is never uploaded." },
              { q: "What is Efficiency percentage?", a: "It represents your completion ratio for the active view, helping you visualize your current execution momentum." },
              { q: "Does it work without internet?", a: "Absolutely. Once loaded, the Goal Architect operates entirely within your browser's private sandbox." }
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
  );
}
