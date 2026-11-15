"use client";

import { useState, useMemo } from "react";
import jsPDF from "jspdf";
import { GraduationCap, Download, Plus, Trash2, Sparkles, ShieldCheck, ArrowRight, Award } from "lucide-react";

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

const GRADE_POINTS: Record<string, number> = {
  "A+": 4.0, "A": 4.0, "A-": 3.7,
  "B+": 3.3, "B": 3.0, "B-": 2.7,
  "C+": 2.3, "C": 2.0, "C-": 1.7,
  "D+": 1.3, "D": 1.0, "F": 0.0,
};

export default function GpaCalculatorPage() {
  const [scale, setScale] = useState<"4.0" | "5.0">("4.0");
  const [studentName, setStudentName] = useState("Muhammad Ali");
  const [degreeName, setDegreeName] = useState("BS Computer Science");

  const [semesters, setSemesters] = useState<Semester[]>([
    {
      id: "1",
      name: "Semester 1",
      courses: [
        { id: "101", name: "Programming Fundamentals", credits: 4, grade: "A" },
        { id: "102", name: "Calculus & Analytical Geometry", credits: 3, grade: "A-" },
        { id: "103", name: "English Composition", credits: 3, grade: "B+" },
      ],
    },
    {
      id: "2",
      name: "Semester 2",
      courses: [
        { id: "201", name: "Object Oriented Programming", credits: 4, grade: "A" },
        { id: "202", name: "Digital Logic Design", credits: 4, grade: "B+" },
        { id: "203", name: "Discrete Structures", credits: 3, grade: "A" },
      ],
    },
  ]);

  const addSemester = () => {
    setSemesters((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        name: `Semester ${prev.length + 1}`,
        courses: [{ id: Date.now().toString(), name: "Course Subject", credits: 3, grade: "A" }],
      },
    ]);
  };

  const removeSemester = (semId: string) => {
    if (semesters.length > 1) {
      setSemesters((prev) => prev.filter((s) => s.id !== semId));
    }
  };

  const addCourse = (semId: string) => {
    setSemesters((prev) =>
      prev.map((s) =>
        s.id === semId
          ? { ...s, courses: [...s.courses, { id: Date.now().toString(), name: "", credits: 3, grade: "A" }] }
          : s
      )
    );
  };

  const removeCourse = (semId: string, courseId: string) => {
    setSemesters((prev) =>
      prev.map((s) =>
        s.id === semId && s.courses.length > 1
          ? { ...s, courses: s.courses.filter((c) => c.id !== courseId) }
          : s
      )
    );
  };

  const updateCourse = (semId: string, courseId: string, field: keyof Course, value: any) => {
    setSemesters((prev) =>
      prev.map((s) =>
        s.id === semId
          ? {
              ...s,
              courses: s.courses.map((c) => (c.id === courseId ? { ...c, [field]: value } : c)),
            }
          : s
      )
    );
  };

  // Computations
  const stats = useMemo(() => {
    let totalPoints = 0;
    let totalCredits = 0;

    const semesterResults = semesters.map((sem) => {
      let semPoints = 0;
      let semCredits = 0;

      sem.courses.forEach((c) => {
        const base = GRADE_POINTS[c.grade] ?? 0;
        const normalized = scale === "5.0" ? (base / 4.0) * 5.0 : base;
        semPoints += normalized * c.credits;
        semCredits += c.credits;
      });

      totalPoints += semPoints;
      totalCredits += semCredits;

      return {
        id: sem.id,
        name: sem.name,
        gpa: semCredits > 0 ? (semPoints / semCredits).toFixed(2) : "0.00",
        credits: semCredits,
      };
    });

    const cgpa = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : "0.00";

    return {
      semesterResults,
      cgpa,
      totalCredits,
    };
  }, [semesters, scale]);

  const downloadTranscriptPDF = () => {
    const doc = new jsPDF({ orientation: "portrait", unit: "pt", format: "a4" });

    // Top Header Banner
    doc.setFillColor(229, 50, 45);
    doc.rect(0, 0, 595, 90, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.text("ACADEMIC TRANSCRIPT REPORT", 40, 48);

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Official GPA / CGPA Summary (Scale ${scale})`, 40, 70);

    // Student Info
    doc.setTextColor(30, 41, 59);
    doc.setFontSize(10);
    doc.text(`Student: ${studentName}`, 40, 120);
    doc.text(`Program: ${degreeName}`, 40, 136);
    doc.text(`Date of Issue: ${new Date().toLocaleDateString("en-GB")}`, 400, 120);
    doc.text(`Cumulative Credits: ${stats.totalCredits}`, 400, 136);

    let y = 165;
    semesters.forEach((sem, sIdx) => {
      if (y > 700) {
        doc.addPage();
        y = 50;
      }

      const semStat = stats.semesterResults[sIdx];
      doc.setFillColor(248, 250, 252);
      doc.rect(40, y, 515, 22, "F");

      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.setTextColor(15, 23, 42);
      doc.text(sem.name, 48, y + 15);
      doc.text(`Semester GPA: ${semStat.gpa}  |  Credits: ${semStat.credits}`, 390, y + 15);

      y += 32;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(71, 85, 105);

      sem.courses.forEach((c) => {
        doc.text(c.name || "Course Subject", 55, y);
        doc.text(`${c.credits} Cr`, 390, y);
        doc.text(`Grade: ${c.grade}`, 480, y);
        y += 18;
      });

      y += 12;
    });

    // Grand CGPA Highlight Box
    doc.setFillColor(254, 242, 242);
    doc.roundedRect(40, y + 10, 515, 45, 6, 6, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(229, 50, 45);
    doc.text(`CUMULATIVE CGPA: ${stats.cgpa} / ${scale}`, 55, y + 38);
    doc.text(`Total Credit Hours: ${stats.totalCredits}`, 390, y + 38);

    doc.save(`academic-transcript-${stats.cgpa}CGPA.pdf`);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-100 text-[#e5322d] text-xs font-bold mb-4">
          <GraduationCap className="w-3.5 h-3.5" />
          Academic Performance Suite
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-3">
          GPA & CGPA Transcript Calculator
        </h1>
        <p className="text-slate-600 text-sm leading-relaxed">
          Multi-semester GPA and CGPA tracker with honors estimation, semester-wise credit weights, and downloadable academic transcript.
        </p>
      </div>

      {/* Top Banner Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm text-center">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Cumulative CGPA</span>
          <div className="text-4xl font-black text-[#e5322d] mt-2 mb-1">{stats.cgpa}</div>
          <span className="text-xs text-slate-500">Out of {scale} Scale</span>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm text-center">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total Credit Hours</span>
          <div className="text-4xl font-black text-slate-900 mt-2 mb-1">{stats.totalCredits}</div>
          <span className="text-xs text-slate-500">{semesters.length} Semesters Recorded</span>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm text-center flex flex-col justify-center">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Graduation Standing</span>
          <div className="text-2xl font-black text-emerald-600 mt-2 mb-1">
            {parseFloat(stats.cgpa) >= (scale === "5.0" ? 4.5 : 3.5) ? "Summa Cum Laude" : parseFloat(stats.cgpa) >= (scale === "5.0" ? 4.0 : 3.0) ? "Honors First Class" : "Good Standing"}
          </div>
          <span className="text-xs text-slate-500">Academic Merit Status</span>
        </div>
      </div>

      {/* Student Details & Scale Options */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm mb-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Student Name</label>
          <input
            type="text"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl font-bold"
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Degree / Program</label>
          <input
            type="text"
            value={degreeName}
            onChange={(e) => setDegreeName(e.target.value)}
            className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl font-bold"
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Grading Scale</label>
          <select
            value={scale}
            onChange={(e) => setScale(e.target.value as any)}
            className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl font-bold"
          >
            <option value="4.0">4.0 Scale (Pakistan, US, Global Standard)</option>
            <option value="5.0">5.0 Scale (Saudi Arabia, Singapore, Germany)</option>
          </select>
        </div>
      </div>

      {/* Semesters & Courses Container */}
      <div className="space-y-6">
        {semesters.map((sem, sIdx) => {
          const semStat = stats.semesterResults[sIdx];
          return (
            <div key={sem.id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <h3 className="text-base font-bold text-slate-900">{sem.name}</h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-red-50 text-[#e5322d] text-xs font-bold">
                    GPA: {semStat.gpa} ({semStat.credits} Credits)
                  </span>
                </div>
                {semesters.length > 1 && (
                  <button
                    onClick={() => removeSemester(sem.id)}
                    className="text-xs text-slate-400 hover:text-red-500 flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Remove Semester
                  </button>
                )}
              </div>

              {/* Courses List */}
              <div className="space-y-3">
                {sem.courses.map((course) => (
                  <div key={course.id} className="grid grid-cols-12 gap-2 items-center">
                    <input
                      type="text"
                      placeholder="Course Subject / Title"
                      value={course.name}
                      onChange={(e) => updateCourse(sem.id, course.id, "name", e.target.value)}
                      className="col-span-6 p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl font-medium"
                    />
                    <select
                      value={course.credits}
                      onChange={(e) => updateCourse(sem.id, course.id, "credits", parseInt(e.target.value, 10))}
                      className="col-span-2 p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl font-medium text-center"
                    >
                      <option value={1}>1 Credit</option>
                      <option value={2}>2 Credits</option>
                      <option value={3}>3 Credits</option>
                      <option value={4}>4 Credits</option>
                      <option value={5}>5 Credits</option>
                    </select>
                    <select
                      value={course.grade}
                      onChange={(e) => updateCourse(sem.id, course.id, "grade", e.target.value)}
                      className="col-span-3 p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl font-bold"
                    >
                      {Object.keys(GRADE_POINTS).map((g) => (
                        <option key={g} value={g}>{g} ({GRADE_POINTS[g].toFixed(1)})</option>
                      ))}
                    </select>
                    <button
                      onClick={() => removeCourse(sem.id, course.id)}
                      className="col-span-1 p-2 text-slate-400 hover:text-red-500 rounded-lg flex items-center justify-center cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => addCourse(sem.id)}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Course
                </button>
              </div>
            </div>
          );
        })}

        <div className="flex flex-wrap items-center justify-between gap-4 pt-4">
          <button
            onClick={addSemester}
            className="px-6 py-3.5 bg-white border border-slate-200 hover:border-slate-300 text-slate-800 font-bold text-xs rounded-2xl shadow-sm flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4 text-[#e5322d]" /> Add New Semester
          </button>

          <button
            onClick={downloadTranscriptPDF}
            className="px-8 py-3.5 bg-[#e5322d] hover:bg-[#cc241f] text-white font-bold text-xs rounded-2xl shadow-lg shadow-red-500/25 flex items-center gap-2 cursor-pointer"
          >
            <Download className="w-4 h-4" /> Download Academic Transcript (PDF)
          </button>
        </div>
      </div>
    </div>
  );
}
