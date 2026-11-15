"use client";

import React from "react";

interface LogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

export default function Logo({ className = "", size = 36, showText = false }: LogoProps) {
  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      {/* Pure SVG Vector Badge (Zero Image Assets) */}
      <div 
        className="relative shrink-0 flex items-center justify-center rounded-xl overflow-hidden shadow-md shadow-red-500/20 transition-transform duration-200 group-hover:scale-105"
        style={{ width: size, height: size }}
      >
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Subtle Outer Gradient Background */}
          <rect width="48" height="48" rx="12" fill="url(#brandGradient)" />

          {/* Precision Toolbox / Document Geometry */}
          {/* Document Fold Base */}
          <path
            d="M13 10C13 8.89543 13.8954 8 15 8H28L35 15V38C35 39.1046 34.1046 40 33 40H15C13.8954 40 13 39.1046 13 38V10Z"
            fill="white"
            fillOpacity="0.16"
          />
          {/* Fold Corner Accent */}
          <path
            d="M28 8V14C28 14.5523 28.4477 15 29 15H35"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Central Stylized "S" / Precision Tool Core */}
          <path
            d="M30 19H20C18.3431 19 17 20.3431 17 22C17 23.6569 18.3431 25 20 25H28C29.6569 25 31 26.3431 31 28C31 29.6569 29.6569 31 28 31H18"
            stroke="white"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Dynamic Tool Accent Node */}
          <circle cx="31" cy="19" r="1.8" fill="#FDE047" />
          <circle cx="17" cy="31" r="1.8" fill="#FDE047" />

          {/* Gradient Definition */}
          <defs>
            <linearGradient id="brandGradient" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#EF4444" />
              <stop offset="50%" stopColor="#E5322D" />
              <stop offset="100%" stopColor="#B91C1C" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {showText && (
        <span className="text-xl font-black tracking-tight text-slate-900 group-hover:text-slate-800 transition-colors">
          Sam<span className="text-[#e5322d]">Toolbox</span>
        </span>
      )}
    </div>
  );
}
