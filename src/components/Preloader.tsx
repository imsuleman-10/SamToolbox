"use client";

import { useEffect, useState } from "react";
import Logo from "./Logo";

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => setLoading(false), 300);
    }, 250);

    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white transition-opacity duration-300 ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="flex items-center gap-3 mb-6">
        <Logo size={42} />
        <span className="text-2xl font-black tracking-tight text-slate-900">
          Sam<span className="text-[#e5322d]">Toolbox</span>
        </span>
      </div>

      <div className="w-48 h-1 bg-slate-100 rounded-full overflow-hidden">
        <div className="h-full bg-[#e5322d] animate-[loading-bar_1s_ease-in-out_infinite]" />
      </div>

      <style jsx global>{`
        @keyframes loading-bar {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(20%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}
