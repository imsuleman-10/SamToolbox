"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Calculator, GraduationCap, TrendingUp, X, Zap, HelpCircle, BookOpen } from "lucide-react";

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
  "A+": 4.0,
  "A": 4.0,
  "A-": 3.67,
  "B+": 3.33,
  "B": 3.0,
  "B-": 2.67,
  "C+": 2.33,
  "C": 2.0,
  "C-": 1.67,
  "D+": 1.33,
  "D": 1.0,
  "F": 0.0,
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

  const [scale, setScale] = useState<"4.0" | "5.0" | "100">("4.0");
  const [targetCGPA, setTargetCGPA] = useState<string>("");
  const [remainingSemesters, setRemainingSemesters] = useState<string>("1");

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
    // Assuming each remaining semester has roughly 15 credits
    const estimatedRemainingCredits = remaining * 15;
    const totalCredits = currentCredits + estimatedRemainingCredits;
    
    const requiredPoints = (target * totalCredits) - (currentCGPA * currentCredits);
    const requiredGPA = requiredPoints / estimatedRemainingCredits;

    if (requiredGPA > parseFloat(scale)) return "IMPOSSIBLE";
    if (requiredGPA < 0) return "ALREADY ACHIEVED";
    return requiredGPA.toFixed(2);
  };

  const getGradeColor = (gpa: string) => {
    const num = parseFloat(gpa);
    const max = parseFloat(scale);
    if (num >= max * 0.875) return "text-emerald-500";
    if (num >= max * 0.75) return "text-blue-500";
    if (num >= max * 0.5) return "text-amber-500";
    return "text-red-500";
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      {/* Dynamic Background Effect */}
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(45%_45%_at_50%_50%,rgba(99,102,241,0.03)_0%,transparent_100%)] pointer-events-none" />

      {/* Header & Configuration */}
      <div className="flex flex-col xl:flex-row items-start xl:items-end justify-between gap-8 mb-12 sm:mb-16">
        <div className="space-y-4 w-full sm:w-auto text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-[10px] font-black uppercase tracking-[0.2em] border border-indigo-100">
            <Calculator size={12} />
            <span>Academic Performance Suite</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tighter leading-none">
            GPA <span className="text-indigo-600">Forge</span>
          </h1>
          <p className="text-sm sm:text-slate-500 font-medium max-w-md mx-auto sm:mx-0">
            The ultimate grade tracking and prediction engine for university students. Secure, offline, and professional.
          </p>
        </div>

        <div className="w-full sm:w-auto flex flex-wrap sm:flex-nowrap gap-4 p-4 bg-white rounded-2xl sm:rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex-1 sm:flex-initial">
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1 text-center sm:text-left">Grading Scale</label>
            <div className="flex gap-2">
              {["4.0", "5.0"].map((s) => (
                <button
                  key={s}
                  onClick={() => setScale(s as any)}
                  className={`flex-1 sm:flex-initial px-4 sm:px-6 py-2.5 rounded-xl text-[10px] sm:text-xs font-black uppercase tracking-widest transition-all ${scale === s ? "bg-slate-900 text-white" : "bg-slate-50 text-slate-400 hover:bg-slate-100"}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <button 
            onClick={() => {
              if(confirm("Clear all academic data?")) {
                setSemesters([{ id: "1", name: "Semester 1", courses: [{ id: "1", name: "", credits: 3, grade: "A" }] }]);
                localStorage.removeItem("samtoolbox-gpa-data");
              }
            }}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-[10px] sm:text-xs font-black uppercase tracking-widest bg-red-50 text-red-600 hover:bg-red-100 transition-all self-end"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="grid xl:grid-cols-12 gap-8 items-start">
        {/* Left Column: Input */}
        <div className="xl:col-span-8 space-y-8">
          {semesters.map((semester) => (
            <div key={semester.id} className="group relative">
               <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-[2.5rem] blur opacity-0 group-hover:opacity-10 transition duration-500" />
               <div className="relative bg-white rounded-[2.5rem] border border-slate-100 shadow-xl overflow-hidden">
                {/* Semester Header */}
                <div className="bg-slate-50/50 px-4 sm:px-8 py-4 sm:py-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3 sm:gap-4 overflow-hidden">
                    <input
                      type="text"
                      value={semester.name}
                      onChange={(e) => setSemesters(semesters.map(s => s.id === semester.id ? { ...s, name: e.target.value } : s))}
                      className="bg-transparent border-none outline-none text-base sm:text-lg font-black text-slate-900 tracking-tight w-32 sm:w-40"
                    />
                    <div className="h-4 w-px bg-slate-200 shrink-0" />
                    <div className="flex items-center gap-2 shrink-0">
                       <span className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest">GPA</span>
                       <span className={`text-lg sm:text-xl font-black ${getGradeColor(calculateSemesterGPA(semester))}`}>
                        {calculateSemesterGPA(semester)}
                       </span>
                    </div>
                  </div>
                  {semesters.length > 1 && (
                    <button
                      onClick={() => removeSemester(semester.id)}
                      className="sm:p-2 rounded-xl text-red-400 sm:text-slate-300 hover:bg-red-50 sm:hover:text-red-500 transition-all flex items-center gap-2 text-[10px] font-black uppercase tracking-widest sm:normal-case"
                    >
                      <Trash2 size={16} /> <span className="sm:hidden">Remove Semester</span>
                    </button>
                  )}
                </div>

                {/* Course List */}
                <div className="p-4 sm:p-8 space-y-4">
                  {semester.courses.map((course) => (
                    <div key={course.id} className="flex flex-col sm:grid sm:grid-cols-12 gap-3 sm:gap-4 items-center animate-in fade-in slide-in-from-left-2 duration-300 bg-slate-50/30 sm:bg-transparent p-3 sm:p-0 rounded-2xl border border-slate-100 sm:border-none">
                      <div className="w-full sm:col-span-6 lg:col-span-7">
                        <input
                          type="text"
                          value={course.name}
                          onChange={(e) => updateCourse(semester.id, course.id, "name", e.target.value)}
                          placeholder="COURSE NAME (E.G. DATA STRUCTURES)"
                          className="w-full px-4 sm:px-5 py-3 sm:py-3.5 bg-white sm:bg-slate-50 border border-slate-100 rounded-xl sm:rounded-2xl text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-slate-700 focus:bg-white focus:ring-4 focus:ring-indigo-500/5 outline-none transition-all placeholder:text-slate-300"
                        />
                      </div>
                      <div className="w-full flex gap-3 sm:contents">
                        <div className="flex-1 sm:col-span-3 lg:col-span-2">
                           <select
                            value={course.credits}
                            onChange={(e) => updateCourse(semester.id, course.id, "credits", parseInt(e.target.value))}
                            className="w-full px-3 sm:px-4 py-3 sm:py-3.5 bg-white sm:bg-slate-50 border border-slate-100 rounded-xl sm:rounded-2xl text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-slate-600 outline-none cursor-pointer hover:bg-slate-100"
                          >
                            {[1, 2, 3, 4, 5, 6].map(c => <option key={c} value={c}>{c} CR</option>)}
                          </select>
                        </div>
                        <div className="flex-1 sm:col-span-2 lg:col-span-2">
                          <select
                            value={course.grade}
                            onChange={(e) => updateCourse(semester.id, course.id, "grade", e.target.value)}
                            className="w-full px-3 sm:px-4 py-3 sm:py-3.5 bg-white sm:bg-slate-50 border border-slate-100 rounded-xl sm:rounded-2xl text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-indigo-600 outline-none cursor-pointer hover:bg-slate-100"
                          >
                            {Object.keys(gradePoints).map(g => <option key={g} value={g}>{g}</option>)}
                          </select>
                        </div>
                        <div className="sm:col-span-1 flex justify-end">
                          <button
                            onClick={() => removeCourse(semester.id, course.id)}
                            className="p-2 bg-red-50 sm:bg-transparent rounded-lg text-red-400 sm:text-slate-200 hover:text-red-500 transition-colors"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                  <button
                    onClick={() => addCourse(semester.id)}
                    className="w-full py-4 border-2 border-dashed border-slate-100 rounded-xl sm:rounded-[1.5rem] text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:border-indigo-200 hover:text-indigo-600 hover:bg-indigo-50/50 transition-all flex items-center justify-center gap-2 mt-4"
                  >
                    <Plus size={14} /> Add New Course
                  </button>
                </div>
              </div>
            </div>
          ))}

          <button
            onClick={addSemester}
            className="w-full py-8 bg-slate-900 text-white rounded-[2.5rem] font-black uppercase tracking-[0.3em] text-xs shadow-2xl transition-all hover:scale-[1.01] hover:bg-slate-800 active:scale-95 flex items-center justify-center gap-4"
          >
            <Plus size={18} strokeWidth={3} /> Register New Semester
          </button>
        </div>

        {/* Right Column: Analytics */}
        <div className="xl:col-span-4 space-y-8 sticky top-8">
           {/* Main Result Card */}
           <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-2xl p-10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-indigo-600 rounded-full blur-[100px] opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-700" />
              
              <div className="relative space-y-8">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-50 rounded-xl text-indigo-600">
                    <TrendingUp size={20} />
                  </div>
                  <h2 className="text-xl font-black text-slate-900 tracking-tight">Cumulative Stats</h2>
                </div>

                <div className="space-y-1">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Projected CGPA</p>
                  <p className={`text-7xl font-black tracking-tighter ${getGradeColor(stats.gpa)}`}>
                    {stats.gpa}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                   <div className="p-4 bg-slate-50 rounded-2xl">
                      <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Credits</p>
                      <p className="text-lg font-black text-slate-800">{stats.credits}</p>
                   </div>
                   <div className="p-4 bg-slate-50 rounded-2xl">
                      <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Rank Status</p>
                      <p className="text-lg font-black text-slate-800">
                        {parseFloat(stats.gpa) >= 3.5 ? "HONORS" : parseFloat(stats.gpa) >= 3.0 ? "EXCEL" : "STABLE"}
                      </p>
                   </div>
                </div>
              </div>
           </div>

           {/* Prediction Engine */}
           <div className="bg-slate-900 rounded-[2.5rem] shadow-2xl p-10 text-white">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-white/10 rounded-xl text-indigo-400">
                  <Zap size={20} />
                </div>
                <h2 className="text-xl font-black tracking-tight">Target Prediction</h2>
              </div>

              <div className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-[9px] font-black text-indigo-300 uppercase tracking-widest mb-2 block">Desired Final CGPA</label>
                    <input
                      type="number"
                      step="0.01"
                      value={targetCGPA}
                      onChange={(e) => setTargetCGPA(e.target.value)}
                      placeholder={`E.G. ${scale === "4.0" ? "3.75" : "4.50"}`}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm font-bold outline-none focus:bg-white/10 transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] font-black text-indigo-300 uppercase tracking-widest mb-2 block">Semesters Remaining</label>
                    <input
                      type="number"
                      value={remainingSemesters}
                      onChange={(e) => setRemainingSemesters(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm font-bold outline-none focus:bg-white/10 transition-all"
                    />
                  </div>
                </div>

                <div className="p-6 bg-indigo-600 rounded-[1.5rem] shadow-xl">
                  <p className="text-[10px] font-black text-indigo-100 uppercase tracking-widest mb-2 text-center">Required Avg. GPA</p>
                  <p className="text-4xl font-black text-center tracking-tight">
                    {getTargetRequirement() || "---"}
                  </p>
                  {getTargetRequirement() === "IMPOSSIBLE" && (
                    <p className="text-[8px] font-black text-indigo-200 mt-2 text-center uppercase tracking-widest">Adjust target or semesters</p>
                  )}
                </div>
              </div>
           </div>

           {/* Privacy Note */}
           <div className="px-6 py-4 bg-emerald-50 rounded-3xl border border-emerald-100 flex items-center gap-4">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <p className="text-[10px] font-bold text-emerald-800 uppercase tracking-tight">
                Data securely saved in local vault
              </p>
           </div>
        </div>
      </div>

      {/* Information Section */}
      <div className="mt-20 grid lg:grid-cols-2 gap-12 border-t border-slate-100 pt-16">
        <div className="space-y-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-indigo-50 rounded-xl text-indigo-600">
              <BookOpen size={20} />
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Academic Protocol</h2>
          </div>
          
          <div className="space-y-6">
            {[
              { step: "01", title: "Configuration", desc: "Select your university's grading scale (4.0 or 5.0). This sets the baseline for all subsequent calculations." },
              { step: "02", title: "Data Entry", desc: "Input your courses for each semester. Enter credits and the grade earned. The GPA updates in real-time." },
              { step: "03", title: "Global Analysis", desc: "Monitor your Cumulative GPA in the analytics panel. This tracks your overall performance across all registered semesters." },
              { step: "04", title: "Future Prediction", desc: "Set a target CGPA and enter your remaining semesters. The engine will calculate the exact GPA required to hit your goal." }
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
            <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Performance FAQ</h2>
          </div>

          <div className="space-y-4">
            {[
              { q: "Is my academic record private?", a: "Yes. SamToolbox utilizes 'Vault' technology (Local Storage). Your grades are never transmitted to any server or database." },
              { q: "How accurate is the prediction engine?", a: "It uses precise linear regression based on your remaining credits. Note: It assumes an average of 15 credits per future semester." },
              { q: "Can I use this for non-4.0 scales?", a: "Currently, we support 4.0 and 5.0 scales. For percentage-based systems, we recommend using the 100-point mapping coming in v6.0." },
              { q: "What happens if I clear my cache?", a: "Browser data clearing may remove your saved grades. We recommend taking a screenshot or manual backup for long-term records." }
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
  );
}
