import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-[100] w-full bg-white/70 backdrop-blur-2xl border-b border-slate-200/50">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="flex justify-between h-20 items-center">
          <div className="flex shrink-0 items-center">
            <Link href="/" className="flex items-center gap-4 group">
              <div className="relative w-16 h-16 rounded-2xl overflow-hidden shadow-2xl shadow-brand-600/20 group-hover:scale-110 transition-transform duration-500 border border-slate-200 bg-white">
                <Image
                  src="/logo.jpg"
                  alt="SamToolbox Logo"
                  fill
                  className="object-cover scale-110 group-hover:scale-125 transition-transform duration-700"
                />
              </div>
              <span className="font-extrabold text-3xl tracking-tighter text-slate-900 flex items-center">
                SAM<span className="text-brand-600">TOOLBOX</span>
                <div className="ml-2 w-1.5 h-1.5 rounded-full bg-brand-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-10">
            {[
              { label: "All Tools", href: "/tools" },
              { label: "About", href: "/about" },
              { label: "Contact", href: "/contact" },
            ].map((link) => (
              <Link 
                key={link.label}
                href={link.href} 
                className="relative text-sm font-black text-slate-500 hover:text-slate-900 transition-colors uppercase tracking-[0.2em] group py-2"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-600 transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
            
            <Link 
              href="/tools/cv-maker" 
              className="bg-slate-900 hover:bg-brand-600 text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:shadow-[0_10px_30px_rgba(37,99,235,0.2)] flex items-center gap-2 group"
            >
              Build CV
              <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Mobile Menu Toggle (Simplified for now) */}
          <button className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
            <div className="w-5 h-0.5 bg-slate-900 rounded-full" />
            <div className="w-5 h-0.5 bg-slate-900 rounded-full" />
            <div className="w-3 h-0.5 bg-slate-900 rounded-full self-start ml-2.5" />
          </button>
        </div>
      </div>
    </nav>
  );
}
