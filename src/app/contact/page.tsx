import type { Metadata } from "next";
import { 
  Mail, MessageSquare, Send, ShieldCheck, 
  Clock, MapPin, Sparkles, ArrowRight 
} from "lucide-react";

export const metadata: Metadata = {
  title: "Contact SamToolbox | Get Support & Share Feedback",
  description: "Have a feature request or need help? Reach out to the SamToolbox team. We're here to help you get the most out of our privacy-first browser tools.",
  keywords: "contact samtoolbox, support, feature request, feedback, bug report",
};

export default function ContactPage() {
  return (
    <div className="bg-white min-h-screen selection:bg-brand-100 selection:text-brand-900">
      
      {/* ══════════════════════════════════════
          HERO / HEADER
      ══════════════════════════════════════ */}
      <section className="relative pt-24 pb-20 px-6 overflow-hidden bg-slate-900">
         {/* Background Decoration */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-500/10 blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-5xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-brand-400 font-bold text-[10px] uppercase tracking-[0.4em] mb-8">
            <MessageSquare size={12} />
            Get In Touch
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-6">
            Let's start a<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-blue-400">conversation.</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto font-medium">
            Have a suggestion, found a bug, or want to discuss a custom integration? 
            Our team typically responds within 24 hours.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════
          CONTACT GRID
      ══════════════════════════════════════ */}
      <section className="max-w-6xl mx-auto px-6 -mt-12 relative z-20 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Contact Information Side */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-xl">
              <h3 className="text-xl font-black text-slate-900 mb-6">Contact Info</h3>
              
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-brand-50 text-brand-600 rounded-2xl flex items-center justify-center shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Email Us</p>
                    <p className="text-slate-900 font-bold">samstacktechs@gmail.com</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center shrink-0">
                    <Clock size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Response Time</p>
                    <p className="text-slate-900 font-bold">Within 24-48 Hours</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Location</p>
                    <p className="text-slate-900 font-bold">Global / Remote</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-brand-600 rounded-3xl p-8 text-white shadow-xl shadow-brand-600/20 relative overflow-hidden group">
              <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
                <ShieldCheck size={160} />
              </div>
              <h4 className="text-xl font-black mb-4 relative z-10">Your privacy is safe.</h4>
              <p className="text-brand-100 text-sm leading-relaxed mb-6 relative z-10">
                We never store your personal data or the contents of your messages on public servers for longer than necessary to help you.
              </p>
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest relative z-10">
                <Sparkles size={14} className="text-brand-200" />
                100% Secure Encoding
              </div>
            </div>
          </div>

          {/* Contact Form Side */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-[2.5rem] border border-slate-200 p-8 md:p-12 shadow-2xl">
              <form className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label htmlFor="first_name" className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">First Name</label>
                    <input 
                      type="text" 
                      id="first_name"
                      placeholder="Jane"
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 outline-none transition-all font-medium text-slate-900"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="last_name" className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Last Name</label>
                    <input 
                      type="text" 
                      id="last_name"
                      placeholder="Smith"
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 outline-none transition-all font-medium text-slate-900"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                  <input 
                    type="email" 
                    id="email"
                    placeholder="jane@example.com"
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 outline-none transition-all font-medium text-slate-900"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Subject</label>
                  <select 
                    id="subject"
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 outline-none transition-all font-medium text-slate-900 appearance-none"
                  >
                    <option>General Inquiry</option>
                    <option>Technical Support</option>
                    <option>Feature Request</option>
                    <option>Bug Report</option>
                    <option>Partnership</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Message</label>
                  <textarea 
                    id="message"
                    rows={6}
                    placeholder="How can we help you today?"
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 outline-none transition-all font-medium text-slate-900 resize-none"
                  ></textarea>
                </div>

                <button 
                  type="button"
                  className="group w-full inline-flex items-center justify-center gap-3 px-10 py-5 bg-brand-600 hover:bg-brand-500 text-white font-black uppercase tracking-widest text-xs rounded-2xl shadow-xl shadow-brand-600/40 transition-all hover:scale-[1.02] active:scale-95"
                >
                  Send Message
                  <Send size={16} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          FAQ SHORTCUT
      ══════════════════════════════════════ */}
      <section className="bg-slate-50 py-24 px-6 border-t border-slate-100 mt-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-black text-slate-900 mb-4">Common Questions</h2>
          <p className="text-slate-500 font-medium mb-12">Maybe we've already answered your question?</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            {[
              { q: "Is SamToolbox really free?", a: "Yes, every tool is 100% free with no hidden charges." },
              { q: "Are my files safe?", a: "Yes, files never leave your browser. Processing is 100% local." },
              { q: "Do I need an account?", a: "No account required. Use any tool instantly." },
              { q: "Can I request a feature?", a: "Absolutely! Use the form above to let us know." }
            ].map((iq, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200">
                <h4 className="font-bold text-slate-900 mb-2">{iq.q}</h4>
                <p className="text-sm text-slate-500 leading-relaxed font-medium">{iq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
    </div>
  );
}
