"use client";

import { useState, useEffect, useCallback } from "react";
import { Play, Pause, RotateCcw, Trophy, Clock, TrendingUp, Calendar, BookOpen, HelpCircle } from "lucide-react";

interface StudySession {
  date: string;
  minutes: number;
  sessions: number;
}

export default function StudyTimerPage() {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState<"work" | "short" | "long">("work");
  const [completedSessions, setCompletedSessions] = useState(0);
  const [history, setHistory] = useState<StudySession[]>([]);

  const modes = {
    work: { label: "Focus Time", minutes: 25, color: "from-brand-600 to-brand-700" },
    short: { label: "Short Break", minutes: 5, color: "from-green-500 to-green-600" },
    long: { label: "Long Break", minutes: 15, color: "from-purple-500 to-purple-600" },
  };

  // Load history from localStorage
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

  // Timer logic
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
      
      // Save to history
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
      
      // Auto switch to break
      setMode(newSessions % 4 === 0 ? "long" : "short");
      setTimeLeft(newSessions % 4 === 0 ? 15 * 60 : 5 * 60);
    } else {
      // Break finished, back to work
      setMode("work");
      setTimeLeft(25 * 60);
    }
    
    // Play notification sound (optional)
    if (typeof window !== "undefined" && "Notification" in window) {
      Notification.requestPermission().then(permission => {
        if (permission === "granted") {
          new Notification(mode === "work" ? "Break Time! 🎉" : "Back to Work! 📚");
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
  const today = new Date().toISOString().split("T")[0];
  const todaySession = history.find(h => h.date === today);

  const progress = ((modes[mode].minutes * 60 - timeLeft) / (modes[mode].minutes * 60)) * 100;

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Study Timer</h1>
        <p className="text-sm text-slate-500 font-medium mt-1">Pomodoro technique with productivity tracking</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-white rounded-xl border border-slate-100 shadow-md p-4">
          <div className="flex items-center gap-2 mb-2">
            <Calendar size={16} className="text-brand-600" />
            <p className="text-xs font-bold text-slate-500 uppercase">Today</p>
          </div>
          <p className="text-2xl font-black text-slate-900">{todaySession?.minutes || 0}<span className="text-sm font-bold text-slate-500 ml-1">min</span></p>
        </div>
        <div className="bg-white rounded-xl border border-slate-100 shadow-md p-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock size={16} className="text-green-600" />
            <p className="text-xs font-bold text-slate-500 uppercase">Total</p>
          </div>
          <p className="text-2xl font-black text-slate-900">{totalMinutes}<span className="text-sm font-bold text-slate-500 ml-1">min</span></p>
        </div>
        <div className="bg-white rounded-xl border border-slate-100 shadow-md p-4">
          <div className="flex items-center gap-2 mb-2">
            <Trophy size={16} className="text-purple-600" />
            <p className="text-xs font-bold text-slate-500 uppercase">Sessions</p>
          </div>
          <p className="text-2xl font-black text-slate-900">{totalSessions}</p>
        </div>
      </div>

      {/* Timer Card */}
      <div className={`bg-gradient-to-br ${modes[mode].color} rounded-3xl p-8 mb-6 text-white shadow-2xl`}>
        {/* Mode Selector */}
        <div className="flex gap-2 mb-8">
          {Object.entries(modes).map(([key, value]) => (
            <button
              key={key}
              onClick={() => switchMode(key as "work" | "short" | "long")}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-black uppercase tracking-wider transition-all ${
                mode === key
                  ? "bg-white/20 backdrop-blur-sm"
                  : "bg-white/10 hover:bg-white/15"
              }`}
            >
              {value.label}
            </button>
          ))}
        </div>

        {/* Timer Display */}
        <div className="text-center mb-8">
          <div className="relative inline-block">
            {/* Circular Progress */}
            <svg className="w-64 h-64 sm:w-72 sm:h-72 mx-auto transform -rotate-90">
              <circle
                cx="50%"
                cy="50%"
                r="45%"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="8"
                fill="none"
              />
              <circle
                cx="50%"
                cy="50%"
                r="45%"
                stroke="white"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 45}%`}
                strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}%`}
                className="transition-all duration-1000"
              />
            </svg>
            
            {/* Time Display */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-6xl sm:text-7xl font-black tracking-tighter">{formatTime(timeLeft)}</p>
              <p className="text-sm font-bold uppercase tracking-widest mt-2 opacity-80">{modes[mode].label}</p>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={toggleTimer}
            className="w-20 h-20 flex items-center justify-center rounded-full bg-white hover:bg-slate-100 text-slate-900 transition-all hover:scale-110 active:scale-95 shadow-xl"
          >
            {isRunning ? <Pause size={32} /> : <Play size={32} className="ml-1" />}
          </button>
          <button
            onClick={resetTimer}
            className="w-14 h-14 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-all hover:scale-105 active:scale-95"
          >
            <RotateCcw size={20} />
          </button>
        </div>

        {/* Session Counter */}
        <div className="mt-6 text-center">
          <p className="text-sm font-bold opacity-80">Sessions Completed: {completedSessions}</p>
        </div>
      </div>

      {/* Weekly Stats */}
      {history.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-md p-5">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp size={16} className="text-brand-600" />
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Recent Activity</h3>
          </div>
          
          <div className="space-y-3">
            {history.slice(-7).reverse().map((session, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-brand-50 flex items-center justify-center">
                    <Calendar size={16} className="text-brand-600" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{new Date(session.date).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}</p>
                    <p className="text-xs text-slate-500 font-medium">{session.sessions} session{session.sessions > 1 ? "s" : ""}</p>
                  </div>
                </div>
                <p className="text-sm font-black text-brand-600">{session.minutes} min</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tips */}
      <div className="mt-6 bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl border border-slate-200 p-5">
        <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-3">💡 Pomodoro Technique</h3>
        <div className="space-y-2 text-sm text-slate-600">
          <p>• <strong>25 min</strong> focused work → <strong>5 min</strong> break</p>
          <p>• After <strong>4 sessions</strong>, take a <strong>15 min</strong> long break</p>
          <p>• Stay consistent and track your progress daily!</p>
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
            <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Cognitive Protocol</h2>
          </div>
          
          <div className="space-y-6">
            {[
              { step: "01", title: "Focus Calibration", desc: "Select 'Focus Time' to initialize a 25-minute deep-work session. This interval is optimized for peak mental output." },
              { step: "02", title: "Immersion Mode", desc: "Start the timer. The dynamic progress ring provides a low-friction visual cue for time remaining." },
              { step: "03", title: "Structured Rest", desc: "Utilize Short Breaks (5m) between sessions and Long Breaks (15m) every 4 cycles to prevent cognitive burnout." },
              { step: "04", title: "Performance Audit", desc: "Review your 'Recent Activity' to monitor consistency and total focus minutes across your study lifecycle." }
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
            <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Productivity FAQ</h2>
          </div>

          <div className="space-y-4">
            {[
              { q: "Why 25 minutes?", a: "The Pomodoro Technique is based on the concept that brief, focused sprints improve mental agility and sustain high concentration levels." },
              { q: "Is my history private?", a: "Yes. All tracking data is stored in your 'Local Vault'. Your study habits and history are never uploaded to any server." },
              { q: "Do I get notifications?", a: "If you enable browser notifications, the system will alert you as soon as a session or break period concludes." },
              { q: "Can I reset the timer?", a: "Yes. Use the reload icon to restart the current mode's timer if your focus is interrupted." }
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
