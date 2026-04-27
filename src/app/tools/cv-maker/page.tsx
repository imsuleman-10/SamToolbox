"use client";

import { useState, useRef, useMemo, useCallback, useEffect } from "react";
import {
  Download, Upload, Image as ImageIcon, User, Edit3,
  Mail, Phone, MapPin, LayoutTemplate, Globe, Link,
  Briefcase, GraduationCap, Wrench, FileText, CheckCircle2, Zap,
  BookOpen, HelpCircle
} from "lucide-react";
import { generateSoftwareApplicationSchema } from "@/lib/structuredData";

type TemplateType = "plain" | "modern" | "minimal" | "executive" | "industrial" | "cleantech" | "swiss";

interface CVData {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  experience: string;
  education: string;
  skills: string;
  photoUrl: string | null;
  website?: string;
  linkedin?: string;
}

export default function CvMakerPage() {
  const [template, setTemplate] = useState<TemplateType>("industrial");
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeSection, setActiveSection] = useState("personal");
  const [previewScale, setPreviewScale] = useState(0.5);
  const cvRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [data, setData] = useState<CVData>({
    name: "Suleman Mughal",
    title: "Senior Full Stack Architect",
    email: "suleman@samtoolbox.com",
    phone: "+92 300 1234567",
    location: "Lahore, Pakistan",
    summary: "High-performance software architect with 8+ years of engineering excellence. Specialist in edge-computing, browser-based optimization, and premium industrial UI/UX systems. Passionate about building privacy-first tools that redefine the user experience.",
    experience: "Lead System Architect at SAMBOX (2020 - Present)\n- Orchestrated the migration of legacy tools to browser-side execution, reducing server costs by 100%.\n- Pioneered the 'Premium Industrial' design system used across all 15+ internal platforms.\n\nSenior Software Engineer at Global Solutions (2017 - 2020)\n- Led a cross-functional team of 12 engineers in building high-scale fintech applications.\n- Reduced initial load times by 65% using advanced tree-shaking and asset optimization.",
    education: "MSc Software Engineering\nNED University (2015 - 2017)\n\nBSc Computer Science\nPunjab University (2011 - 2015)",
    skills: "Next.js 15, TypeScript, React, Tailwind CSS, Node.js, System Architecture, UI/UX Design, Edge Computing",
    photoUrl: null,
    website: "samtoolbox.com",
    linkedin: "linkedin.com/in/suleman-mughal",
  });

  const schema = useMemo(() => generateSoftwareApplicationSchema("cv-maker", "Industrial-grade CV architect for elite professional representation."), []);

  // Dynamic Scaling Logic
  useEffect(() => {
    const updateScale = () => {
      if (!containerRef.current) return;
      const containerWidth = containerRef.current.clientWidth;
      const targetWidth = 794; // 210mm
      const newScale = (containerWidth - 40) / targetWidth; // Slightly more margin for small screens
      setPreviewScale(Math.min(newScale, 1));
    };

    const observer = new ResizeObserver(updateScale);
    if (containerRef.current) observer.observe(containerRef.current);
    updateScale();
    return () => observer.disconnect();
  }, []);

  const handlePhotoUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setData(prev => ({ ...prev, photoUrl: url }));
    }
  }, []);

  const downloadPDF = useCallback(async () => {
    if (!cvRef.current) return;
    setIsGenerating(true);
    try {
      const { toCanvas } = await import("html-to-image");
      const { jsPDF } = await import("jspdf");
      
      const canvas = await toCanvas(cvRef.current, {
        pixelRatio: 3,
        backgroundColor: "#ffffff",
      });
      const imgData = canvas.toDataURL("image/jpeg", 1.0);
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${data.name || "Resume"}.pdf`);
    } catch (error) {
      console.error(error);
      alert("Failed to generate PDF.");
    } finally {
      setIsGenerating(false);
    }
  }, [data.name]);

  const sections = useMemo(() => [
    { id: "personal", label: "Personal", icon: <User size={15} /> },
    { id: "experience", label: "Experience", icon: <Briefcase size={15} /> },
    { id: "education", label: "Education", icon: <GraduationCap size={15} /> },
    { id: "skills", label: "Skills", icon: <Wrench size={15} /> },
  ], []);

  const templates = useMemo(() => [
    { id: "industrial" as TemplateType, label: "Industrial", desc: "Bold Architectural" },
    { id: "executive" as TemplateType, label: "Executive", desc: "Premium Corporate" },
    { id: "cleantech" as TemplateType, label: "CleanTech", desc: "Modern Minimal" },
    { id: "modern" as TemplateType, label: "Modern", desc: "Two-Column Pro" },
    { id: "minimal" as TemplateType, label: "Minimal", desc: "Minimalist Pro" },
    { id: "swiss" as TemplateType, label: "Swiss Clean", desc: "Grid Master" },
    { id: "plain" as TemplateType, label: "Classic", desc: "Academic Serif" },
  ], []);

  return (
    <>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 mb-16">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em]">
            <Briefcase size={12} className="text-brand-400" />
            <span>Career Architecture Protocol</span>
          </div>
          <h1 className="text-6xl font-black text-slate-900 tracking-tighter leading-none">
            Resume <span className="text-brand-600">Forge</span>
          </h1>
          <p className="text-slate-500 font-medium max-w-md">
            Engineer a high-impact professional dossier designed to dominate modern hiring systems.
          </p>
        </div>

        <button
          onClick={downloadPDF}
          disabled={isGenerating}
          className="w-full lg:w-auto group relative flex items-center justify-center gap-4 px-10 py-5 bg-slate-900 text-white rounded-[2rem] font-black uppercase tracking-[0.3em] text-xs shadow-2xl transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 overflow-hidden"
        >
          <div className="absolute inset-0 bg-brand-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          <span className="relative z-10 flex items-center gap-3">
             {isGenerating ? <Zap size={18} className="animate-pulse" /> : <Download size={18} />}
             {isGenerating ? "FORGING PDF..." : "EXPORT DOSSIER"}
          </span>
        </button>
      </div>

      <div className="grid lg:grid-cols-12 gap-12">
        {/* Editor Side */}
        <div className="lg:col-span-4 space-y-8">
           {/* Section Tabs */}
           <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl overflow-hidden">
              <div className="flex overflow-x-auto scrollbar-hide border-b border-slate-100">
                {sections.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setActiveSection(s.id)}
                    className={`flex-1 min-w-[80px] flex flex-col items-center justify-center gap-2 py-5 sm:py-6 transition-all ${
                      activeSection === s.id
                        ? "bg-slate-50 text-brand-600 border-b-2 border-brand-600"
                        : "text-slate-300 hover:text-slate-500"
                    }`}
                  >
                    {s.icon}
                    <span className="text-[7px] sm:text-[8px] font-black uppercase tracking-widest">{s.label}</span>
                  </button>
                ))}
              </div>

              <div className="p-8 max-h-[600px] overflow-y-auto scrollbar-hide">
                 {activeSection === "personal" && (
                    <div className="space-y-6">
                       <div className="flex items-center gap-6 mb-8">
                          {data.photoUrl ? (
                            <div className="relative group">
                               <img src={data.photoUrl} alt="Profile" className="w-20 h-20 rounded-3xl object-cover border-2 border-slate-100 shadow-lg" />
                               <button 
                                 onClick={() => setData({ ...data, photoUrl: null })}
                                 className="absolute -top-2 -right-2 bg-rose-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                               >×</button>
                            </div>
                          ) : (
                            <label className="w-20 h-20 rounded-3xl bg-slate-50 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-300 hover:border-brand-300 hover:text-brand-500 cursor-pointer transition-all">
                               <Upload size={20} />
                               <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
                            </label>
                          )}
                          <div>
                             <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Profile Identity</p>
                             <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tight mt-1">Industrial Portrait Ready</p>
                          </div>
                       </div>
                       
                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <InputField label="Full Name" value={data.name} onChange={(v) => setData({ ...data, name: v })} placeholder="e.g. Suleman Mughal" />
                          <InputField label="Professional Title" value={data.title} onChange={(v) => setData({ ...data, title: v })} placeholder="e.g. Systems Architect" />
                       </div>
                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <InputField label="Email" value={data.email} onChange={(v) => setData({ ...data, email: v })} placeholder="suleman@email.com" />
                          <InputField label="Phone" value={data.phone} onChange={(v) => setData({ ...data, phone: v })} placeholder="+92 ..." />
                       </div>
                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <InputField label="Location" value={data.location} onChange={(v) => setData({ ...data, location: v })} placeholder="City, Country" />
                          <InputField label="Website" value={data.website || ""} onChange={(v) => setData({ ...data, website: v })} placeholder="portfolio.com" />
                       </div>
                       <InputField label="LinkedIn" value={data.linkedin || ""} onChange={(v) => setData({ ...data, linkedin: v })} placeholder="linkedin.com/in/..." />
                       <TextAreaField label="Executive Summary" value={data.summary} onChange={(v) => setData({ ...data, summary: v })} rows={5} />
                    </div>
                 )}

                 {activeSection === "experience" && (
                    <TextAreaField label="Logs" value={data.experience} onChange={(v) => setData({ ...data, experience: v })} rows={18} hint="Role at Company (Date)\n- Achievement" />
                 )}
                 {activeSection === "education" && (
                    <TextAreaField label="Academy" value={data.education} onChange={(v) => setData({ ...data, education: v })} rows={10} />
                 )}
                 {activeSection === "skills" && (
                    <TextAreaField label="Toolstack" value={data.skills} onChange={(v) => setData({ ...data, skills: v })} rows={8} hint="Comma separated" />
                 )}
              </div>
           </div>

           {/* Template Grid */}
           <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl">
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] mb-6 flex items-center gap-3">
                 <LayoutTemplate size={16} className="text-brand-400" />
                 Core Architectures
              </h3>
              <div className="grid grid-cols-2 gap-3">
                 {templates.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setTemplate(t.id)}
                      className={`p-4 rounded-2xl border transition-all text-left group ${
                        template === t.id ? "bg-brand-600 border-brand-500 shadow-lg shadow-brand-900/50" : "bg-white/5 border-white/10 hover:bg-white/10"
                      }`}
                    >
                       <p className="text-[10px] font-black uppercase tracking-widest leading-none mb-1">{t.label}</p>
                       <p className="text-[8px] font-bold opacity-40 uppercase tracking-tight">{t.desc}</p>
                    </button>
                 ))}
              </div>
           </div>
        </div>

        {/* Preview Side */}
        <div className="lg:col-span-8">
           <div 
             ref={containerRef}
             className="bg-slate-50 rounded-[3rem] border border-slate-100 shadow-inner p-6 sm:p-12 flex justify-center items-start overflow-hidden relative min-h-[600px]"
           >
              {/* Dynamic Scaling Wrapper */}
              <div 
                className="relative bg-white shadow-2xl origin-top transition-transform duration-500 ease-out"
                style={{ 
                  width: "210mm", 
                  height: "285mm", // Slightly reduced height as requested to avoid excessive scrolling
                  transform: `scale(${previewScale})`,
                  marginBottom: `calc((285mm * ${previewScale}) - 285mm)`
                }}
              >
                <div ref={cvRef} className="w-full h-full overflow-hidden">
                   <CvTemplate template={template} data={data} />
                </div>
              </div>

              {/* Specs Badge */}
              <div className="absolute bottom-8 right-8 bg-slate-900/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 flex items-center gap-3">
                 <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                 <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">A4 • 210x297mm • 300DPI</span>
              </div>
           </div>
        </div>
      </div>

      {/* Professional Documentation Section */}
      <div className="mt-32 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-20 border-t border-slate-100 pt-20">
          <div className="space-y-12">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-50 flex items-center justify-center text-brand-600">
                <BookOpen size={24} />
              </div>
              <h2 className="text-4xl font-black text-slate-900 tracking-tighter">Professional <span className="text-brand-600">Protocol</span></h2>
              <p className="text-slate-500 font-medium leading-relaxed">
                Follow the industry-standard workflow to engineer a high-impact dossier that captures recruiter attention in seconds.
              </p>
            </div>
            
            <div className="space-y-8">
              {[
                { title: "Define Your Identity", desc: "Start with your core professional title and a high-fidelity summary. Focus on quantifiable achievements." },
                { title: "Select Architecture", desc: "Choose a design architecture (Minimal, Swiss, or Classic) that aligns with your industry's culture." },
                { title: "Map Experience History", desc: "Use reverse-chronological order. Ensure every bullet point starts with a powerful action verb." },
                { title: "Technical Verification", desc: "Audit your expertise matrix. Include industry-relevant keywords for modern ATS compatibility." }
              ].map((step, i) => (
                <div key={i} className="flex gap-6 group">
                  <div className="w-10 h-10 rounded-full border-2 border-slate-100 flex items-center justify-center text-slate-300 font-black text-sm group-hover:border-brand-600 group-hover:text-brand-600 transition-all">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">{step.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-12">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center text-white">
                <HelpCircle size={24} />
              </div>
              <h2 className="text-4xl font-black text-slate-900 tracking-tighter text-right">Forge <span className="text-slate-400">Intelligence</span></h2>
            </div>

            <div className="space-y-6">
              {[
                { q: "Is my data privacy guaranteed?", a: "SAMToolBox operates on a zero-knowledge protocol. All CV data is processed locally in your browser and never touches our servers." },
                { q: "Which template is best for high-end roles?", a: "The 'Swiss Master' (Basel Grid) is ideal for design and engineering, while 'Luxe Minimal' suits executive and boutique roles." },
                { q: "How do I handle multi-page CVs?", a: "The generator automatically optimizes layout density. For very long histories, the PDF export handles pagination seamlessly." },
                { q: "Is the PDF export print-ready?", a: "Yes, we export at 300DPI using high-fidelity vector rendering to ensure crisp text at any print size." }
              ].map((faq, i) => (
                <div key={i} className="p-8 rounded-3xl bg-white border border-slate-100 hover:border-brand-200 hover:shadow-xl hover:shadow-slate-200/50 transition-all group">
                  <h3 className="font-bold text-slate-900 mb-3 flex items-center justify-between">
                    {faq.q}
                    <Zap size={16} className="text-slate-100 group-hover:text-brand-400 transition-colors" />
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed font-medium">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-32 text-center pb-20">
           <p className="text-slate-300 text-xs font-bold uppercase tracking-[0.5em]">SAMToolBox Professional Suite • v4.0 • Secure Browser Utility</p>
        </div>
      </div>
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════
   SHARED INPUT COMPONENTS
═══════════════════════════════════════════ */
interface FieldProps {
  label: string;
  icon?: React.ReactNode;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  rows?: number;
  hint?: string;
}

const InputField = ({ label, icon, value, onChange, placeholder }: FieldProps) => (
  <div>
    <label className="flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-[11px] font-black text-slate-500 uppercase tracking-widest mb-1 sm:mb-1.5">
      {icon && <span className="text-slate-400">{icon}</span>}
      {label}
    </label>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full px-3 sm:px-3.5 py-2 sm:py-2.5 bg-slate-50 border border-slate-200 rounded-lg sm:rounded-xl focus:border-brand-500 focus:bg-white focus:ring-2 focus:ring-brand-500/10 outline-none text-slate-800 text-xs sm:text-sm font-medium transition-all placeholder:text-slate-300"
    />
  </div>
);

const TextAreaField = ({ label, icon, value, onChange, placeholder, rows = 4, hint }: FieldProps) => (
  <div>
    <label className="flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-[11px] font-black text-slate-500 uppercase tracking-widest mb-1 sm:mb-1.5">
      {icon && <span className="text-slate-400">{icon}</span>}
      {label}
    </label>
    <textarea
      rows={rows}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full px-3 sm:px-3.5 py-2 sm:py-2.5 bg-slate-50 border border-slate-200 rounded-lg sm:rounded-xl focus:border-brand-500 focus:bg-white focus:ring-2 focus:ring-brand-500/10 outline-none text-slate-800 text-xs sm:text-sm font-medium transition-all resize-none placeholder:text-slate-300"
    />
    {hint && <p className="text-[9px] sm:text-[10px] text-slate-400 mt-1 sm:mt-1.5 leading-relaxed font-medium">{hint}</p>}
  </div>
);

/* ═══════════════════════════════════════════
   CV TEMPLATE RENDERER
═══════════════════════════════════════════ */
const CvTemplate = ({ template, data }: { template: TemplateType; data: CVData }) => {
  const skillsList = useMemo(() => data.skills.split(",").map(s => s.trim()), [data.skills]);
  const educationList = useMemo(() => data.education.split("\n\n"), [data.education]);
  const experienceList = useMemo(() => data.experience.split("\n\n"), [data.experience]);

  /* ─── EXECUTIVE ELITE (Solid Sidebar, High Contrast) ─── */
  if (template === "executive") {
    return (
      <div className="flex w-[210mm] h-[297mm] overflow-hidden bg-white" style={{ fontFamily: "'Inter', sans-serif" }}>
        <div className="w-[32%] bg-[#1e293b] text-white px-8 py-8 flex flex-col shrink-0">
          {data.photoUrl && (
            <div className="w-24 h-24 rounded-2xl overflow-hidden border-4 border-slate-700 mx-auto mb-6 shadow-2xl">
              <img src={data.photoUrl} alt="Profile" className="w-full h-full object-cover" />
            </div>
          )}
          <div className="space-y-8">
            <section>
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-400 mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-400" /> Contact
              </h3>
              <div className="space-y-3 text-[10px] font-medium leading-relaxed opacity-80">
                {data.email && <p className="flex items-center gap-2.5"><Mail size={11} className="text-brand-400 shrink-0" /> <span className="break-all">{data.email}</span></p>}
                {data.phone && <p className="flex items-center gap-2.5"><Phone size={11} className="text-brand-400 shrink-0" /> {data.phone}</p>}
                {data.location && <p className="flex items-center gap-2.5"><MapPin size={11} className="text-brand-400 shrink-0" /> {data.location}</p>}
              </div>
            </section>
            <section>
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-400 mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-400" /> Expertise
              </h3>
              <div className="flex flex-wrap gap-2">
                {skillsList.map((s, i) => (
                  <span key={i} className="text-[9px] font-black px-2 py-1 bg-slate-800 rounded-md border border-slate-700 uppercase tracking-widest text-slate-300">{s}</span>
                ))}
              </div>
            </section>
          </div>
        </div>
        <div className="flex-1 px-10 py-10 bg-white overflow-hidden">
          <header className="mb-10">
            <h1 className="text-[36px] font-black text-slate-900 leading-none tracking-tighter mb-3 uppercase">{data.name}</h1>
            <div className="h-1.5 w-24 bg-brand-600 mb-5" />
            <p className="text-xl font-bold text-slate-400 uppercase tracking-[0.2em]">{data.title}</p>
          </header>
          <div className="space-y-10">
            <section>
              <h2 className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-300 mb-4">01 Summary</h2>
              <p className="text-[13px] text-slate-600 leading-[1.8] font-medium">{data.summary}</p>
            </section>
            <section>
              <h2 className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-300 mb-6">02 Experience</h2>
              <div className="space-y-6">
                {experienceList.map((block, i) => (
                  <div key={i}>
                    <div className="flex justify-between items-baseline mb-2">
                      <h4 className="text-lg font-black text-slate-800">{block.split("\n")[0].split("(")[0]}</h4>
                      <span className="text-[10px] font-black text-brand-600 px-3 py-1 bg-brand-50 rounded-full uppercase tracking-widest leading-none">
                        {block.match(/\((.*?)\)/)?.[1] || ""}
                      </span>
                    </div>
                    <ul className="space-y-1.5">
                      {block.split("\n").slice(1).map((p, pi) => (
                        <li key={pi} className="flex gap-4">
                          <span className="w-1.5 h-1.5 bg-slate-200 rounded-full mt-2 shrink-0" />
                          <span className="text-[12px] text-slate-600 leading-relaxed font-medium">{p.replace(/^[-•*]\s*/, "")}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    );
  }

  /* ─── MINIMAL (Luxe Boutique) ─── */
  if (template === "minimal") {
    return (
      <div className="bg-white w-[210mm] h-[297mm] overflow-hidden text-[#1a1a1a] flex flex-col p-20" style={{ fontFamily: "'Outfit', sans-serif" }}>
        <header className="mb-20 text-center">
          <h1 className="text-[48px] font-extralight tracking-[0.12em] text-[#0a0a0a] uppercase mb-4 leading-none">{data.name}</h1>
          <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-slate-400 mb-10">{data.title}</p>
          <div className="flex justify-center gap-12 text-[10px] font-medium uppercase tracking-[0.2em] text-slate-500">
             <span>{data.email}</span>
             <span>{data.phone}</span>
             <span>{data.website}</span>
          </div>
          <div className="mt-12 h-px w-24 bg-slate-100 mx-auto" />
        </header>
        <div className="flex-1 space-y-16">
          <section className="max-w-2xl mx-auto text-center italic text-slate-500 text-[14px] leading-[1.8]">
             {data.summary}
          </section>
          <section className="max-w-3xl mx-auto">
            <h3 className="text-[9px] font-bold uppercase tracking-[0.6em] text-slate-900 mb-10 text-center">Engagement</h3>
            <div className="space-y-12">
              {experienceList.map((e, i) => (
                <div key={i}>
                  <div className="flex justify-between items-baseline mb-4 border-b border-slate-50 pb-2">
                    <h4 className="text-[17px] font-semibold text-[#1a1a1a] tracking-tight">{e.split("\n")[0].split("(")[0]}</h4>
                    <span className="text-[10px] font-medium text-slate-300 uppercase tracking-widest tabular-nums">{e.match(/\((.*?)\)/)?.[1] || ""}</span>
                  </div>
                  <ul className="space-y-3">
                    {e.split("\n").slice(1).map((p, pi) => (
                      <li key={pi} className="text-[13px] text-slate-500 leading-relaxed text-justify">
                        {p.replace(/^[-•*]\s*/, "")}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    );
  }

  /* ─── SWISS MASTER (The Basel Grid) ─── */
  if (template === "swiss") {
    return (
      <div className="bg-white w-[210mm] h-[297mm] overflow-hidden text-black flex flex-col p-16" style={{ fontFamily: "'Inter', sans-serif" }}>
        <header className="mb-20 grid grid-cols-12 gap-8 items-end">
          <div className="col-span-8">
            <h1 className="text-[68px] font-black uppercase tracking-[-0.06em] leading-[0.75] mb-4">{data.name}</h1>
            <p className="text-[15px] font-black uppercase tracking-[0.5em] text-black/30">{data.title}</p>
          </div>
          <div className="col-span-4 text-right text-[10px] font-black uppercase tracking-[0.2em] space-y-1">
            <p>{data.email}</p>
            <p>{data.phone}</p>
            <p className="text-brand-600 underline underline-offset-4">{data.website}</p>
          </div>
        </header>
        <div className="flex-1 space-y-16">
          <div className="grid grid-cols-12 gap-12 border-t-8 border-black pt-10">
             <div className="col-span-3 text-[11px] font-black uppercase tracking-[0.3em]">01. Profile</div>
             <div className="col-span-9 text-[16px] font-medium leading-relaxed text-black/80">{data.summary}</div>
          </div>
          <div className="grid grid-cols-12 gap-12 border-t-2 border-black pt-10">
             <div className="col-span-3 text-[11px] font-black uppercase tracking-[0.3em]">02. Experience</div>
             <div className="col-span-9 space-y-16">
                {experienceList.map((e, i) => (
                  <div key={i} className="grid grid-cols-8 gap-4">
                     <div className="col-span-2 text-[11px] font-black text-black/20">{e.match(/\((.*?)\)/)?.[1] || ""}</div>
                     <div className="col-span-6">
                        <h4 className="text-[22px] font-black uppercase tracking-tight mb-4">{e.split("\n")[0].split("(")[0]}</h4>
                        <ul className="space-y-4">
                           {e.split("\n").slice(1).map((p, pi) => (
                              <li key={pi} className="text-[14px] text-black/60 leading-normal flex gap-5">
                                 <div className="w-2.5 h-2.5 bg-black shrink-0 mt-[5px]" />
                                 <span>{p.replace(/^[-•*]\s*/, "")}</span>
                              </li>
                           ))}
                        </ul>
                     </div>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </div>
    );
  }

  /* ─── CLASSIC (Ivy League Academic) ─── */
  if (template === "plain") {
    return (
      <div className="bg-white w-[210mm] h-[297mm] overflow-hidden text-[#1a1a1a] p-20" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
        <header className="text-center border-b-[1.5px] border-black pb-8 mb-12">
          <h1 className="text-[32px] font-bold mb-3 uppercase tracking-[0.05em]">{data.name}</h1>
          <div className="text-[13px] flex justify-center gap-6 font-medium italic">
            <span>{data.email}</span>
            <span className="text-slate-300">|</span>
            <span>{data.phone}</span>
            <span className="text-slate-300">|</span>
            <span>{data.location}</span>
          </div>
        </header>
        <div className="space-y-12 text-[14px] leading-[1.6]">
          <section>
            <h2 className="text-[13px] font-bold uppercase tracking-[0.2em] border-b border-black mb-4 pb-1">Summary</h2>
            <p className="text-justify italic">{data.summary}</p>
          </section>
          <section>
            <h2 className="text-[13px] font-bold uppercase tracking-[0.2em] border-b border-black mb-6 pb-1">Experience</h2>
            <div className="space-y-10">
              {experienceList.map((e, i) => (
                <div key={i}>
                  <div className="flex justify-between items-baseline mb-2">
                    <h4 className="font-bold">{e.split("\n")[0].split("(")[0].trim()}</h4>
                    <span className="italic font-medium">{e.match(/\((.*?)\)/)?.[1] || ""}</span>
                  </div>
                  <ul className="list-disc ml-5 space-y-2">
                    {e.split("\n").slice(1).map((p, pi) => (
                      <li key={pi} className="pl-2">{p.replace(/^[-•*]\s*/, "")}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    );
  }

  /* Default Industrial */
  return (
    <div className="bg-white w-[210mm] h-[297mm] overflow-hidden p-16 text-slate-900" style={{ fontFamily: "'Inter', sans-serif" }}>
       <h1 className="text-5xl font-black tracking-tighter uppercase mb-4">{data.name}</h1>
       <p className="text-xl font-bold text-brand-600 uppercase tracking-widest mb-10">{data.title}</p>
       <div className="grid grid-cols-12 gap-12">
          <div className="col-span-8">
             <h3 className="text-xs font-black uppercase tracking-[0.4em] text-slate-300 mb-6">History</h3>
             <div className="space-y-8">
                {experienceList.map((e, i) => (
                   <div key={i} className="border-l-4 border-slate-100 pl-6">
                      <h4 className="text-lg font-black uppercase">{e.split("\n")[0].split("(")[0]}</h4>
                      <p className="text-sm text-slate-600 mt-2">{e.split("\n").slice(1)[0]?.replace(/^[-•*]\s*/, "")}</p>
                   </div>
                ))}
             </div>
          </div>
          <div className="col-span-4">
             <h3 className="text-xs font-black uppercase tracking-[0.4em] text-slate-300 mb-6">Expertise</h3>
             <div className="flex flex-wrap gap-2">
                {skillsList.map((s, i) => (
                   <span key={i} className="text-[10px] font-black uppercase tracking-widest px-2 py-1 bg-slate-900 text-white">{s}</span>
                ))}
             </div>
          </div>
       </div>
    </div>
  );
};

