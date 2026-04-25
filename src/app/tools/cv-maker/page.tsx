"use client";

import { useState, useRef } from "react";
import { toCanvas } from "html-to-image";
import { jsPDF } from "jspdf";
import {
  Download, Upload, Image as ImageIcon, User, Edit3,
  Mail, Phone, MapPin, LayoutTemplate, Globe, Link,
  Briefcase, GraduationCap, Wrench, FileText, CheckCircle2,
} from "lucide-react";

type TemplateType = "plain" | "modern" | "minimal" | "executive" | "industrial" | "cleantech";

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
  const [template, setTemplate] = useState<TemplateType>("executive");
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeSection, setActiveSection] = useState("personal");
  const cvRef = useRef<HTMLDivElement>(null);

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

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setData({ ...data, photoUrl: url });
    }
  };

  const downloadPDF = async () => {
    if (!cvRef.current) return;
    setIsGenerating(true);
    try {
      const canvas = await toCanvas(cvRef.current, {
        pixelRatio: 2,
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
  };

  const sections = [
    { id: "personal", label: "Personal", icon: <User size={15} /> },
    { id: "experience", label: "Experience", icon: <Briefcase size={15} /> },
    { id: "education", label: "Education", icon: <GraduationCap size={15} /> },
    { id: "skills", label: "Skills", icon: <Wrench size={15} /> },
  ];

  const templates = [
    { id: "executive" as TemplateType, label: "Executive", desc: "Premium Corporate" },
    { id: "industrial" as TemplateType, label: "Industrial", desc: "Bold Architectural" },
    { id: "cleantech" as TemplateType, label: "CleanTech", desc: "Modern Minimal" },
    { id: "modern" as TemplateType, label: "Modern", desc: "Two-Column Pro" },
    { id: "minimal" as TemplateType, label: "Minimal", desc: "Swiss Clean" },
    { id: "plain" as TemplateType, label: "Classic", desc: "Academic Serif" },
  ];

  return (
    <div className="max-w-[1700px] mx-auto py-6 px-4">

      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Executive CV Maker</h1>
          <p className="text-sm text-slate-500 font-medium mt-1">Professional templates designed for elite career advancement.</p>
        </div>
        <button
          onClick={downloadPDF}
          disabled={isGenerating}
          className="flex items-center gap-2.5 px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white font-black uppercase tracking-widest text-xs rounded-xl shadow-lg shadow-brand-600/25 transition-all hover:scale-105 active:scale-95 disabled:opacity-60"
        >
          <Download size={15} />
          {isGenerating ? "Exporting..." : "Download PDF"}
        </button>
      </div>

      <div className="flex flex-col xl:flex-row gap-6 items-start">

        {/* ════════════════════════════════
            LEFT PANEL — Editor
        ════════════════════════════════ */}
        <div className="w-full xl:w-[380px] shrink-0 space-y-4">

          {/* Template Picker */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-md p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 bg-slate-900 rounded-lg flex items-center justify-center">
                <LayoutTemplate size={13} className="text-white" />
              </div>
              <h2 className="text-sm font-black text-slate-900 uppercase tracking-widest">Select Template</h2>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {templates.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTemplate(t.id)}
                  className={`relative p-3 rounded-xl border text-left transition-all ${
                    template === t.id
                      ? "bg-slate-900 border-slate-900 text-white shadow-xl"
                      : "bg-slate-50 border-slate-200 text-slate-700 hover:border-brand-300"
                  }`}
                >
                  {template === t.id && (
                    <CheckCircle2 size={12} className="absolute top-2 right-2 text-brand-400" />
                  )}
                  <div className="font-black text-[11px] uppercase tracking-wider mb-0.5">{t.label}</div>
                  <div className={`text-[9px] font-medium leading-tight ${template === t.id ? "text-slate-400" : "text-slate-400"}`}>
                    {t.desc}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Section Nav Tabs */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-md overflow-hidden">
            <div className="flex border-b border-slate-100">
              {sections.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setActiveSection(s.id)}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-3 text-[11px] font-black uppercase tracking-wider transition-all ${
                    activeSection === s.id
                      ? "text-brand-600 border-b-2 border-brand-600 bg-brand-50/50"
                      : "text-slate-400 hover:text-slate-600"
                  }`}
                >
                  {s.icon}
                  <span className="hidden sm:inline">{s.label}</span>
                </button>
              ))}
            </div>

            <div className="p-5 space-y-4 max-h-[62vh] overflow-y-auto">

              {/* PERSONAL */}
              {activeSection === "personal" && (
                <>
                  {/* Photo Upload */}
                  <div>
                    <label className="block text-[11px] font-black text-slate-500 uppercase tracking-widest mb-2">
                      Profile Photo
                    </label>
                    <div className="flex items-center gap-4">
                      {data.photoUrl ? (
                        <div className="relative">
                          <img src={data.photoUrl} alt="Profile" className="w-14 h-14 rounded-xl object-cover border-2 border-slate-200" />
                          <button
                            onClick={() => setData({ ...data, photoUrl: null })}
                            className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center font-black"
                          >×</button>
                        </div>
                      ) : (
                        <div className="w-14 h-14 rounded-xl bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center text-slate-400">
                          <User size={20} />
                        </div>
                      )}
                      <label className="cursor-pointer flex items-center gap-2 px-4 py-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 transition">
                        <Upload size={14} /> Upload
                        <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
                      </label>
                    </div>
                  </div>

                  <div className="h-px bg-slate-100" />

                  <InputField label="Full Name" icon={<User size={13} />} value={data.name} onChange={(v) => setData({ ...data, name: v })} placeholder="e.g. John Doe" />
                  <InputField label="Professional Title" icon={<Briefcase size={13} />} value={data.title} onChange={(v) => setData({ ...data, title: v })} placeholder="e.g. Software Engineer" />
                  <InputField label="Email Address" icon={<Mail size={13} />} value={data.email} onChange={(v) => setData({ ...data, email: v })} placeholder="john@email.com" />
                  <InputField label="Phone" icon={<Phone size={13} />} value={data.phone} onChange={(v) => setData({ ...data, phone: v })} placeholder="+1 234 567 890" />
                  <InputField label="Location" icon={<MapPin size={13} />} value={data.location} onChange={(v) => setData({ ...data, location: v })} placeholder="City, Country" />
                  <InputField label="Website" icon={<Globe size={13} />} value={data.website || ""} onChange={(v) => setData({ ...data, website: v })} placeholder="www.yoursite.com" />
                  <InputField label="LinkedIn" icon={<Link size={13} />} value={data.linkedin || ""} onChange={(v) => setData({ ...data, linkedin: v })} placeholder="linkedin.com/in/username" />
                  <TextAreaField label="Professional Summary" icon={<FileText size={13} />} value={data.summary} onChange={(v) => setData({ ...data, summary: v })} rows={4} />
                </>
              )}

              {/* EXPERIENCE */}
              {activeSection === "experience" && (
                <TextAreaField
                  label="Work Experience"
                  icon={<Briefcase size={13} />}
                  value={data.experience}
                  onChange={(v) => setData({ ...data, experience: v })}
                  rows={14}
                  hint='Format: "Role at Company (Date)\n- Bullet points\n\nNext Job..."'
                />
              )}

              {/* EDUCATION */}
              {activeSection === "education" && (
                <TextAreaField
                  label="Education"
                  icon={<GraduationCap size={13} />}
                  value={data.education}
                  onChange={(v) => setData({ ...data, education: v })}
                  rows={8}
                  hint='Format: "Degree Name\nInstitution (Year - Year)"'
                />
              )}

              {/* SKILLS */}
              {activeSection === "skills" && (
                <TextAreaField
                  label="Skills"
                  icon={<Wrench size={13} />}
                  value={data.skills}
                  onChange={(v) => setData({ ...data, skills: v })}
                  rows={5}
                  hint="Enter skills separated by commas: React, Node.js, Python..."
                />
              )}
            </div>
          </div>
        </div>

        {/* ════════════════════════════════
            RIGHT PANEL — Live Preview
        ════════════════════════════════ */}
        <div className="flex-1 min-w-0">
          <div className="bg-slate-100 border border-slate-200 rounded-2xl shadow-inner p-6 flex justify-center overflow-hidden">
            <div
              className="origin-top-left"
              style={{ transform: "scale(0.62)", transformOrigin: "top center", width: "210mm", minHeight: "297mm" }}
            >
              <div
                ref={cvRef}
                className="bg-white w-[210mm] min-h-[297mm] shadow-2xl overflow-hidden"
              >
                <CvTemplate template={template} data={data} />
              </div>
            </div>
          </div>
          <p className="text-center text-[11px] text-slate-400 font-medium mt-3 uppercase tracking-widest">
            Print Quality Render · A4 Layout · 300 DPI Optimized
          </p>
        </div>
      </div>
    </div>
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
    <label className="flex items-center gap-1.5 text-[11px] font-black text-slate-500 uppercase tracking-widest mb-1.5">
      {icon && <span className="text-slate-400">{icon}</span>}
      {label}
    </label>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-brand-500 focus:bg-white focus:ring-2 focus:ring-brand-500/10 outline-none text-slate-800 text-sm font-medium transition-all placeholder:text-slate-300"
    />
  </div>
);

const TextAreaField = ({ label, icon, value, onChange, placeholder, rows = 4, hint }: FieldProps) => (
  <div>
    <label className="flex items-center gap-1.5 text-[11px] font-black text-slate-500 uppercase tracking-widest mb-1.5">
      {icon && <span className="text-slate-400">{icon}</span>}
      {label}
    </label>
    <textarea
      rows={rows}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-brand-500 focus:bg-white focus:ring-2 focus:ring-brand-500/10 outline-none text-slate-800 text-sm font-medium transition-all resize-none placeholder:text-slate-300"
    />
    {hint && <p className="text-[10px] text-slate-400 mt-1.5 leading-relaxed font-medium">{hint}</p>}
  </div>
);

/* ═══════════════════════════════════════════
   CV TEMPLATE RENDERER
═══════════════════════════════════════════ */
const CvTemplate = ({ template, data }: { template: TemplateType; data: CVData }) => {

  const accentColor = "#2563eb"; // Brand Blue

  /* ─── EXECUTIVE ELITE (Solid Sidebar, High Contrast) ─── */
  if (template === "executive") {
    return (
      <div className="flex min-h-[297mm]" style={{ fontFamily: "'Inter', sans-serif" }}>
        {/* Left Sidebar */}
        <div className="w-[32%] bg-[#1e293b] text-white px-8 py-10 flex flex-col shrink-0">
          {data.photoUrl ? (
            <div className="w-32 h-32 rounded-2xl overflow-hidden border-4 border-slate-700 mx-auto mb-8 shadow-2xl rotate-2">
              <img src={data.photoUrl} alt="Profile" className="w-full h-full object-cover" />
            </div>
          ) : (
            <div className="w-32 h-32 rounded-2xl bg-slate-800 flex items-center justify-center mx-auto mb-8 border-4 border-slate-700 shadow-2xl">
              <span className="text-5xl font-black text-slate-600">{(data.name || "?").charAt(0)}</span>
            </div>
          )}

          <div className="space-y-8">
            <section>
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-400 mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-400" /> Contact
              </h3>
              <div className="space-y-3 text-[10px] font-medium leading-relaxed opacity-80">
                {data.email && <p className="flex items-center gap-2.5"><Mail size={11} className="text-brand-400" /> {data.email}</p>}
                {data.phone && <p className="flex items-center gap-2.5"><Phone size={11} className="text-brand-400" /> {data.phone}</p>}
                {data.location && <p className="flex items-center gap-2.5"><MapPin size={11} className="text-brand-400" /> {data.location}</p>}
              </div>
            </section>

            {data.skills && (
              <section>
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-400 mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-400" /> Expertise
                </h3>
                <div className="flex flex-wrap gap-2">
                  {data.skills.split(",").map((s, i) => (
                    <span key={i} className="text-[9px] font-black px-2 py-1 bg-slate-800 rounded-md border border-slate-700 uppercase tracking-widest text-slate-300">
                      {s.trim()}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {data.education && (
              <section>
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-400 mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-400" /> Academy
                </h3>
                <div className="space-y-4">
                  {data.education.split("\n\n").map((e, i) => (
                    <div key={i} className="border-l-2 border-brand-500/30 pl-3">
                      <p className="text-[11px] font-black leading-tight text-white">{e.split("\n")[0]}</p>
                      <p className="text-[9px] font-medium text-slate-400 mt-1 opacity-70">{e.split("\n")[1]}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          <div className="mt-auto pt-10 opacity-30 text-center">
            <p className="text-[8px] font-black uppercase tracking-[0.5em]">SamToolbox Elite</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 px-12 py-12 bg-white">
          <header className="mb-12">
            <h1 className="text-[42px] font-black text-slate-900 leading-none tracking-tighter mb-3 uppercase">{data.name || "Identity Name"}</h1>
            <div className="h-1.5 w-24 bg-brand-600 mb-5" />
            <p className="text-xl font-bold text-slate-400 uppercase tracking-[0.2em]">{data.title || "Elite Professional"}</p>
          </header>

          <div className="space-y-12">
            {data.summary && (
              <section>
                <h2 className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-300 mb-4">01 Executive Summary</h2>
                <p className="text-[13px] text-slate-600 leading-[1.8] font-medium">{data.summary}</p>
              </section>
            )}

            {data.experience && (
              <section>
                <h2 className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-300 mb-6">02 Experience History</h2>
                <div className="space-y-8">
                  {data.experience.split("\n\n").map((block, i) => {
                    const lines = block.split("\n");
                    const head = lines[0];
                    const pts = lines.slice(1);
                    return (
                      <div key={i}>
                        <div className="flex justify-between items-baseline mb-3">
                          <h4 className="text-lg font-black text-slate-800">{head.split("(")[0].trim()}</h4>
                          <span className="text-[10px] font-black text-brand-600 px-3 py-1 bg-brand-50 rounded-full uppercase tracking-widest leading-none">
                            {head.includes("(") ? head.match(/\((.*?)\)/)?.[1] : "Timeline"}
                          </span>
                        </div>
                        <ul className="space-y-2">
                          {pts.map((p, pi) => (
                            <li key={pi} className="flex gap-4">
                              <span className="w-1.5 h-1.5 bg-slate-200 rounded-full mt-2 shrink-0" />
                              <span className="text-[12px] text-slate-600 leading-relaxed font-medium">{p.replace(/^[-•*]\s*/, "")}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    );
  }

  /* ─── INDUSTRIAL SLATE (Bold Engineering Style) ─── */
  if (template === "industrial") {
    return (
      <div className="bg-[#fcfcfc] min-h-[297mm] p-12 text-slate-900 border-[16px] border-slate-900" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
        <div className="flex justify-between items-start mb-16">
          <div className="max-w-2xl">
            <h1 className="text-[52px] font-black tracking-[-0.05em] leading-[0.9] text-slate-900 mb-6 uppercase italic">
              {data.name?.split(" ").map((n, i) => (
                <span key={i} className={i % 2 === 1 ? "text-brand-600" : ""}>{n} </span>
              ))}
            </h1>
            <div className="flex gap-4 items-center mb-6">
              <span className="px-4 py-1.5 bg-slate-900 text-white font-black uppercase text-xs tracking-widest">{data.title}</span>
              <div className="h-px w-20 bg-slate-200" />
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">{data.location}</div>
            </div>
            <p className="text-[13px] leading-relaxed font-medium text-slate-600 border-l-4 border-brand-500 pl-6 py-2 italic">{data.summary}</p>
          </div>
          <div className="text-right text-[10px] font-black uppercase tracking-[0.2em] leading-relaxed text-slate-900">
            <p>{data.email}</p>
            <p>{data.phone}</p>
            <p className="text-brand-600">{data.website}</p>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-12">
          <div className="col-span-8">
            <h3 className="text-xs font-black uppercase tracking-[0.4em] mb-8 bg-slate-100 px-4 py-2 text-slate-900 inline-block">Experience Logs</h3>
            <div className="space-y-10">
              {data.experience.split("\n\n").map((e, i) => (
                <div key={i} className="relative pl-10 border-l-4 border-slate-200">
                  <div className="absolute top-0 -left-[10px] w-4 h-4 bg-slate-900 rounded-sm" />
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-base font-black uppercase italic tracking-tighter">{e.split("\n")[0]}</h4>
                  </div>
                  <ul className="space-y-2">
                    {e.split("\n").slice(1).map((p, pi) => (
                      <li key={pi} className="text-[12px] text-slate-600 leading-relaxed font-medium">{p}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div className="col-span-4 space-y-12">
            <section>
              <h3 className="text-xs font-black uppercase tracking-[0.4em] mb-6 text-slate-300">Technical Ops</h3>
              <div className="flex flex-col gap-2">
                {data.skills.split(",").map((s, i) => (
                  <div key={i} className="flex justify-between items-center text-[11px] font-black uppercase tracking-wider text-slate-700 bg-slate-50 px-3 py-2 border-r-4 border-brand-600">
                    {s.trim()}
                  </div>
                ))}
              </div>
            </section>
            <section>
              <h3 className="text-xs font-black uppercase tracking-[0.4em] mb-6 text-slate-300">Qualifications</h3>
              <div className="space-y-4">
                {data.education.split("\n\n").map((ed, i) => (
                  <div key={i} className="text-[12px] font-bold text-slate-800 leading-tight">
                    <p className="text-slate-400 text-[10px] mb-1 font-black uppercase tracking-widest">{ed.split("\n")[1]}</p>
                    <p>{ed.split("\n")[0]}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    );
  }

  /* ─── CLEANTECH (Ultra-Modern Minimal) ─── */
  if (template === "cleantech") {
    return (
      <div className="bg-white min-h-[297mm] p-16 text-slate-900 border-x-[40px] border-white" style={{ fontFamily: "'Inter', sans-serif" }}>
        <header className="mb-20 text-center relative">
          <div className="inline-block px-12 py-4 border-[3px] border-slate-900 relative z-10 bg-white">
            <h1 className="text-4xl font-black tracking-[-0.08em] uppercase leading-none">{data.name}</h1>
          </div>
          <div className="absolute top-1/2 left-0 right-0 h-px bg-slate-100 -z-0" />
          <p className="mt-8 text-[11px] font-black uppercase tracking-[0.8em] text-slate-400">{data.title}</p>
          <div className="mt-6 flex justify-center gap-8 text-[9px] font-bold uppercase tracking-widest text-slate-600">
            <span>{data.email}</span>
            <span className="text-brand-500">/</span>
            <span>{data.phone}</span>
            <span className="text-brand-500">/</span>
            <span>{data.location}</span>
          </div>
        </header>

        <div className="grid grid-cols-12 gap-16">
          <div className="col-span-4 space-y-12">
            <section>
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] mb-4 text-slate-300">Bio</h3>
              <p className="text-[12px] text-slate-500 font-medium leading-[2] text-justify">{data.summary}</p>
            </section>
            <section>
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] mb-4 text-slate-300">Stack</h3>
              <div className="flex flex-wrap gap-2">
                {data.skills.split(",").map((s, i) => (
                  <span key={i} className="text-[10px] font-bold text-slate-900 border-b border-slate-200 pb-1">{s.trim()}</span>
                ))}
              </div>
            </section>
          </div>
          <div className="col-span-8 flex flex-col gap-16">
            <section>
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] mb-8 text-slate-300">Career Progress</h3>
              <div className="space-y-12">
                {data.experience.split("\n\n").map((e, i) => (
                  <div key={i} className="grid grid-cols-6 gap-4">
                    <div className="col-span-2 text-[10px] font-black text-slate-300 uppercase italic">{e.match(/\((.*?)\)/)?.[1] || "—"}</div>
                    <div className="col-span-4">
                      <h4 className="text-sm font-black text-slate-900 mb-2 uppercase">{e.split("\n")[0].split("(")[0]}</h4>
                      <ul className="space-y-3">
                        {e.split("\n").slice(1).map((p, pi) => (
                          <li key={pi} className="text-[12px] text-slate-500 font-medium leading-relaxed">• {p.replace(/^[-•*]\s*/, "")}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    );
  }

  /* ─── MODERN (Refined Pro 2-Column) ─── */
  if (template === "modern") {
    return (
      <div className="flex flex-col min-h-[297mm] bg-white" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
        <div className="bg-slate-900 text-white p-12 flex justify-between items-center pr-20">
          <div>
            <h1 className="text-4xl font-black tracking-tight mb-2 uppercase">{data.name}</h1>
            <p className="text-lg font-bold text-brand-400 uppercase tracking-widest">{data.title}</p>
          </div>
          {data.photoUrl && (
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white/20">
              <img src={data.photoUrl} alt="Photo" className="w-full h-full object-cover" />
            </div>
          )}
        </div>

        <div className="flex flex-1">
          <div className="w-1/3 bg-slate-50 p-10 border-r border-slate-100">
            <section className="mb-10">
              <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] mb-6 border-b border-slate-200 pb-2">Direct</h3>
              <div className="space-y-4 text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                <p className="flex items-center gap-3"><Mail size={12} className="text-brand-600" /> {data.email}</p>
                <p className="flex items-center gap-3"><Phone size={12} className="text-brand-600" /> {data.phone}</p>
                <p className="flex items-center gap-3"><MapPin size={12} className="text-brand-600" /> {data.location}</p>
                <p className="flex items-center gap-3"><Globe size={12} className="text-brand-600" /> {data.website}</p>
              </div>
            </section>

            <section className="mb-10">
              <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] mb-6 border-b border-slate-200 pb-2">Hard Skills</h3>
              <div className="flex flex-wrap gap-2">
                {data.skills.split(",").map((s, i) => (
                  <span key={i} className="px-3 py-1.5 bg-white border border-slate-200 text-[9px] font-black rounded-sm uppercase tracking-widest text-slate-700">
                    {s.trim()}
                  </span>
                ))}
              </div>
            </section>
          </div>

          <div className="flex-1 p-12">
            <section className="mb-12">
              <h3 className="text-[11px] font-black text-brand-600 uppercase tracking-[0.4em] mb-6 px-4 py-1.5 bg-brand-50 inline-block rounded-full">Background</h3>
              <p className="text-[13px] text-slate-600 leading-relax font-medium">{data.summary}</p>
            </section>

            <section>
              <h3 className="text-[11px] font-black text-brand-600 uppercase tracking-[0.4em] mb-10 px-4 py-1.5 bg-brand-50 inline-block rounded-full">Experience</h3>
              <div className="space-y-10">
                {data.experience.split("\n\n").map((e, i) => (
                  <div key={i}>
                    <h4 className="text-base font-black text-slate-900 flex justify-between mb-2">
                      {e.split("\n")[0].split("(")[0]}
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{e.match(/\((.*?)\)/)?.[1]}</span>
                    </h4>
                    <ul className="space-y-2 mt-4">
                      {e.split("\n").slice(1).map((p, pi) => (
                        <li key={pi} className="text-[12px] text-slate-500 font-medium leading-relaxed">• {p.replace(/^[-•*]\s*/, "")}</li>
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

  /* ─── MINIMAL (Swiss-style) ─── */
  if (template === "minimal") {
    return (
      <div className="p-14 bg-white min-h-[297mm] text-slate-800" style={{ fontFamily: "'Inter', sans-serif" }}>
        <div className="flex justify-between items-start mb-14 border-b-2 border-slate-900 pb-10">
          <div className="max-w-[58%]">
            <h1 className="text-5xl font-black tracking-tighter uppercase mb-3 text-slate-900 leading-none">{data.name || "Your Name"}</h1>
            <p className="text-base font-medium tracking-[0.15em] uppercase text-slate-500">{data.title || "Professional Title"}</p>
          </div>
          <div className="text-right text-[11px] font-bold tracking-widest leading-loose text-slate-600 uppercase">
            {data.email && <p>{data.email}</p>}
            {data.phone && <p>{data.phone}</p>}
            {data.location && <p>{data.location}</p>}
            {data.website && <p>{data.website}</p>}
          </div>
        </div>

        {data.summary && (
          <div className="mb-12">
            <h3 className="text-[11px] font-black uppercase tracking-[0.35em] text-slate-900 mb-4">Summary</h3>
            <p className="text-[13px] leading-relaxed text-slate-600 max-w-3xl">{data.summary}</p>
          </div>
        )}

        {data.experience && (
          <div className="mb-12">
            <h3 className="text-[11px] font-black uppercase tracking-[0.35em] text-slate-900 mb-6">Experience</h3>
            <div className="space-y-8">
              {data.experience.split("\n\n").map((block, i) => {
                const lines = block.split("\n");
                const first = lines[0];
                const rest = lines.slice(1);
                const dateMatch = first.match(/\(([^)]+)\)\s*$/);
                const dates = dateMatch ? dateMatch[1] : "";
                const titlePart = first.replace(/\([^)]+\)\s*$/, "").trim();
                const atIdx = titlePart.lastIndexOf(" at ");
                const role = atIdx >= 0 ? titlePart.slice(0, atIdx) : titlePart;
                const company = atIdx >= 0 ? titlePart.slice(atIdx + 4) : "";
                return (
                  <div key={i} className="grid grid-cols-12 gap-4">
                    <div className="col-span-3 text-[10px] font-black text-slate-400 uppercase tracking-widest pt-0.5">{dates}</div>
                    <div className="col-span-9">
                      <h4 className="text-[15px] font-bold text-slate-900 mb-0.5">{role}</h4>
                      {company && <p className="text-[12px] font-medium text-slate-500 mb-3">{company}</p>}
                      <ul className="space-y-1.5">
                        {rest.map((line, li) => {
                          const clean = line.replace(/^[-•*]\s*/, "").trim();
                          if (!clean) return null;
                          return (
                            <li key={li} className="text-[12px] text-slate-600 leading-relaxed flex items-center gap-3">
                              <span className="w-2 h-px bg-slate-400 shrink-0" />
                              {clean}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {data.education && (
          <div className="mb-12">
            <h3 className="text-[11px] font-black uppercase tracking-[0.35em] text-slate-900 mb-5">Education</h3>
            <div className="space-y-3">
              {data.education.split("\n\n").map((block, i) => {
                const lines = block.split("\n");
                const first = lines[0];
                const dateMatch = first.match(/\(([^)]+)\)\s*$/);
                const dates = dateMatch ? dateMatch[1] : "";
                const degree = first.replace(/\([^)]+\)\s*$/, "").trim();
                return (
                  <div key={i} className="flex justify-between items-baseline">
                    <p className="text-[13.5px] font-bold text-slate-800">{degree}</p>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{dates}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {data.skills && (
          <div className="border-t border-slate-100 pt-8">
            <h3 className="text-[11px] font-black uppercase tracking-[0.35em] text-slate-900 mb-4 text-center">Core Expertise</h3>
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-2">
              {data.skills.split(",").map((s, i) => (
                <span key={i} className="text-[11.5px] font-bold text-slate-500 uppercase tracking-widest">{s.trim()}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  /* ─── PLAIN (Classic Academic) ─── */
  return (
    <div className="p-16 bg-white min-h-[297mm] text-[#1a1a1a]" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
      <div className="text-center mb-10">
        <h1 className="text-4xl font-normal tracking-wide mb-2">{data.name || "YOUR NAME"}</h1>
        <div className="flex justify-center flex-wrap gap-3 text-xs italic text-slate-600 border-y border-slate-200 py-3 mb-6 uppercase tracking-wider">
          {data.location && <span>{data.location}</span>}
          {data.phone && <><span>•</span><span>{data.phone}</span></>}
          {data.email && <><span>•</span><span>{data.email}</span></>}
        </div>
      </div>

      <div className="space-y-10">
        {data.summary && (
          <section>
            <h2 className="text-[11px] font-bold uppercase tracking-[0.25em] text-slate-800 mb-3 border-b-2 border-slate-900 pb-1">Career Objective</h2>
            <p className="text-[13px] leading-relaxed text-slate-700 italic">{data.summary}</p>
          </section>
        )}

        {data.experience && (
          <section>
            <h2 className="text-[11px] font-bold uppercase tracking-[0.25em] text-slate-800 mb-5 border-b-2 border-slate-900 pb-1">Professional Experience</h2>
            <div className="space-y-7">
              {data.experience.split("\n\n").map((block, i) => {
                const lines = block.split("\n");
                const first = lines[0];
                const rest = lines.slice(1);
                const dateMatch = first.match(/\(([^)]+)\)\s*$/);
                const dates = dateMatch ? dateMatch[1] : "";
                const titlePart = first.replace(/\([^)]+\)\s*$/, "").trim();
                const atIdx = titlePart.lastIndexOf(" at ");
                const role = atIdx >= 0 ? titlePart.slice(0, atIdx) : titlePart;
                const company = atIdx >= 0 ? titlePart.slice(atIdx + 4) : "";
                return (
                  <div key={i}>
                    <div className="flex justify-between items-baseline mb-1">
                      <h4 className="text-[15px] font-bold">{role}</h4>
                      <span className="text-[12px] font-bold italic">{dates}</span>
                    </div>
                    {company && <p className="text-[13px] font-bold text-slate-600 mb-2 uppercase tracking-wide">{company}</p>}
                    <ul className="space-y-1.5 pl-4 list-disc marker:text-slate-400">
                      {rest.map((line, li) => {
                        const clean = line.replace(/^[-•*]\s*/, "").trim();
                        if (!clean) return null;
                        return <li key={li} className="text-[13px] text-slate-700 leading-normal pl-1">{clean}</li>;
                      })}
                    </ul>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {data.education && (
          <section>
            <h2 className="text-[11px] font-bold uppercase tracking-[0.25em] text-slate-800 mb-4 border-b-2 border-slate-900 pb-1">Education</h2>
            <div className="space-y-3">
              {data.education.split("\n\n").map((block, i) => {
                const lines = block.split("\n");
                const first = lines[0];
                const parts = first.split(" (");
                const degree = parts[0];
                const dates = parts[1] ? parts[1].replace(")", "") : "";
                return (
                  <div key={i} className="flex justify-between items-baseline">
                    <p className="text-[14px] font-bold italic">{degree}</p>
                    <span className="text-[12px] font-bold">{dates}</span>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {data.skills && (
          <section>
            <h2 className="text-[11px] font-bold uppercase tracking-[0.25em] text-slate-800 mb-3 border-b-2 border-slate-900 pb-1">Skills &amp; Competencies</h2>
            <p className="text-[13px] leading-relaxed text-slate-700 tracking-tight">
              {data.skills.split(",").map((s, i) => (
                <span key={i} className="after:content-['|'] after:mx-2 after:text-slate-300 last:after:content-['']">{s.trim()}</span>
              ))}
            </p>
          </section>
        )}
      </div>
    </div>
  );
};
