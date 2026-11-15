"use client";

import { useState, useMemo } from "react";
import jsPDF from "jspdf";
import { Calculator, Download, DollarSign, ShieldCheck, ArrowRight, Sparkles, FileText, CheckCircle2 } from "lucide-react";

export default function SalaryTaxCalculatorPage() {
  const [monthlySalary, setMonthlySalary] = useState<number>(150000);
  const [taxYear, setTaxYear] = useState<string>("2024-2025 / 2026");

  // FBR Salaried Slabs Calculation
  const calculation = useMemo(() => {
    const annualSalary = monthlySalary * 12;
    let annualTax = 0;
    let slabDesc = "";

    if (annualSalary <= 600000) {
      annualTax = 0;
      slabDesc = "Slab 1: Up to Rs. 600,000 (0% Tax)";
    } else if (annualSalary <= 1200000) {
      annualTax = (annualSalary - 600000) * 0.05;
      slabDesc = "Slab 2: Rs. 600k – 1.2M (5% on excess of 600k)";
    } else if (annualSalary <= 2200000) {
      annualTax = 30000 + (annualSalary - 1200000) * 0.15;
      slabDesc = "Slab 3: Rs. 1.2M – 2.2M (Rs. 30,000 + 15% on excess of 1.2M)";
    } else if (annualSalary <= 3200000) {
      annualTax = 180000 + (annualSalary - 2200000) * 0.25;
      slabDesc = "Slab 4: Rs. 2.2M – 3.2M (Rs. 180,000 + 25% on excess of 2.2M)";
    } else if (annualSalary <= 4100000) {
      annualTax = 430000 + (annualSalary - 3200000) * 0.30;
      slabDesc = "Slab 5: Rs. 3.2M – 4.1M (Rs. 430,000 + 30% on excess of 3.2M)";
    } else {
      annualTax = 700000 + (annualSalary - 4100000) * 0.35;
      slabDesc = "Slab 6: Above Rs. 4.1M (Rs. 700,000 + 35% on excess of 4.1M)";
    }

    // 10% surcharge on income exceeding 10M
    if (annualSalary > 10000000) {
      const surcharge = annualTax * 0.10;
      annualTax += surcharge;
    }

    const monthlyTax = Math.round(annualTax / 12);
    const takeHomeMonthly = monthlySalary - monthlyTax;
    const effectiveTaxRate = annualSalary > 0 ? ((annualTax / annualSalary) * 100).toFixed(1) : "0.0";

    return {
      annualSalary,
      annualTax: Math.round(annualTax),
      monthlyTax,
      takeHomeMonthly,
      effectiveTaxRate,
      slabDesc,
    };
  }, [monthlySalary]);

  const generateSalarySlipPDF = () => {
    const doc = new jsPDF({ orientation: "portrait", unit: "pt", format: "a4" });

    // Header styling
    doc.setFillColor(229, 50, 45); // iLove red
    doc.rect(0, 0, 595, 80, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("SALARY & TAX CERTIFICATE", 40, 45);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`FBR Pakistan Finance Act (${taxYear}) — Certified Estimate`, 40, 65);

    // Body container
    doc.setTextColor(30, 41, 59);
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Employee Earnings & Tax Summary", 40, 120);

    doc.setDrawColor(226, 232, 240);
    doc.setFillColor(248, 250, 252);
    doc.roundedRect(40, 135, 515, 240, 8, 8, "FD");

    const rows = [
      ["Gross Monthly Salary", `PKR ${monthlySalary.toLocaleString()}`],
      ["Annualized Taxable Income", `PKR ${calculation.annualSalary.toLocaleString()}`],
      ["FBR Applicable Tax Slab", calculation.slabDesc],
      ["Total Annual Income Tax", `PKR ${calculation.annualTax.toLocaleString()}`],
      ["Monthly Tax Deduction (WHT)", `PKR ${calculation.monthlyTax.toLocaleString()}`],
      ["Net Take-Home Salary (Monthly)", `PKR ${calculation.takeHomeMonthly.toLocaleString()}`],
      ["Effective Tax Percentage", `${calculation.effectiveTaxRate}%`],
    ];

    let y = 165;
    rows.forEach(([label, val], idx) => {
      doc.setFont("helvetica", idx === 5 ? "bold" : "normal");
      doc.setFontSize(10);
      doc.setTextColor(idx === 5 ? 229 : 71, idx === 5 ? 50 : 85, idx === 5 ? 45 : 105);
      doc.text(label, 60, y);
      doc.text(val, 530, y, { align: "right" });

      if (idx < rows.length - 1) {
        doc.setDrawColor(241, 245, 249);
        doc.line(60, y + 8, 535, y + 8);
      }
      y += 28;
    });

    // Notes
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184);
    doc.text("Note: Computed under Section 149 of the Income Tax Ordinance 2001. Generated via SamPDF.", 40, 410);

    doc.save(`salary-tax-slip-${monthlySalary}PKR.pdf`);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-100 text-[#e5322d] text-xs font-bold mb-4">
          <Calculator className="w-3.5 h-3.5" />
          FBR Pakistan Tax Engine
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-3">
          Pakistan Salary Tax Calculator
        </h1>
        <p className="text-slate-600 text-sm leading-relaxed">
          Accurately calculate your monthly income tax, annual deductions, and net take-home salary based on the official FBR Finance Act slabs.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Input Column */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Monthly Gross Salary (PKR)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">
                PKR
              </span>
              <input
                type="number"
                min="0"
                step="5000"
                value={monthlySalary}
                onChange={(e) => setMonthlySalary(Math.max(0, parseInt(e.target.value, 10) || 0))}
                className="w-full pl-14 pr-4 py-3.5 text-lg font-bold bg-slate-50 border border-slate-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#e5322d]"
              />
            </div>
            <p className="text-xs text-slate-500 mt-2">
              Annual equivalent: <strong>PKR {calculation.annualSalary.toLocaleString()}</strong>
            </p>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Tax Year & Policy
            </label>
            <select
              value={taxYear}
              onChange={(e) => setTaxYear(e.target.value)}
              className="w-full p-3 text-xs bg-slate-50 border border-slate-300 rounded-xl font-medium"
            >
              <option value="2024-2025 / 2026">Tax Year 2024-2025 & 2026 (Latest FBR Slabs)</option>
            </select>
          </div>

          <div className="p-4 bg-red-50 border border-red-100 rounded-2xl text-xs text-slate-700 space-y-1.5">
            <p className="font-bold text-[#e5322d]">Applicable FBR Slab:</p>
            <p>{calculation.slabDesc}</p>
          </div>

          <button
            onClick={generateSalarySlipPDF}
            className="w-full py-4 bg-[#e5322d] hover:bg-[#cc241f] text-white font-bold text-sm rounded-xl shadow-lg shadow-red-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Download className="w-4 h-4" />
            Download Salary Slip (PDF)
          </button>
        </div>

        {/* Results Column */}
        <div className="lg:col-span-7 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Monthly Tax Deduction
              </span>
              <div className="text-3xl font-black text-[#e5322d] mt-2">
                PKR {calculation.monthlyTax.toLocaleString()}
              </div>
              <p className="text-xs text-slate-500 mt-1">Deducted from paycheck monthly</p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Monthly Take-Home Salary
              </span>
              <div className="text-3xl font-black text-emerald-600 mt-2">
                PKR {calculation.takeHomeMonthly.toLocaleString()}
              </div>
              <p className="text-xs text-slate-500 mt-1">Net amount credited to your bank</p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Total Annual Tax
              </span>
              <div className="text-2xl font-black text-slate-800 mt-2">
                PKR {calculation.annualTax.toLocaleString()}
              </div>
              <p className="text-xs text-slate-500 mt-1">Total yearly liability to FBR</p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Effective Tax Rate
              </span>
              <div className="text-2xl font-black text-slate-800 mt-2">
                {calculation.effectiveTaxRate}%
              </div>
              <p className="text-xs text-slate-500 mt-1">Average tax on gross income</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-sm text-slate-900 mb-3 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              100% In-Browser Privacy
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Your salary and financial calculations are never saved or sent to any server. Everything is calculated in real time directly on your device.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
