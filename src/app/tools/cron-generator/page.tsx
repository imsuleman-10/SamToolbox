"use client";

import { useState, useMemo } from "react";
import {
  Clock,
  Copy,
  Check,
  Calendar,
  Sparkles,
  ShieldCheck,
  Terminal,
} from "lucide-react";

export default function CronGeneratorPage() {
  const [minute, setMinute] = useState<string>("0");
  const [hour, setHour] = useState<string>("12");
  const [dayOfMonth, setDayOfMonth] = useState<string>("*");
  const [month, setMonth] = useState<string>("*");
  const [dayOfWeek, setDayOfWeek] = useState<string>("*");
  const [copied, setCopied] = useState(false);

  const cronExpression = `${minute} ${hour} ${dayOfMonth} ${month} ${dayOfWeek}`;

  // Human-readable explanation generator
  const humanReadable = useMemo(() => {
    if (cronExpression === "* * * * *") return "Runs every single minute.";
    if (cronExpression === "0 * * * *") return "Runs every hour, on the hour.";
    if (cronExpression === "0 0 * * *") return "Runs every day at midnight (00:00).";
    if (cronExpression === "0 12 * * *") return "Runs every day at 12:00 PM (Noon).";
    if (cronExpression === "0 0 * * 0") return "Runs every Sunday at midnight.";
    if (cronExpression === "0 0 1 * *") return "Runs on the first day of every month at midnight.";
    if (cronExpression.startsWith("*/5")) return "Runs every 5 minutes.";
    if (cronExpression.startsWith("*/15")) return "Runs every 15 minutes.";
    if (cronExpression.startsWith("*/30")) return "Runs every 30 minutes.";

    return `At minute ${minute}, hour ${hour}, on day ${dayOfMonth} of month ${month}, and day-of-week ${dayOfWeek}.`;
  }, [cronExpression, minute, hour, dayOfMonth, month, dayOfWeek]);

  const handlePreset = (expr: string) => {
    const parts = expr.split(" ");
    if (parts.length === 5) {
      setMinute(parts[0]);
      setHour(parts[1]);
      setDayOfMonth(parts[2]);
      setMonth(parts[3]);
      setDayOfWeek(parts[4]);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(cronExpression);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-100 text-[#e5322d] text-xs font-bold mb-4">
          <Terminal className="w-3.5 h-3.5" />
          DevOps &amp; System Automation Tool
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-3">
          Cron Expression Generator &amp; Explainer
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Build, validate, and understand standard Unix / Linux crontab expressions with instant human-readable descriptions.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        {/* Expression Output Banner */}
        <div className="p-5 bg-slate-900 text-white rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">Generated Crontab</span>
            <div className="text-2xl sm:text-3xl font-black font-mono tracking-wider text-red-400 mt-0.5">
              {cronExpression}
            </div>
            <p className="text-xs text-slate-300 mt-1">{humanReadable}</p>
          </div>

          <button
            onClick={handleCopy}
            className="px-4 py-2.5 bg-[#e5322d] hover:bg-[#cc241f] text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-2 shrink-0 cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
            {copied ? "Copied!" : "Copy Expression"}
          </button>
        </div>

        {/* Quick Presets */}
        <div className="flex flex-wrap items-center gap-2 pt-1 pb-3 border-b border-slate-100 text-xs">
          <span className="text-slate-400 font-bold">Quick Presets:</span>
          {[
            { label: "Every Minute", expr: "* * * * *" },
            { label: "Every 15 Mins", expr: "*/15 * * * *" },
            { label: "Hourly", expr: "0 * * * *" },
            { label: "Daily (Midnight)", expr: "0 0 * * *" },
            { label: "Daily (Noon)", expr: "0 12 * * *" },
            { label: "Weekly (Sunday)", expr: "0 0 * * 0" },
            { label: "Monthly (1st)", expr: "0 0 1 * *" },
          ].map((p) => (
            <button
              key={p.label}
              onClick={() => handlePreset(p.expr)}
              className="px-2.5 py-1 bg-slate-50 hover:bg-red-50 border border-slate-200 hover:border-red-200 text-slate-700 hover:text-red-600 rounded-lg text-[11px] font-medium transition-colors cursor-pointer"
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* 5 Field Selectors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-xs">
          <div className="space-y-1.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="font-bold text-slate-700 block">1. Minute (0-59)</span>
            <input
              type="text"
              value={minute}
              onChange={(e) => setMinute(e.target.value)}
              className="w-full p-2 bg-white border border-slate-200 rounded-lg font-mono font-bold text-center"
            />
            <span className="text-[10px] text-slate-400 block text-center">* or 0 or */5</span>
          </div>

          <div className="space-y-1.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="font-bold text-slate-700 block">2. Hour (0-23)</span>
            <input
              type="text"
              value={hour}
              onChange={(e) => setHour(e.target.value)}
              className="w-full p-2 bg-white border border-slate-200 rounded-lg font-mono font-bold text-center"
            />
            <span className="text-[10px] text-slate-400 block text-center">* or 0-23 or */2</span>
          </div>

          <div className="space-y-1.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="font-bold text-slate-700 block">3. Day of Month</span>
            <input
              type="text"
              value={dayOfMonth}
              onChange={(e) => setDayOfMonth(e.target.value)}
              className="w-full p-2 bg-white border border-slate-200 rounded-lg font-mono font-bold text-center"
            />
            <span className="text-[10px] text-slate-400 block text-center">* or 1-31</span>
          </div>

          <div className="space-y-1.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="font-bold text-slate-700 block">4. Month (1-12)</span>
            <input
              type="text"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="w-full p-2 bg-white border border-slate-200 rounded-lg font-mono font-bold text-center"
            />
            <span className="text-[10px] text-slate-400 block text-center">* or 1-12</span>
          </div>

          <div className="space-y-1.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="font-bold text-slate-700 block">5. Day of Week</span>
            <input
              type="text"
              value={dayOfWeek}
              onChange={(e) => setDayOfWeek(e.target.value)}
              className="w-full p-2 bg-white border border-slate-200 rounded-lg font-mono font-bold text-center"
            />
            <span className="text-[10px] text-slate-400 block text-center">0-6 (0 is Sunday)</span>
          </div>
        </div>

        {/* Privacy Note */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
          <span className="flex items-center gap-1.5 text-emerald-600 font-medium">
            <ShieldCheck className="w-4 h-4" /> 100% In-Browser Crontab Expression Parsing
          </span>
          <span className="text-[11px] text-slate-400">Standard POSIX Cron Format</span>
        </div>
      </div>
    </div>
  );
}
