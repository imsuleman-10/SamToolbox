"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-[100] w-full bg-white border-b border-slate-200/60 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between h-16 sm:h-20 items-center">
          {/* Logo Section */}
          <div className="flex shrink-0 items-center">
            <Link href="/" className="flex items-center gap-2 sm:gap-3 group" onClick={() => setIsOpen(false)}>
              <div className="relative w-10 sm:w-12 h-10 sm:h-12 rounded-xl overflow-hidden shadow-sm border border-slate-100 bg-white">
                <Image
                  src="/logo.jpg"
                  alt="SamToolbox Logo"
                  fill
                  priority
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-black text-lg sm:text-2xl tracking-tighter text-slate-900 leading-none uppercase">
                  Sam<span className="text-brand-600">Toolbox</span>
                </span>
                <span className="text-[8px] font-bold text-slate-400 uppercase tracking-[0.3em] mt-1 hidden sm:block">Industrial Tools</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation (Visible on Large Screens) */}
          <div className="hidden lg:flex items-center gap-8 xl:gap-12">
            {[
              { label: "Tools", href: "/tools" },
              { label: "About", href: "/about" },
              { label: "Contact", href: "/contact" },
            ].map((link) => (
              <Link 
                key={link.label}
                href={link.href} 
                className="text-xs font-black text-slate-500 hover:text-brand-600 transition-colors uppercase tracking-widest"
              >
                {link.label}
              </Link>
            ))}
            
            <Link 
              href="/tools/cv-maker" 
              className="bg-brand-600 hover:bg-brand-700 text-white px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-brand-200 active:scale-95 flex items-center gap-2"
            >
              Build CV
              <ChevronRight size={14} />
            </Link>
          </div>

          {/* Mobile/Tablet Menu Toggle */}
          <div className="flex lg:hidden items-center gap-3">
            <Link 
              href="/tools/cv-maker" 
              className="sm:flex hidden bg-slate-900 text-white px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest active:scale-95 transition-all"
            >
              CV Maker
            </Link>
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-xl bg-slate-50 border border-slate-200 active:scale-95 transition-all"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={20} className="text-brand-600" /> : <Menu size={20} className="text-slate-900" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile/Tablet Menu Overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-[101] bg-white pt-[env(safe-area-inset-top)] animate-in slide-in-from-top duration-300">
          <div className="flex flex-col h-full">
            {/* Menu Header */}
            <div className="flex items-center justify-between px-6 h-16 border-b border-slate-100">
              <span className="font-black text-lg tracking-tighter text-slate-900 uppercase">
                Menu <span className="text-brand-600">Options</span>
              </span>
              <button 
                onClick={() => setIsOpen(false)} 
                className="p-2 rounded-xl bg-slate-50 border border-slate-200"
              >
                <X size={22} className="text-slate-900" />
              </button>
            </div>

            {/* Navigation List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {[
                { label: "All Tools", href: "/tools" },
                { label: "About Us", href: "/about" },
                { label: "Contact Us", href: "/contact" },
              ].map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="flex items-center justify-between p-5 rounded-2xl bg-slate-50 border border-slate-100/50 active:bg-slate-100 transition-all group"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="text-sm font-black text-slate-900 uppercase tracking-widest">{link.label}</span>
                  <ChevronRight size={18} className="text-slate-300 group-hover:text-brand-600 transition-colors" />
                </Link>
              ))}

              <div className="pt-4">
                <Link
                  href="/tools/cv-maker"
                  className="flex items-center justify-center gap-3 w-full py-5 rounded-2xl bg-brand-600 text-white font-black uppercase tracking-widest text-sm shadow-xl shadow-brand-200 active:scale-[0.98] transition-all"
                  onClick={() => setIsOpen(false)}
                >
                  Build CV Maker
                  <ChevronRight size={18} />
                </Link>
              </div>
            </div>

            <div className="p-8 border-t border-slate-50 text-center">
              <p className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.5em]">
                SamToolbox v2.0
              </p>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
