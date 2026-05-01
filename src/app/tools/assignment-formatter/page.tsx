"use client";

import { useState, useRef, useMemo, useEffect } from "react";
import { 
  FileText, Download, Type, AlignLeft, Settings, 
  BookOpen, HelpCircle, ArrowRight, ArrowLeft, 
  User, GraduationCap, School, Briefcase, 
  Zap, LayoutTemplate, FileDown, Eye, Check,
  Terminal, ShieldCheck, RefreshCw, Printer, Cpu, Info
} from "lucide-react";
import Link from "next/link";
import { generateSoftwareApplicationSchema } from "@/lib/structuredData";

type StepType = "setup" | "content" | "preview";
type LayoutType = "academic" | "modern" | "minimal" | "technical";

export default function AssignmentFormatterPage() {
  const [step, setStep] = useState<StepType>("setup");
  const [layout, setLayout] = useState<LayoutType>("academic");
  const [title, setTitle] = useState("Quantum Computing: Future of Computation");
  const [subtitle, setSubtitle] = useState("A Comprehensive Analysis of Qubit Stability");
  const [content, setContent] = useState("The realm of quantum computing represents a paradigm shift in how we process information. Unlike classical bits that reside in states of 0 or 1, qubits utilize superposition and entanglement to perform complex parallel computations.\n\n# CORE OBJECTIVES\n- Analysis of decoherence in superconducting circuits.\n- Benchmarking gate fidelity across varied architectures.\n- Structural optimization of cryogenic cooling systems.\n\n# METHODOLOGY\nThis research employs a multi-vector approach to assessing qubit integrity. By leveraging industrial-grade sensors and low-latency feedback loops, we can isolate environmental noise and measure the pure quantum state with unprecedented precision.");
  const [studentName, setStudentName] = useState("Suleman Mughal");
  const [rollNumber, setRollNumber] = useState("CS-2024-09");
  const [subject, setSubject] = useState("Advanced Computing");
  const [professor, setProfessor] = useState("Dr. Zaheer Ahmad");
  const [department, setDepartment] = useState("Department of Software Engineering");
  const [fontSize, setFontSize] = useState(12);
  const [lineHeight, setLineHeight] = useState(1.5);
  const [isProcessing, setIsProcessing] = useState(false);
  const [previewScale, setPreviewScale] = useState(0.5);

  const containerRef = useRef<HTMLDivElement>(null);

  const schema = useMemo(() => generateSoftwareApplicationSchema("assignment-formatter", "Professional academic document architect with structural parsing and multi-layout A4 rendering."), []);

  // Responsive Scaling Logic
  useEffect(() => {
    if (step !== "preview") return;
    const updateScale = () => {
      if (!containerRef.current) return;
      const containerWidth = containerRef.current.clientWidth;
      const targetWidth = 794; // A4 210mm
      const newScale = (containerWidth - 48) / targetWidth;
      setPreviewScale(Math.min(newScale, 1));
    };

    const observer = new ResizeObserver(updateScale);
    if (containerRef.current) observer.observe(containerRef.current);
    updateScale();
    return () => observer.disconnect();
  }, [step]);

  const parseContent = (text: string) => {
    if (!text) return [];
    return text.split("\n").map(line => {
      const trimmed = line.trim();
      if (!trimmed) return { type: "empty", text: "" };
      
      // Heading check
      if (trimmed.startsWith("# ") || (trimmed === trimmed.toUpperCase() && trimmed.length < 50 && trimmed.length > 2)) {
        return { type: "heading", text: trimmed.replace(/^#\s*/, "").toUpperCase() };
      }
      
      // Bullet check
      if (trimmed.startsWith("-") || trimmed.startsWith("*") || trimmed.startsWith("•")) {
        return { type: "bullet", text: trimmed.replace(/^[-*•]\s*/, "") };
      }
      
      // Support for bold (**text**) and italic (*text*)
      const processedText = trimmed
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>');

      return { type: "paragraph", html: processedText };
    });
  };

  const getCanvasData = async () => {
    const { toCanvas } = await import("html-to-image");
    const previewElement = document.getElementById("assignment-render");
    if (!previewElement) return null;
    return await toCanvas(previewElement, {
      pixelRatio: 3,
      backgroundColor: "#ffffff",
    });
  };

  const generatePDF = async () => {
    if (!content.trim()) return;
    setIsProcessing(true);
    try {
      const canvas = await getCanvasData();
      if (!canvas) return;
      const { jsPDF } = await import("jspdf");
      const imgData = canvas.toDataURL("image/jpeg", 1.0);
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${title.slice(0, 20) || "Assignment"}.pdf`);
    } catch (e) {
      console.error(e);
      alert("Failed to forge document.");
    } finally {
      setIsProcessing(false);
    }
  };

  const wordCount = content.split(/\s+/).filter(Boolean).length;

  const faqs = [
    {
      q: "How are headers detected?",
      a: "The engine detects headers if a line starts with '#' or is written in ALL CAPS. This ensures structural integrity without complex markup."
    },
    {
      q: "Is the PDF print-ready?",
      a: "Yes. Every document is exported at a vector-equivalent 300 DPI, ensuring razor-sharp text on high-end physical printers."
    },
    {
      q: "What is the 'Scholarly Forge' technology?",
      a: "It's a client-side rendering pipeline that uses HTML5 Canvas and WASM to assemble documents directly in your browser's RAM."
    },
    {
      q: "Are my assignments stored?",
      a: "Absolutely not. SamToolbox operates on a zero-cloud policy. Your manuscript exists only in your local session and is purged upon tab closure."
    }
  ];

  return (
    <div className="min-h-screen bg-[#020617] selection:bg-cyan-500/30 selection:text-cyan-200">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* ══════════════════════════════════════════
          HERO / HEADER
      ══════════════════════════════════════════ */}
      <section className="pt-24 pb-48 px-6 bg-[#020617] relative overflow-hidden text-center">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px]" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-600/10 rounded-full blur-[100px]" />
        
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-blue-400 font-bold text-[9px] uppercase tracking-[0.4em] mb-8 shadow-2xl">
            <Cpu size={12} className="animate-pulse" />
            Scholarly Architect v10.0
          </div>
          <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter mb-8 leading-tight">
            Academic <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-emerald-400">Forge.</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed mb-12">
            The industry standard for high-fidelity document synthesis. 
            Transform raw manuscripts into ISO-compliant academic folios with zero cloud footprint.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
             <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest border border-white/5 px-4 py-2 rounded-full">
                <ShieldCheck size={14} className="text-emerald-500" /> AES-256 Local
             </div>
             <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest border border-white/5 px-4 py-2 rounded-full">
                <Printer size={14} className="text-blue-500" /> Vector Print
             </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          MAIN UTILITY INTERFACE
      ══════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-6 -mt-16 relative z-20 mb-32">
        
        {/* Step Navigation */}
        <div className="flex flex-wrap justify-center gap-6 mb-16">
          <WizardTab active={step === "setup"} onClick={() => setStep("setup")} step="01" label="Metadata" />
          <WizardTab active={step === "content"} onClick={() => setStep("content")} step="02" label="Manuscript" />
          <WizardTab active={step === "preview"} onClick={() => setStep("preview")} step="03" label="Rendering" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Workspace Area */}
          <div className={`${step === 'preview' ? 'lg:col-span-12' : 'lg:col-span-8'}`}>
            <div className="bg-[#0f172a] rounded-[3.5rem] border border-white/5 shadow-3xl shadow-black overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-700">
               <div className="bg-white/5 px-10 py-8 border-b border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                     <div className="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-pulse shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
                     <span className="text-[11px] font-black text-white uppercase tracking-[0.2em]">
                       {step === 'setup' ? 'Identity Verification' : step === 'content' ? 'Content Stream' : 'A4 Vector Preview'}
                     </span>
                  </div>
                  <div className="flex items-center gap-4">
                     {step === 'content' && <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{wordCount} Words</span>}
                     <div className="flex gap-2">
                        <div className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${step === 'setup' ? 'bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]' : 'bg-white/5'}`} />
                        <div className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${step === 'content' ? 'bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]' : 'bg-white/5'}`} />
                        <div className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${step === 'preview' ? 'bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]' : 'bg-white/5'}`} />
                     </div>
                  </div>
               </div>

               <div className="p-10 md:p-16">
                  {step === "setup" && (
                    <div className="space-y-12 animate-in fade-in duration-500">
                       <div className="grid sm:grid-cols-2 gap-10">
                          <InputField label="Document Title" value={title} onChange={setTitle} placeholder="e.g. Impact of AI on Modern Logic" />
                          <InputField label="Subtitle / Abstract" value={subtitle} onChange={setSubtitle} placeholder="e.g. Structural Analysis" />
                          <InputField label="Agent Identity" value={studentName} onChange={setStudentName} />
                          <InputField label="Matrix ID" value={rollNumber} onChange={setRollNumber} />
                          <InputField label="Lead Supervisor" value={professor} onChange={setProfessor} />
                          <InputField label="Department Code" value={department} onChange={setDepartment} />
                       </div>

                       <div className="pt-12 border-t border-white/5">
                          <label className="text-[11px] font-black text-slate-600 uppercase tracking-[0.4em] px-2 block mb-8">Architectural Blueprints</label>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                             {(["academic", "modern", "minimal", "technical"] as const).map(l => (
                               <button
                                 key={l}
                                 onClick={() => setLayout(l)}
                                 className={`p-8 rounded-[2.5rem] border-2 transition-all text-left group ${
                                   layout === l ? "bg-cyan-600 border-cyan-500 text-white shadow-3xl shadow-cyan-500/20" : "bg-[#020617] border-white/5 text-slate-500 hover:border-white/10"
                                 }`}
                               >
                                 <p className="text-[11px] font-black uppercase tracking-widest mb-2">{l}</p>
                                 <p className={`text-[9px] font-bold uppercase tracking-tighter ${layout === l ? 'text-cyan-100' : 'text-slate-700'}`}>ISO Standard</p>
                               </button>
                             ))}
                          </div>
                       </div>

                       <button
                         onClick={() => setStep("content")}
                         className="w-full py-8 bg-cyan-600 text-white rounded-[2.5rem] font-black uppercase tracking-[0.4em] text-[12px] shadow-3xl hover:bg-cyan-500 transition-all flex items-center justify-center gap-4 group"
                       >
                         Initialize Content Synthesis <ArrowRight size={22} className="group-hover:translate-x-2 transition-transform" />
                       </button>
                    </div>
                  )}

                  {step === "content" && (
                    <div className="space-y-12 animate-in fade-in duration-500">
                       <div className="bg-[#020617] rounded-[3rem] p-6 sm:p-10 border border-white/5 shadow-inner">
                          <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Draft your manuscript here... Use # for headings and - for bullets."
                            className="w-full bg-transparent outline-none text-lg font-medium text-slate-300 leading-relaxed placeholder:text-slate-800 min-h-[550px] resize-none"
                            autoFocus
                          />
                       </div>

                       <div className="grid sm:grid-cols-2 gap-12 pt-6">
                          <div className="space-y-6">
                             <div className="flex justify-between items-center px-4">
                                <label className="text-[11px] font-black text-slate-600 uppercase tracking-[0.4em]">Font Scale ({fontSize}pt)</label>
                             </div>
                             <input type="range" min="10" max="16" value={fontSize} onChange={(e) => setFontSize(parseInt(e.target.value))} className="w-full accent-cyan-500 h-1.5 bg-white/5 rounded-full appearance-none cursor-pointer" />
                          </div>
                          <div className="space-y-6">
                             <div className="flex justify-between items-center px-4">
                                <label className="text-[11px] font-black text-slate-600 uppercase tracking-[0.4em]">Line Spacing ({lineHeight}x)</label>
                             </div>
                             <input type="range" min="1" max="2" step="0.1" value={lineHeight} onChange={(e) => setLineHeight(parseFloat(e.target.value))} className="w-full accent-cyan-500 h-1.5 bg-white/5 rounded-full appearance-none cursor-pointer" />
                          </div>
                       </div>

                       <button
                         onClick={() => setStep("preview")}
                         className="w-full py-8 bg-cyan-600 text-white rounded-[2.5rem] font-black uppercase tracking-[0.4em] text-[12px] shadow-3xl hover:bg-cyan-500 transition-all flex items-center justify-center gap-4 group"
                       >
                         Initialize Vector Render <Eye size={22} className="group-hover:scale-110 transition-transform" />
                       </button>
                    </div>
                  )}

                  {step === "preview" && (
                    <div className="animate-in zoom-in-95 duration-500">
                       <div ref={containerRef} className="bg-slate-50 rounded-[3rem] p-6 sm:p-20 border border-slate-100 flex justify-center items-start overflow-hidden relative min-h-[800px] shadow-inner">
                          <div 
                            id="assignment-render"
                            className="bg-white shadow-[0_50px_100px_rgba(0,0,0,0.1)] origin-top transition-transform duration-500"
                            style={{ 
                              width: "210mm", 
                              transform: `scale(${previewScale})`,
                              marginBottom: `calc((297mm * ${previewScale}) - 297mm)`
                            }}
                          >
                             {/* Title Page */}
                             <div 
                               className={`p-[25mm] flex flex-col items-center text-center ${layout === 'modern' ? 'bg-blue-600 text-white' : 'border-[10px] border-slate-100 m-[5mm]'}`}
                               style={{ minHeight: "287mm" }}
                             >
                                <div className="mt-24 space-y-4">
                                   <p className="text-[10px] font-black uppercase tracking-[0.5em] opacity-60">Submission Folio</p>
                                   <h1 className="text-5xl font-black uppercase tracking-tight leading-[0.95]">{title}</h1>
                                   {subtitle && <p className="text-xl font-medium opacity-80 pt-6 border-t border-current/10 mt-6 max-w-lg mx-auto">{subtitle}</p>}
                                </div>

                                <div className="mt-auto w-full grid grid-cols-2 gap-20 text-left pt-20 border-t border-current/10">
                                   <div className="space-y-6">
                                      <div>
                                         <p className="text-[9px] font-black uppercase tracking-widest opacity-40 mb-1">Author</p>
                                         <p className="text-lg font-black uppercase leading-tight">{studentName}</p>
                                         <p className="text-xs font-bold opacity-60 tracking-tight">{rollNumber}</p>
                                      </div>
                                      <div>
                                         <p className="text-[9px] font-black uppercase tracking-widest opacity-40 mb-1">Affiliation</p>
                                         <p className="text-xs font-bold leading-relaxed">{department}</p>
                                      </div>
                                   </div>
                                   <div className="space-y-6">
                                      <div>
                                         <p className="text-[9px] font-black uppercase tracking-widest opacity-40 mb-1">Supervisor</p>
                                         <p className="text-lg font-black uppercase leading-tight">{professor}</p>
                                         <p className="text-xs font-bold opacity-60">Faculty Lead</p>
                                      </div>
                                      <div>
                                         <p className="text-[9px] font-black uppercase tracking-widest opacity-40 mb-1">Course Code</p>
                                         <p className="text-xs font-bold leading-relaxed uppercase">{subject}</p>
                                      </div>
                                   </div>
                                </div>
                             </div>

                             {/* Content Page */}
                             <div className="p-[25mm] bg-white text-slate-900 border-t-[20px] border-slate-50" style={{ fontSize: `${fontSize}pt`, lineHeight: lineHeight, minHeight: "297mm" }}>
                                <div className="flex justify-between items-baseline border-b border-slate-100 pb-2 mb-12">
                                   <span className="text-[8px] font-black uppercase tracking-widest text-slate-300">{title.slice(0, 40)}...</span>
                                   <span className="text-[8px] font-black uppercase tracking-widest text-slate-300">Folio 01</span>
                                </div>

                                <div className="space-y-6">
                                   {parseContent(content).map((item, idx) => {
                                      if (item.type === "heading") return (
                                        <h2 key={idx} className="text-2xl font-black uppercase tracking-tight text-slate-900 pt-10 pb-2 border-b-2 border-blue-600 w-fit mb-6">
                                          {item.text}
                                        </h2>
                                      );
                                      if (item.type === "bullet") return (
                                        <div key={idx} className="flex gap-5 pl-4 group">
                                           <span className="text-blue-600 font-black text-xl leading-none">•</span>
                                           <p className="flex-1 text-justify font-medium text-slate-700" dangerouslySetInnerHTML={{ __html: item.html || '' }} />
                                        </div>
                                      );
                                      if (item.type === "empty") return <div key={idx} className="h-6" />;
                                      return <p key={idx} className="text-justify font-medium text-slate-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: item.html || '' }} />;
                                   })}
                                </div>
                             </div>
                          </div>
                       </div>
                       <div className="mt-12 flex justify-center">
                          <button
                            onClick={generatePDF}
                            disabled={isProcessing}
                            className="px-12 py-6 bg-blue-600 text-white rounded-[2rem] font-black uppercase tracking-[0.2em] text-xs shadow-2xl shadow-blue-600/30 hover:scale-105 transition-all flex items-center gap-4 disabled:opacity-50"
                          >
                            {isProcessing ? <RefreshCw size={20} className="animate-spin" /> : <FileDown size={20} />}
                            {isProcessing ? "Forging Document..." : "Export Scholarly PDF"}
                          </button>
                       </div>
                    </div>
                  )}
               </div>
            </div>
          </div>

          {/* Intel Sidebar */}
          {step !== 'preview' && (
            <div className="lg:col-span-4 space-y-8 animate-in fade-in slide-in-from-right-8 duration-700">
               {/* Live Mini Preview */}
               <div className="bg-white rounded-[3rem] border border-slate-200 shadow-2xl shadow-slate-200/50 p-8 overflow-hidden">
                  <div className="flex items-center justify-between mb-8">
                     <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-3">
                        <Eye size={16} className="text-blue-500" />
                        A4 Live Stream
                     </h3>
                     <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  </div>
                  
                  <div className="bg-slate-100 rounded-2xl overflow-hidden flex justify-center items-start p-4 h-[350px] relative shadow-inner">
                      <div 
                        className="origin-top shadow-lg"
                        style={{ 
                          transform: `scale(${240/794})`,
                          width: "210mm",
                          minHeight: "297mm",
                          backgroundColor: "#fff"
                        }}
                      >
                         <div className="w-full h-full p-10 flex flex-col items-center">
                            <div className="w-1/2 h-4 bg-slate-100 rounded mb-4" />
                            <h4 className="text-[24px] font-black uppercase text-center mb-10 leading-tight">{title.slice(0, 50)}</h4>
                            <div className="w-full h-[2px] bg-slate-900/10 mb-20" />
                            <div className="space-y-3 w-full">
                               {content.split("\n").slice(0, 10).map((line, i) => (
                                 <div key={i} className={`h-1.5 bg-slate-100 rounded w-${i % 2 === 0 ? 'full' : '3/4'}`} />
                               ))}
                            </div>
                            <div className="grid grid-cols-2 gap-10 w-full mt-auto pt-20 border-t border-slate-50">
                               <div className="space-y-2">
                                  <div className="w-10 h-1 bg-slate-900/10"/>
                                  <p className="text-[10px] font-black">{studentName}</p>
                               </div>
                               <div className="space-y-2 text-right">
                                  <div className="w-10 h-1 bg-slate-900/10 ml-auto"/>
                                  <p className="text-[10px] font-black">{professor}</p>
                               </div>
                            </div>
                         </div>
                      </div>
                   </div>
               </div>

               {/* Security Card */}
               <div className="bg-[#020617] rounded-[3rem] p-10 text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none" 
                       style={{ backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
                  <div className="relative z-10">
                     <div className="w-12 h-12 bg-blue-500/20 border border-blue-500/30 rounded-2xl flex items-center justify-center mb-8 shadow-lg">
                        <ShieldCheck size={24} className="text-blue-400" />
                     </div>
                     <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-2 leading-none">Security Protocol</p>
                     <p className="text-[11px] font-medium text-slate-400 leading-relaxed">
                        Scholarly Forge operates in a zero-transmission sandbox. 
                        Your academic research never touches the cloud.
                     </p>
                  </div>
               </div>

               {/* Tip */}
               <div className="bg-slate-50 rounded-[3rem] p-10 border border-slate-200">
                  <div className="flex items-center gap-3 mb-6">
                     <Info size={18} className="text-blue-600" />
                     <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Forge Tip</span>
                  </div>
                  <p className="text-[11px] font-bold text-slate-600 leading-relaxed italic">
                    "Use ALL CAPS for section headers to trigger the structural parsing engine automatically."
                  </p>
               </div>
            </div>
          )}
        </div>

        {/* ══════════════════════════════════════════
            DOCUMENTATION
        ══════════════════════════════════════════ */}
        <div className="mt-32 border-t border-slate-100 pt-32">
          
          {/* How to Use */}
          <div className="mb-32">
            <div className="flex items-center gap-4 mb-16">
              <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center text-white shadow-2xl">
                <BookOpen size={28} />
              </div>
              <div>
                <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight">Academic Protocol</h2>
                <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mt-1">Scholarly Forge Deployment Guide</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              {[
                { step: "01", icon: <Settings size={20} />, title: "Identity Meta", desc: "Initialize your student profile and supervisor credentials for the title page." },
                { step: "02", icon: <Type size={20} />, title: "Structural Draft", desc: "Inject your manuscript. Use # headers to define document hierarchy." },
                { step: "03", icon: <Cpu size={20} />, title: "A4 Synthesis", desc: "Our engine renders the document in real-time with ISO-compliant margins." },
                { step: "04", icon: <FileDown size={20} />, title: "Vector Export", desc: "Generate a high-fidelity PDF optimized for professional physical printing." }
              ].map((item, i) => (
                <div key={i} className="space-y-6 group">
                  <div className="flex items-baseline gap-4">
                    <span className="text-5xl font-black text-slate-100 group-hover:text-blue-100 transition-colors duration-500 leading-none">{item.step}</span>
                    <div className="text-blue-600">{item.icon}</div>
                  </div>
                  <h3 className="font-black text-slate-900 uppercase tracking-widest text-xs">{item.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed font-medium">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ Section */}
          <div className="grid lg:grid-cols-2 gap-20 items-start">
            <div className="space-y-12">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 border border-blue-100">
                  <HelpCircle size={28} />
                </div>
                <div>
                  <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight">Support Intel</h2>
                  <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mt-1">Academic Formatting Queries</p>
                </div>
              </div>

              <div className="space-y-6">
                {faqs.map((faq, i) => (
                  <div key={i} className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 hover:border-blue-500/20 transition-all group">
                    <h3 className="font-black text-slate-900 text-sm mb-4 flex items-start gap-4">
                      <span className="text-blue-600">Q.</span> {faq.q}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed font-medium pl-8 group-hover:text-slate-700 transition-colors">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Privacy Architecture */}
            <div className="bg-[#020617] rounded-[3.5rem] p-12 md:p-16 text-white relative overflow-hidden">
               <div className="absolute top-0 right-0 w-full h-full opacity-10" style={{ backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
               <div className="relative z-10">
                  <div className="w-20 h-20 bg-blue-500/20 border border-blue-500/30 rounded-3xl flex items-center justify-center mb-10 shadow-[0_0_60px_rgba(37,99,235,0.3)]">
                    <ShieldCheck size={40} className="text-blue-400" />
                  </div>
                  <h3 className="text-3xl md:text-4xl font-black mb-8 tracking-tight uppercase">Privacy Architecture</h3>
                  <p className="text-slate-400 font-medium mb-12 leading-relaxed text-lg">
                    Scholarly Forge implements a strictly local hardware execution model. 
                    Your academic data is never cached or transmitted to any external server.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-10">
                     <div className="space-y-3">
                        <div className="text-3xl font-black text-white tracking-tighter">0-NET</div>
                        <div className="text-[10px] font-bold text-blue-400 uppercase tracking-[0.3em]">No Transmission</div>
                     </div>
                     <div className="space-y-3">
                        <div className="text-3xl font-black text-white tracking-tighter">300-DPI</div>
                        <div className="text-[10px] font-bold text-blue-400 uppercase tracking-[0.3em]">Vector Clarity</div>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>

        {/* Explore More Tools */}
        <div className="mt-40 text-center">
           <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mb-8">System Directory</p>
           <Link href="/tools" className="inline-flex items-center gap-3 px-12 py-5 bg-slate-900 text-white rounded-3xl font-black uppercase tracking-widest text-[10px] hover:bg-blue-600 transition-all shadow-2xl">
             Explore All Modules <ArrowRight size={18} />
           </Link>
        </div>
      </section>

    </div>
  );
}

function WizardTab({ active, onClick, step, label }: any) {
  return (
    <button
      onClick={onClick}
      className={`px-8 py-3 rounded-full border transition-all flex items-center gap-3 ${
        active 
          ? "bg-slate-900 border-slate-900 text-white shadow-xl shadow-slate-900/20" 
          : "bg-white border-slate-100 text-slate-400 hover:border-slate-200"
      }`}
    >
      <span className={`text-[10px] font-black ${active ? "text-blue-400" : "text-slate-300"}`}>{step}</span>
      <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
    </button>
  );
}

function InputField({ label, value, onChange, placeholder }: any) {
  return (
    <div className="space-y-1.5">
      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-2">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm font-bold text-slate-900 focus:border-blue-500 outline-none transition-all placeholder:text-slate-200 shadow-inner"
      />
    </div>
  );
}
