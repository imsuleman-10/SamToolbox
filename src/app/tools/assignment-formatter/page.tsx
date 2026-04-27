"use client";

import { useState } from "react";
import { FileText, Download, Type, AlignLeft, Settings, BookOpen, HelpCircle } from "lucide-react";

export default function AssignmentFormatterPage() {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [content, setContent] = useState("");
  const [studentName, setStudentName] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [subject, setSubject] = useState("");
  const [fontSize, setFontSize] = useState(12);
  const [lineHeight, setLineHeight] = useState(1.5);
  const [isProcessing, setIsProcessing] = useState(false);

  const formatText = (text: string) => {
    // Auto-format: capitalize headings, fix spacing
    const lines = text.split("\n");
    return lines
      .map(line => {
        const trimmed = line.trim();
        if (!trimmed) return "";
        
        // Detect headings (lines ending with : or all caps)
        if (trimmed.endsWith(":") || (trimmed === trimmed.toUpperCase() && trimmed.length < 50)) {
          return trimmed.toUpperCase();
        }
        
        // Capitalize first letter of sentences
        return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
      })
      .join("\n");
  };

  const generatePDF = async () => {
    if (!content.trim()) return;
    
    setIsProcessing(true);
    
    try {
      const { default: jsPDFModule } = await import("jspdf");
      const pdf = new jsPDFModule("p", "mm", "a4");
      
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 25;
      const maxWidth = pageWidth - margin * 2;
      let y = margin;

      // Helper function to add text with auto line break
      const addText = (text: string, size: number, bold: boolean, x: number, yPos: number, align: "left" | "center" = "left") => {
        pdf.setFontSize(size);
        pdf.setFont("helvetica", bold ? "bold" : "normal");
        
        const lines = pdf.splitTextToSize(text, maxWidth);
        
        // Check if we need a new page
        if (yPos + lines.length * size * 0.5 > pageHeight - margin) {
          pdf.addPage();
          yPos = margin;
        }
        
        pdf.text(text, align === "center" ? pageWidth / 2 : x, yPos, { align });
        return yPos + lines.length * size * lineHeight * 0.5;
      };

      // Title Page
      pdf.setFillColor(37, 99, 235);
      pdf.rect(0, 0, pageWidth, pageHeight, "F");
      
      pdf.setTextColor(255, 255, 255);
      y = pageHeight / 3;
      
      if (title) {
        y = addText(title.toUpperCase(), 24, true, margin, y, "center");
      }
      
      if (subtitle) {
        y = addText(subtitle, 16, false, margin, y + 10, "center");
      }
      
      pdf.setFontSize(12);
      y = pageHeight / 2 + 30;
      
      if (studentName) {
        y = addText(`Student: ${studentName}`, 12, false, margin, y, "center");
      }
      if (rollNumber) {
        y = addText(`Roll No: ${rollNumber}`, 12, false, margin, y + 8, "center");
      }
      if (subject) {
        y = addText(`Subject: ${subject}`, 12, false, margin, y + 8, "center");
      }

      // Content Pages
      pdf.addPage();
      pdf.setTextColor(0, 0, 0);
      y = margin;

      if (title) {
        y = addText(title, 18, true, margin, y);
        y += 10;
        
        // Underline
        pdf.setDrawColor(37, 99, 235);
        pdf.setLineWidth(0.5);
        pdf.line(margin, y, pageWidth - margin, y);
        y += 10;
      }

      // Format content
      const formattedContent = formatText(content);
      const paragraphs = formattedContent.split("\n");
      
      paragraphs.forEach(para => {
        const trimmed = para.trim();
        if (!trimmed) {
          y += 5;
          return;
        }
        
        // Check if it's a heading
        const isHeading = trimmed === trimmed.toUpperCase() && trimmed.length < 50;
        const size = isHeading ? 14 : fontSize;
        const bold = isHeading;
        
        y = addText(trimmed, size, bold, margin, y);
        y += 5;
      });

      pdf.save(`${title || "Assignment"}.pdf`);
    } catch (error) {
      console.error(error);
      alert("Failed to generate PDF.");
    } finally {
      setIsProcessing(false);
    }
  };

  const wordCount = content.split(/\s+/).filter(w => w).length;

  return (
    <>
      <div className="max-w-7xl mx-auto py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center sm:text-left mb-10 sm:mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-[10px] font-black uppercase tracking-[0.2em] mb-6 border border-brand-100">
          <FileText size={12} />
          <span>Industrial Document Engine</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4">Assignment <span className="text-brand-600">Formatter</span></h1>
        <p className="text-sm sm:text-lg text-slate-500 font-medium max-w-2xl mx-auto sm:mx-0 leading-relaxed">Auto-format and export clean, academic-ready assignments. Secure, private, and professional.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-4">
          {/* Assignment Details */}
          <div className="bg-white rounded-[1.5rem] sm:rounded-2xl border border-slate-100 shadow-xl p-5 sm:p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center text-white">
                <FileText size={16} />
              </div>
              <h2 className="text-xs sm:text-sm font-black text-slate-900 uppercase tracking-widest">Assignment Meta</h2>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                className="col-span-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:border-brand-500 focus:bg-white focus:ring-2 focus:ring-brand-500/10 outline-none text-sm font-medium transition-all placeholder:text-slate-400"
              />
              <input
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="Subtitle (optional)"
                className="col-span-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:border-brand-500 focus:bg-white focus:ring-2 focus:ring-brand-500/10 outline-none text-sm font-medium transition-all placeholder:text-slate-400"
              />
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="Your Name"
                className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:border-brand-500 focus:bg-white focus:ring-2 focus:ring-brand-500/10 outline-none text-sm font-medium transition-all placeholder:text-slate-400"
              />
              <input
                type="text"
                value={rollNumber}
                onChange={(e) => setRollNumber(e.target.value)}
                placeholder="Roll Number"
                className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:border-brand-500 focus:bg-white focus:ring-2 focus:ring-brand-500/10 outline-none text-sm font-medium transition-all placeholder:text-slate-400"
              />
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Subject"
                className="col-span-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:border-brand-500 focus:bg-white focus:ring-2 focus:ring-brand-500/10 outline-none text-sm font-medium transition-all placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* Content */}
          <div className="bg-white rounded-[1.5rem] sm:rounded-2xl border border-slate-100 shadow-xl p-5 sm:p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white">
                  <Type size={16} />
                </div>
                <h2 className="text-xs sm:text-sm font-black text-slate-900 uppercase tracking-widest">Body Content</h2>
              </div>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{wordCount} words</span>
            </div>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Paste or type your assignment content here...&#10;&#10;Tip: Use headings (they'll be auto-detected and formatted)"
              rows={16}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-brand-500 focus:bg-white focus:ring-2 focus:ring-brand-500/10 outline-none text-sm font-medium transition-all resize-none placeholder:text-slate-400"
            />
          </div>

          {/* Formatting Options */}
          <div className="bg-white rounded-[1.5rem] sm:rounded-2xl border border-slate-100 shadow-xl p-5 sm:p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-slate-700 rounded-lg flex items-center justify-center text-white">
                <Settings size={16} />
              </div>
              <h2 className="text-xs sm:text-sm font-black text-slate-900 uppercase tracking-widest">Style Parameters</h2>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-600 mb-1 block">Font Size</label>
                <select
                  value={fontSize}
                  onChange={(e) => setFontSize(parseInt(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:border-brand-500 outline-none text-sm font-medium cursor-pointer"
                >
                  <option value={10}>10pt</option>
                  <option value={11}>11pt</option>
                  <option value={12}>12pt</option>
                  <option value={13}>13pt</option>
                  <option value={14}>14pt</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-600 mb-1 block">Line Spacing</label>
                <select
                  value={lineHeight}
                  onChange={(e) => setLineHeight(parseFloat(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:border-brand-500 outline-none text-sm font-medium cursor-pointer"
                >
                  <option value={1}>Single</option>
                  <option value={1.15}>1.15</option>
                  <option value={1.5}>1.5</option>
                  <option value={2}>Double</option>
                </select>
              </div>
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={generatePDF}
            disabled={!content.trim() || isProcessing}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white font-black uppercase tracking-widest text-xs rounded-xl shadow-lg shadow-brand-600/25 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download size={15} />
            {isProcessing ? "Generating..." : "Download PDF"}
          </button>
        </div>

        {/* Preview Section */}
        <div className="bg-white rounded-[1.5rem] sm:rounded-2xl border border-slate-100 shadow-2xl p-6 sm:p-8">
          <h2 className="text-xs sm:text-sm font-black text-slate-900 uppercase tracking-widest mb-6">Live Workspace Preview</h2>
          
          {content ? (
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 min-h-[500px]">
              {title && (
                <>
                  <h1 className="text-2xl font-black text-slate-900 mb-1">{title}</h1>
                  {subtitle && <p className="text-base text-slate-600 mb-3">{subtitle}</p>}
                  <div className="border-b-2 border-brand-600 mb-4" />
                </>
              )}
              
              <div className="space-y-3">
                {formatText(content).split("\n").map((line, i) => {
                  const trimmed = line.trim();
                  if (!trimmed) return <div key={i} className="h-3" />;
                  
                  const isHeading = trimmed === trimmed.toUpperCase() && trimmed.length < 50;
                  
                  return (
                    <p
                      key={i}
                      className={`${
                        isHeading
                          ? "text-lg font-black text-slate-900 mt-4"
                          : "text-sm text-slate-700"
                      }`}
                      style={{ lineHeight: `${lineHeight}` }}
                    >
                      {trimmed}
                    </p>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="bg-slate-50 border-2 border-dashed border-slate-300 rounded-xl p-8 flex flex-col items-center justify-center min-h-[500px]">
              <AlignLeft size={48} className="text-slate-300 mb-4" />
              <p className="text-slate-500 font-bold text-center">Start typing to see preview</p>
            </div>
          )}
        </div>
      </div>
    </div>

      {/* Information Section */}
      <div className="max-w-7xl mx-auto px-4 mt-20 grid lg:grid-cols-2 gap-12 border-t border-slate-100 pt-16">
        <div className="space-y-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-brand-50 rounded-xl text-brand-600">
              <BookOpen size={20} />
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Assembly Protocol</h2>
          </div>
          
          <div className="space-y-6">
            {[
              { step: "01", title: "Meta Calibration", desc: "Define your assignment's identity. Providing title and student metadata automatically initializes a professional cover page." },
              { step: "02", title: "Content Ingestion", desc: "Paste your raw text. Use uppercase for section headers; our logic detects these for structural bolding and alignment." },
              { step: "03", title: "Style Optimization", desc: "Adjust font size and line spacing via the parameters panel. Monitor the 'Live Workspace' to ensure visual consistency." },
              { step: "04", title: "Document Forging", desc: "Execute 'Download PDF'. The engine runs a multi-pass render to create a clean, submission-ready academic document." }
            ].map((item, i) => (
              <div key={i} className="flex gap-6 group">
                <span className="text-3xl font-black text-slate-100 group-hover:text-brand-100 transition-colors duration-300">{item.step}</span>
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
            <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Document Intelligence FAQ</h2>
          </div>

          <div className="space-y-4">
            {[
              { q: "How are headings detected?", a: "Lines that are either fully uppercase or terminate with a colon (:) are automatically flagged as structural headings by our parser." },
              { q: "Is my assignment secure?", a: "Yes. SamToolbox utilizes 'Air-Gapped' processing. Your academic content exists only in your local browser instance." },
              { q: "Why the blue cover page?", a: "Our standard industrial template includes a high-impact cover page to ensure your work stands out with professional aesthetic." },
              { q: "Can I use special symbols?", a: "The PDF engine supports standard ASCII and common punctuation. For complex math, we recommend verifying the Live Preview first." }
            ].map((faq, i) => (
              <div key={i} className="p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300">
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
    </>
  );
}
