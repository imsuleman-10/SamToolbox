"use client";

import { useState } from "react";
import { BookOpen, Download, Type, AlignLeft, Settings, Sparkles, ShieldCheck, Zap, HelpCircle } from "lucide-react";

export default function NotesToPdfPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [fontSize, setFontSize] = useState(12);
  const [fontFamily, setFontFamily] = useState("helvetica");
  const [isProcessing, setIsProcessing] = useState(false);

  const generatePDF = async () => {
    if (!content.trim()) return;
    
    setIsProcessing(true);
    
    try {
      const { jsPDF } = await import("jspdf");
      const pdf = new jsPDF("p", "mm", "a4");
      
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 20;
      const maxWidth = pageWidth - margin * 2;
      let y = margin;

      // Title
      if (title) {
        pdf.setFontSize(24);
        pdf.setFont(fontFamily, "bold");
        const titleLines = pdf.splitTextToSize(title.toUpperCase(), maxWidth);
        pdf.text(titleLines, margin, y);
        y += titleLines.length * 10 + 5;
        
        // Horizontal line
        pdf.setDrawColor(200, 200, 200);
        pdf.setLineWidth(0.2);
        pdf.line(margin, y, pageWidth - margin, y);
        y += 10;
      }

      // Content
      pdf.setFontSize(fontSize);
      pdf.setFont(fontFamily, "normal");
      pdf.setTextColor(40, 40, 40);
      
      const paragraphs = content.split("\n");
      
      paragraphs.forEach(para => {
        const trimmed = para.trim();
        if (!trimmed) {
          y += 5;
          return;
        }

        const lines = pdf.splitTextToSize(trimmed, maxWidth);
        
        // Check for new page
        if (y + lines.length * 7 > pageHeight - margin) {
          pdf.addPage();
          y = margin;
        }

        pdf.text(lines, margin, y);
        y += lines.length * 7 + 2;
      });

      pdf.save(`${title || "MyNotes"}.pdf`);
    } catch (error) {
      console.error(error);
      alert("Failed to generate PDF.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <div className="max-w-7xl mx-auto py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12 sm:mb-16">
        <div className="space-y-4 w-full sm:w-auto text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-[10px] font-black uppercase tracking-[0.2em] border border-indigo-100">
            <Sparkles size={12} />
            <span>Premium Formatter</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tighter leading-none">
            Notes <span className="text-indigo-600">to PDF</span>
          </h1>
          <p className="text-sm sm:text-slate-500 font-medium max-w-md mx-auto sm:mx-0">
            Transcribe your digital notes into clean, academic-ready PDF documents instantly.
          </p>
        </div>

        <div className="flex items-center gap-4 p-5 sm:p-6 bg-slate-50 rounded-2xl sm:rounded-3xl border border-slate-100 w-full sm:w-auto">
           <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center text-emerald-500 shadow-sm border border-slate-100 shrink-0">
              <ShieldCheck size={20} />
           </div>
           <div>
              <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest leading-none mb-1">Local Processing</p>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tight">Data never leaves your machine</p>
           </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Editor Area */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-[1.5rem] sm:rounded-[2.5rem] border border-slate-100 shadow-2xl overflow-hidden">
            <div className="bg-slate-50/50 px-4 sm:px-8 py-4 border-b border-slate-100 flex items-center justify-between">
               <div className="flex items-center gap-3">
                  <Type size={16} className="text-slate-400" />
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Document Editor</span>
               </div>
               <div className="flex gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-400" />
                  <div className="w-2 h-2 rounded-full bg-amber-400" />
                  <div className="w-2 h-2 rounded-full bg-emerald-400" />
               </div>
            </div>
            
            <div className="p-4 sm:p-8 space-y-6">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Document Title"
                className="w-full text-2xl sm:text-3xl font-black text-slate-900 placeholder:text-slate-200 bg-transparent border-none outline-none tracking-tight"
              />
              
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Start transcribing your notes here..."
                rows={14}
                className="w-full text-sm sm:text-base font-medium text-slate-700 placeholder:text-slate-300 bg-transparent border-none outline-none resize-none leading-relaxed min-h-[300px]"
              />
            </div>
          </div>
        </div>

        {/* Controls Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-[2rem] border border-slate-100 shadow-xl p-8 space-y-8">
            <div className="space-y-6">
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                <Settings size={16} className="text-slate-400" />
                Typography
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Font Family</label>
                  <select
                    value={fontFamily}
                    onChange={(e) => setFontFamily(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none text-sm font-bold text-slate-700 cursor-pointer hover:bg-slate-100 transition-colors"
                  >
                    <option value="helvetica">Helvetica (Sans)</option>
                    <option value="times">Times (Serif)</option>
                    <option value="courier">Courier (Mono)</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Base Size ({fontSize}pt)</label>
                  <input
                    type="range"
                    min="8"
                    max="18"
                    value={fontSize}
                    onChange={(e) => setFontSize(parseInt(e.target.value))}
                    className="w-full accent-indigo-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[8px] font-black text-slate-300 mt-1">
                    <span>8PT</span>
                    <span>18PT</span>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={generatePDF}
              disabled={isProcessing || !content.trim()}
              className="w-full group relative overflow-hidden py-6 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-2xl transition-all hover:-translate-y-1 active:translate-y-0 disabled:opacity-50"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative flex items-center justify-center gap-3">
                {isProcessing ? <Zap className="animate-pulse" size={18} /> : <Download size={18} />}
                {isProcessing ? "PROCESSING..." : "EXPORT DOCUMENT"}
              </div>
            </button>
          </div>

          <div className="bg-indigo-50 rounded-[2rem] p-8 border border-indigo-100 space-y-4">
            <h4 className="text-xs font-black text-indigo-900 uppercase tracking-widest flex items-center gap-2">
              <AlignLeft size={16} />
              Formatting Info
            </h4>
            <p className="text-[11px] font-medium text-indigo-700 leading-relaxed">
              Our engine automatically handles pagination and margin alignment. For best results, use single line breaks for new paragraphs and double line breaks for section shifts.
            </p>
          </div>
        </div>
      </div>
      
      {/* Information Section */}
      <div className="max-w-7xl mx-auto px-4 mt-20 grid lg:grid-cols-2 gap-12 border-t border-slate-100 pt-16">
        <div className="space-y-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-indigo-50 rounded-xl text-indigo-600">
              <BookOpen size={20} />
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Transcription Protocol</h2>
          </div>
          
          <div className="space-y-6">
            {[
              { step: "01", title: "Vector Initialization", desc: "Define your document title. This initializes a high-impact structural header in the PDF render engine." },
              { step: "02", title: "Narrative Capture", desc: "Transcribe your notes into the workspace. Use single line breaks for paragraph separation and double breaks for context shifts." },
              { step: "03", title: "Typography Tuning", desc: "Select from our curated list of industrial typefaces (Sans, Serif, or Mono) and adjust the base sizing for optimal readability." },
              { step: "04", title: "Forge Execution", desc: "Initiate 'Export Document'. Our algorithm performs real-time pagination and margin calibration for a clean academic export." }
            ].map((item, i) => (
              <div key={i} className="flex gap-6 group">
                <span className="text-3xl font-black text-slate-100 group-hover:text-indigo-100 transition-colors duration-300">{item.step}</span>
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
            <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Secure Forge FAQ</h2>
          </div>

          <div className="space-y-4">
            {[
              { q: "Is there a page limit?", a: "No. Our dual-pass renderer automatically generates additional pages as your content expands beyond the standard A4 footprint." },
              { q: "Is my data private?", a: "Yes. SamToolbox utilizes 'Local-Only' architecture. Your notes are never transmitted to any server or third-party cloud." },
              { q: "Which font should I use?", a: "Use Helvetica for general readability, Times for formal academic submissions, and Courier for technical or code-heavy transcriptions." },
              { q: "Why generate PDF?", a: "PDF ensures that your formatting, font weights, and pagination remain locked across all viewing devices and print mediums." }
            ].map((faq, i) => (
              <div key={i} className="p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300">
                <h3 className="font-black text-slate-900 text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                  {faq.q}
                </h3>
                <p className="text-slate-500 text-xs leading-relaxed font-medium">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      </div>
    </>
  );
}
