"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-[100] w-full bg-white/95 backdrop-blur-2xl border-b border-slate-200/60 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
        <div className="flex justify-between h-16 sm:h-20 items-center">
          <div className="flex shrink-0 items-center">
            <Link href="/" className="flex items-center gap-2 sm:gap-4 group">
              <div className="relative w-12 sm:w-16 h-12 sm:h-16 rounded-xl sm:rounded-2xl overflow-hidden shadow-lg sm:shadow-2xl shadow-brand-600/20 group-hover:scale-110 transition-all duration-500 border border-slate-200 bg-white">
                <Image
                  src="/logo.jpg"
                  alt="SamToolbox Logo"
                  fill
                  priority
                  className="object-cover scale-110 group-hover:scale-125 transition-all duration-700"
                />
              </div>
              <span className="font-extrabold text-xl sm:text-3xl tracking-tighter text-slate-900 flex items-center">
                <span className="hidden xs:inline">SAM</span><span className="text-brand-600">TOOLBOX</span>
                <div className="ml-1 sm:ml-2 w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-brand-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-6 lg:gap-10">
            {[
              { label: "All Tools", href: "/tools" },
              { label: "About", href: "/about" },
              { label: "Contact", href: "/contact" },
            ].map((link) => (
              <Link 
                key={link.label}
                href={link.href} 
                className="relative text-[11px] lg:text-sm font-black text-slate-600 hover:text-brand-600 transition-colors uppercase tracking-[0.15em] group py-2"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-1 bg-brand-600 transition-all duration-300 group-hover:w-full rounded-full" />
              </Link>
            ))}
            
            <Link 
              href="/tools/cv-maker" 
              className="bg-brand-600 hover:bg-brand-700 text-white px-5 lg:px-6 py-2.5 lg:py-3 rounded-lg lg:rounded-xl text-[10px] font-black uppercase tracking-[0.15em] transition-all hover:shadow-[0_12px_32px_rgba(37,99,235,0.3)] active:scale-95 flex items-center gap-2 group"
            >
              <span className="hidden lg:inline">Build</span> CV
              <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg bg-slate-100 hover:bg-slate-200 transition-all active:scale-95"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} className="text-slate-900" /> : <Menu size={20} className="text-slate-900" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden fixed inset-0 top-16 sm:top-20 left-0 right-0 bg-white border-t border-slate-200 animate-in fade-in slide-in-from-top-2 duration-300 z-50">
            <div className="flex flex-col gap-1 px-4 py-4">
              {[
                { label: "All Tools", href: "/tools" },
                { label: "About", href: "/about" },
                { label: "Contact", href: "/contact" },
              ].map((link) => (
                <Link 
                  key={link.label}
                  href={link.href} 
                  className="text-sm font-bold text-slate-700 hover:text-brand-600 hover:bg-brand-50 transition-all uppercase tracking-widest py-3 px-3 rounded-lg"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              
              <div className="h-px bg-slate-100 my-3" />
              
              <Link 
                href="/tools/cv-maker" 
                className="bg-brand-600 hover:bg-brand-700 text-white px-6 py-3 rounded-lg text-sm font-black uppercase tracking-wider transition-all active:scale-95 flex items-center justify-center gap-2 group"
                onClick={() => setIsOpen(false)}
              >
                Build CV
                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
