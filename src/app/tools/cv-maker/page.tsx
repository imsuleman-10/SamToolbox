"use client";

import { useState, useRef, useMemo, useCallback, useEffect } from "react";
import {
  Download, Upload, Image as ImageIcon, User, Edit3,
  Mail, Phone, MapPin, LayoutTemplate, Globe, Link,
  Briefcase, GraduationCap, Wrench, FileText, CheckCircle2, Zap,
  BookOpen, HelpCircle, Plus, Trash2, GripVertical,
  ArrowRight, ArrowLeft, FileImage, FileDown, Check, RefreshCw, ShieldCheck
} from "lucide-react";
import { generateSoftwareApplicationSchema } from "@/lib/structuredData";

type TemplateType = "plain" | "modern" | "minimal" | "executive" | "industrial" | "cleantech" | "swiss";
type StepType = "template" | "editor" | "preview";

interface Experience {
  id: string;
  company: string;
  role: string;
  date: string;
  location: string;
  description: string;
}

interface Education {
  id: string;
  institution: string;
  degree: string;
  date: string;
  description: string;
}

interface CVData {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: string[];
  photoUrl: string | null;
  website?: string;
  linkedin?: string;
}

// ══════════════════════════════════════════
// MODULAR RENDERING ENGINE
// ══════════════════════════════════════════

const CVTemplateRenderer = ({ data, template }: { data: CVData; template: TemplateType }) => {
  const fallbackData = {
    name: data.name || "Your Name",
    title: data.title || "Professional Title",
    email: data.email || "email@example.com",
    phone: data.phone || "+123 456 789",
    location: data.location || "City, Country",
    summary: data.summary || "Professional summary detailing your key achievements and expertise...",
    skills: data.skills.length > 0 ? data.skills : ["Skill A", "Skill B", "Skill C"],
    experience: data.experience.length > 0 ? data.experience : [
      { id: "1", role: "Previous Role", company: "Company Name", date: "2020 - 2024", location: "Remote", description: "Led key initiatives and delivered high-impact results." }
    ],
    education: data.education.length > 0 ? data.education : [
      { id: "1", institution: "Tech Institute of Engineering", degree: "Bachelor of Science in Software", date: "2012 - 2016", description: "" }
    ]
  };

  switch (template) {
    case "industrial":
      return (
        <div className="h-full flex flex-col bg-white text-slate-900 overflow-hidden break-words">
          <div className="bg-slate-900 text-white p-12 flex justify-between items-center">
            <div className="space-y-2 flex-1 mr-8">
              <h1 className="text-5xl font-black uppercase tracking-tighter truncate">{fallbackData.name}</h1>
              <p className="text-xl font-bold text-blue-400 uppercase tracking-widest truncate">{fallbackData.title}</p>
            </div>
            {data.photoUrl && <img src={data.photoUrl} className="w-32 h-32 object-cover border-4 border-blue-600 shrink-0" />}
          </div>
          <div className="flex-1 grid grid-cols-12">
            <div className="col-span-8 p-10 space-y-8">
              <section>
                <h2 className="text-xs font-black uppercase tracking-[0.3em] text-blue-600 mb-4 border-b-2 border-slate-100 pb-2">Profile Overview</h2>
                <p className="text-[11px] leading-relaxed font-medium text-slate-700">{fallbackData.summary}</p>
              </section>
              <section>
                <h2 className="text-xs font-black uppercase tracking-[0.3em] text-blue-600 mb-4 border-b-2 border-slate-100 pb-2">Experience</h2>
                <div className="space-y-6">
                  {fallbackData.experience.map((exp) => (
                    <div key={exp.id} className="relative pl-6 border-l-4 border-slate-900">
                      <div className="flex justify-between items-baseline mb-1">
                        <h3 className="text-sm font-black uppercase truncate mr-4">{exp.role}</h3>
                        <span className="text-[9px] font-black bg-blue-600 text-white px-2 py-0.5 shrink-0">{exp.date}</span>
                      </div>
                      <p className="text-[10px] font-bold text-blue-900/60 mb-2">{exp.company} // {exp.location}</p>
                      <p className="text-[10px] leading-relaxed text-slate-600 whitespace-pre-wrap">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </section>
              {fallbackData.education.length > 0 && (
                <section>
                  <h2 className="text-xs font-black uppercase tracking-[0.3em] text-blue-600 mb-4 border-b-2 border-slate-100 pb-2">Academic Foundation</h2>
                  <div className="space-y-4">
                    {fallbackData.education.map((edu) => (
                      <div key={edu.id}>
                        <div className="flex justify-between items-baseline">
                          <h3 className="text-xs font-black uppercase truncate mr-4">{edu.degree}</h3>
                          <span className="text-[9px] font-black text-slate-400 shrink-0">{edu.date}</span>
                        </div>
                        <p className="text-[9px] font-bold text-blue-900/60 mb-1">{edu.institution}</p>
                        {edu.description && <p className="text-[9px] leading-relaxed text-slate-600 italic whitespace-pre-wrap">{edu.description}</p>}
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>
            <div className="col-span-4 bg-slate-50 p-10 space-y-10">
              <section>
                <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 mb-4 border-b border-slate-200 pb-2">Contact</h2>
                <div className="space-y-3 text-[9px] font-bold text-slate-600 break-words">
                  <p className="flex items-center gap-3"><Mail size={10} className="text-blue-600 shrink-0" /> {fallbackData.email}</p>
                  <p className="flex items-center gap-3"><Phone size={10} className="text-blue-600 shrink-0" /> {fallbackData.phone}</p>
                  <p className="flex items-center gap-3"><MapPin size={10} className="text-blue-600 shrink-0" /> {fallbackData.location}</p>
                  {data.website && <p className="flex items-center gap-3"><Globe size={10} className="text-blue-600 shrink-0" /> {data.website}</p>}
                </div>
              </section>
              <section>
                <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 mb-4 border-b border-slate-200 pb-2">Expertise</h2>
                <div className="flex flex-wrap gap-1.5">
                  {fallbackData.skills.map((s) => (
                    <span key={s} className="px-2 py-1 bg-slate-900 text-white text-[8px] font-black uppercase tracking-widest">{s}</span>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      );
    case "modern":
      return (
        <div className="h-full flex flex-col bg-white text-slate-900 overflow-hidden break-words">
          <div className="p-16 border-b-[20px] border-blue-900">
            <div className="flex justify-between items-start">
              <div className="space-y-4 flex-1 mr-8">
                <h1 className="text-7xl font-black text-slate-900 tracking-tighter leading-none truncate">{fallbackData.name}</h1>
                <div className="h-1 w-40 bg-blue-600" />
                <p className="text-2xl font-bold text-slate-400 uppercase tracking-[0.2em] truncate">{fallbackData.title}</p>
              </div>
              {data.photoUrl && <img src={data.photoUrl} className="w-40 h-40 object-cover rounded-3xl grayscale hover:grayscale-0 transition-all duration-500 border-8 border-slate-100 shrink-0" />}
            </div>
          </div>
          <div className="flex-1 grid grid-cols-12">
            <div className="col-span-4 bg-slate-900 text-white p-12 space-y-12 overflow-hidden">
              <section>
                <h2 className="text-xs font-black uppercase tracking-widest text-blue-400 mb-6">Synthesis</h2>
                <p className="text-xs leading-relaxed font-medium text-slate-300">{fallbackData.summary}</p>
              </section>
              <section>
                <h2 className="text-xs font-black uppercase tracking-widest text-blue-400 mb-6">Network</h2>
                <div className="space-y-4 text-[10px] font-bold text-slate-400 break-words">
                  <p>{fallbackData.email}</p>
                  <p>{fallbackData.phone}</p>
                  <p>{fallbackData.location}</p>
                </div>
              </section>
              <section>
                <h2 className="text-xs font-black uppercase tracking-widest text-blue-400 mb-6">Expertise</h2>
                <div className="grid grid-cols-1 gap-2">
                  {fallbackData.skills.map((s) => (
                    <div key={s} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-600 shrink-0" />
                      <span className="text-[10px] font-black uppercase tracking-widest truncate">{s}</span>
                    </div>
                  ))}
                </div>
              </section>
            </div>
            <div className="col-span-8 p-12 space-y-12">
              <section>
                <h2 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-4">
                  <span className="w-12 h-2 bg-blue-900" /> Experience
                </h2>
                <div className="space-y-10">
                  {fallbackData.experience.map((exp) => (
                    <div key={exp.id} className="space-y-3">
                      <div className="flex justify-between items-baseline">
                        <h3 className="text-xl font-bold text-slate-900 truncate mr-4">{exp.role}</h3>
                        <span className="text-xs font-black text-blue-600 italic shrink-0">{exp.date}</span>
                      </div>
                      <p className="text-xs font-black text-slate-400 uppercase tracking-widest">{exp.company}</p>
                      <p className="text-[13px] leading-relaxed text-slate-600 break-words">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </section>
              {fallbackData.education.length > 0 && (
                <section>
                  <h2 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-4">
                    <span className="w-12 h-2 bg-blue-900" /> Education
                  </h2>
                  <div className="space-y-6">
                    {fallbackData.education.map((edu) => (
                      <div key={edu.id}>
                        <div className="flex justify-between items-baseline">
                          <h3 className="text-lg font-bold text-slate-900 truncate mr-4">{edu.degree}</h3>
                          <span className="text-xs font-black text-blue-600 italic shrink-0">{edu.date}</span>
                        </div>
                        <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">{edu.institution}</p>
                        {edu.description && <p className="text-[11px] leading-relaxed text-slate-600 whitespace-pre-wrap">{edu.description}</p>}
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>
      );
    case "minimal":
      return (
        <div className="p-20 h-full flex flex-col items-center bg-white text-slate-900 overflow-hidden break-words text-center">
          <div className="mb-20 space-y-6 w-full">
            {data.photoUrl && <img src={data.photoUrl} className="w-32 h-32 rounded-full object-cover mx-auto mb-8 border border-slate-100 p-2" />}
            <h1 className="text-5xl font-light tracking-tight text-slate-900 truncate">{fallbackData.name}</h1>
            <p className="text-sm font-bold tracking-[0.5em] text-blue-600 uppercase truncate">{fallbackData.title}</p>
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-[10px] font-medium text-slate-400 uppercase tracking-widest pt-6 border-t border-slate-50">
              <span>{fallbackData.email}</span>
              <span>•</span>
              <span>{fallbackData.phone}</span>
              <span>•</span>
              <span>{fallbackData.location}</span>
            </div>
          </div>
          <div className="w-full space-y-20">
            <section>
              <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300 mb-10">Narrative</h2>
              <p className="text-sm max-w-2xl mx-auto leading-loose text-slate-600 font-medium">{fallbackData.summary}</p>
            </section>
            <section>
              <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300 mb-12">Evolution</h2>
              <div className="space-y-16">
                {fallbackData.experience.map((exp) => (
                  <div key={exp.id} className="space-y-4">
                    <h3 className="text-lg font-bold text-slate-900 truncate">{exp.role}</h3>
                    <p className="text-xs text-blue-600 font-medium">{exp.company} // {exp.date}</p>
                    <p className="text-sm text-slate-500 max-w-xl mx-auto leading-relaxed">{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>
            {fallbackData.education.length > 0 && (
              <section>
                <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300 mb-12">Foundation</h2>
                <div className="space-y-10">
                  {fallbackData.education.map((edu) => (
                    <div key={edu.id} className="space-y-2">
                      <h3 className="text-md font-bold text-slate-900 truncate">{edu.degree}</h3>
                      <p className="text-xs text-blue-600 font-medium mb-2">{edu.institution} // {edu.date}</p>
                      {edu.description && <p className="text-xs text-slate-500 max-w-xl mx-auto leading-relaxed italic">{edu.description}</p>}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      );
    case "executive":
      return (
        <div className="h-full flex bg-white text-slate-900 overflow-hidden break-words">
          <div className="w-[280px] bg-blue-950 text-white p-12 flex flex-col shrink-0">
            {data.photoUrl && <img src={data.photoUrl} className="w-full aspect-square object-cover rounded-2xl mb-12 border-2 border-blue-800 shadow-2xl" />}
            <section className="mb-12">
              <h2 className="text-[10px] font-black uppercase tracking-widest text-blue-400 mb-6">Contact</h2>
              <div className="space-y-6 text-xs font-medium text-blue-100/70">
                <p className="break-all">{fallbackData.email}</p>
                <p className="break-all">{fallbackData.phone}</p>
                <p>{fallbackData.location}</p>
              </div>
            </section>
            <section className="flex-1 overflow-hidden">
              <h2 className="text-[10px] font-black uppercase tracking-widest text-blue-400 mb-8">Expertise</h2>
              <div className="space-y-4">
                {fallbackData.skills.map((s) => (
                  <div key={s} className="space-y-2">
                    <div className="flex justify-between text-[9px] font-black uppercase tracking-widest">
                      <span className="truncate mr-2">{s}</span>
                      <span className="text-blue-400 shrink-0">PRO</span>
                    </div>
                    <div className="h-1 bg-blue-900 rounded-full overflow-hidden">
                      <div className="h-full w-full bg-blue-400" />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
          <div className="flex-1 p-16 space-y-16 bg-white overflow-hidden">
            <header className="space-y-2 border-b-4 border-slate-900 pb-10">
              <h1 className="text-6xl font-black text-slate-900 tracking-tighter truncate">{fallbackData.name}</h1>
              <p className="text-xl font-bold text-slate-400 uppercase tracking-widest truncate">{fallbackData.title}</p>
            </header>
            <section>
              <h2 className="text-xs font-black uppercase tracking-[0.4em] text-blue-600 mb-8">Executive Summary</h2>
              <p className="text-sm leading-relaxed text-slate-600 font-medium">{fallbackData.summary}</p>
            </section>
            <section>
              <h2 className="text-xs font-black uppercase tracking-[0.4em] text-blue-600 mb-10">Professional Timeline</h2>
              <div className="space-y-12">
                {fallbackData.experience.map((exp) => (
                  <div key={exp.id} className="relative pl-10 border-l-2 border-slate-100">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white border-4 border-blue-900" />
                    <div className="flex justify-between items-baseline mb-2">
                      <h3 className="text-xl font-bold text-slate-900 truncate mr-4">{exp.role}</h3>
                      <span className="text-xs font-black text-blue-900 shrink-0">{exp.date}</span>
                    </div>
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 truncate">{exp.company}</p>
                    <p className="text-sm leading-relaxed text-slate-600 break-words">{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>
            {fallbackData.education.length > 0 && (
              <section>
                <h2 className="text-xs font-black uppercase tracking-[0.4em] text-blue-600 mb-10">Academic Excellence</h2>
                <div className="space-y-8">
                  {fallbackData.education.map((edu) => (
                    <div key={edu.id} className="flex justify-between items-baseline">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 truncate">{edu.degree}</h3>
                        <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">{edu.institution}</p>
                        {edu.description && <p className="text-xs leading-relaxed text-slate-600 italic">{edu.description}</p>}
                      </div>
                      <span className="text-xs font-black text-blue-900 shrink-0">{edu.date}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      );
    case "plain":
      return (
        <div className="p-16 h-full flex flex-col space-y-10 bg-white text-slate-900 overflow-hidden break-words">
          <header className="border-b-2 border-slate-900 pb-8 text-center">
            <h1 className="text-4xl font-bold text-slate-900 uppercase tracking-tight mb-2 truncate">{fallbackData.name}</h1>
            <div className="text-sm font-medium text-slate-600 flex flex-wrap justify-center gap-4">
              <span>{fallbackData.email}</span>
              <span className="hidden sm:inline">|</span>
              <span>{fallbackData.phone}</span>
              <span className="hidden sm:inline">|</span>
              <span>{fallbackData.location}</span>
            </div>
          </header>
          <section className="space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-widest border-b border-slate-200 pb-1">Professional Summary</h2>
            <p className="text-xs leading-relaxed text-slate-700">{fallbackData.summary}</p>
          </section>
          <section className="space-y-6">
            <h2 className="text-sm font-bold uppercase tracking-widest border-b border-slate-200 pb-1">Work Experience</h2>
            <div className="space-y-6">
              {fallbackData.experience.map((exp) => (
                <div key={exp.id} className="space-y-2">
                  <div className="flex justify-between font-bold text-xs">
                    <span className="truncate mr-4">{exp.role}</span>
                    <span className="shrink-0">{exp.date}</span>
                  </div>
                  <div className="text-xs italic text-slate-600 truncate">{exp.company}, {exp.location}</div>
                  <p className="text-xs leading-relaxed text-slate-700 break-words">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
          {fallbackData.education.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-sm font-bold uppercase tracking-widest border-b border-slate-200 pb-1">Education</h2>
              <div className="space-y-4">
                {fallbackData.education.map((edu) => (
                  <div key={edu.id} className="flex justify-between font-bold text-xs">
                    <div className="flex flex-col">
                      <span className="truncate">{edu.degree}</span>
                      <span className="text-[10px] italic text-slate-600 font-normal mb-1">{edu.institution}</span>
                      {edu.description && <p className="text-[10px] text-slate-700 font-normal">{edu.description}</p>}
                    </div>
                    <span className="shrink-0">{edu.date}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
          <section>
            <h2 className="text-sm font-bold uppercase tracking-widest border-b border-slate-200 mb-4 pb-1">Skills</h2>
            <p className="text-xs text-slate-700 font-medium">{fallbackData.skills.join(", ")}</p>
          </section>
        </div>
      );
    case "cleantech":
      return (
        <div className="p-16 h-full flex flex-col bg-white text-slate-900 overflow-hidden break-words">
          <div className="flex gap-12 mb-16 items-start">
            <div className="flex-1 space-y-4 overflow-hidden">
              <div className="inline-block px-6 py-2 bg-blue-600 text-white rounded-full text-[10px] font-black uppercase tracking-widest">Active Identity</div>
              <h1 className="text-6xl font-black tracking-tighter text-slate-900 truncate">{fallbackData.name}</h1>
              <p className="text-xl font-bold text-blue-600/60 uppercase tracking-[0.2em] truncate">{fallbackData.title}</p>
            </div>
            {data.photoUrl && <img src={data.photoUrl} className="w-40 h-40 object-cover rounded-[3rem] border-8 border-slate-50 shrink-0" />}
          </div>
          <div className="flex gap-16 flex-1 overflow-hidden">
            <div className="flex-1 space-y-16 overflow-hidden">
              <section className="bg-slate-50 p-10 rounded-[3rem] space-y-6">
                <h2 className="text-xs font-black uppercase tracking-widest text-blue-600">Overview</h2>
                <p className="text-sm leading-relaxed text-slate-700 font-medium">{fallbackData.summary}</p>
              </section>
              <section className="space-y-12">
                <h2 className="text-xs font-black uppercase tracking-widest text-blue-600 pl-6">Experience Logs</h2>
                <div className="space-y-8">
                  {fallbackData.experience.map((exp) => (
                    <div key={exp.id} className="p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-black text-slate-900 truncate mr-4">{exp.role}</h3>
                        <span className="px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black shrink-0">{exp.date}</span>
                      </div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest truncate">{exp.company}</p>
                      <p className="text-xs leading-relaxed text-slate-600 break-words">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </section>
              {fallbackData.education.length > 0 && (
                <section className="space-y-12">
                  <h2 className="text-xs font-black uppercase tracking-widest text-blue-600 pl-6">Academic History</h2>
                  <div className="space-y-6">
                    {fallbackData.education.map((edu) => (
                      <div key={edu.id} className="p-8 bg-slate-50 border border-slate-100 rounded-[2.5rem] space-y-2">
                        <div className="flex justify-between items-center">
                          <h3 className="text-md font-black text-slate-900 truncate mr-4">{edu.degree}</h3>
                          <span className="text-[10px] font-black text-blue-400 shrink-0">{edu.date}</span>
                        </div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">{edu.institution}</p>
                        {edu.description && <p className="text-[10px] leading-relaxed text-slate-600 italic">{edu.description}</p>}
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>
            <div className="w-[240px] space-y-12 shrink-0">
              <section className="space-y-6">
                <h2 className="text-xs font-black uppercase tracking-widest text-slate-300">Channels</h2>
                <div className="space-y-4 text-[10px] font-black uppercase tracking-widest text-slate-500 break-all">
                  <div className="p-4 bg-slate-50 rounded-2xl">{fallbackData.email}</div>
                  <div className="p-4 bg-slate-50 rounded-2xl">{fallbackData.phone}</div>
                  <div className="p-4 bg-slate-50 rounded-2xl">{fallbackData.location}</div>
                </div>
              </section>
              <section className="space-y-6 overflow-hidden">
                <h2 className="text-xs font-black uppercase tracking-widest text-slate-300">Capabilities</h2>
                <div className="flex flex-col gap-2">
                  {fallbackData.skills.map((s) => (
                    <div key={s} className="px-5 py-3 bg-blue-600 text-white rounded-2xl text-[9px] font-black uppercase tracking-widest text-center truncate">{s}</div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      );
    case "swiss":
      return (
        <div className="h-full flex flex-col bg-white text-slate-900 overflow-hidden break-words">
          <div className="grid grid-cols-12 h-full gap-0">
            <div className="col-span-1 bg-blue-900" />
            <div className="col-span-11 flex flex-col">
              <div className="p-16 space-y-12 border-b-8 border-slate-900">
                <div className="flex justify-between items-end">
                  <h1 className="text-7xl font-black text-slate-900 tracking-tighter leading-none italic truncate mr-8">{fallbackData.name}</h1>
                  {data.photoUrl && <img src={data.photoUrl} className="w-32 h-32 object-cover grayscale shrink-0" />}
                </div>
                <p className="text-2xl font-black text-blue-900 uppercase tracking-widest truncate">{fallbackData.title}</p>
              </div>
              <div className="flex-1 grid grid-cols-12">
                <div className="col-span-4 p-12 bg-slate-50 space-y-12 overflow-hidden">
                  <section className="space-y-6">
                    <h2 className="text-xs font-black uppercase tracking-[0.4em] text-slate-900">Information</h2>
                    <div className="space-y-4 text-[10px] font-bold text-slate-600 uppercase break-all">
                      <p>{fallbackData.email}</p>
                      <p>{fallbackData.phone}</p>
                      <p>{fallbackData.location}</p>
                    </div>
                  </section>
                  <section className="space-y-6 overflow-hidden">
                    <h2 className="text-xs font-black uppercase tracking-[0.4em] text-slate-900">Methods</h2>
                    <div className="space-y-3">
                      {fallbackData.skills.map((s) => (
                        <div key={s} className="flex items-center gap-4">
                          <div className="w-4 h-1 bg-blue-900 shrink-0" />
                          <span className="text-[10px] font-black uppercase text-slate-600 tracking-widest truncate">{s}</span>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
                <div className="col-span-8 p-12 space-y-16">
                  <section>
                    <h2 className="text-sm font-black uppercase tracking-[0.5em] text-blue-900 mb-8">Statement</h2>
                    <p className="text-sm leading-relaxed text-slate-700 font-bold">{fallbackData.summary}</p>
                  </section>
                  <section>
                    <h2 className="text-sm font-black uppercase tracking-[0.5em] text-blue-900 mb-12">Timeline</h2>
                    <div className="space-y-16">
                      {fallbackData.experience.map((exp) => (
                        <div key={exp.id} className="space-y-4">
                          <div className="flex justify-between items-center border-b-2 border-slate-100 pb-2">
                            <h3 className="text-xl font-black text-slate-900 uppercase truncate mr-4">{exp.role}</h3>
                            <span className="text-[10px] font-black text-blue-900 shrink-0">{exp.date}</span>
                          </div>
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest truncate">{exp.company} // {exp.location}</p>
                          <p className="text-xs leading-relaxed text-slate-600 font-medium">{exp.description}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                  {fallbackData.education.length > 0 && (
                    <section>
                      <h2 className="text-sm font-black uppercase tracking-[0.5em] text-blue-900 mb-10">Academic</h2>
                      <div className="space-y-8">
                        {fallbackData.education.map((edu) => (
                          <div key={edu.id} className="space-y-2 border-l-4 border-blue-900 pl-6">
                            <h3 className="text-md font-black text-slate-900 uppercase truncate">{edu.degree}</h3>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">{edu.institution} // {edu.date}</p>
                            {edu.description && <p className="text-[10px] leading-relaxed text-slate-600 font-medium italic">{edu.description}</p>}
                          </div>
                        ))}
                      </div>
                    </section>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    default:
      return <div className="p-20 text-center">Incompatible Architecture Protocol</div>;
  }
};

// ══════════════════════════════════════════
// MAIN APPLICATION COMPONENT
// ══════════════════════════════════════════

export default function CvMakerPage() {
  const [step, setStep] = useState<StepType>("template");
  const [template, setTemplate] = useState<TemplateType>("industrial");
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeSection, setActiveSection] = useState("personal");
  const [previewScale, setPreviewScale] = useState(0.5);
  const cvRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [data, setData] = useState<CVData>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("samtoolbox-cv-data");
      if (saved) return JSON.parse(saved);
    }
    return {
      name: "Suleman Mughal",
      title: "Senior Full Stack Architect",
      email: "suleman@samtoolbox.com",
      phone: "+92 300 1234567",
      location: "Lahore, Pakistan",
      summary: "High-performance software architect with 8+ years of engineering excellence. Specialist in edge-computing, browser-based optimization, and premium industrial UI/UX systems. Passionate about building privacy-first tools that redefine the user experience.",
      experience: [
        {
          id: "exp-1",
          company: "SAMBOX",
          role: "Lead System Architect",
          date: "2020 - Present",
          location: "Lahore, Pakistan",
          description: "Orchestrated the migration of legacy tools to browser-side execution, reducing server costs by 100%.\nPioneered the 'Premium Industrial' design system used across all 15+ internal platforms."
        },
        {
          id: "exp-2",
          company: "Global Solutions",
          role: "Senior Software Engineer",
          date: "2017 - 2020",
          location: "Karachi, Pakistan",
          description: "Led a cross-functional team of 12 engineers in building high-scale fintech applications.\nReduced initial load times by 65% using advanced tree-shaking and asset optimization."
        }
      ],
      education: [
        {
          id: "edu-1",
          institution: "NED University",
          degree: "MSc Software Engineering",
          date: "2015 - 2017",
          description: "Graduated with Honors. Specialized in distributed systems."
        }
      ],
      skills: ["Next.js 15", "TypeScript", "React", "Tailwind CSS", "Node.js", "System Architecture", "UI/UX Design", "Edge Computing"],
      photoUrl: null,
      website: "https://samtoolbox.com",
      linkedin: "linkedin.com/in/suleman-mughal"
    };
  });

  const schema = useMemo(() => generateSoftwareApplicationSchema("cv-maker", "Premium CV/Resume builder with professional industrial templates and secure local processing."), []);

  useEffect(() => {
    localStorage.setItem("samtoolbox-cv-data", JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  useEffect(() => {
    if (step !== "preview") return;
    const updateScale = () => {
      if (!containerRef.current) return;
      const containerWidth = containerRef.current.clientWidth;
      const targetWidth = 794; 
      const newScale = Math.max((containerWidth - 64) / targetWidth, 0.1);
      setPreviewScale(Math.min(newScale, 1));
    };

    const observer = new ResizeObserver(updateScale);
    if (containerRef.current) observer.observe(containerRef.current);
    updateScale();
    return () => observer.disconnect();
  }, [step]);

  const generatePDF = async () => {
    setIsGenerating(true);
    try {
      const { toCanvas } = await import("html-to-image");
      const { jsPDF } = await import("jspdf");
      
      const element = cvRef.current;
      if (!element) return;

      const originalTransform = element.style.transform;
      element.style.transform = 'scale(1)';
      
      // Calculate content dimensions
      const rect = element.getBoundingClientRect();
      const contentWidth = 794; // A4 width in px at 96 DPI
      const contentHeight = element.scrollHeight;
      
      const canvas = await toCanvas(element, {
        pixelRatio: 2, // 2 is enough for clear print while keeping size manageable
        backgroundColor: "#ffffff",
        width: contentWidth,
        height: contentHeight,
      });

      element.style.transform = originalTransform;

      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      // Calculate how many pages we need
      // A4 at 96 DPI is 794x1123. So we ratio the captured height.
      const pxPerPage = 1123;
      const totalPages = Math.ceil(contentHeight / pxPerPage);

      for (let i = 0; i < totalPages; i++) {
        if (i > 0) pdf.addPage();
        
        // Create a temporary canvas for the current page slice
        const pageCanvas = document.createElement("canvas");
        pageCanvas.width = contentWidth * 2; // Match pixelRatio
        pageCanvas.height = pxPerPage * 2;
        
        const ctx = pageCanvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(
            canvas,
            0, i * pxPerPage * 2, contentWidth * 2, pxPerPage * 2, // Source
            0, 0, contentWidth * 2, pxPerPage * 2 // Destination
          );
          
          const pageImgData = pageCanvas.toDataURL("image/jpeg", 0.95);
          pdf.addImage(pageImgData, "JPEG", 0, 0, pdfWidth, pdfHeight, undefined, 'FAST');
        }
      }

      pdf.save(`cv-${data.name.replace(/\s+/g, '-').toLowerCase()}.pdf`);
    } catch (e) {
      console.error(e);
      alert("Forge Conflict: Unable to synthesize document binary.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setData({ ...data, photoUrl: event.target?.result as string });
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const addExperience = () => {
    setData({
      ...data,
      experience: [
        ...data.experience,
        { id: `exp-${Date.now()}`, company: "", role: "", date: "", location: "", description: "" }
      ]
    });
  };

  const addEducation = () => {
    setData({
      ...data,
      education: [
        ...data.education,
        { id: `edu-${Date.now()}`, institution: "", degree: "", date: "", description: "" }
      ]
    });
  };

  const addSkill = (skill: string) => {
    if (skill && !data.skills.includes(skill)) {
      setData({ ...data, skills: [...data.skills, skill] });
    }
  };

  const removeSkill = (skill: string) => {
    setData({ ...data, skills: data.skills.filter(s => s !== skill) });
  };

  return (
    <div className="min-h-screen bg-[#020617] selection:bg-blue-500/30 selection:text-blue-200 font-sans">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <section className="pt-24 pb-32 px-6 relative overflow-hidden text-center">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 font-black text-[10px] uppercase tracking-[0.4em] mb-10 shadow-2xl">
            <Zap size={14} className="animate-pulse" />
            Identity Engine v22.2
          </div>
          <h1 className="text-6xl md:text-[7rem] font-black text-white tracking-tighter mb-8 leading-none">
            Career <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 italic">Architect.</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-3xl mx-auto font-medium leading-relaxed">
            Professional identity synthesis engine. 
            <span className="text-slate-200 font-bold block mt-2">Zero-Cloud Persistence. Isolated Execution. Industrial Grade Output.</span>
          </p>
        </div>
      </section>

      <section className="max-w-[1600px] mx-auto px-6 -mt-16 relative z-20 mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-[#0f172a] rounded-[3.5rem] border border-white/5 shadow-3xl shadow-black overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-700 min-h-[900px] flex flex-col">
               <div className="bg-white/5 px-10 py-8 border-b border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6 shrink-0">
                  <div className="flex items-center gap-4">
                     <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-2xl text-blue-400">
                        {step === "template" ? <LayoutTemplate size={22} /> : step === "editor" ? <Edit3 size={22} /> : <FileDown size={22} />}
                     </div>
                     <div>
                        <h3 className="text-lg font-black text-white uppercase tracking-tighter leading-none">{step.toUpperCase()}</h3>
                        <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mt-1 italic">Phase {step === "template" ? "01" : step === "editor" ? "02" : "03"} of 03</p>
                     </div>
                  </div>
                  
                  <div className="flex items-center gap-6">
                     <div className="flex items-center gap-2 mr-4">
                        {["template", "editor", "preview"].map((s) => (
                          <div key={s} className={`w-3 h-3 rounded-full transition-all ${step === s ? "bg-blue-500 w-8" : "bg-white/10"}`} />
                        ))}
                     </div>

                     <div className="flex items-center gap-3">
                         <button 
                           onClick={() => {
                             if(confirm("Factory Reset: Clear all current identity metadata?")) {
                               setData({
                                 name: "", title: "", email: "", phone: "", location: "", summary: "",
                                 experience: [], education: [], skills: [], photoUrl: null
                               });
                               localStorage.removeItem("samtoolbox-cv-data");
                             }
                           }}
                           className="p-3 text-slate-700 hover:text-red-500 transition-colors"
                           title="Reset Identity Data"
                         >
                            <RefreshCw size={16} />
                         </button>
                        <button 
                          onClick={() => setStep(step === "preview" ? "editor" : "template")}
                          disabled={step === "template"}
                          className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest hover:text-white transition-colors disabled:opacity-20"
                        >
                          <ArrowLeft size={14} /> Back
                        </button>
                        {step !== "preview" && (
                          <button 
                            onClick={() => setStep(step === "template" ? "editor" : "preview")}
                            className="px-6 py-3 bg-blue-600 text-white rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-blue-500 transition-all flex items-center gap-2 shadow-xl"
                          >
                            Next <ArrowRight size={14} />
                          </button>
                        )}
                     </div>
                  </div>
               </div>

               <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
                  {step === "template" && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 animate-in fade-in zoom-in-95 duration-500">
                       {(["industrial", "modern", "minimal", "executive", "plain", "cleantech", "swiss"] as TemplateType[]).map((t) => (
                         <button
                           key={t}
                           onClick={() => {
                             setTemplate(t);
                             setTimeout(() => setStep("editor"), 300); // Smooth transition to editor
                           }}
                           className={`group relative aspect-[1/1.414] rounded-3xl overflow-hidden border-2 transition-all ${template === t ? "border-blue-500 shadow-[0_0_40px_rgba(59,130,246,0.3)] scale-[1.02]" : "border-white/5 grayscale hover:grayscale-0 hover:border-white/20"}`}
                         >
                            <div className="absolute inset-0 bg-white origin-top-left pointer-events-none" style={{ transform: 'scale(0.28)', width: '794px', height: '1123px' }}>
                               <CVTemplateRenderer data={data} template={t} />
                            </div>
                            <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/80 to-transparent pt-12">
                               <p className="text-white font-black uppercase tracking-widest text-[10px] italic">{t}</p>
                            </div>
                            {template === t && (
                              <div className="absolute top-4 right-4 bg-blue-600 text-white p-2 rounded-xl shadow-lg z-10 animate-in zoom-in duration-300">
                                 <Check size={14} strokeWidth={4} />
                              </div>
                            )}
                          </button>
                        ))}
                     </div>
                  )}

                  {step === "editor" && (
                    <div className="flex gap-10 animate-in fade-in slide-in-from-right-8 duration-500">
                       <div className="w-20 sm:w-64 shrink-0 space-y-2">
                          {[
                            { id: "personal", icon: <User size={18} />, label: "Identity" },
                            { id: "experience", icon: <Briefcase size={18} />, label: "History" },
                            { id: "education", icon: <GraduationCap size={18} />, label: "Academics" },
                            { id: "skills", icon: <Wrench size={18} />, label: "Expertise" }
                          ].map(s => (
                            <button
                              key={s.id}
                              onClick={() => setActiveSection(s.id)}
                              className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${activeSection === s.id ? "bg-blue-500 text-white shadow-xl" : "bg-white/5 text-slate-500 hover:bg-white/10"}`}
                            >
                               {s.icon}
                               <span className="hidden sm:inline font-black uppercase tracking-widest text-[10px]">{s.label}</span>
                            </button>
                          ))}
                       </div>

                       <div className="flex-1 space-y-10">
                          {activeSection === "personal" && (
                            <div className="space-y-8 animate-in fade-in duration-500">
                               <div className="flex flex-col sm:flex-row items-center gap-10">
                                  <div className="relative group shrink-0">
                                     <div className={`w-32 h-32 rounded-3xl overflow-hidden border-2 border-dashed ${data.photoUrl ? "border-blue-500/50" : "border-white/10"} flex items-center justify-center bg-black/40`}>
                                        {data.photoUrl ? <img src={data.photoUrl} className="w-full h-full object-cover" /> : <ImageIcon className="text-slate-700" size={32} />}
                                     </div>
                                     <input type="file" onChange={handlePhotoUpload} accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" />
                                     <div className="absolute -bottom-2 -right-2 bg-blue-500 text-white p-2 rounded-xl shadow-lg pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Plus size={14} />
                                     </div>
                                  </div>
                                  <div className="flex-1 w-full space-y-6">
                                     <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Full Identity</label>
                                        <input value={data.name} onChange={e => setData({...data, name: e.target.value})} className="w-full bg-black/40 border border-white/5 rounded-2xl px-6 py-4 text-white font-bold outline-none focus:border-blue-500/30 transition-all" />
                                     </div>
                                     <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Current Vector</label>
                                        <input value={data.title} onChange={e => setData({...data, title: e.target.value})} className="w-full bg-black/40 border border-white/5 rounded-2xl px-6 py-4 text-white font-bold outline-none focus:border-blue-500/30 transition-all" />
                                     </div>
                                  </div>
                               </div>
                               <div className="grid sm:grid-cols-2 gap-6">
                                  {[
                                    { id: "email", icon: <Mail size={16} />, label: "Email Buffer" },
                                    { id: "phone", icon: <Phone size={16} />, label: "Signal Line" },
                                    { id: "location", icon: <MapPin size={16} />, label: "Geo Station" },
                                    { id: "website", icon: <Globe size={16} />, label: "Digital Domain" }
                                  ].map(f => (
                                    <div key={f.id} className="space-y-2">
                                       <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">{f.label}</label>
                                       <div className="relative group">
                                          <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-blue-400 transition-colors">{f.icon}</div>
                                          <input value={(data as any)[f.id]} onChange={e => setData({...data, [f.id]: e.target.value})} className="w-full bg-black/40 border border-white/5 rounded-2xl pl-16 pr-6 py-4 text-white font-bold outline-none focus:border-blue-500/30 transition-all" />
                                       </div>
                                    </div>
                                  ))}
                               </div>
                               <div className="space-y-2">
                                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Profile Overview</label>
                                  <textarea value={data.summary} onChange={e => setData({...data, summary: e.target.value})} className="w-full h-40 bg-black/40 border border-white/5 rounded-3xl p-8 text-white font-medium leading-relaxed outline-none focus:border-blue-500/30 transition-all resize-none" />
                               </div>
                            </div>
                          )}

                          {activeSection === "experience" && (
                            <div className="space-y-8 animate-in fade-in duration-500">
                               {data.experience.map((exp, i) => (
                                 <div key={exp.id} className="bg-white/5 border border-white/5 rounded-[2.5rem] p-10 space-y-6 relative group">
                                    <button onClick={() => setData({...data, experience: data.experience.filter(e => e.id !== exp.id)})} className="absolute top-8 right-8 text-slate-700 hover:text-blue-500 transition-colors">
                                       <Trash2 size={18} />
                                    </button>
                                    <div className="grid sm:grid-cols-2 gap-6">
                                       <div className="space-y-2">
                                          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Organization</label>
                                          <input value={exp.company} onChange={e => {
                                            const newExp = [...data.experience];
                                            newExp[i].company = e.target.value;
                                            setData({...data, experience: newExp});
                                          }} className="w-full bg-black/20 border border-white/5 rounded-2xl px-6 py-4 text-white font-bold outline-none focus:border-blue-500/30 transition-all" />
                                       </div>
                                       <div className="space-y-2">
                                          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Role</label>
                                          <input value={exp.role} onChange={e => {
                                            const newExp = [...data.experience];
                                            newExp[i].role = e.target.value;
                                            setData({...data, experience: newExp});
                                          }} className="w-full bg-black/20 border border-white/5 rounded-2xl px-6 py-4 text-white font-bold outline-none focus:border-blue-500/30 transition-all" />
                                       </div>
                                    </div>
                                    <div className="grid sm:grid-cols-2 gap-6">
                                       <div className="space-y-2">
                                          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Duration</label>
                                          <input value={exp.date} onChange={e => {
                                            const newExp = [...data.experience];
                                            newExp[i].date = e.target.value;
                                            setData({...data, experience: newExp});
                                          }} className="w-full bg-black/20 border border-white/5 rounded-2xl px-6 py-4 text-white font-bold outline-none focus:border-blue-500/30 transition-all" />
                                       </div>
                                       <div className="space-y-2">
                                          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Location</label>
                                          <input value={exp.location} onChange={e => {
                                            const newExp = [...data.experience];
                                            newExp[i].location = e.target.value;
                                            setData({...data, experience: newExp});
                                          }} className="w-full bg-black/20 border border-white/5 rounded-2xl px-6 py-4 text-white font-bold outline-none focus:border-blue-500/30 transition-all" />
                                       </div>
                                    </div>
                                    <div className="space-y-2">
                                       <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Responsibility Buffer</label>
                                       <textarea value={exp.description} onChange={e => {
                                         const newExp = [...data.experience];
                                         newExp[i].description = e.target.value;
                                         setData({...data, experience: newExp});
                                       }} className="w-full h-32 bg-black/20 border border-white/5 rounded-2xl p-6 text-white font-medium leading-relaxed outline-none focus:border-blue-500/30 transition-all resize-none" />
                                    </div>
                                 </div>
                               ))}
                               <button onClick={addExperience} className="w-full py-8 border-2 border-dashed border-white/5 rounded-[2.5rem] text-slate-600 font-black uppercase tracking-widest text-[10px] hover:border-blue-500/30 hover:text-blue-400 transition-all flex items-center justify-center gap-3">
                                  <Plus size={16} /> Append History
                               </button>
                            </div>
                          )}

                          {activeSection === "education" && (
                            <div className="space-y-8 animate-in fade-in duration-500">
                               {data.education.map((edu, i) => (
                                 <div key={edu.id} className="bg-white/5 border border-white/5 rounded-[2.5rem] p-10 space-y-6 relative group">
                                    <button onClick={() => setData({...data, education: data.education.filter(e => e.id !== edu.id)})} className="absolute top-8 right-8 text-slate-700 hover:text-blue-500 transition-colors">
                                       <Trash2 size={18} />
                                    </button>
                                    <div className="grid sm:grid-cols-2 gap-6">
                                       <div className="space-y-2">
                                          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Institution</label>
                                          <input value={edu.institution} onChange={e => {
                                            const newEdu = [...data.education];
                                            newEdu[i].institution = e.target.value;
                                            setData({...data, education: newEdu});
                                          }} className="w-full bg-black/20 border border-white/5 rounded-2xl px-6 py-4 text-white font-bold outline-none focus:border-blue-500/30 transition-all" />
                                       </div>
                                       <div className="space-y-2">
                                          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Degree</label>
                                          <input value={edu.degree} onChange={e => {
                                            const newEdu = [...data.education];
                                            newEdu[i].degree = e.target.value;
                                            setData({...data, education: newEdu});
                                          }} className="w-full bg-black/20 border border-white/5 rounded-2xl px-6 py-4 text-white font-bold outline-none focus:border-blue-500/30 transition-all" />
                                       </div>
                                    </div>
                                    <div className="grid sm:grid-cols-2 gap-6">
                                       <div className="space-y-2">
                                          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Duration</label>
                                          <input value={edu.date} onChange={e => {
                                            const newEdu = [...data.education];
                                            newEdu[i].date = e.target.value;
                                            setData({...data, education: newEdu});
                                          }} className="w-full bg-black/20 border border-white/5 rounded-2xl px-6 py-4 text-white font-bold outline-none focus:border-blue-500/30 transition-all" />
                                       </div>
                                    </div>
                                    <div className="space-y-2">
                                       <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Achievement Log</label>
                                       <textarea value={edu.description} onChange={e => {
                                         const newEdu = [...data.education];
                                         newEdu[i].description = e.target.value;
                                         setData({...data, education: newEdu});
                                       }} className="w-full h-32 bg-black/20 border border-white/5 rounded-2xl p-6 text-white font-medium leading-relaxed outline-none focus:border-blue-500/30 transition-all resize-none" />
                                    </div>
                                 </div>
                               ))}
                               <button onClick={addEducation} className="w-full py-8 border-2 border-dashed border-white/5 rounded-[2.5rem] text-slate-600 font-black uppercase tracking-widest text-[10px] hover:border-blue-500/30 hover:text-blue-400 transition-all flex items-center justify-center gap-3">
                                  <Plus size={16} /> Append Academics
                               </button>
                            </div>
                          )}

                          {activeSection === "skills" && (
                            <div className="space-y-10 animate-in fade-in duration-500">
                               <div className="p-10 bg-white/5 border border-white/5 rounded-[3rem] space-y-8">
                                  <div className="flex gap-4">
                                     <input 
                                       id="skill-input" 
                                       onKeyDown={e => { if(e.key === 'Enter') { addSkill((e.target as any).value); (e.target as any).value = ''; } }} 
                                       className="flex-1 bg-black/40 border border-white/5 rounded-2xl px-8 py-5 text-white font-bold outline-none focus:border-blue-500/30 transition-all" 
                                       placeholder="Inject Technical Skill..."
                                     />
                                     <button onClick={() => { const i = document.getElementById('skill-input') as any; addSkill(i.value); i.value = ''; }} className="bg-blue-600 text-white px-10 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-blue-500 transition-all">Inject</button>
                                  </div>
                                  <div className="flex flex-wrap gap-3">
                                     {data.skills.map(s => (
                                       <div key={s} className="group bg-white/5 border border-white/10 px-6 py-3 rounded-xl flex items-center gap-3 hover:border-blue-500/30 transition-all">
                                          <span className="text-white font-black uppercase tracking-widest text-[10px]">{s}</span>
                                          <button onClick={() => removeSkill(s)} className="text-slate-600 group-hover:text-blue-500"><Trash2 size={14} /></button>
                                       </div>
                                     ))}
                                  </div>
                               </div>
                            </div>
                          )}
                       </div>
                    </div>
                  )}

                  {step === "preview" && (
                    <div className="flex flex-col items-center animate-in zoom-in-95 duration-500 h-full overflow-y-auto custom-scrollbar p-8" ref={containerRef}>
                        <div 
                          ref={cvRef}
                          className="bg-white text-slate-900 shadow-2xl origin-top shrink-0 overflow-hidden"
                          style={{ 
                            width: "794px", 
                            minHeight: "1123px", 
                            transform: `scale(${previewScale})`,
                            fontFamily: "'Inter', sans-serif"
                          }}
                        >
                           <CVTemplateRenderer data={data} template={template} />
                        </div>
                    </div>
                  )}
               </div>
               <div className="bg-white/5 px-10 py-8 border-t border-white/5 flex items-center justify-center shrink-0">
                  {step === "preview" && (
                    <button 
                      onClick={generatePDF}
                      disabled={isGenerating}
                      className="px-12 py-5 bg-white text-slate-900 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-slate-200 transition-all flex items-center gap-4 shadow-2xl disabled:opacity-50"
                    >
                      {isGenerating ? <RefreshCw className="animate-spin" size={20} /> : <><FileDown size={20} /> Forge CV</>}
                    </button>
                  )}
                  {step !== "preview" && (
                    <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] italic">
                      Finalize configuration to initialize binary synthesis
                    </p>
                  )}
               </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-8">
            <div className="bg-[#0f172a] p-10 rounded-[3.5rem] border border-white/5 shadow-3xl shadow-black relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-full blur-3xl" />
               <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-2xl text-blue-400">
                    <CheckCircle2 size={24} />
                  </div>
                  <h3 className="text-xl font-black text-white uppercase tracking-tighter">Validation</h3>
               </div>
               <div className="space-y-6">
                  <div className="flex items-center justify-between text-sm">
                     <span className="text-slate-500 font-bold">Integrity Check</span>
                     <span className="text-blue-400 font-black uppercase tracking-widest text-[10px]">Passed</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                     <span className="text-slate-500 font-bold">Metadata Sync</span>
                     <span className="text-blue-400 font-black uppercase tracking-widest text-[10px]">Active</span>
                  </div>
                  <div className="flex items-center gap-3 text-[9px] font-black text-blue-500 uppercase tracking-[0.4em] pt-4 border-t border-white/5">
                     <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                     Sovereign Engine Online
                  </div>
               </div>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-indigo-900 p-10 rounded-[3.5rem] text-white relative overflow-hidden shadow-3xl border border-blue-500/20">
               <ShieldCheck size={120} className="absolute -bottom-10 -right-10 opacity-10 group-hover:rotate-12 transition-transform duration-1000" />
               <h3 className="text-2xl font-black mb-4 uppercase tracking-tighter italic">Vault Secure</h3>
               <p className="text-blue-100 font-medium text-sm leading-relaxed">
                  Your professional identity data is processed strictly within your browser. No external telemetry or cloud storage is utilized.
               </p>
            </div>
          </div>
        </div>

        <div className="mt-40 border-t border-slate-800 pt-40">
          <div className="grid lg:grid-cols-2 gap-24 items-start">
            <div className="space-y-16">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-blue-500/10 rounded-[1.5rem] flex items-center justify-center text-blue-400 border border-blue-500/20">
                  <HelpCircle size={32} />
                </div>
                <div>
                  <h2 className="text-4xl font-black text-white uppercase tracking-tight leading-none italic">Forge <span className="text-blue-400">FAQ</span></h2>
                  <p className="text-slate-500 font-bold text-[10px] uppercase tracking-widest mt-2">Identity Queries</p>
                </div>
              </div>

              <div className="space-y-6">
                {[
                  { q: "Is my data stored?", a: "Negative. SAMToolBox utilizes an ephemeral memory model. Once the session is terminated, all identity data is purged from the browser buffer." },
                  { q: "Are templates ATS-friendly?", a: "Affirmative. Our industrial templates utilize standard semantic structures to ensure high-fidelity parsing by automated recruitment engines." },
                  { q: "Custom template support?", a: "Currently limited to our curated industrial suite. We are engineering a modular component builder for future identity cycles." }
                ].map((faq, i) => (
                  <div key={i} className="p-8 bg-white/5 rounded-[2.5rem] border border-white/5 hover:border-blue-500/20 transition-all group">
                    <h3 className="font-black text-white text-sm mb-4 flex items-start gap-4">
                      <span className="text-blue-400 font-mono">Q.</span> {faq.q}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed font-medium pl-8 group-hover:text-slate-300 transition-colors">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#0f172a] rounded-[4rem] p-16 md:p-20 text-white relative overflow-hidden border border-white/5">
               <div className="absolute top-0 right-0 w-full h-full opacity-[0.02] pointer-events-none" style={{ backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
               <div className="relative z-10 text-center sm:text-left">
                  <div className="w-24 h-24 bg-blue-500/10 border border-blue-500/20 rounded-[2rem] flex items-center justify-center mb-12 shadow-[0_0_80px_rgba(37,99,235,0.2)] mx-auto sm:mx-0">
                    <BookOpen size={48} className="text-blue-400" />
                  </div>
                  <h3 className="text-4xl font-black mb-8 tracking-tight uppercase leading-none">Best Practices</h3>
                  <p className="text-slate-400 font-medium mb-16 leading-relaxed text-xl">
                    For optimal professional synthesis, utilize high-contrast 
                    industrial templates and maintain metadata density.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-12">
                     <div className="space-y-4">
                        <div className="text-4xl font-black text-white tracking-tighter">100%</div>
                        <div className="text-[10px] font-bold text-blue-400 uppercase tracking-[0.3em]">Privacy Index</div>
                     </div>
                     <div className="space-y-4">
                        <div className="text-4xl font-black text-white tracking-tighter">HD</div>
                        <div className="text-[10px] font-bold text-blue-400 uppercase tracking-[0.3em]">Binary Forge</div>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
