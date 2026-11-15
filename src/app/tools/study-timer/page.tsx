"use client";

import { useState, useEffect } from "react";
import { Play, Pause, RotateCcw, Timer, Sparkles, CheckCircle2 } from "lucide-react";

export default function StudyTimerPage() {
  const [mode, setMode] = useState<"work" | "short" | "long">("work");
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [completedSessions, setCompletedSessions] = useState(0);

  const durations = {
    work: 25 * 60,
    short: 5 * 60,
    long: 15 * 60,
  };

  const switchMode = (newMode: "work" | "short" | "long") => {
    setMode(newMode);
    setIsRunning(false);
    setTimeLeft(durations[newMode]);
  };

  useEffect(() => {
    let timer: any = null;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      if (mode === "work") {
        setCompletedSessions((prev) => prev + 1);
      }
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft, mode]);

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(durations[mode]);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeFormatted = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-100 text-[#e5322d] text-xs font-bold mb-4">
          <Timer className="w-3.5 h-3.5" />
          Pomodoro Technique Standard
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-3">
          Study & Focus Pomodoro Timer
        </h1>
        <p className="text-slate-600 text-sm leading-relaxed">
          Boost your study sessions and deep work productivity with timed focus blocks and structured intervals.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm text-center max-w-xl mx-auto space-y-8">
        {/* Mode Selector */}
        <div className="flex justify-center gap-2">
          {[
            { id: "work", label: "Focus (25m)" },
            { id: "short", label: "Short Break (5m)" },
            { id: "long", label: "Long Break (15m)" },
          ].map((m) => (
            <button
              key={m.id}
              onClick={() => switchMode(m.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                mode === m.id
                  ? "bg-[#e5322d] text-white shadow-md shadow-red-500/20"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>

        {/* Big Digital Clock */}
        <div className="py-6">
          <div className="text-7xl sm:text-8xl font-black font-mono tracking-tighter text-slate-900">
            {timeFormatted}
          </div>
          <span className="text-xs font-bold uppercase tracking-widest text-slate-400 mt-2 block">
            {mode === "work" ? "Deep Focus Time" : "Relaxation Break"}
          </span>
        </div>

        {/* Control Buttons */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="px-8 py-4 rounded-2xl bg-[#e5322d] hover:bg-[#cc241f] text-white font-bold text-base shadow-lg shadow-red-500/25 flex items-center gap-2 cursor-pointer transition-transform hover:scale-105 active:scale-95"
          >
            {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-white" />}
            {isRunning ? "Pause" : "Start Focus"}
          </button>

          <button
            onClick={resetTimer}
            className="p-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
            title="Reset Timer"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>

        {/* Sessions Completed */}
        <div className="pt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Completed Focus Cycles: <strong>{completedSessions}</strong></span>
          <span className="text-emerald-600 font-bold flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4" /> Goal: 4 cycles
          </span>
        </div>
      </div>
    </div>
  );
}
