import Link from "next/link";
import Image from "next/image";
import { Globe, Share2, Link2, Heart, ShieldCheck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-white/5 pt-20 pb-10 overflow-hidden relative">
      {/* Decorative Blob */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-500/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">
          
          {/* Brand Section */}
          <div className="lg:col-span-4 flex flex-col items-center md:items-start text-center md:text-left">
            <Link href="/" className="flex items-center gap-3.5 mb-8 group">
              <div className="relative w-12 h-12 rounded-2xl overflow-hidden shadow-2xl group-hover:scale-110 transition-transform duration-500 border border-white/10 bg-white/5">
                <Image 
                  src="/logo.jpg" 
                  alt="SamToolbox Logo" 
                  fill 
                  className="object-cover scale-110"
                />
              </div>
              <span className="font-extrabold text-2xl tracking-tighter text-white uppercase">
                SAM<span className="text-brand-500">TOOLBOX</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm mb-10">
              The professional suite of browser-based utilities. All tools process data locally—your files never leave your sight. Privacy isn&apos;t just a feature, it&apos;s our foundation.
            </p>
            
            <div className="flex gap-4">
            {[Share2, Globe, Link2].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-brand-600 hover:text-white transition-all">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-10">
            <div>
              <h4 className="text-white font-black text-[10px] uppercase tracking-[0.3em] mb-8">Popular Tools</h4>
              <ul className="space-y-4">
                {[
                  { label: "CV Maker", href: "/tools/cv-maker" },
                  { label: "QR Generator", href: "/tools/qr-generator" },
                  { label: "Image Converter", href: "/tools/image-converter" },
                  { label: "PDF Suite", href: "/tools/pdf-merge" },
                  { label: "Text Analysis", href: "/tools/word-counter" }
                ].map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-slate-500 hover:text-brand-400 transition-colors text-sm font-medium">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-black text-[10px] uppercase tracking-[0.3em] mb-8">Platform</h4>
              <ul className="space-y-4">
                {[
                  { label: "Explore Tools", href: "/tools" },
                  { label: "Our Mission", href: "/about" },
                  { label: "Get Support", href: "/contact" },
                  { label: "Privacy Policy", href: "#" },
                  { label: "Terms of Use", href: "#" }
                ].map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-slate-500 hover:text-brand-400 transition-colors text-sm font-medium">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                <div className="flex items-center gap-2 text-brand-400 font-bold text-[10px] uppercase tracking-widest mb-4">
                  <ShieldCheck size={14} />
                  Privacy Locked
                </div>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  We leverage <b>Local Compute</b> to handle your sensitive data. No trackers. No cookies. No logs.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-500 text-xs font-medium tracking-wide">
            &copy; {new Date().getFullYear()} SamToolbox. Developed with <Heart size={12} className="inline text-rose-500 mx-1" fill="currentColor" /> for the community.
          </p>
          <div className="flex items-center gap-6">
             <div className="flex items-center gap-2 px-3 py-1.5 bg-brand-500/10 border border-brand-500/20 rounded-full text-brand-400 font-bold text-[9px] uppercase tracking-widest">
               <div className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />
               V2.0 PRO RELEASE
             </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
