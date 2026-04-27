"use client";

import { useState, useMemo } from "react";
import { Upload, FileText, CheckCircle2, XCircle, AlertCircle, Zap, Target, Award, RefreshCw, BookOpen, HelpCircle } from "lucide-react";

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
    
    // Simulate processing time for better UX
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const text = resumeText.toLowerCase();
    const words = resumeText.split(/\s+/).filter(w => w.length > 0);
    const wordCount = words.length;
    
    // Check sections
    const sections: string[] = [];
    const sectionKeywords = {
      "Summary": ["summary", "objective", "profile"],
      "Experience": ["experience", "work history", "employment"],
      "Education": ["education", "academic", "degree"],
      "Skills": ["skills", "technical skills", "competencies"],
      "Projects": ["project", "projects"],
      "Certifications": ["certification", "certificate", "certified"],
      "Languages": ["language", "languages"],
    };
    
    Object.entries(sectionKeywords).forEach(([section, keywords]) => {
      if (keywords.some(kw => text.includes(kw))) {
        sections.push(section);
      }
    });
    
    // Check contact info
    const hasEmail = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}/.test(resumeText);
    const hasPhone = /(\+92|0)?3\d{2}[- ]?\d{7}|(\+?\d{1,3}[- ]?)?\(?\d{3}\)?[- ]?\d{3}[- ]?\d{4}/.test(resumeText);
    const hasContactInfo = hasEmail || hasPhone;
    
    const hasEducation = sectionKeywords["Education"].some(kw => text.includes(kw));
    const hasExperience = sectionKeywords["Experience"].some(kw => text.includes(kw));
    const hasSkills = sectionKeywords["Skills"].some(kw => text.includes(kw));
    
    // Extract keywords (simple approach - words with 4+ chars)
    const commonWords = new Set(["the", "and", "for", "with", "this", "that", "from", "have", "been", "were", "they", "their", "would", "which", "about"]);
    const keywords = words.filter(w => w.length >= 4 && !commonWords.has(w.toLowerCase())).length;
    
    // Calculate score
    let score = 0;
    const strengths: string[] = [];
    const weaknesses: string[] = [];
    
    // Word count (ideal: 150-400 words for 1-2 pages)
    if (wordCount >= 150 && wordCount <= 400) {
      score += 15;
      strengths.push("Good resume length");
    } else if (wordCount > 400) {
      score += 10;
      weaknesses.push("Resume might be too long - consider condensing");
    } else {
      score += 5;
      weaknesses.push("Resume is too short - add more details");
    }
    
    // Sections
    score += Math.min(sections.length * 5, 25);
    if (sections.length >= 4) {
      strengths.push(`Well-structured with ${sections.length} key sections`);
    } else {
      weaknesses.push(`Add more sections (currently ${sections.length}, aim for 4+)`);
    }
    
    // Contact info
    if (hasContactInfo) {
      score += 10;
      strengths.push("Contact information present");
    } else {
      weaknesses.push("Missing contact information (email/phone)");
    }
    
    // Essential sections
    if (hasEducation) {
      score += 10;
      strengths.push("Education section included");
    } else {
      weaknesses.push("Missing education section");
    }
    
    if (hasExperience) {
      score += 15;
      strengths.push("Work experience section included");
    } else {
      weaknesses.push("Missing work experience section");
    }
    
    if (hasSkills) {
      score += 10;
      strengths.push("Skills section included");
    } else {
      weaknesses.push("Missing skills section");
    }
    
    // Keywords density
    if (keywords >= 30) {
      score += 15;
      strengths.push("Good keyword variety");
    } else if (keywords >= 20) {
      score += 10;
      weaknesses.push("Could use more industry-specific keywords");
    } else {
      score += 5;
      weaknesses.push("Low keyword diversity - add relevant skills and terms");
    }
    
    // Job description matching (if provided)
    let matchScore = 0;
    if (jobDescription.trim()) {
      const jobWords = jobDescription.toLowerCase().split(/\s+/).filter(w => w.length >= 4 && !commonWords.has(w));
      const matchingWords = jobWords.filter(w => text.includes(w)).length;
      matchScore = Math.round((matchingWords / jobWords.length) * 100);
      score += Math.min(matchScore / 5, 15);
      
      if (matchScore >= 60) {
        strengths.push(`Strong match (${matchScore}%) with job description`);
      } else if (matchScore >= 40) {
        weaknesses.push(`Moderate match (${matchScore}%) with job description`);
      } else {
        weaknesses.push(`Low match (${matchScore}%) - align with job requirements`);
      }
    }
    
    // Generate suggestions
    const suggestions: string[] = [];
    if (!hasEmail) suggestions.push("Add your email address");
    if (!hasPhone) suggestions.push("Include your phone number");
    if (!sections.includes("Summary")) suggestions.push("Add a professional summary/objective");
    if (!sections.includes("Skills")) suggestions.push("Create a dedicated skills section");
    if (!sections.includes("Projects")) suggestions.push("Consider adding notable projects");
    if (wordCount < 200) suggestions.push("Expand your experience descriptions");
    if (matchScore > 0 && matchScore < 50) suggestions.push("Incorporate keywords from the job description");
    suggestions.push("Use action verbs (Managed, Developed, Created, Led)");
    suggestions.push("Quantify achievements (increased X by Y%, managed $Z budget)");
    
    // Determine grade
    let grade = "F";
    if (score >= 90) grade = "A+";
    else if (score >= 85) grade = "A";
    else if (score >= 80) grade = "A-";
    else if (score >= 75) grade = "B+";
    else if (score >= 70) grade = "B";
    else if (score >= 65) grade = "B-";
    else if (score >= 60) grade = "C+";
    else if (score >= 55) grade = "C";
    else if (score >= 50) grade = "C-";
    else if (score >= 40) grade = "D";
    
    setResult({
      score: Math.min(Math.round(score), 100),
      grade,
      wordCount,
      sections,
      strengths,
      weaknesses,
      suggestions,
      keywordCount: keywords,
      hasContactInfo,
      hasEducation,
      hasExperience,
      hasSkills,
    });
    
    setIsAnalyzing(false);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return "from-green-500 to-green-600";
    if (score >= 60) return "from-yellow-500 to-yellow-600";
    return "from-red-500 to-red-600";
  };

  return (
    <div className="max-w-6xl mx-auto py-8 sm:py-16 px-4 sm:px-6">
      {/* Premium Header */}
      <div className="text-center mb-10 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 text-brand-600 text-[10px] font-black uppercase tracking-[0.2em] mb-6 border border-brand-100">
          <Target size={12} />
          <span>ATS Intelligence V4</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-black text-slate-800 mb-6 tracking-tight">
          Resume <span className="text-brand-600">Forge</span>
        </h1>
        <p className="text-sm sm:text-lg text-slate-600 max-w-2xl mx-auto font-medium leading-relaxed">
          Unlock your ATS compatibility score and get industrial-grade optimization tips. 
          <span className="text-slate-900 font-semibold block sm:inline"> Processed 100% locally. Your career data never leaves your device.</span>
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Input Console */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white p-4 sm:p-8 rounded-[1.5rem] sm:rounded-3xl shadow-2xl border border-slate-100 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-brand-600" />
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-brand-50 rounded-lg text-brand-600">
                <FileText size={20} />
              </div>
              <h2 className="text-sm font-black text-slate-900 uppercase tracking-[0.2em]">Resume Corpus</h2>
            </div>
            <textarea
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              placeholder="Paste your CV text here for analysis..."
              rows={12}
              className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-brand-500/30 focus:ring-4 focus:ring-brand-500/5 outline-none text-slate-700 text-sm font-medium transition-all resize-none placeholder:text-slate-300"
            />
            <div className="flex justify-between items-center mt-4">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{resumeText.split(/\s+/).filter(w => w).length} Words Detected</span>
              {resumeText && (
                <button onClick={() => setResumeText("")} className="text-[10px] font-black text-red-500 uppercase tracking-widest hover:underline">Clear</button>
              )}
            </div>
          </div>

          <div className="bg-white p-4 sm:p-8 rounded-[1.5rem] sm:rounded-3xl shadow-2xl border border-slate-100 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-slate-900" />
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-slate-100 rounded-lg text-slate-600">
                <Target size={20} />
              </div>
              <h2 className="text-sm font-black text-slate-900 uppercase tracking-[0.2em]">Job Specification (Optional)</h2>
            </div>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the target job description to verify keyword alignment..."
              rows={6}
              className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-slate-300 focus:ring-4 focus:ring-slate-100 outline-none text-slate-700 text-sm font-medium transition-all resize-none placeholder:text-slate-300"
            />
          </div>

          <button
            onClick={analyzeResume}
            disabled={!resumeText.trim() || isAnalyzing}
            className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-[0.3em] shadow-xl hover:bg-brand-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 active:scale-[0.98]"
          >
            {isAnalyzing ? <RefreshCw className="animate-spin" /> : <><Zap size={18} /> Run Diagnostics</>}
          </button>
        </div>

        {/* Right: Results Dashboard */}
        <div className="lg:col-span-5 space-y-6 sticky top-8">
          {result ? (
            <>
              <div className="bg-slate-900 rounded-[2rem] p-8 text-white shadow-3xl border border-slate-800 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/10 rounded-full blur-3xl" />
                <div className="flex justify-between items-start mb-10">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-400 mb-2">Aggregate Score</p>
                    <div className="text-6xl font-black tracking-tighter">{result.score}</div>
                  </div>
                  <div className="bg-brand-600 px-6 py-2 rounded-xl font-black text-2xl shadow-lg shadow-brand-600/20">
                    {result.grade}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                    <p className="text-[9px] font-black uppercase tracking-widest text-white/40 mb-1">Density</p>
                    <p className="text-xl font-bold">{result.wordCount} <span className="text-xs font-medium text-white/40">Words</span></p>
                  </div>
                  <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                    <p className="text-[9px] font-black uppercase tracking-widest text-white/40 mb-1">Keywords</p>
                    <p className="text-xl font-bold">{result.keywordCount}</p>
                  </div>
                </div>
              </div>

              {result.strengths.length > 0 && (
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xl">
                  <h3 className="text-[10px] font-black text-green-600 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <CheckCircle2 size={14} /> Competitive Edge
                  </h3>
                  <div className="space-y-3">
                    {result.strengths.map((s, i) => (
                      <div key={i} className="flex items-start gap-3 group">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 group-hover:scale-125 transition-transform" />
                        <span className="text-xs font-bold text-slate-700 leading-relaxed">{s}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {result.weaknesses.length > 0 && (
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xl">
                  <h3 className="text-[10px] font-black text-brand-600 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <AlertCircle size={14} /> Critical Deficits
                  </h3>
                  <div className="space-y-3">
                    {result.weaknesses.map((w, i) => (
                      <div key={i} className="flex items-start gap-3 group">
                        <div className="w-1.5 h-1.5 bg-brand-500 rounded-full mt-1.5 group-hover:scale-125 transition-transform" />
                        <span className="text-xs font-bold text-slate-700 leading-relaxed">{w}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-blue-900 rounded-2xl p-6 text-white shadow-xl">
                <h3 className="text-[10px] font-black text-blue-300 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Award size={14} /> Strategic Advice
                </h3>
                <div className="space-y-3">
                  {result.suggestions.map((s, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-1 h-1 bg-blue-400 rounded-full mt-2" />
                      <span className="text-[11px] font-medium text-blue-100 leading-relaxed">{s}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200 p-12 flex flex-col items-center justify-center text-center h-full min-h-[400px]">
              <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center shadow-sm mb-6">
                <Zap size={32} className="text-slate-200" />
              </div>
              <h3 className="text-lg font-black text-slate-800 mb-2 uppercase tracking-tight">System Ready</h3>
              <p className="text-sm text-slate-400 max-w-[200px] font-medium leading-relaxed">Paste your data to initialize the diagnostic engine.</p>
            </div>
          )}
        </div>
      </div>
    </div>

      {/* Information Section */}
      <div className="max-w-6xl mx-auto px-4 mt-20 grid lg:grid-cols-2 gap-12 border-t border-slate-100 pt-16">
        <div className="space-y-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-brand-50 rounded-xl text-brand-600">
              <BookOpen size={20} />
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Analysis Protocol</h2>
          </div>
          
          <div className="space-y-6">
            {[
              { step: "01", title: "Text Ingestion", desc: "Paste your raw resume text. Our engine performs a semantic scan to identify core professional structures." },
              { step: "02", title: "Target Calibration", desc: "Optionally include a job description. The system will run a cross-comparison to find missing keyword linkages." },
              { step: "03", title: "ATS Simulation", desc: "Initiate the diagnostic. Our algorithm mimics modern recruitment filters to calculate your visibility score." },
              { step: "04", title: "Deficit Correction", desc: "Review the results dashboard. Address critical weaknesses and keyword gaps to maximize your interview potential." }
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
            <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Career Intelligence FAQ</h2>
          </div>

          <div className="space-y-4">
            {[
              { q: "Is this score accurate?", a: "We simulate the standard logic of Applicant Tracking Systems (ATS). While not identical to every tool, it highlights the same core deficits recruiters flag." },
              { q: "How can I improve my score?", a: "Ensure you have clear headings (Skills, Education, Experience) and incorporate industry-specific action verbs and quantified achievements." },
              { q: "Are my details saved?", a: "No. SamToolbox operates on a local-only architecture. Your professional history is never transmitted to any cloud or database." },
              { q: "Why paste text vs uploading?", a: "Pasting text ensures that the parsing engine reads exactly what you see, avoiding the common character encoding errors found in PDF parsers." }
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
    </div>
  );
}
