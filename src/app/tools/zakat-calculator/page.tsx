"use client";

import { useState, useMemo } from "react";
import jsPDF from "jspdf";
import { Download, Sparkles, ShieldCheck, Heart } from "lucide-react";

export default function ZakatCalculatorPage() {
  const [goldTola, setGoldTola] = useState<number>(0);
  const [goldPricePerTola, setGoldPricePerTola] = useState<number>(275000);

  const [silverTola, setSilverTola] = useState<number>(0);
  const [silverPricePerTola, setSilverPricePerTola] = useState<number>(3150);

  const [cash, setCash] = useState<number>(100000);
  const [investments, setInvestments] = useState<number>(0);
  const [liabilities, setLiabilities] = useState<number>(0);

  const zakat = useMemo(() => {
    const goldValue = goldTola * goldPricePerTola;
    const silverValue = silverTola * silverPricePerTola;
    const grossAssets = goldValue + silverValue + cash + investments;
    const netWealth = Math.max(0, grossAssets - liabilities);

    // Silver Nisab threshold (52.5 tolas of silver is standard for cash/mix wealth)
    const silverNisabValue = 52.5 * silverPricePerTola;
    const isEligible = netWealth >= silverNisabValue;

    const zakatPayable = isEligible ? Math.round(netWealth * 0.025) : 0;

    return {
      goldValue,
      silverValue,
      grossAssets,
      netWealth,
      silverNisabValue,
      isEligible,
      zakatPayable,
    };
  }, [goldTola, goldPricePerTola, silverTola, silverPricePerTola, cash, investments, liabilities]);

  const downloadZakatPDF = () => {
    const doc = new jsPDF({ orientation: "portrait", unit: "pt", format: "a4" });

    doc.setFillColor(229, 50, 45);
    doc.rect(0, 0, 595, 80, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("ANNUAL ZAKAT CERTIFICATE", 40, 45);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Official Islamic Nisab Valuation & 2.5% Assessment`, 40, 65);

    doc.setTextColor(30, 41, 59);
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Detailed Asset Breakdown", 40, 120);

    doc.setDrawColor(226, 232, 240);
    doc.setFillColor(248, 250, 252);
    doc.roundedRect(40, 135, 515, 270, 8, 8, "FD");

    const rows = [
      ["Gold Assets Value", `PKR ${zakat.goldValue.toLocaleString()} (${goldTola} Tola @ ${goldPricePerTola.toLocaleString()})`],
      ["Silver Assets Value", `PKR ${zakat.silverValue.toLocaleString()} (${silverTola} Tola @ ${silverPricePerTola.toLocaleString()})`],
      ["Cash in Hand & Bank Accounts", `PKR ${cash.toLocaleString()}`],
      ["Business Inventory & Shares", `PKR ${investments.toLocaleString()}`],
      ["Less Liabilities & Debts", `- PKR ${liabilities.toLocaleString()}`],
      ["Net Zakatable Wealth", `PKR ${zakat.netWealth.toLocaleString()}`],
      ["Silver Nisab Threshold (52.5 Tola)", `PKR ${Math.round(zakat.silverNisabValue).toLocaleString()}`],
      ["TOTAL ZAKAT DUE (2.5%)", `PKR ${zakat.zakatPayable.toLocaleString()}`],
    ];

    let y = 160;
    rows.forEach(([label, val], idx) => {
      doc.setFont("helvetica", idx === 7 ? "bold" : "normal");
      doc.setFontSize(9);
      doc.setTextColor(idx === 7 ? 229 : 71, idx === 7 ? 50 : 85, idx === 7 ? 45 : 105);
      doc.text(label, 60, y);
      doc.text(val, 530, y, { align: "right" });

      if (idx < rows.length - 1) {
        doc.setDrawColor(241, 245, 249);
        doc.line(60, y + 6, 535, y + 6);
      }
      y += 26;
    });

    doc.save(`zakat-assessment-${Date.now()}.pdf`);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-100 text-[#e5322d] text-xs font-bold mb-4">
          <Heart className="w-3.5 h-3.5 fill-[#e5322d]" />
          Islamic Finance Tool
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-3">
          Zakat Calculator
        </h1>
        <p className="text-slate-600 text-sm leading-relaxed">
          Accurately calculate compulsory 2.5% Zakat on Gold, Silver, Cash, and Business Assets according to authentic Nisab guidelines.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Controls */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">Gold (Tola)</label>
              <input
                type="number"
                min="0"
                step="0.1"
                value={goldTola}
                onChange={(e) => setGoldTola(parseFloat(e.target.value) || 0)}
                className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl font-bold"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">Rate / Tola (PKR)</label>
              <input
                type="number"
                value={goldPricePerTola}
                onChange={(e) => setGoldPricePerTola(parseInt(e.target.value, 10) || 0)}
                className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">Silver (Tola)</label>
              <input
                type="number"
                min="0"
                step="1"
                value={silverTola}
                onChange={(e) => setSilverTola(parseFloat(e.target.value) || 0)}
                className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl font-bold"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">Rate / Tola (PKR)</label>
              <input
                type="number"
                value={silverPricePerTola}
                onChange={(e) => setSilverPricePerTola(parseInt(e.target.value, 10) || 0)}
                className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">Cash in Hand & Bank Accounts (PKR)</label>
            <input
              type="number"
              value={cash}
              onChange={(e) => setCash(parseInt(e.target.value, 10) || 0)}
              className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl font-bold"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">Business Inventory & Mutual Funds (PKR)</label>
            <input
              type="number"
              value={investments}
              onChange={(e) => setInvestments(parseInt(e.target.value, 10) || 0)}
              className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">Debts & Liabilities to Subtract (PKR)</label>
            <input
              type="number"
              value={liabilities}
              onChange={(e) => setLiabilities(parseInt(e.target.value, 10) || 0)}
              className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl text-red-600"
            />
          </div>

          <button
            onClick={downloadZakatPDF}
            className="w-full py-3.5 bg-[#e5322d] hover:bg-[#cc241f] text-white font-bold text-xs rounded-xl shadow-lg shadow-red-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Download className="w-4 h-4" />
            Download Zakat Summary (PDF)
          </button>
        </div>

        {/* Results */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm text-center">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Total Zakat Payable (2.5%)
            </span>
            <div className="text-4xl sm:text-5xl font-black text-[#e5322d] mt-2 mb-2">
              PKR {zakat.zakatPayable.toLocaleString()}
            </div>
            <p className="text-xs text-slate-500">
              {zakat.isEligible 
                ? "Your net wealth exceeds the silver Nisab threshold." 
                : "Wealth is below current Nisab threshold. Zakat is not compulsory."}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Net Zakatable Wealth</span>
              <p className="text-xl font-black text-slate-800 mt-1">PKR {zakat.netWealth.toLocaleString()}</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Silver Nisab Limit (52.5 Tola)</span>
              <p className="text-xl font-black text-slate-800 mt-1">PKR {Math.round(zakat.silverNisabValue).toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
