"use client";

import { useState, useMemo } from "react";
import jsPDF from "jspdf";
import { Download, TrendingUp, Sparkles, DollarSign } from "lucide-react";

export default function CompoundInterestPage() {
  const [initialDeposit, setInitialDeposit] = useState<number>(500000);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(25000);
  const [annualRate, setAnnualRate] = useState<number>(12); // 12% mutual funds / stock index
  const [years, setYears] = useState<number>(10);

  const investment = useMemo(() => {
    const P = initialDeposit;
    const PMT = monthlyContribution;
    const r = annualRate / 100;
    const n = 12; // monthly compounding
    const t = years;

    const futureValueP = P * Math.pow(1 + r / n, n * t);
    const futureValuePMT = PMT * ((Math.pow(1 + r / n, n * t) - 1) / (r / n));
    const totalFutureValue = Math.round(futureValueP + futureValuePMT);

    const totalInvested = Math.round(P + PMT * 12 * t);
    const totalInterestEarned = totalFutureValue - totalInvested;

    return {
      totalFutureValue,
      totalInvested,
      totalInterestEarned,
      multiplier: (totalFutureValue / totalInvested).toFixed(1),
    };
  }, [initialDeposit, monthlyContribution, annualRate, years]);

  const downloadReport = () => {
    const doc = new jsPDF({ orientation: "portrait", unit: "pt", format: "a4" });

    doc.setFillColor(229, 50, 45);
    doc.rect(0, 0, 595, 80, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("WEALTH COMPOUNDING PROJECTION", 40, 45);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Long-Term Capital Accumulation Strategy (${annualRate}% p.a. Return)`, 40, 65);

    doc.setTextColor(30, 41, 59);
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Portfolio Growth & Compounding Results", 40, 120);

    doc.setDrawColor(226, 232, 240);
    doc.setFillColor(248, 250, 252);
    doc.roundedRect(40, 135, 515, 160, 6, 6, "FD");

    const rows = [
      ["Initial Starting Capital", `PKR ${initialDeposit.toLocaleString()}`],
      ["Monthly Systematic Contribution", `PKR ${monthlyContribution.toLocaleString()}`],
      ["Expected Annualized Return", `${annualRate}% per annum`],
      ["Investment Time Horizon", `${years} Years (${years * 12} Months)`],
      ["Total Principal Deposited", `PKR ${investment.totalInvested.toLocaleString()}`],
      ["Total Compound Interest Earned", `PKR ${investment.totalInterestEarned.toLocaleString()}`],
      ["PROJECTED WEALTH PORTFOLIO", `PKR ${investment.totalFutureValue.toLocaleString()}`],
    ];

    let y = 158;
    rows.forEach(([label, val], idx) => {
      doc.setFont("helvetica", idx === 6 ? "bold" : "normal");
      doc.setFontSize(idx === 6 ? 11 : 9);
      doc.setTextColor(idx === 6 ? 229 : 71, idx === 6 ? 50 : 85, idx === 6 ? 45 : 105);
      doc.text(label, 55, y);
      doc.text(val, 535, y, { align: "right" });
      y += 18;
    });

    doc.save(`wealth-projection-${years}years.pdf`);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-100 text-[#e5322d] text-xs font-bold mb-4">
          <TrendingUp className="w-3.5 h-3.5" />
          Investment & Portfolio Engine
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-3">
          Compound Interest & Wealth Planner
        </h1>
        <p className="text-slate-600 text-sm leading-relaxed">
          Simulate exponential portfolio growth with recurring monthly contributions and compound interest over time.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Inputs */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
              Initial Principal Deposit (PKR)
            </label>
            <input
              type="number"
              step="10000"
              value={initialDeposit}
              onChange={(e) => setInitialDeposit(Math.max(0, parseInt(e.target.value, 10) || 0))}
              className="w-full p-3 text-base font-bold bg-slate-50 border border-slate-300 rounded-xl"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
              Monthly Recurring Contribution (PKR)
            </label>
            <input
              type="number"
              step="5000"
              value={monthlyContribution}
              onChange={(e) => setMonthlyContribution(Math.max(0, parseInt(e.target.value, 10) || 0))}
              className="w-full p-3 text-base font-bold bg-slate-50 border border-slate-300 rounded-xl"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
              Expected Annual Return ({annualRate}%)
            </label>
            <input
              type="range"
              min="4"
              max="25"
              step="0.5"
              value={annualRate}
              onChange={(e) => setAnnualRate(parseFloat(e.target.value))}
              className="w-full accent-[#e5322d]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
              Investment Duration ({years} Years)
            </label>
            <input
              type="range"
              min="1"
              max="40"
              step="1"
              value={years}
              onChange={(e) => setYears(parseInt(e.target.value, 10))}
              className="w-full accent-[#e5322d]"
            />
          </div>

          <button
            onClick={downloadReport}
            className="w-full py-4 bg-[#e5322d] hover:bg-[#cc241f] text-white font-bold text-sm rounded-xl shadow-lg shadow-red-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Download className="w-4 h-4" />
            Download Wealth Projection (PDF)
          </button>
        </div>

        {/* Results */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm text-center">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Projected Portfolio Wealth
            </span>
            <div className="text-4xl sm:text-5xl font-black text-emerald-600 mt-2 mb-2">
              PKR {investment.totalFutureValue.toLocaleString()}
            </div>
            <p className="text-xs text-slate-500">
              Your investment multiplies by <strong>{investment.multiplier}x</strong> over {years} years
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-2xl border border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Total Capital Deposited</span>
              <p className="text-xl font-black text-slate-800 mt-1">PKR {investment.totalInvested.toLocaleString()}</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Total Interest Earned</span>
              <p className="text-xl font-black text-[#e5322d] mt-1">PKR {investment.totalInterestEarned.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
