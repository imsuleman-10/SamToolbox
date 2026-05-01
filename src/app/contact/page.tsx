import type { Metadata } from "next";
import { 
  Mail, MessageSquare, Send, ShieldCheck, 
  Clock, MapPin, Sparkles, ArrowRight, Zap,
  Activity, Globe, Terminal
} from "lucide-react";

export const metadata: Metadata = {
  title: "Contact SamToolbox | Get Support & Share Feedback",
  description: "Have a feature request or need help? Reach out to the SamToolbox team. We're here to help you get the most out of our privacy-first browser tools.",
  keywords: "contact samtoolbox, support, feature request, feedback, bug report",
};

export default function ContactPage() {
  return (
    <div className="bg-[#020617] min-h-screen selection:bg-rose-500/30 selection:text-rose-200 font-sans">
      
      {/* ══════════════════════════════════════
          HERO / HEADER
      ══════════════════════════════════════ */}
      <section className="relative pt-48 pb-32 px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        
        <div className="max-w-6xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-rose-500/10 border border-rose-500/20 rounded-full text-rose-400 font-black text-[10px] uppercase tracking-[0.4em] mb-12 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-700">
            <MessageSquare size={14} />
            Signal Input Terminal
          </div>
          <h1 className="text-6xl md:text-[8rem] font-black text-white tracking-tighter mb-10 leading-[0.8] animate-in fade-in slide-in-from-bottom-8 duration-700">
            Let's start a<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-orange-500 italic">conversation.</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto font-medium leading-relaxed animate-in fade-in duration-1000 delay-300">
            Have a suggestion, found a bug, or want to discuss a custom integration? 
            Our engineering team typically responds within <span className="text-white font-black italic">24 cycles.</span>
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════
          CONTACT GRID
      ══════════════════════════════════════ */}
      <section className="max-w-[1400px] mx-auto px-6 -mt-16 relative z-20 pb-40">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Contact Information Side */}
          <div className="lg:col-span-4 space-y-8 animate-in fade-in slide-in-from-left-12 duration-700">
            <div className="bg-[#0f172a] rounded-[3.5rem] border border-white/5 p-12 shadow-3xl shadow-black relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-rose-600/5 rounded-full blur-3xl" />
               <h3 className="text-2xl font-black text-white mb-10 uppercase tracking-tighter italic">Signal Points</h3>
              
               <div className="space-y-10">
                  <div className="flex gap-6 group/item">
                    <div className="w-14 h-14 bg-rose-500/10 text-rose-500 border border-rose-500/20 rounded-2xl flex items-center justify-center shrink-0 group-hover/item:scale-110 group-hover/item:bg-rose-500 group-hover/item:text-white transition-all duration-500">
                      <Mail size={24} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5">Direct Buffer</p>
                      <p className="text-white font-black text-lg tracking-tight">samstacktechs@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex gap-6 group/item">
                    <div className="w-14 h-14 bg-rose-500/10 text-rose-500 border border-rose-500/20 rounded-2xl flex items-center justify-center shrink-0 group-hover/item:scale-110 group-hover/item:bg-rose-500 group-hover/item:text-white transition-all duration-500">
                      <Clock size={24} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5">Processing Time</p>
                      <p className="text-white font-black text-lg tracking-tight">24 - 48 Standard Cycles</p>
                    </div>
                  </div>

                  <div className="flex gap-6 group/item">
                    <div className="w-14 h-14 bg-rose-500/10 text-rose-500 border border-rose-500/20 rounded-2xl flex items-center justify-center shrink-0 group-hover/item:scale-110 group-hover/item:bg-rose-500 group-hover/item:text-white transition-all duration-500">
                      <Globe size={24} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5">Origin Station</p>
                      <p className="text-white font-black text-lg tracking-tight">Global / Remote Sovereign</p>
                    </div>
                  </div>
               </div>
            </div>

            <div className="bg-gradient-to-br from-rose-600 to-orange-700 rounded-[3.5rem] p-12 text-white shadow-3xl shadow-black relative overflow-hidden group">
               <ShieldCheck size={180} className="absolute -right-10 -bottom-10 opacity-10 group-hover:rotate-12 transition-transform duration-1000" />
               <h4 className="text-2xl font-black mb-6 relative z-10 italic uppercase tracking-tighter leading-none">Integrity Lock</h4>
               <p className="text-rose-100 font-medium text-lg leading-relaxed mb-8 relative z-10">
                  All signal transmissions are encrypted. We never persist metadata longer than required for resolution.
               </p>
               <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] relative z-10 bg-black/20 w-fit px-4 py-2 rounded-full border border-white/10">
                 <Sparkles size={14} className="text-rose-200 animate-pulse" />
                 Sovereign Encryption Active
               </div>
            </div>
          </div>

          {/* Contact Form Side */}
          <div className="lg:col-span-8 animate-in fade-in slide-in-from-right-12 duration-700">
            <div className="bg-[#0f172a] rounded-[4rem] border border-white/5 p-10 md:p-20 shadow-3xl shadow-black relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-rose-500/50 to-transparent" />
               <form className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-3">
                    <label htmlFor="first_name" className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-4 italic">First Name</label>
                    <input 
                      type="text" 
                      id="first_name"
                      placeholder="JANE"
                      className="w-full px-8 py-6 bg-black/40 border border-white/5 rounded-2xl focus:border-rose-500/30 outline-none transition-all font-black text-white uppercase tracking-widest text-sm placeholder:text-slate-800"
                    />
                  </div>
                  <div className="space-y-3">
                    <label htmlFor="last_name" className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-4 italic">Last Name</label>
                    <input 
                      type="text" 
                      id="last_name"
                      placeholder="SMITH"
                      className="w-full px-8 py-6 bg-black/40 border border-white/5 rounded-2xl focus:border-rose-500/30 outline-none transition-all font-black text-white uppercase tracking-widest text-sm placeholder:text-slate-800"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label htmlFor="email" className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-4 italic">Signal Address</label>
                  <div className="relative group">
                    <Mail size={18} className="absolute left-8 top-1/2 -translate-y-1/2 text-slate-700 group-focus-within:text-rose-500 transition-colors" />
                    <input 
                      type="email" 
                      id="email"
                      placeholder="JANE@SOVEREIGN.IO"
                      className="w-full pl-20 pr-8 py-6 bg-black/40 border border-white/5 rounded-2xl focus:border-rose-500/30 outline-none transition-all font-black text-white uppercase tracking-widest text-sm placeholder:text-slate-800"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label htmlFor="subject" className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-4 italic">Subject Vector</label>
                  <div className="relative group">
                    <Activity size={18} className="absolute left-8 top-1/2 -translate-y-1/2 text-slate-700 group-focus-within:text-rose-500 transition-colors" />
                    <select 
                      id="subject"
                      className="w-full pl-20 pr-8 py-6 bg-black/40 border border-white/5 rounded-2xl focus:border-rose-500/30 outline-none transition-all font-black text-white uppercase tracking-widest text-sm appearance-none cursor-pointer"
                    >
                      <option className="bg-[#0f172a]">GENERAL INQUIRY</option>
                      <option className="bg-[#0f172a]">TECHNICAL SUPPORT</option>
                      <option className="bg-[#0f172a]">FEATURE SYNTHESIS</option>
                      <option className="bg-[#0f172a]">ANOMALY REPORT</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-3">
                  <label htmlFor="message" className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-4 italic">Payload Data</label>
                  <textarea 
                    id="message"
                    rows={6}
                    placeholder="INITIATING TRANSMISSION..."
                    className="w-full px-8 py-6 bg-black/40 border border-white/5 rounded-[2rem] focus:border-rose-500/30 outline-none transition-all font-medium text-white resize-none min-h-[200px] placeholder:text-slate-800"
                  ></textarea>
                </div>

                <button 
                  type="button"
                  className="group w-full inline-flex items-center justify-center gap-4 px-12 py-8 bg-white text-slate-900 font-black uppercase tracking-[0.4em] text-[11px] rounded-[2rem] shadow-3xl transition-all hover:scale-[1.02] active:scale-95 shadow-black"
                >
                  Broadcast Signal
                  <Send size={20} className="transition-transform group-hover:translate-x-2 group-hover:-translate-y-2" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          FAQ SHORTCUT
      ══════════════════════════════════════ */}
      <section className="py-40 px-6 border-t border-white/5 mt-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#0f172a]/20 pointer-events-none" />
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="w-20 h-20 bg-rose-500/10 border border-rose-500/20 rounded-2xl flex items-center justify-center text-rose-500 mb-10 mx-auto shadow-2xl">
            <Zap size={32} />
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tighter italic">Common Queries</h2>
          <p className="text-slate-500 font-black uppercase tracking-[0.5em] text-[10px] mb-20">Instant Resolution Buffer</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            {[
              { q: "IS SAMTOOLBOX PERMANENTLY FREE?", a: "AFFIRMATIVE. EVERY SYSTEM IN THE SUITE OPERATES ON A ZERO-COST MODEL FOR ALL USERS." },
              { q: "DATA SOVEREIGNTY STATUS?", a: "PROTECTED. ALL PROCESSING OCCURS IN LOCAL VOLATILE MEMORY. ZERO CLOUD UPLOADS." },
              { q: "ACCOUNT REGISTRATION REQUIRED?", a: "NEGATIVE. SYSTEM ACCESS IS UNRESTRICTED. NO IDENTITY BUFFERING NEEDED." },
              { q: "FEATURE REQUEST PROTOCOL?", a: "OPEN. USE THE SIGNAL FORM ABOVE TO SUBMIT NEW UTILITY ARCHITECTURES." }
            ].map((iq, i) => (
              <div key={i} className="bg-[#0f172a] p-10 rounded-[2.5rem] border border-white/5 hover:border-rose-500/20 transition-all group">
                <div className="flex items-start gap-4 mb-4">
                  <Terminal size={16} className="text-rose-500 shrink-0 mt-1" />
                  <h4 className="font-black text-white text-sm uppercase tracking-tight">{iq.q}</h4>
                </div>
                <p className="text-[12px] text-slate-500 leading-relaxed font-medium pl-8 group-hover:text-slate-400 transition-colors">{iq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
    </div>
  );
}
