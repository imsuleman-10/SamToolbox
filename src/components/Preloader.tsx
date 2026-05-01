"use client";

import { useEffect, useState } from "react";
import Logo from "./Logo";

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => setLoading(false), 500);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-[#020617] transition-all duration-700 ease-in-out ${
        fadeOut ? "opacity-0 scale-105 pointer-events-none" : "opacity-100 scale-100"
      }`}
    >
      {/* Industrial Scanline Effect */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" 
           style={{ backgroundImage: "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(59, 130, 246, 0.06), rgba(37, 99, 235, 0.02), rgba(29, 78, 216, 0.06))", backgroundSize: "100% 2px, 3px 100%" }} />
      
      <div className="relative flex flex-col items-center">
        {/* Modern Industrial Logo Loader */}
        <div className="relative mb-16 group">
          <div className="absolute inset-0 bg-blue-500/20 blur-[60px] rounded-full animate-pulse" />
          <Logo size={140} className="relative z-10 drop-shadow-[0_0_50px_rgba(59,130,246,0.4)]" />
        </div>

        <div className="flex flex-col items-center relative z-10">
          <h1 className="text-5xl font-black tracking-tighter text-white uppercase italic mb-4">
            SAM<span className="text-blue-500">ToolBox</span>
          </h1>
          <div className="flex items-center gap-4">
             <div className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
             <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.8em] italic">
               System Initialization
             </span>
          </div>
        </div>

        {/* Loading Progress Bar */}
        <div className="absolute bottom-[-80px] w-64 h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5 shadow-2xl">
          <div className="h-full bg-gradient-to-r from-blue-600 via-blue-400 to-blue-600 animate-[loading-bar_1.5s_ease-in-out_infinite]" />
        </div>
      </div>

      <style jsx global>{`
        @keyframes loading-bar {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}
