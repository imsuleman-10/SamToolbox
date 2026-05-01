"use client";

import { useState, useEffect, useMemo } from "react";
import { 
  Plus, Trash2, Calculator, GraduationCap, TrendingUp, X, Zap, 
  HelpCircle, BookOpen, Activity, ShieldCheck, Cpu, ArrowRight,
  Target, Award, History, Layers, Shield, Terminal
} from "lucide-react";
import Link from "next/link";
import { generateSoftwareApplicationSchema } from "@/lib/structuredData";

interface Course {
  id: string;
  name: string;
  credits: number;
  grade: string;
}

interface Semester {
  id: string;
  name: string;
  courses: Course[];
}

const gradePoints: { [key: string]: number } = {
  "A+": 4.0, "A": 4.0, "A-": 3.7,
  "B+": 3.3, "B": 3.0, "B-": 2.7,
  "C+": 2.3, "C": 2.0, "C-": 1.7,
  "D+": 1.3, "D": 1.0, "F": 0.0,
};

export default function GPACalculatorPage() {
  const [semesters, setSemesters] = useState<Semester[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("samtoolbox-gpa-data");
      if (saved) return JSON.parse(saved);
    }
    return [{
      id: "1",
      name: "Semester 1",
      courses: [
        { id: "1", name: "", credits: 3, grade: "A" },
        { id: "2", name: "", credits: 3, grade: "A" },
      ],
    }];
  });

  const [scale, setScale] = useState<"4.0" | "5.0">("4.0");
  const [targetCGPA, setTargetCGPA] = useState<string>("");
  const [remainingSemesters, setRemainingSemesters] = useState<string>("1");

  const schema = useMemo(() => generateSoftwareApplicationSchema("gpa-calculator", "Professional grade tracking and GPA prediction engine with 100% local processing."), []);

  useEffect(() => {
    localStorage.setItem("samtoolbox-gpa-data", JSON.stringify(semesters));
  }, [semesters]);

  const addSemester = () => {
    const newSemester: Semester = {
      id: Date.now().toString(),
      name: `Semester ${semesters.length + 1}`,
      courses: [{ id: Date.now().toString(), name: "", credits: 3, grade: "A" }],
    };
    setSemesters([...semesters, newSemester]);
  };

  const removeSemester = (id: string) => {
    if (semesters.length > 1) {
      setSemesters(semesters.filter(s => s.id !== id));
    }
  };

  const addCourse = (semesterId: string) => {
    setSemesters(semesters.map(s =>
      s.id === semesterId
        ? { ...s, courses: [...s.courses, { id: Date.now().toString(), name: "", credits: 3, grade: "A" }] }
        : s
    ));
  };

  const removeCourse = (semesterId: string, courseId: string) => {
    setSemesters(semesters.map(s =>
      s.id === semesterId && s.courses.length > 1
        ? { ...s, courses: s.courses.filter(c => c.id !== courseId) }
        : s
    ));
  };

  const updateCourse = (semesterId: string, courseId: string, field: keyof Course, value: string | number) => {
    setSemesters(semesters.map(s =>
      s.id === semesterId
        ? { ...s, courses: s.courses.map(c => c.id === courseId ? { ...c, [field]: value } : c) }
        : s
    ));
  };

  const calculateSemesterGPA = (semester: Semester) => {
    let totalPoints = 0;
    let totalCredits = 0;
    semester.courses.forEach(course => {
      const points = gradePoints[course.grade] || 0;
      const normalizedPoints = scale === "5.0" ? (points / 4) * 5 : points;
      totalPoints += normalizedPoints * course.credits;
      totalCredits += course.credits;
    });
    return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : "0.00";
  };

  const calculateCGPA = () => {
    let totalPoints = 0;
    let totalCredits = 0;
    semesters.forEach(semester => {
      semester.courses.forEach(course => {
        const points = gradePoints[course.grade] || 0;
        const normalizedPoints = scale === "5.0" ? (points / 4) * 5 : points;
        totalPoints += normalizedPoints * course.credits;
        totalCredits += course.credits;
      });
    });
    return { 
      gpa: totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : "0.00",
      credits: totalCredits
    };
  };

  const stats = calculateCGPA();

  const getTargetRequirement = () => {
    const target = parseFloat(targetCGPA);
    const remaining = parseInt(remainingSemesters);
    if (isNaN(target) || isNaN(remaining) || remaining <= 0) return null;

    const currentCGPA = parseFloat(stats.gpa);
    const currentCredits = stats.credits;
    const estimatedRemainingCredits = remaining * 15;
    const totalCredits = currentCredits + estimatedRemainingCredits;
    
    const requiredPoints = (target * totalCredits) - (currentCGPA * currentCredits);
    const requiredGPA = requiredPoints / estimatedRemainingCredits;

    if (requiredGPA > parseFloat(scale)) return "LIMIT EXCEEDED";
    if (requiredGPA < 0) return "ACHIEVED";
    return requiredGPA.toFixed(2);
  };

  const getGradeColor = (gpa: string) => {
    const num = parseFloat(gpa);
    const max = parseFloat(scale);
    if (num >= max * 0.875) return "text-blue-500";
    if (num >= max * 0.75) return "text-blue-400";
    if (num >= max * 0.5) return "text-blue-600";
    return "text-slate-600";
  };

  return (
    <div className="min-h-screen bg-[#020617] selection:bg-blue-500/30 selection:text-blue-200">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* ══════════════════════════════════════════
          HERO / HEADER
      ══════════════════════════════════════════ */}
      <section className="pt-24 pb-32 px-6 relative overflow-hidden text-center">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 font-black text-[10px] uppercase tracking-[0.4em] mb-10 shadow-2xl">
            <Activity size={14} className="animate-pulse" />
            Academic Forge v8.2
          </div>
          <h1 className="text-6xl md:text-[7rem] font-black text-white tracking-tighter mb-8 leading-none">
            GPA <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 italic">Architect.</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-3xl mx-auto font-medium leading-relaxed">
            Precision grade tracking and prediction engine. 
            <span className="text-slate-200 font-bold block mt-2">Local Vault Security. Zero Redirection. Absolute Data Sovereignty.</span>
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          MAIN UTILITY INTERFACE
      ══════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-6 -mt-16 relative z-20 mb-32">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Editor Area */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Config Panel */}
            <div className="bg-[#0f172a] p-10 rounded-[3.5rem] border border-white/5 shadow-3xl shadow-black flex flex-wrap items-center justify-between gap-6">
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex items-center justify-center text-blue-400">
                     <Layers size={22} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">Compute Scale</p>
                    <p className="text-lg font-black text-white uppercase tracking-tighter">Format</p>
                  </div>
               </div>
               
               <div className="flex bg-white/5 p-2 rounded-[2rem] border border-white/5">
                  {["4.0", "5.0"].map((s) => (
                    <button
                      key={s}
                      onClick={() => setScale(s as any)}
                      className={`px-10 py-3 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest transition-all ${scale === s ? "bg-blue-600 text-white shadow-xl" : "text-slate-400 hover:text-white"}`}
                    >
                      {s} Scale
                    </button>
                  ))}
               </div>

               <button 
                  onClick={() => {
                    if(confirm("Wipe all local academic data?")) {
                      setSemesters([{ id: "1", name: "Semester 1", courses: [{ id: "1", name: "", credits: 3, grade: "A" }] }]);
                      localStorage.removeItem("samtoolbox-gpa-data");
                    }
                  }}
                  className="px-8 py-4 bg-blue-600/10 text-blue-500 border border-blue-500/20 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all shadow-xl"
               >
                  Reset Vault
               </button>
            </div>

            {/* Semester List */}
            <div className="space-y-10">
              {semesters.map((semester) => (
                <div key={semester.id} className="bg-[#0f172a] rounded-[3.5rem] border border-white/5 shadow-3xl shadow-black overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-700">
                   <div className="bg-white/5 px-10 py-8 border-b border-white/5 flex items-center justify-between">
                      <div className="flex items-center gap-6 overflow-hidden">
                        <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-2xl text-blue-400">
                           <GraduationCap size={22} />
                        </div>
                        <input
                          type="text"
                          value={semester.name}
                          onChange={(e) => setSemesters(semesters.map(s => s.id === semester.id ? { ...s, name: e.target.value } : s))}
                          className="bg-transparent border-none outline-none text-2xl font-black text-white tracking-tighter w-48 uppercase italic"
                        />
                        <div className="h-6 w-px bg-white/10 hidden sm:block" />
                        <div className="flex items-center gap-3">
                           <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">GPA:</span>
                           <span className={`text-2xl font-black italic ${getGradeColor(calculateSemesterGPA(semester))}`}>
                            {calculateSemesterGPA(semester)}
                           </span>
                        </div>
                      </div>
                      {semesters.length > 1 && (
                        <button
                          onClick={() => removeSemester(semester.id)}
                          className="p-4 bg-blue-500/10 text-blue-500 border border-blue-500/20 rounded-2xl hover:bg-blue-500 hover:text-white transition-all shadow-xl"
                        >
                          <Trash2 size={20} />
                        </button>
                      )}
                   </div>

                   <div className="p-10 space-y-6">
                      {semester.courses.map((course) => (
                        <div key={course.id} className="flex flex-col sm:grid sm:grid-cols-12 gap-6 items-center animate-in fade-in slide-in-from-left-4 duration-300 group">
                          <div className="w-full sm:col-span-7">
                            <input
                              type="text"
                              value={course.name}
                              onChange={(e) => updateCourse(semester.id, course.id, "name", e.target.value)}
                              placeholder="COURSE IDENTIFIER (E.G. CS-401)"
                              className="w-full px-8 py-5 bg-white/[0.03] border border-white/5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-200 focus:bg-white/[0.07] focus:border-blue-500/30 outline-none transition-all placeholder:text-slate-600"
                            />
                          </div>
                          <div className="w-full flex gap-4 sm:contents">
                            <div className="flex-1 sm:col-span-2">
                               <select
                                value={course.credits}
                                onChange={(e) => updateCourse(semester.id, course.id, "credits", parseInt(e.target.value))}
                                className="w-full px-6 py-5 bg-white/[0.03] border border-white/5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 outline-none cursor-pointer hover:bg-white/10 transition-all appearance-none text-center"
                              >
                                {[1, 2, 3, 4, 5, 6].map(c => <option key={c} value={c} className="bg-[#0f172a] text-white">{c} CR</option>)}
                              </select>
                            </div>
                            <div className="flex-1 sm:col-span-2">
                              <select
                                value={course.grade}
                                onChange={(e) => updateCourse(semester.id, course.id, "grade", e.target.value)}
                                className="w-full px-6 py-5 bg-white/[0.03] border border-white/5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-blue-400 outline-none cursor-pointer hover:bg-white/10 transition-all appearance-none text-center font-bold"
                              >
                                {Object.keys(gradePoints).map(g => <option key={g} value={g} className="bg-[#0f172a] text-white">{g}</option>)}
                              </select>
                            </div>
                            <div className="sm:col-span-1 flex justify-end">
                              <button
                                onClick={() => removeCourse(semester.id, course.id)}
                                className="p-3 text-slate-600 hover:text-blue-500 transition-colors"
                              >
                                <X size={20} />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}

                      <button
                        onClick={() => addCourse(semester.id)}
                        className="w-full py-6 border-2 border-dashed border-white/5 rounded-[2.5rem] text-[10px] font-black uppercase tracking-[0.4em] text-slate-600 hover:border-blue-500/30 hover:text-blue-400 hover:bg-blue-500/[0.02] transition-all flex items-center justify-center gap-4 mt-6 italic"
                      >
                        <Plus size={18} strokeWidth={3} /> Register Further Course
                      </button>
                   </div>
                </div>
              ))}
            </div>

            <button
              onClick={addSemester}
              className="w-full py-12 bg-white text-slate-900 rounded-[3.5rem] font-black uppercase tracking-[0.4em] text-[10px] shadow-3xl transition-all hover:scale-[1.01] active:scale-95 flex items-center justify-center gap-6"
            >
              <Plus size={24} strokeWidth={4} /> Initialize New Academic Semester
            </button>
          </div>

          {/* Stats Sidebar */}
          <div className="lg:col-span-4 space-y-10 lg:sticky lg:top-24">
             {/* Cumulative Dashboard */}
             <div className="bg-[#0f172a] rounded-[3.5rem] border border-white/5 shadow-3xl shadow-black p-12 relative overflow-hidden group">
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-blue-600 rounded-full blur-[100px] opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-1000" />
                
                <div className="relative space-y-12">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex items-center justify-center text-blue-400">
                      <TrendingUp size={22} />
                    </div>
                    <h2 className="text-xl font-black text-white tracking-tighter uppercase italic">Cumulative Engine</h2>
                  </div>

                  <div className="space-y-4">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest text-center sm:text-left">Projected CGPA</p>
                    <p className={`text-8xl sm:text-9xl font-black tracking-tighter text-center sm:text-left italic ${getGradeColor(stats.gpa)}`}>
                      {stats.gpa}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                     <div className="p-8 bg-white/5 rounded-[2.5rem] border border-white/5 text-center sm:text-left">
                        <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-3">Total Load</p>
                        <p className="text-3xl font-black text-white tracking-tighter">{stats.credits} <span className="text-[10px] text-slate-500 font-bold uppercase italic">CR</span></p>
                     </div>
                     <div className="p-8 bg-white/5 rounded-[2.5rem] border border-white/5 text-center sm:text-left overflow-hidden">
                        <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-3">Rank Status</p>
                        <p className={`text-lg sm:text-xl lg:text-3xl font-black text-blue-500 tracking-tighter italic leading-none break-words uppercase`}>
                          {parseFloat(stats.gpa) >= 3.8 ? "DEAN'S LIST" : 
                           parseFloat(stats.gpa) >= 3.5 ? "MAGNA CUM LAUDE" : 
                           parseFloat(stats.gpa) >= 3.2 ? "CUM LAUDE" : 
                           parseFloat(stats.gpa) >= 3.0 ? "MERIT STATUS" :
                           parseFloat(stats.gpa) >= 2.5 ? "STANDARD" :
                           parseFloat(stats.gpa) >= 2.0 ? "MARGINAL" : "PROBATION"}
                        </p>
                     </div>
                  </div>
                </div>
             </div>

             {/* Prediction Engine */}
             <div className="bg-blue-600 rounded-[3.5rem] shadow-3xl p-12 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-full h-full opacity-20 pointer-events-none" 
                     style={{ backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
                
                <div className="relative z-10 space-y-12">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/10 border border-white/20 rounded-2xl flex items-center justify-center text-white">
                      <Zap size={22} />
                    </div>
                    <h2 className="text-xl font-black tracking-tighter uppercase italic">Target Synthesis</h2>
                  </div>

                  <div className="space-y-8">
                    <div className="space-y-6">
                      <div>
                        <label className="text-[9px] font-black text-blue-100 uppercase tracking-[0.3em] mb-3 block pl-2">Desired Final CGPA</label>
                        <input
                          type="number"
                          step="0.01"
                          value={targetCGPA}
                          onChange={(e) => setTargetCGPA(e.target.value)}
                          placeholder={`E.G. ${scale === "4.0" ? "3.75" : "4.50"}`}
                          className="w-full bg-white/10 border border-white/20 rounded-[2rem] px-8 py-6 text-xl font-black outline-none focus:bg-white/20 focus:border-white/40 transition-all text-white placeholder:text-blue-300"
                        />
                      </div>
                      <div>
                        <label className="text-[9px] font-black text-blue-100 uppercase tracking-[0.3em] mb-3 block pl-2">Future Semesters</label>
                        <input
                          type="number"
                          value={remainingSemesters}
                          onChange={(e) => setRemainingSemesters(e.target.value)}
                          className="w-full bg-white/10 border border-white/20 rounded-[2rem] px-8 py-6 text-xl font-black outline-none focus:bg-white/20 focus:border-white/40 transition-all text-white"
                        />
                      </div>
                    </div>

                    <div className="p-10 bg-white text-blue-600 rounded-[3rem] shadow-3xl text-center">
                      <p className="text-[10px] font-black uppercase tracking-[0.4em] mb-4 italic">Required Avg. GPA</p>
                      <p className="text-6xl font-black tracking-tighter italic leading-none">
                        {getTargetRequirement() || "---"}
                      </p>
                    </div>
                  </div>
                </div>
             </div>

             {/* Privacy Vault */}
             <div className="p-10 bg-blue-500/5 rounded-[3rem] border border-blue-500/10 flex items-center gap-6 shadow-2xl">
                <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shadow-sm">
                   <ShieldCheck size={28} />
                </div>
                <div>
                   <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest leading-none mb-1.5 italic">Local Vault Active</p>
                   <p className="text-[10px] font-bold text-slate-500 leading-tight">Data strictly localized to device storage.</p>
                </div>
             </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════
            DOCUMENTATION & FAQ
        ══════════════════════════════════════════ */}
        <div className="mt-40 border-t border-slate-800 pt-40">
          <div className="grid lg:grid-cols-2 gap-24 items-start">
            <div className="space-y-16">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-blue-500/10 rounded-[1.5rem] flex items-center justify-center text-blue-400 border border-blue-500/20">
                  <HelpCircle size={32} />
                </div>
                <div>
                  <h2 className="text-4xl font-black text-white uppercase tracking-tight leading-none italic">Academic <span className="text-blue-400">Intel</span></h2>
                  <p className="text-slate-500 font-bold text-[10px] uppercase tracking-widest mt-2">Protocol Queries</p>
                </div>
              </div>

              <div className="space-y-6">
                {[
                  { q: "Is my academic data secure?", a: "SamToolbox utilizes strictly local browser storage (Vault). Your records never touch any remote database or server thread. Zero telemetry." },
                  { q: "How accurate is the prediction engine?", a: "The synthesis is based on precise mathematical linear regression. Note: Prediction assumes a standard 15-credit load per future semester." },
                  { q: "Will my data persist across sessions?", a: "Yes, data is saved to your browser's local storage. Clearing your cache may reset your vault, so consider manual backups." }
                ].map((faq, i) => (
                  <div key={i} className="p-10 bg-white/5 rounded-[3rem] border border-white/5 hover:border-blue-500/20 transition-all group">
                    <h3 className="font-black text-white text-sm mb-6 flex items-start gap-4">
                      <span className="text-blue-400 font-mono">Q.</span> {faq.q}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed font-medium pl-8 group-hover:text-slate-300 transition-colors">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#0f172a] rounded-[4.5rem] p-16 md:p-24 text-white relative overflow-hidden border border-white/5">
               <div className="absolute top-0 right-0 w-full h-full opacity-[0.03] pointer-events-none" style={{ backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
               <div className="relative z-10 text-center sm:text-left">
                  <div className="w-24 h-24 bg-blue-500/10 border border-blue-500/20 rounded-[2.5rem] flex items-center justify-center mb-12 shadow-[0_0_80px_rgba(37,99,235,0.2)] mx-auto sm:mx-0">
                    <ShieldCheck size={48} className="text-blue-400" />
                  </div>
                  <h3 className="text-4xl font-black mb-10 tracking-tight uppercase leading-[0.9] italic">Sovereign <span className="text-blue-400">Vault.</span></h3>
                  <p className="text-slate-400 font-medium mb-16 leading-relaxed text-xl">
                    Academic Forge operates on a strictly local delivery model. 
                    No signups, no cloud syncing, no data harvesting. 
                    Your performance is your business.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-12">
                     <div className="space-y-4">
                        <div className="text-4xl font-black text-white tracking-tighter italic">VAULT-ON</div>
                        <div className="text-[10px] font-bold text-blue-400 uppercase tracking-[0.3em]">Local Storage</div>
                     </div>
                     <div className="space-y-4">
                        <div className="text-4xl font-black text-white tracking-tighter italic">0-TRACK</div>
                        <div className="text-[10px] font-bold text-blue-400 uppercase tracking-[0.3em]">Zero Surveillance</div>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>

        {/* Explore More Tools */}
        <div className="mt-40 text-center">
           <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mb-10">Access further industrial utilities</p>
           <Link href="/tools" className="inline-flex items-center gap-6 px-20 py-8 bg-white text-slate-900 rounded-[2.5rem] font-black uppercase tracking-widest text-[10px] hover:bg-blue-600 hover:text-white transition-all shadow-3xl group">
             Explore All Systems <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
           </Link>
        </div>
      </section>
    </div>
  );
}
