"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ArrowRight, LayoutGrid, Info, Mail, Zap } from "lucide-react";
import Logo from "./Logo";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Tools", href: "/tools", icon: <LayoutGrid size={18} /> },
    { name: "GPA Suite", href: "/tools/gpa-calculator", icon: <Zap size={18} /> },
    { name: "Forge CV", href: "/tools/cv-maker", icon: <ArrowRight size={18} /> },
    { name: "About", href: "/about", icon: <Info size={18} /> },
    { name: "Contact", href: "/contact", icon: <Mail size={18} /> },
  ];

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          isScrolled 
            ? "bg-[#020617]/80 backdrop-blur-2xl border-b border-white/5 py-3" 
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-4 group">
            <Logo size={42} className="group-hover:scale-110 transition-transform duration-500" />
            <span className="text-xl font-black tracking-tighter text-white uppercase italic">
              SAM<span className="text-blue-500">ToolBox</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                className="text-[11px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-all duration-300 flex items-center gap-2 hover:scale-110 active:scale-95"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="lg:hidden p-3 bg-white/5 border border-white/10 rounded-2xl text-white hover:bg-white/10 transition-all"
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 z-[200] bg-[#020617] transition-all duration-700 ease-in-out ${
          isMenuOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0 pointer-events-none"
        }`}
      >
        {/* Decorative Background */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        
        <div className="relative h-full flex flex-col p-8 sm:p-20 overflow-y-auto">
          <div className="flex items-center justify-between mb-12 sm:mb-20 shrink-0">
            <div className="flex items-center gap-4">
              <Logo size={40} />
              <span className="text-xl font-black text-white uppercase italic tracking-tighter">SAM<span className="text-blue-500">ToolBox</span></span>
            </div>
            <button 
              onClick={() => setIsMenuOpen(false)}
              className="p-4 bg-white/5 border border-white/10 rounded-2xl text-white hover:bg-blue-500 transition-all"
            >
              <X size={32} />
            </button>
          </div>

          <div className="flex-1 flex flex-col justify-center space-y-4 sm:space-y-8">
             <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.5em] mb-4">Navigation Protocol</p>
             {navLinks.map((link, i) => (
               <Link 
                 key={link.name}
                 href={link.href}
                 onClick={() => setIsMenuOpen(false)}
                 className="group flex items-center justify-between py-4 sm:py-6 border-b border-white/5"
               >
                  <div className="flex items-center gap-4 sm:gap-8">
                     <div className="text-slate-700 font-black text-xl sm:text-2xl tracking-tighter italic group-hover:text-blue-500 transition-colors">0{i+1}</div>
                     <span className="text-2xl sm:text-6xl font-black text-white uppercase tracking-tighter group-hover:italic transition-all">{link.name}</span>
                  </div>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/5 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-4 transition-all duration-500">
                     <ArrowRight size={24} />
                  </div>
               </Link>
             ))}
          </div>

          <div className="mt-auto pt-10 border-t border-white/5 flex items-center justify-between text-slate-500 shrink-0">
             <p className="text-[10px] font-black uppercase tracking-widest">© 2026 SAMToolBox Sovereign</p>
             <div className="flex gap-6">
                <Link href="/tools" className="hover:text-white transition-colors"><LayoutGrid size={18} /></Link>
                <Link href="/tools/gpa-calculator" className="hover:text-white transition-colors"><Zap size={18} /></Link>
             </div>
          </div>
        </div>
      </div>
    </>
  );
}
