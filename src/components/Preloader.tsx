"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => setLoading(false), 800);
    }, 2800); // Slightly longer for 'Premium' feel

    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/40 backdrop-blur-3xl transition-all duration-1000 ${
        fadeOut ? "opacity-0 scale-110 blur-2xl" : "opacity-100 scale-100"
      }`}
    >
      <div className="relative flex flex-col items-center">
        {/* Advanced Industrial Loader */}
        <div className="relative w-56 h-56 flex items-center justify-center">
          {/* Static outer ring */}
          <div className="absolute inset-0 border-[1px] border-white/5 rounded-full"></div>
          
          {/* Inner orbit rings */}
          <div className="absolute inset-0 border-t-2 border-brand-500/30 rounded-full animate-spin [animation-duration:3s]"></div>
          <div className="absolute inset-4 border-r-2 border-indigo-400/40 rounded-full animate-spin [animation-direction:reverse] [animation-duration:4s]"></div>
          <div className="absolute inset-8 border-l-2 border-emerald-400/30 rounded-full animate-spin [animation-duration:2s]"></div>
          
          {/* Core Logo Container */}
          <div className="relative w-32 h-32 p-1 rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(37,99,235,0.4)] border border-white/10 bg-slate-900 group">
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-500/20 to-transparent animate-pulse"></div>
            <div className="relative w-full h-full rounded-2xl overflow-hidden animate-breathing">
              <Image
                src="/logo.jpg"
                alt="SamToolbox"
                fill
                className="object-cover"
                priority
              />
            </div>
            {/* Scanner line effect */}
            <div className="absolute inset-0 w-full h-1 bg-brand-500/40 blur-[2px] animate-scanline"></div>
          </div>
        </div>
        
        {/* Brand Reveal */}
        <div className="mt-16 text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-[2px] w-12 bg-gradient-to-r from-transparent via-brand-500 to-transparent opacity-50"></div>
            <span className="text-[11px] font-black tracking-[0.8em] text-brand-400 uppercase drop-shadow-brand">Vertical Integration</span>
            <div className="h-[2px] w-12 bg-gradient-to-r from-transparent via-brand-500 to-transparent opacity-50"></div>
          </div>
          
          <h2 className="text-6xl font-black tracking-tighter text-white drop-shadow-2xl">
            Sam<span className="text-transparent bg-clip-text bg-gradient-to-br from-brand-400 via-brand-600 to-indigo-500">Toolbox</span>
          </h2>
          
          <p className="mt-4 text-[12px] font-medium text-slate-500 tracking-[0.2em] italic uppercase opacity-60">Engine Protocol v4.0</p>
          
          <div className="flex gap-2 justify-center mt-10">
            <div className="w-2 h-2 bg-brand-500 rounded-full animate-ping [animation-duration:1.5s]"></div>
            <div className="w-2 h-2 bg-brand-500 rounded-full animate-ping [animation-delay:0.3s] [animation-duration:1.5s]"></div>
            <div className="w-2 h-2 bg-brand-500 rounded-full animate-ping [animation-delay:0.6s] [animation-duration:1.5s]"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
