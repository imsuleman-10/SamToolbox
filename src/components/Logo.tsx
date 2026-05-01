"use client";

import React from "react";

interface LogoProps {
  className?: string;
  size?: number;
  animated?: boolean;
}

export default function Logo({ className = "", size = 40, animated = true }: LogoProps) {
  return (
    <div 
      className={`relative flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`w-full h-full ${animated ? "animate-[float_6s_ease-in-out_infinite]" : ""}`}
      >
        <defs>
          <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#1d4ed8" />
          </linearGradient>
          <radialGradient id="logo-glow" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(50 50) rotate(90) scale(40)">
            <stop stopColor="#3b82f6" />
            <stop offset="1" stopColor="#3b82f6" stopOpacity="0" />
          </radialGradient>
          <filter id="neon-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer Hexagon Frame */}
        <path
          d="M50 5L90 27.5V72.5L50 95L10 72.5V27.5L50 5Z"
          stroke="url(#logo-gradient)"
          strokeWidth="2"
          className={`opacity-20 origin-center ${animated ? "animate-[rotate-slow_20s_linear_infinite]" : ""}`}
        />
        
        {/* Animated Dash Border */}
        <path
          d="M50 5L90 27.5V72.5L50 95L10 72.5V27.5L50 5Z"
          stroke="url(#logo-gradient)"
          strokeWidth="4"
          strokeDasharray="300"
          strokeDashoffset="300"
          className={`${animated ? "animate-[dash_4s_linear_infinite]" : ""}`}
          strokeLinecap="round"
          filter="url(#neon-glow)"
        />

        {/* Industrial Core */}
        <path
          d="M30 35H70L50 65H30L50 35Z"
          fill="url(#logo-gradient)"
          className={`opacity-10 ${animated ? "animate-pulse" : ""}`}
        />
        
        {/* Central S-Zap Symbol */}
        <path
          d="M60 20L35 50H65L40 80"
          stroke="white"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#neon-glow)"
          className={animated ? "animate-[pulse_2s_ease-in-out_infinite]" : ""}
        />
      </svg>
      
      {/* Background Glow */}
      {animated && (
        <div className="absolute inset-0 bg-blue-600/10 blur-2xl rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-1000" />
      )}

      <style jsx>{`
        @keyframes dash {
          to {
            stroke-dashoffset: 0;
          }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg) scale(1); }
          50% { transform: translateY(-10px) rotate(2deg) scale(1.02); }
        }
        @keyframes rotate-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
