import Link from "next/link";
import Image from "next/image";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6">
      <div className="relative mb-12">
        {/* Animated Background Elements */}
        <div className="absolute -inset-10 bg-brand-500 opacity-5 blur-[100px] rounded-full animate-pulse"></div>
        <div className="relative">
          <h1 className="text-[12rem] font-black text-slate-100 leading-none">404</h1>
          <div className="absolute inset-0 flex items-center justify-center translate-y-4">
             <div className="relative w-48 h-48 rounded-full overflow-hidden shadow-2xl border-8 border-white">
                <Image 
                  src="/logo.jpg" 
                  alt="404" 
                  fill 
                  className="object-cover"
                />
             </div>
          </div>
        </div>
      </div>

      <h2 className="text-4xl font-extrabold text-slate-800 mb-4 tracking-tight">
        You've wandered into the <span className="text-brand-600">void</span>.
      </h2>
      <p className="text-slate-500 text-lg mb-10 max-w-md mx-auto leading-relaxed">
        The tool you're looking for either doesn't exist yet or has been moved to a new location in the toolbox.
      </p>

      <div className="flex flex-wrap justify-center gap-4">
        <Link
          href="/"
          className="flex items-center gap-2 px-8 py-4 bg-brand-600 text-white font-bold rounded-2xl shadow-xl hover:bg-brand-700 hover:shadow-brand-200 transition-all duration-300 transform hover:-translate-y-1"
        >
          <Home size={20} />
          Back to Dashboard
        </Link>
        <Link
          href="/tools"
          className="flex items-center gap-2 px-8 py-4 bg-white text-slate-700 border-2 border-slate-100 font-bold rounded-2xl hover:border-brand-500 hover:text-brand-600 transition-all duration-300"
        >
          <ArrowLeft size={20} />
          View All Tools
        </Link>
      </div>

      <div className="mt-20 opacity-30 flex items-center gap-2 grayscale">
         <div className="w-10 h-1 bg-slate-400 rounded-full"></div>
         <span className="text-xs font-black uppercase tracking-widest text-slate-500">SamToolbox Security</span>
         <div className="w-10 h-1 bg-slate-400 rounded-full"></div>
      </div>
    </div>
  );
}
