"use client";

import { useState, useMemo } from "react";
import jsPDF from "jspdf";
import { Download, Calendar, Sparkles, Gift } from "lucide-react";

export default function AgeCalculatorPage() {
  const [birthDate, setBirthDate] = useState("2000-01-15");
  const [targetDate, setTargetDate] = useState(new Date().toISOString().split("T")[0]);

  const age = useMemo(() => {
    const start = new Date(birthDate);
    const end = new Date(targetDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime()) || start > end) {
      return { years: 0, months: 0, days: 0, totalDays: 0, totalWeeks: 0, nextBirthdayDays: 0, nextDayName: "" };
    }

    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
    let days = end.getDate() - start.getDate();

    if (days < 0) {
      months -= 1;
      const prevMonthLastDay = new Date(end.getFullYear(), end.getMonth(), 0).getDate();
      days += prevMonthLastDay;
    }

    if (months < 0) {
      years -= 1;
      months += 12;
    }

    const diffMs = end.getTime() - start.getTime();
    const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);

    // Next Birthday
    const thisYearBday = new Date(end.getFullYear(), start.getMonth(), start.getDate());
    if (thisYearBday < end) {
      thisYearBday.setFullYear(end.getFullYear() + 1);
    }
    const nextBdayMs = thisYearBday.getTime() - end.getTime();
    const nextBirthdayDays = Math.ceil(nextBdayMs / (1000 * 60 * 60 * 24));
    const nextDayName = thisYearBday.toLocaleDateString("en-US", { weekday: "long" });

    return {
      years,
      months,
      days,
      totalDays,
      totalWeeks,
      nextBirthdayDays,
      nextDayName,
    };
  }, [birthDate, targetDate]);

  const downloadPDF = () => {
    const doc = new jsPDF({ orientation: "portrait", unit: "pt", format: "a4" });

    doc.setFillColor(229, 50, 45);
    doc.rect(0, 0, 595, 80, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("OFFICIAL AGE VERIFICATION CERTIFICATE", 40, 45);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Biometric Chronological Age Assessment`, 40, 65);

    doc.setTextColor(30, 41, 59);
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Age Breakdown & Milestones", 40, 120);

    doc.setDrawColor(226, 232, 240);
    doc.setFillColor(248, 250, 252);
    doc.roundedRect(40, 135, 515, 180, 6, 6, "FD");

    const rows = [
      ["Date of Birth", birthDate],
      ["Assessment Date (As of)", targetDate],
      ["Chronological Exact Age", `${age.years} Years, ${age.months} Months, ${age.days} Days`],
      ["Total Lifespan in Days", `${age.totalDays.toLocaleString()} Days`],
      ["Total Weeks Lived", `${age.totalWeeks.toLocaleString()} Weeks`],
      ["Next Birthday In", `${age.nextBirthdayDays} Days (on a ${age.nextDayName})`],
    ];

    let y = 165;
    rows.forEach(([label, val], idx) => {
      doc.setFont("helvetica", idx === 2 ? "bold" : "normal");
      doc.setFontSize(idx === 2 ? 11 : 9);
      doc.setTextColor(idx === 2 ? 229 : 71, idx === 2 ? 50 : 85, idx === 2 ? 45 : 105);
      doc.text(label, 55, y);
      doc.text(val, 535, y, { align: "right" });
      y += 24;
    });

    doc.save(`age-certificate-${birthDate}.pdf`);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-100 text-[#e5322d] text-xs font-bold mb-4">
          <Calendar className="w-3.5 h-3.5" />
          Chronological Age Standard
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-3">
          Age & Date Difference Calculator
        </h1>
        <p className="text-slate-600 text-sm leading-relaxed">
          Compute your exact chronological age in years, months, days, and total lifespan hours with upcoming birthday countdown.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Date of Birth</label>
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="w-full p-3 text-sm bg-slate-50 border border-slate-300 rounded-xl font-bold"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Calculate Age As Of</label>
            <input
              type="date"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              className="w-full p-3 text-sm bg-slate-50 border border-slate-300 rounded-xl font-bold"
            />
          </div>
        </div>

        {/* Age Result */}
        <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Exact Chronological Age</span>
          <div className="text-3xl sm:text-5xl font-black text-[#e5322d] mt-2 mb-2">
            {age.years} <span className="text-lg text-slate-700">Years</span> {age.months} <span className="text-lg text-slate-700">Months</span> {age.days} <span className="text-lg text-slate-700">Days</span>
          </div>
          <p className="text-xs text-slate-500">
            Total lived: <strong>{age.totalDays.toLocaleString()}</strong> days ({age.totalWeeks.toLocaleString()} weeks)
          </p>
        </div>

        {/* Milestone Card */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-6 bg-white border border-slate-200 rounded-2xl flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
              <Gift className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase">Next Birthday</span>
              <p className="text-base font-bold text-slate-800">{age.nextBirthdayDays} Days Remaining</p>
              <span className="text-[11px] text-slate-500">Will be on a {age.nextDayName}</span>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <button
              onClick={downloadPDF}
              className="w-full py-4 bg-[#e5322d] hover:bg-[#cc241f] text-white font-bold text-xs rounded-xl shadow-lg shadow-red-500/25 flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              <Download className="w-4 h-4" />
              Download Official Age Certificate (PDF)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
