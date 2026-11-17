import Link from "next/link";
import { ShieldCheck, Heart } from "lucide-react";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12 mb-16">
          {/* Brand Info */}
          <div className="col-span-2 md:col-span-4 lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-4 group">
              <Logo size={36} />
              <span className="text-xl font-black tracking-tight text-white">
                Sam<span className="text-[#e5322d]">Toolbox</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 max-w-sm mb-6 leading-relaxed">
              Enterprise-grade suite of 62+ free online PDF, document &amp; regional utility tools. All processing happens 100% locally in your web browser for absolute privacy and zero-latency performance.
            </p>
            <div className="flex items-center gap-3 text-xs text-slate-400">
              <span className="flex items-center gap-1.5 text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2.5 py-1 rounded-full font-medium">
                <ShieldCheck className="w-3.5 h-3.5" />
                Zero Server Uploads
              </span>
              <span>•</span>
              <span>100% Free</span>
            </div>
          </div>

          {/* Organize & Optimize */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Organize & Optimize
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link href="/tools/pdf-merge" className="hover:text-white transition-colors">Merge PDF</Link></li>
              <li><Link href="/tools/pdf-split" className="hover:text-white transition-colors">Split PDF</Link></li>
              <li><Link href="/tools/pdf-compress" className="hover:text-white transition-colors">Compress PDF</Link></li>
              <li><Link href="/tools/organize-pdf" className="hover:text-white transition-colors">Organize PDF</Link></li>
              <li><Link href="/tools/remove-pages" className="hover:text-white transition-colors">Remove Pages</Link></li>
              <li><Link href="/tools/repair-pdf" className="hover:text-white transition-colors">Repair PDF</Link></li>
            </ul>
          </div>

          {/* Convert Tools */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Convert PDF
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link href="/tools/image-to-pdf" className="hover:text-white transition-colors">JPG to PDF</Link></li>
              <li><Link href="/tools/word-to-pdf" className="hover:text-white transition-colors">Word to PDF</Link></li>
              <li><Link href="/tools/excel-to-pdf" className="hover:text-white transition-colors">Excel to PDF</Link></li>
              <li><Link href="/tools/powerpoint-to-pdf" className="hover:text-white transition-colors">PowerPoint to PDF</Link></li>
              <li><Link href="/tools/pdf-to-word" className="hover:text-white transition-colors">PDF to Word</Link></li>
              <li><Link href="/tools/pdf-to-jpg" className="hover:text-white transition-colors">PDF to JPG</Link></li>
            </ul>
          </div>

          {/* Edit & Security */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Edit & Security
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link href="/tools/rotate-pdf" className="hover:text-white transition-colors">Rotate PDF</Link></li>
              <li><Link href="/tools/pdf-watermark" className="hover:text-white transition-colors">Add Watermark</Link></li>
              <li><Link href="/tools/page-numbers" className="hover:text-white transition-colors">Add Page Numbers</Link></li>
              <li><Link href="/tools/sign-pdf" className="hover:text-white transition-colors">Sign PDF</Link></li>
              <li><Link href="/tools/protect-pdf" className="hover:text-white transition-colors">Protect PDF</Link></li>
              <li><Link href="/tools/unlock-pdf" className="hover:text-white transition-colors">Unlock PDF</Link></li>
            </ul>
          </div>

          {/* Pakistan & Global */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#e5322d] mb-4">
              Pakistan & Global
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link href="/tools/salary-tax-calculator" className="hover:text-white transition-colors font-medium">Salary Tax (FBR)</Link></li>
              <li><Link href="/tools/merit-calculator" className="hover:text-white transition-colors font-medium">University Merit</Link></li>
              <li><Link href="/tools/marla-converter" className="hover:text-white transition-colors font-medium">Marla Converter</Link></li>
              <li><Link href="/tools/zakat-calculator" className="hover:text-white transition-colors font-medium">Zakat Calculator</Link></li>
              <li><Link href="/tools/passport-photo-resizer" className="hover:text-white transition-colors">Passport Photo</Link></li>
              <li><Link href="/tools/invoice-generator" className="hover:text-white transition-colors">Commercial Invoice</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} SamToolbox. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <Link href="/about" className="hover:text-slate-300 transition-colors">About</Link>
            <Link href="/privacy" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-slate-300 transition-colors">Terms</Link>
            <Link href="/contact" className="hover:text-slate-300 transition-colors">Contact</Link>
            <Link href="/suleman-zaheer" className="text-slate-400 hover:text-red-400 font-medium transition-colors">Creator Dossier</Link>
            <span className="flex items-center gap-1 text-slate-400">
              Built with <Heart className="w-3 h-3 text-red-500 fill-red-500" /> for global productivity
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
