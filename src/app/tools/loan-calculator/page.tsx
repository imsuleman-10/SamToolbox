"use client";

import { useState, useMemo } from "react";
import jsPDF from "jspdf";
import { Download, Landmark, DollarSign, Sparkles, ShieldCheck } from "lucide-react";

export default function LoanCalculatorPage() {
  const [amount, setAmount] = useState<number>(2500000); // 2.5 Million PKR
  const [interestRate, setInterestRate] = useState<number>(14.5); // 14.5% KIBOR/bank rate
  const [tenureYears, setTenureYears] = useState<number>(5);

  const loan = useMemo(() => {
    const principal = amount;
    const monthlyRate = interestRate / 100 / 12;
    const totalMonths = tenureYears * 12;

    if (principal <= 0 || monthlyRate <= 0 || totalMonths <= 0) {
      return { emi: 0, totalInterest: 0, totalPayment: 0, schedule: [] };
    }

    // EMI = [P x R x (1+R)^N]/[(1+R)^N-1]
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
    const totalPayment = emi * totalMonths;
    const totalInterest = totalPayment - principal;

    // Generate first 12 months amortization schedule
    let balance = principal;
    const schedule = [];
    for (let m = 1; m <= Math.min(12, totalMonths); m++) {
      const interestMonth = balance * monthlyRate;
      const principalMonth = emi - interestMonth;
      balance = Math.max(0, balance - principalMonth);
      schedule.push({
        month: m,
        principalMonth: Math.round(principalMonth),
        interestMonth: Math.round(interestMonth),
        balance: Math.round(balance),
      });
    }

    return {
      emi: Math.round(emi),
      totalInterest: Math.round(totalInterest),
      totalPayment: Math.round(totalPayment),
      schedule,
    };
  }, [amount, interestRate, tenureYears]);

  const downloadAmortizationPDF = () => {
    const doc = new jsPDF({ orientation: "portrait", unit: "pt", format: "a4" });

    doc.setFillColor(229, 50, 45);
    doc.rect(0, 0, 595, 80, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("LOAN REPAYMENT SCHEDULE", 40, 45);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Official Banking EMI Assessment (${interestRate}% p.a.)`, 40, 65);

    doc.setTextColor(30, 41, 59);
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Loan Overview & Financial Obligations", 40, 115);

    doc.setDrawColor(226, 232, 240);
    doc.setFillColor(248, 250, 252);
    doc.roundedRect(40, 130, 515, 140, 6, 6, "FD");

    const rows = [
      ["Principal Loan Amount", `PKR ${amount.toLocaleString()}`],
      ["Annual Interest Rate", `${interestRate}% per annum`],
      ["Loan Tenure Period", `${tenureYears} Years (${tenureYears * 12} Months)`],
      ["Monthly EMI Installment", `PKR ${loan.emi.toLocaleString()}`],
      ["Total Interest Payable", `PKR ${loan.totalInterest.toLocaleString()}`],
      ["Grand Total Payable (P + I)", `PKR ${loan.totalPayment.toLocaleString()}`],
    ];

    let y = 150;
    rows.forEach(([label, val], idx) => {
      doc.setFont("helvetica", idx === 3 ? "bold" : "normal");
      doc.setFontSize(9);
      doc.setTextColor(idx === 3 ? 229 : 71, idx === 3 ? 50 : 85, idx === 3 ? 45 : 105);
      doc.text(label, 55, y);
      doc.text(val, 535, y, { align: "right" });
      y += 18;
    });

    // Schedule Table Header
    y += 20;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(30, 41, 59);
    doc.text("First 12 Months Amortization Breakdown", 40, y);

    y += 15;
    doc.setFillColor(241, 245, 249);
    doc.rect(40, y, 515, 20, "F");
    doc.setFontSize(8);
    doc.setTextColor(71, 85, 105);
    doc.text("MONTH", 55, y + 13);
    doc.text("PRINCIPAL REPAID", 180, y + 13);
    doc.text("INTEREST CHARGE", 320, y + 13);
    doc.text("REMAINING PRINCIPAL", 460, y + 13);

    y += 30;
    doc.setFont("helvetica", "normal");
    loan.schedule.forEach((s) => {
      doc.text(`Month ${s.month}`, 55, y);
      doc.text(`PKR ${s.principalMonth.toLocaleString()}`, 180, y);
      doc.text(`PKR ${s.interestMonth.toLocaleString()}`, 320, y);
      doc.text(`PKR ${s.balance.toLocaleString()}`, 460, y);
      y += 16;
    });

    doc.save(`loan-amortization-${amount}PKR.pdf`);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-100 text-[#e5322d] text-xs font-bold mb-4">
          <Landmark className="w-3.5 h-3.5" />
          Banking & Credit Standard
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-3">
          Loan & Mortgage EMI Calculator
        </h1>
        <p className="text-slate-600 text-sm leading-relaxed">
          Compute monthly loan installments, total interest charges, and monthly amortization payoff schedule.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Inputs */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
              Loan Amount (PKR)
            </label>
            <input
              type="number"
              step="50000"
              value={amount}
              onChange={(e) => setAmount(Math.max(0, parseInt(e.target.value, 10) || 0))}
              className="w-full p-3 text-lg font-bold bg-slate-50 border border-slate-300 rounded-xl"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
              Annual Interest Rate ({interestRate}%)
            </label>
            <input
              type="range"
              min="5"
              max="35"
              step="0.25"
              value={interestRate}
              onChange={(e) => setInterestRate(parseFloat(e.target.value))}
              className="w-full accent-[#e5322d]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
              Loan Tenure ({tenureYears} Years / {tenureYears * 12} Months)
            </label>
            <input
              type="range"
              min="1"
              max="25"
              step="1"
              value={tenureYears}
              onChange={(e) => setTenureYears(parseInt(e.target.value, 10))}
              className="w-full accent-[#e5322d]"
            />
          </div>

          <button
            onClick={downloadAmortizationPDF}
            className="w-full py-4 bg-[#e5322d] hover:bg-[#cc241f] text-white font-bold text-sm rounded-xl shadow-lg shadow-red-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Download className="w-4 h-4" />
            Download Amortization Schedule (PDF)
          </button>
        </div>

        {/* Results */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm text-center">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Monthly EMI Installment
            </span>
            <div className="text-4xl sm:text-5xl font-black text-[#e5322d] mt-2 mb-2">
              PKR {loan.emi.toLocaleString()}
            </div>
            <p className="text-xs text-slate-500">
              For {tenureYears * 12} continuous monthly billing cycles
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-2xl border border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Total Interest</span>
              <p className="text-xl font-black text-red-600 mt-1">PKR {loan.totalInterest.toLocaleString()}</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Grand Total Payable</span>
              <p className="text-xl font-black text-slate-800 mt-1">PKR {loan.totalPayment.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
