"use client";

import { useState, useMemo } from "react";
import jsPDF from "jspdf";
import { GraduationCap, Download, CheckCircle2, Sparkles, BookOpen } from "lucide-react";

export default function UniversityMeritCalculatorPage() {
  const [university, setUniversity] = useState<"nust" | "fast" | "mdcat" | "uet" | "comsats" | "custom">("nust");

  const [matricObtained, setMatricObtained] = useState(1020);
  const [matricTotal, setMatricTotal] = useState(1100);

  const [fscObtained, setFscObtained] = useState(480);
  const [fscTotal, setFscTotal] = useState(550);

  const [testObtained, setTestObtained] = useState(152);
  const [testTotal, setTestTotal] = useState(200);

  // Weightages for preset universities
  const weights = useMemo(() => {
    switch (university) {
      case "nust":
        return { matric: 0.10, fsc: 0.15, test: 0.75, name: "NUST (NET Standard)" };
      case "fast":
        return { matric: 0.10, fsc: 0.40, test: 0.50, name: "FAST-NUCES (NU Test)" };
      case "mdcat":
        return { matric: 0.10, fsc: 0.40, test: 0.50, name: "MDCAT / NUMS (Medical Colleges)" };
      case "uet":
        return { matric: 0.25, fsc: 0.45, test: 0.30, name: "UET Lahore (ECAT Standard)" };
      case "comsats":
        return { matric: 0.10, fsc: 0.40, test: 0.50, name: "COMSATS University (NTS NAT)" };
      default:
        return { matric: 0.10, fsc: 0.40, test: 0.50, name: "Custom University Policy" };
    }
  }, [university]);

  const aggregate = useMemo(() => {
    const matricPct = matricTotal > 0 ? (matricObtained / matricTotal) * 100 : 0;
    const fscPct = fscTotal > 0 ? (fscObtained / fscTotal) * 100 : 0;
    const testPct = testTotal > 0 ? (testObtained / testTotal) * 100 : 0;

    const aggregateVal = (matricPct * weights.matric) + (fscPct * weights.fsc) + (testPct * weights.test);

    return {
      matricPct: matricPct.toFixed(2),
      fscPct: fscPct.toFixed(2),
      testPct: testPct.toFixed(2),
      total: aggregateVal.toFixed(3),
    };
  }, [matricObtained, matricTotal, fscObtained, fscTotal, testObtained, testTotal, weights]);

  const downloadReport = () => {
    const doc = new jsPDF({ orientation: "portrait", unit: "pt", format: "a4" });

    doc.setFillColor(229, 50, 45);
    doc.rect(0, 0, 595, 80, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("UNIVERSITY ADMISSION AGGREGATE", 40, 45);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Official Academic Calculation for ${weights.name}`, 40, 65);

    doc.setTextColor(30, 41, 59);
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Student Scores & Weightage Distribution", 40, 120);

    doc.setDrawColor(226, 232, 240);
    doc.setFillColor(248, 250, 252);
    doc.roundedRect(40, 135, 515, 240, 8, 8, "FD");

    const rows = [
      ["Target University / System", weights.name],
      ["Matric / O-Level Score", `${matricObtained} / ${matricTotal} (${aggregate.matricPct}%) — Weight: ${weights.matric * 100}%`],
      ["FSc / A-Level / HSSC Score", `${fscObtained} / ${fscTotal} (${aggregate.fscPct}%) — Weight: ${weights.fsc * 100}%`],
      ["Entry Test Score (NET/MDCAT/ECAT)", `${testObtained} / ${testTotal} (${aggregate.testPct}%) — Weight: ${weights.test * 100}%`],
      ["FINAL COMPUTED AGGREGATE", `${aggregate.total}%`],
    ];

    let y = 170;
    rows.forEach(([label, val], idx) => {
      doc.setFont("helvetica", idx === 4 ? "bold" : "normal");
      doc.setFontSize(idx === 4 ? 12 : 10);
      doc.setTextColor(idx === 4 ? 229 : 71, idx === 4 ? 50 : 85, idx === 4 ? 45 : 105);
      doc.text(label, 60, y);
      doc.text(val, 530, y, { align: "right" });

      if (idx < rows.length - 1) {
        doc.setDrawColor(241, 245, 249);
        doc.line(60, y + 8, 535, y + 8);
      }
      y += 32;
    });

    doc.save(`merit-aggregate-${weights.name.split(" ")[0].toLowerCase()}.pdf`);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-100 text-[#e5322d] text-xs font-bold mb-4">
          <GraduationCap className="w-3.5 h-3.5" />
          Pakistani Universities & Medical Colleges
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-3">
          University Merit & Aggregate Calculator
        </h1>
        <p className="text-slate-600 text-sm leading-relaxed">
          Calculate your admission aggregate for NUST, FAST, MDCAT/NUMS, UET, GIKI, and COMSATS using official weightage criteria.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Controls */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Select University / Program
            </label>
            <select
              value={university}
              onChange={(e) => setUniversity(e.target.value as any)}
              className="w-full p-3 text-xs bg-slate-50 border border-slate-300 rounded-xl font-bold text-slate-800"
            >
              <option value="nust">NUST (NET: 75%, FSc: 15%, Matric: 10%)</option>
              <option value="fast">FAST-NUCES (NU Test: 50%, FSc: 40%, Matric: 10%)</option>
              <option value="mdcat">MDCAT / NUMS (Medical: 50%, FSc: 40%, Matric: 10%)</option>
              <option value="uet">UET Lahore (ECAT: 30%, FSc: 45%, Matric: 25%)</option>
              <option value="comsats">COMSATS (NTS NAT: 50%, FSc: 40%, Matric: 10%)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Matric / O-Level Marks
            </label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                placeholder="Obtained"
                value={matricObtained}
                onChange={(e) => setMatricObtained(parseInt(e.target.value, 10) || 0)}
                className="p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-lg font-semibold"
              />
              <input
                type="number"
                placeholder="Total"
                value={matricTotal}
                onChange={(e) => setMatricTotal(parseInt(e.target.value, 10) || 0)}
                className="p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-lg font-semibold"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              FSc / HSSC / A-Level Marks
            </label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                placeholder="Obtained"
                value={fscObtained}
                onChange={(e) => setFscObtained(parseInt(e.target.value, 10) || 0)}
                className="p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-lg font-semibold"
              />
              <input
                type="number"
                placeholder="Total"
                value={fscTotal}
                onChange={(e) => setFscTotal(parseInt(e.target.value, 10) || 0)}
                className="p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-lg font-semibold"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Entry Test Marks (NET / MDCAT / ECAT / NTS)
            </label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                placeholder="Obtained"
                value={testObtained}
                onChange={(e) => setTestObtained(parseInt(e.target.value, 10) || 0)}
                className="p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-lg font-semibold"
              />
              <input
                type="number"
                placeholder="Total"
                value={testTotal}
                onChange={(e) => setTestTotal(parseInt(e.target.value, 10) || 0)}
                className="p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-lg font-semibold"
              />
            </div>
          </div>

          <button
            onClick={downloadReport}
            className="w-full py-4 bg-[#e5322d] hover:bg-[#cc241f] text-white font-bold text-sm rounded-xl shadow-lg shadow-red-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Download className="w-4 h-4" />
            Download Merit Certificate (PDF)
          </button>
        </div>

        {/* Results */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm text-center">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Total Admission Aggregate
            </span>
            <div className="text-5xl font-black text-[#e5322d] mt-2 mb-2">
              {aggregate.total}%
            </div>
            <p className="text-xs text-slate-500">
              Computed under {weights.name} admission criteria
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 text-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Matric %</span>
              <p className="text-lg font-black text-slate-800 mt-1">{aggregate.matricPct}%</p>
              <span className="text-[10px] text-slate-400">Weight: {weights.matric * 100}%</span>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-200 text-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase">FSc %</span>
              <p className="text-lg font-black text-slate-800 mt-1">{aggregate.fscPct}%</p>
              <span className="text-[10px] text-slate-400">Weight: {weights.fsc * 100}%</span>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-200 text-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Entry Test %</span>
              <p className="text-lg font-black text-slate-800 mt-1">{aggregate.testPct}%</p>
              <span className="text-[10px] text-slate-400">Weight: {weights.test * 100}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
