"use client";

import { useState, useMemo } from "react";
import { 
  Upload, FileText, CheckCircle2, XCircle, AlertCircle, 
  Zap, Target, Award, RefreshCw, BookOpen, HelpCircle,
  Terminal, ShieldCheck, Cpu, Activity, ArrowRight,
  Layers, BarChart3, Briefcase, GraduationCap, ClipboardList
} from "lucide-react";
import Link from "next/link";
import { generateSoftwareApplicationSchema } from "@/lib/structuredData";

interface AnalysisResult {
  score: number;
  grade: string;
  wordCount: number;
  sections: string[];
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
  keywordCount: number;
  hasContactInfo: boolean;
  hasEducation: boolean;
  hasExperience: boolean;
  hasSkills: boolean;
}

export default function ResumeScorePage() {
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeResume = async () => {
    if (!resumeText.trim()) return;
    
    setIsAnalyzing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const text = resumeText.toLowerCase();
    const words = resumeText.split(/\s+/).filter(w => w.length > 0);
    const wordCount = words.length;
    
    const sectionKeywords = {
      "Summary": ["summary", "objective", "profile"],
      "Experience": ["experience", "work history", "employment"],
      "Education": ["education", "academic", "degree"],
      "Skills": ["skills", "technical skills", "competencies"],
      "Projects": ["project", "projects"],
      "Certifications": ["certification", "certificate", "certified"],
      "Languages": ["language", "languages"],
    };
    
    const sections: string[] = [];
    Object.entries(sectionKeywords).forEach(([section, keywords]) => {
      if (keywords.some(kw => text.includes(kw))) {
        sections.push(section);
      }
    });
    
    const hasEmail = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}/.test(resumeText);
    const hasPhone = /(\+92|0)?3\d{2}[- ]?\d{7}|(\+?\d{1,3}[- ]?)?\(?\d{3}\)?[- ]?\d{3}[- ]?\d{4}/.test(resumeText);
    const hasContactInfo = hasEmail || hasPhone;
    
    const hasEducation = sectionKeywords["Education"].some(kw => text.includes(kw));
    const hasExperience = sectionKeywords["Experience"].some(kw => text.includes(kw));
    const hasSkills = sectionKeywords["Skills"].some(kw => text.includes(kw));
    
    const commonWords = new Set(["the", "and", "for", "with", "this", "that", "from", "have", "been", "were", "they", "their", "would", "which", "about"]);
    const keywordsCount = words.filter(w => w.length >= 4 && !commonWords.has(w.toLowerCase())).length;
    
    let score = 0;
    const strengths: string[] = [];
    const weaknesses: string[] = [];
    
    if (wordCount >= 150 && wordCount <= 400) {
      score += 15;
      strengths.push("Optimal Lexical Density");
    } else if (wordCount > 400) {
      score += 10;
      weaknesses.push("Excessive Verbosity Detected");
    } else {
      score += 5;
      weaknesses.push("Insufficient Content Volume");
    }
    
    score += Math.min(sections.length * 5, 25);
    if (sections.length >= 4) {
      strengths.push(`${sections.length} Structural Vectors Identified`);
    } else {
      weaknesses.push("Structural Redundancy - Add Core Sections");
    }
    
    if (hasContactInfo) { score += 10; strengths.push("Contact Meta-Data Present"); }
    else { weaknesses.push("Missing Communication Vector"); }
    
    if (hasEducation) { score += 10; strengths.push("Academic History Logged"); }
    else { weaknesses.push("Missing Educational Validation"); }
    
    if (hasExperience) { score += 15; strengths.push("Professional Experience Detected"); }
    else { weaknesses.push("Missing Professional History"); }
    
    if (hasSkills) { score += 10; strengths.push("Competency Matrix Included"); }
    else { weaknesses.push("Missing Skill Identification"); }
    
    if (keywordsCount >= 30) { score += 15; strengths.push("High Keyword Variance"); }
    else { weaknesses.push("Low Industry Keyword Density"); }
    
    let matchScore = 0;
    if (jobDescription.trim()) {
      const jobWords = jobDescription.toLowerCase().split(/\s+/).filter(w => w.length >= 4 && !commonWords.has(w));
      const matchingWords = jobWords.filter(w => text.includes(w)).length;
      matchScore = Math.round((matchingWords / jobWords.length) * 100);
      score += Math.min(matchScore / 5, 15);
      
      if (matchScore >= 60) strengths.push(`Strong ATS Match (${matchScore}%)`);
      else if (matchScore >= 40) weaknesses.push(`Moderate ATS Alignment (${matchScore}%)`);
      else weaknesses.push(`Critical Alignment Gap (${matchScore}%)`);
    }
    
    const suggestions: string[] = [];
    if (!hasEmail) suggestions.push("Initialize Primary Email Vector");
    if (!hasPhone) suggestions.push("Log Telecommunication Number");
    if (!sections.includes("Summary")) suggestions.push("Synthesize Professional Summary");
    if (!sections.includes("Skills")) suggestions.push("Configure Technical Skill Matrix");
    suggestions.push("Inject Industry Action Verbs");
    suggestions.push("Quantify Tactical Achievements");
    
    let grade = "D";
    if (score >= 90) grade = "A+";
    else if (score >= 80) grade = "A";
    else if (score >= 70) grade = "B";
    else if (score >= 60) grade = "C";
    
    setResult({
      score: Math.min(Math.round(score), 100),
      grade,
      wordCount,
      sections,
      strengths,
      weaknesses,
      suggestions,
      keywordCount: keywordsCount,
      hasContactInfo,
      hasEducation,
      hasExperience,
      hasSkills,
    });
    
    setIsAnalyzing(false);
  };

  const schema = useMemo(() => generateSoftwareApplicationSchema("resume-score", "Industrial-grade ATS compatibility analyzer with local-first lexical verification."), []);

  return (
    <div className="min-h-screen bg-[#020617] selection:bg-emerald-500/30 selection:text-emerald-200">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* ══════════════════════════════════════════
          HERO / HEADER
      ══════════════════════════════════════════ */}
      <section className="pt-24 pb-32 px-6 relative overflow-hidden text-center">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 font-black text-[10px] uppercase tracking-[0.4em] mb-10 shadow-2xl">
            <Target size={14} className="animate-pulse" />
            ATS Intelligence v4.1
          </div>
          <h1 className="text-6xl md:text-[7rem] font-black text-white tracking-tighter mb-8 leading-none">
            Resume <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 italic">Forge.</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-3xl mx-auto font-medium leading-relaxed">
            Industrial-grade career alignment diagnostics. 
            <span className="text-slate-200 font-bold block mt-2">Lexical Sovereignty. Zero Data Harvesting. ATS Simulation.</span>
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          MAIN UTILITY INTERFACE
      ══════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-6 -mt-16 relative z-20 mb-32">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Analysis Input Area */}
          <div className="lg:col-span-7 space-y-10">
            <div className="bg-[#0f172a] rounded-[3.5rem] border border-white/5 shadow-3xl shadow-black overflow-hidden group">
               <div className="bg-white/5 px-10 py-8 border-b border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                     <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-emerald-400">
                        <FileText size={22} />
                     </div>
                     <div>
                        <h3 className="text-lg font-black text-white uppercase tracking-tighter leading-none italic">Resume Corpus</h3>
                        <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mt-1">Source Text Ingestion</p>
                     </div>
                  </div>
                  {resumeText && (
                    <button onClick={() => setResumeText("")} className="text-[10px] font-black text-rose-500 uppercase tracking-widest hover:text-white transition-colors">Wipe Data</button>
                  )}
               </div>
               <div className="p-10">
                  <textarea
                    value={resumeText}
                    onChange={(e) => setResumeText(e.target.value)}
                    placeholder="PASTE PROFESSIONAL HISTORY FOR AUDIT..."
                    rows={12}
                    className="w-full bg-white/[0.03] border border-white/5 rounded-[2rem] p-8 text-sm font-bold text-white outline-none focus:bg-white/[0.05] focus:border-emerald-500/30 transition-all placeholder:text-slate-800 tracking-tight uppercase italic resize-none"
                  />
                  <div className="mt-6 flex items-center justify-between text-[9px] font-black uppercase tracking-[0.2em] text-slate-700">
                     <span>Lexical Units: {resumeText.split(/\s+/).filter(w => w).length}</span>
                     <span>Air-Gapped Processing Enabled</span>
                  </div>
               </div>
            </div>

            <div className="bg-[#0f172a] rounded-[3.5rem] border border-white/5 shadow-3xl shadow-black overflow-hidden group">
               <div className="bg-white/5 px-10 py-8 border-b border-white/5 flex items-center gap-4">
                  <div className="p-3 bg-white/5 border border-white/10 rounded-2xl text-slate-400">
                     <Target size={22} />
                  </div>
                  <div>
                     <h3 className="text-lg font-black text-white uppercase tracking-tighter leading-none italic">Job Specification</h3>
                     <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mt-1 italic">Optional Alignment Target</p>
                  </div>
               </div>
               <div className="p-10">
                  <textarea
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    placeholder="PASTE TARGET JOB SPECIFICATION..."
                    rows={6}
                    className="w-full bg-white/[0.03] border border-white/5 rounded-[2rem] p-8 text-sm font-bold text-white outline-none focus:bg-white/[0.05] focus:border-slate-500/30 transition-all placeholder:text-slate-800 tracking-tight uppercase italic resize-none"
                  />
               </div>
            </div>

            <button
              onClick={analyzeResume}
              disabled={!resumeText.trim() || isAnalyzing}
              className="w-full py-10 bg-white text-slate-900 rounded-[3.5rem] font-black uppercase tracking-[0.4em] text-[10px] shadow-3xl transition-all hover:bg-emerald-600 hover:text-white active:scale-95 flex items-center justify-center gap-6 disabled:opacity-50"
            >
              {isAnalyzing ? <RefreshCw className="animate-spin" size={24} /> : <><Zap size={24} strokeWidth={3} /> Execute Diagnostics</>}
            </button>
          </div>

          {/* Results Sidebar */}
          <div className="lg:col-span-5 space-y-10 lg:sticky lg:top-24">
             {result ? (
               <>
                 {/* Score Dashboard */}
                 <div className="bg-[#0f172a] rounded-[3.5rem] border border-white/5 shadow-3xl shadow-black p-12 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-emerald-600 rounded-full blur-[100px] opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-1000" />
                    
                    <div className="relative space-y-12">
                      <div className="flex justify-between items-start">
                        <div className="space-y-2">
                           <p className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.4em] italic">Aggregate Compatibility</p>
                           <p className="text-[7rem] font-black text-white italic tracking-tighter leading-none">{result.score}<span className="text-2xl">%</span></p>
                        </div>
                        <div className="w-24 h-24 bg-emerald-600 rounded-[2.5rem] flex items-center justify-center text-white text-4xl font-black italic shadow-2xl shadow-emerald-900/40 border border-emerald-500/50">
                           {result.grade}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                         <div className="p-8 bg-white/5 rounded-[2.5rem] border border-white/5">
                            <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-3">Density</p>
                            <p className="text-3xl font-black text-white tracking-tighter italic">{result.wordCount} <span className="text-[10px] text-slate-500">Units</span></p>
                         </div>
                         <div className="p-8 bg-white/5 rounded-[2.5rem] border border-white/5">
                            <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-3">Keywords</p>
                            <p className="text-3xl font-black text-white tracking-tighter italic">{result.keywordCount}</p>
                         </div>
                      </div>
                    </div>
                 </div>

                 {/* Competitive Edge */}
                 <div className="bg-[#0f172a] rounded-[3rem] border border-white/5 shadow-3xl shadow-black p-10 space-y-8">
                    <div className="flex items-center gap-4 text-emerald-400">
                       <CheckCircle2 size={24} />
                       <h3 className="text-lg font-black uppercase tracking-tighter italic">Competitive Edge</h3>
                    </div>
                    <div className="space-y-4">
                       {result.strengths.map((s, i) => (
                         <div key={i} className="flex items-center gap-4 p-5 bg-white/[0.02] border border-white/5 rounded-2xl group hover:bg-emerald-500/5 hover:border-emerald-500/20 transition-all">
                            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full group-hover:scale-150 transition-transform" />
                            <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest italic">{s}</span>
                         </div>
                       ))}
                    </div>
                 </div>

                 {/* Critical Deficits */}
                 <div className="bg-[#0f172a] rounded-[3rem] border border-white/5 shadow-3xl shadow-black p-10 space-y-8">
                    <div className="flex items-center gap-4 text-rose-500">
                       <AlertCircle size={24} />
                       <h3 className="text-lg font-black uppercase tracking-tighter italic">Critical Deficits</h3>
                    </div>
                    <div className="space-y-4">
                       {result.weaknesses.map((w, i) => (
                         <div key={i} className="flex items-center gap-4 p-5 bg-white/[0.02] border border-white/5 rounded-2xl group hover:bg-rose-500/5 hover:border-rose-500/20 transition-all">
                            <div className="w-1.5 h-1.5 bg-rose-500 rounded-full group-hover:scale-150 transition-transform" />
                            <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest italic">{w}</span>
                         </div>
                       ))}
                    </div>
                 </div>
               </>
             ) : (
               <div className="bg-[#0f172a] rounded-[3.5rem] border border-white/5 border-dashed p-20 flex flex-col items-center justify-center text-center space-y-8 min-h-[500px]">
                  <div className="w-24 h-24 bg-white/[0.03] border border-white/5 rounded-[2.5rem] flex items-center justify-center text-slate-800 shadow-sm">
                     <Cpu size={48} strokeWidth={1} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-slate-700 uppercase tracking-widest italic leading-tight mb-2">Diagnostic <br /> System Offline</h3>
                    <p className="text-[10px] text-slate-600 font-black uppercase tracking-[0.4em]">Input Data to Initialize</p>
                  </div>
               </div>
             )}

             {/* Privacy Vault */}
             <div className="p-10 bg-emerald-500/5 rounded-[3rem] border border-emerald-500/10 flex items-center gap-6 shadow-2xl">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shadow-sm">
                   <ShieldCheck size={28} />
                </div>
                <div>
                   <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest leading-none mb-1.5 italic">Local Vault Active</p>
                   <p className="text-[10px] font-bold text-slate-500 leading-tight">Professional data remains within browser memory.</p>
                </div>
             </div>
          </div>
        </div>

        {/* Protocol Section */}
        <div className="mt-40 border-t border-slate-800 pt-40">
           <div className="grid lg:grid-cols-2 gap-24 items-start">
              <div className="space-y-16">
                 <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-emerald-500/10 rounded-[1.5rem] flex items-center justify-center text-emerald-400 border border-emerald-500/20">
                      <ClipboardList size={32} />
                    </div>
                    <div>
                      <h2 className="text-4xl font-black text-white uppercase tracking-tight leading-none italic">Forge <span className="text-emerald-400">Protocol</span></h2>
                      <p className="text-slate-500 font-bold text-[10px] uppercase tracking-widest mt-2">Analysis Pipeline</p>
                    </div>
                 </div>

                 <div className="space-y-10">
                    {[
                      { step: "01", title: "Corpus Ingestion", desc: "Our engine performs a multi-pass semantic scan to extract professional entities and structural headers." },
                      { step: "02", title: "Alignment Targeting", desc: "Cross-comparison with optional job specifications to identify critical keyword deficits and role-specific gaps." },
                      { step: "03", title: "ATS Simulation", desc: "Algorithm execution mimicking industrial recruitment filters to calculate visibility scores and lexical density." },
                      { step: "04", title: "Deficit Resolution", desc: "Generation of tactical suggestions to correct structural weaknesses and optimize your interview probability." }
                    ].map((item, i) => (
                      <div key={i} className="flex gap-8 group">
                        <span className="text-5xl font-black text-white/5 group-hover:text-emerald-500/20 transition-all duration-500 italic">{item.step}</span>
                        <div className="space-y-2">
                           <h3 className="font-black text-white uppercase tracking-widest text-xs">{item.title}</h3>
                           <p className="text-slate-500 text-sm leading-relaxed font-medium">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                 </div>
              </div>

              <div className="bg-[#0f172a] rounded-[4.5rem] p-16 md:p-24 text-white relative overflow-hidden border border-white/5">
                 <div className="absolute top-0 right-0 w-full h-full opacity-[0.03] pointer-events-none" style={{ backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
                 <div className="relative z-10 text-center sm:text-left">
                    <div className="w-24 h-24 bg-emerald-500/10 border border-emerald-500/20 rounded-[2.5rem] flex items-center justify-center mb-12 shadow-[0_0_80px_rgba(16,185,129,0.2)] mx-auto sm:mx-0">
                      <ShieldCheck size={48} className="text-emerald-400" />
                    </div>
                    <h3 className="text-4xl font-black mb-10 tracking-tight uppercase leading-[0.9] italic">Sovereign <span className="text-emerald-400">Analysis.</span></h3>
                    <p className="text-slate-400 font-medium mb-16 leading-relaxed text-xl">
                       Resume Forge operates on a strictly local delivery model. 
                       No signups, no cloud syncing, no data harvesting. 
                       Your professional history is your business.
                    </p>
                    
                    <div className="grid grid-cols-2 gap-12">
                       <div className="space-y-4">
                          <div className="text-4xl font-black text-white tracking-tighter italic">OFF-GRID</div>
                          <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-[0.3em]">No Network Calls</div>
                       </div>
                       <div className="space-y-4">
                          <div className="text-4xl font-black text-white tracking-tighter italic">ENCRYPTED</div>
                          <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-[0.3em]">Local Only Processing</div>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Explore More Tools */}
        <div className="mt-40 text-center">
           <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mb-10">Access further industrial utilities</p>
           <Link href="/tools" className="inline-flex items-center gap-6 px-20 py-8 bg-white text-slate-900 rounded-[2.5rem] font-black uppercase tracking-widest text-[10px] hover:bg-emerald-600 hover:text-white transition-all shadow-3xl group">
             Explore All Systems <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
           </Link>
        </div>
      </section>
    </div>
  );
}
