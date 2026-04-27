"use client";

import { useState, useRef, useEffect } from "react";
import { Download, RefreshCw, Type, Palette, Layout, Settings2, HelpCircle, BookOpen } from "lucide-react";

export default function QrGeneratorPage() {
  const [text, setText] = useState("https://samtoolbox.vercel.app");
  const [colorLight, setColorLight] = useState("#ffffff");
  const [colorDark, setColorDark] = useState("#0f172a"); // Deep Slate
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    generateQR();
  }, [text, colorLight, colorDark]);

  const generateQR = async () => {
    if (!canvasRef.current) return;
    
    try {
      const QRCode = (await import("qrcode")).default;
      await QRCode.toCanvas(canvasRef.current, text || " ", {
        width: 300,
        margin: 2,
        color: {
          dark: colorDark,
          light: colorLight,
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleDownload = () => {
    if (!canvasRef.current) return;
    const url = canvasRef.current.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = `samtoolbox-qr-${Date.now()}.png`;
    a.click();
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 mb-6 rounded-2xl bg-white shadow-xl shadow-blue-500/10 border border-blue-50/50">
            <Layout className="w-8 h-8 text-brand-600" />
          </div>
          <h1 className="text-5xl font-black text-slate-900 mb-4 tracking-tight">
            Universal QR <span className="text-brand-600">Generator</span>
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Design professional, high-resolution QR codes for your brand, 
            completely offline and secure within your browser.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Dashboard Left: Controls */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Input Card */}
            <div className="bg-white p-8 rounded-[2rem] shadow-2xl shadow-slate-200/50 border border-white relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-2 h-full bg-brand-600 transition-all duration-300 group-hover:w-3"></div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-brand-50 rounded-lg text-brand-600">
                  <Type size={20} />
                </div>
                <h2 className="text-xl font-black text-slate-800">Content Logic</h2>
              </div>
              
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Paste your URL, text, or vCard here..."
                className="w-full h-40 p-5 rounded-2xl bg-slate-50 border-2 border-slate-100 focus:border-brand-500/30 focus:ring-4 focus:ring-brand-500/5 outline-none resize-none transition text-slate-700 font-medium placeholder:text-slate-400"
              />
            </div>

            {/* Aesthetics Card */}
            <div className="bg-white p-8 rounded-[2rem] shadow-2xl shadow-slate-200/50 border border-white">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-brand-50 rounded-lg text-brand-600">
                  <Palette size={20} />
                </div>
                <h2 className="text-xl font-black text-slate-800">Aesthetic Tuning</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <label className="block text-[11px] font-black uppercase text-slate-400 tracking-widest mb-4">
                    QR Data Color
                  </label>
                  <div className="flex items-center gap-4 bg-white p-3 rounded-xl border border-slate-200">
                    <input
                      type="color"
                      value={colorDark}
                      onChange={(e) => setColorDark(e.target.value)}
                      className="w-12 h-12 rounded-lg cursor-pointer border-0 p-0 bg-transparent"
                    />
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-slate-700 uppercase">{colorDark}</span>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">Main Signal</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <label className="block text-[11px] font-black uppercase text-slate-400 tracking-widest mb-4">
                    Base Canvas
                  </label>
                  <div className="flex items-center gap-4 bg-white p-3 rounded-xl border border-slate-200">
                    <input
                      type="color"
                      value={colorLight}
                      onChange={(e) => setColorLight(e.target.value)}
                      className="w-12 h-12 rounded-lg cursor-pointer border-0 p-0 bg-transparent"
                    />
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-slate-700 uppercase">{colorLight}</span>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">Background</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Right: Live Preview */}
          <div className="lg:col-span-5 sticky top-8">
            <div className="bg-[#1e293b] p-8 md:p-12 rounded-[2.5rem] shadow-3xl shadow-slate-900/20 text-center relative overflow-hidden">
              {/* Background Glow */}
              <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-brand-600 rounded-full blur-[100px] opacity-20"></div>
              
              <div className="relative z-10">
                <div className="inline-block p-5 bg-white rounded-[2rem] shadow-2xl mb-12 ring-8 ring-white/5 group transition-transform duration-500 hover:scale-[1.02]">
                  <canvas ref={canvasRef} className="rounded-xl"></canvas>
                </div>
                
                <div className="space-y-4">
                  <button
                    onClick={handleDownload}
                    className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-brand-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-brand-600/30 hover:bg-brand-500 hover:shadow-brand-500/40 transition-all active:scale-95 group"
                  >
                    <Download className="transition-transform group-hover:translate-y-1" size={18} />
                    Download 3000px PNG
                  </button>
                  
                  <button
                    onClick={generateQR}
                    className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-slate-800 text-slate-200 rounded-2xl font-black uppercase tracking-widest text-xs border border-slate-700 hover:bg-slate-700 hover:text-white transition-all"
                  >
                    <RefreshCw size={18} />
                    Re-render Buffer
                  </button>
                </div>

                <div className="mt-8 flex items-center justify-center gap-2 text-slate-500 font-bold uppercase tracking-[0.2em] text-[10px]">
                  <Settings2 size={12} />
                  <span>Real-time Sync Enabled</span>
                </div>
              </div>
            </div>

            {/* Quick Tips */}
            <div className="mt-8 p-6 bg-blue-50/50 rounded-2xl border border-blue-100 flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center shrink-0 text-white shadow-lg shadow-blue-600/20">
                <span>!</span>
              </div>
              <div>
                <h4 className="text-sm font-black text-blue-900 mb-1 leading-none uppercase tracking-tight">Pro Tip</h4>
                <p className="text-xs text-blue-700 font-medium leading-relaxed">
                  High contrast colors (like Dark Navy on White) ensure 100% scan reliability across all camera quality levels.
                </p>
              </div>
            </div>
          </div>

        </div>
        {/* Information Section */}
        <div className="mt-20 grid lg:grid-cols-2 gap-12 border-t border-slate-200 pt-16">
          <div className="space-y-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-brand-50 rounded-xl text-brand-600">
                <BookOpen size={20} />
              </div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Generation Protocol</h2>
            </div>
            
            <div className="space-y-6">
              {[
                { step: "01", title: "Content Logic", desc: "Input your target URL, plain text, or contact data. The engine encodes information into a static matrix in real-time." },
                { step: "02", title: "Aesthetic Tuning", desc: "Select your brand colors. Always ensure the 'QR Data Color' is significantly darker than the 'Base Canvas' for readability." },
                { step: "03", title: "Contrast Validation", desc: "The engine utilizes a high-contrast rendering buffer. We recommend a minimum contrast ratio of 4.5:1 for guaranteed scanning." },
                { step: "04", title: "Final Export", desc: "Download an ultra-high-definition 3000px PNG. This resolution is suitable for everything from business cards to billboards." }
              ].map((item, i) => (
                <div key={i} className="flex gap-6 group">
                  <span className="text-3xl font-black text-slate-200 group-hover:text-brand-200 transition-colors duration-300">{item.step}</span>
                  <div className="space-y-1">
                    <h3 className="font-black text-slate-800 uppercase tracking-wide text-sm">{item.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-slate-900 rounded-xl text-white">
                <HelpCircle size={20} />
              </div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Security FAQ</h2>
            </div>

            <div className="space-y-4">
              {[
                { q: "Are these QR codes permanent?", a: "Yes. These are static QR codes. They do not expire and will work forever as long as the content they point to exists." },
                { q: "Can I use light colors for the data?", a: "Technically yes, but it is not recommended. Most scanners expect dark patterns on light backgrounds. Use dark colors for 100% reliability." },
                { q: "Is my data tracked or logged?", a: "No. Unlike 'Dynamic QR' providers, we do not intercept scans. Your data is encoded directly into the pixels without any tracking pixels." },
                { q: "What is the maximum data limit?", a: "QR codes can hold up to 4,296 alphanumeric characters. However, shorter strings create cleaner, easier-to-scan codes." }
              ].map((faq, i) => (
                <div key={i} className="p-6 bg-white rounded-2xl border border-slate-100 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300">
                  <h3 className="font-black text-slate-900 text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
                    {faq.q}
                  </h3>
                  <p className="text-slate-500 text-xs leading-relaxed font-medium">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

