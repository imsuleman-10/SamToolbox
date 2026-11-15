"use client";

import { useState, useMemo } from "react";
import jsPDF from "jspdf";
import { Download, RefreshCw, ArrowRightLeft, DollarSign } from "lucide-react";

const RATES_TO_PKR: Record<string, number> = {
  USD: 279.5,
  EUR: 302.2,
  GBP: 358.4,
  AED: 76.1,
  SAR: 74.5,
  CAD: 202.8,
  AUD: 181.5,
  CNY: 38.6,
  PKR: 1.0,
};

export default function CurrencyConverterPage() {
  const [amount, setAmount] = useState<number>(100);
  const [fromCurrency, setFromCurrency] = useState<string>("USD");
  const [toCurrency, setToCurrency] = useState<string>("PKR");
  const [marketType, setMarketType] = useState<"interbank" | "open">("interbank");

  const result = useMemo(() => {
    const fromRate = RATES_TO_PKR[fromCurrency] || 1;
    const toRate = RATES_TO_PKR[toCurrency] || 1;

    // Convert to PKR base then to target
    const inPKR = amount * fromRate;
    const marketMultiplier = marketType === "open" ? 1.008 : 1.0;
    const converted = (inPKR / toRate) * (fromCurrency === "PKR" ? 1 / marketMultiplier : marketMultiplier);

    const unitRate = ((fromRate / toRate) * marketMultiplier).toFixed(4);

    return {
      converted: converted.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      unitRate,
    };
  }, [amount, fromCurrency, toCurrency, marketType]);

  const swap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const downloadPDF = () => {
    const doc = new jsPDF({ orientation: "portrait", unit: "pt", format: "a4" });

    doc.setFillColor(229, 50, 45);
    doc.rect(0, 0, 595, 80, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("CURRENCY CONVERSION CERTIFICATE", 40, 45);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Official Rate Benchmark (${marketType.toUpperCase()} MARKET)`, 40, 65);

    doc.setTextColor(30, 41, 59);
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Exchange Rate Summary", 40, 120);

    doc.setDrawColor(226, 232, 240);
    doc.setFillColor(248, 250, 252);
    doc.roundedRect(40, 135, 515, 180, 8, 8, "FD");

    const rows = [
      ["Amount Converted", `${amount} ${fromCurrency}`],
      ["Destination Currency", `${toCurrency}`],
      ["Applied Market Standard", `${marketType.toUpperCase()} MARKET`],
      ["Exchange Rate", `1 ${fromCurrency} = ${result.unitRate} ${toCurrency}`],
      ["TOTAL CONVERTED RESULT", `${result.converted} ${toCurrency}`],
    ];

    let y = 165;
    rows.forEach(([label, val], idx) => {
      doc.setFont("helvetica", idx === 4 ? "bold" : "normal");
      doc.setFontSize(idx === 4 ? 11 : 9);
      doc.setTextColor(idx === 4 ? 229 : 71, idx === 4 ? 50 : 85, idx === 4 ? 45 : 105);
      doc.text(label, 60, y);
      doc.text(val, 530, y, { align: "right" });

      if (idx < rows.length - 1) {
        doc.setDrawColor(241, 245, 249);
        doc.line(60, y + 6, 535, y + 6);
      }
      y += 28;
    });

    doc.save(`currency-${amount}${fromCurrency}-to-${toCurrency}.pdf`);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-100 text-[#e5322d] text-xs font-bold mb-4">
          <DollarSign className="w-3.5 h-3.5" />
          International Currency Standard
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-3">
          Currency Converter (PKR & Global)
        </h1>
        <p className="text-slate-600 text-sm leading-relaxed">
          Convert currencies between Pakistani Rupee (PKR), US Dollar, Euro, British Pound, UAE Dirham, and Saudi Riyal at interbank rates.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
          <div className="sm:col-span-5">
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Amount & From</label>
            <div className="flex gap-2">
              <input
                type="number"
                min="1"
                value={amount}
                onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                className="w-1/2 p-3 text-base font-bold bg-slate-50 border border-slate-300 rounded-xl"
              />
              <select
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
                className="w-1/2 p-3 text-xs bg-slate-50 border border-slate-300 rounded-xl font-bold"
              >
                {Object.keys(RATES_TO_PKR).map((cur) => (
                  <option key={cur} value={cur}>{cur}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="sm:col-span-2 flex justify-center">
            <button
              onClick={swap}
              className="p-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-transform active:rotate-180 cursor-pointer"
              title="Swap currencies"
            >
              <ArrowRightLeft className="w-4 h-4" />
            </button>
          </div>

          <div className="sm:col-span-5">
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">To Currency</label>
            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              className="w-full p-3 text-xs bg-slate-50 border border-slate-300 rounded-xl font-bold"
            >
              {Object.keys(RATES_TO_PKR).map((cur) => (
                <option key={cur} value={cur}>{cur}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-100 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Converted Total</span>
          <div className="text-4xl sm:text-5xl font-black text-[#e5322d] mt-2 mb-2">
            {result.converted} {toCurrency}
          </div>
          <p className="text-xs text-slate-500">
            1 {fromCurrency} = {result.unitRate} {toCurrency}
          </p>

          <button
            onClick={downloadPDF}
            className="mt-6 px-8 py-3.5 bg-[#e5322d] hover:bg-[#cc241f] text-white font-bold text-xs rounded-xl shadow-lg shadow-red-500/25 inline-flex items-center gap-2 cursor-pointer transition-all"
          >
            <Download className="w-4 h-4" />
            Download Exchange Rate Slip (PDF)
          </button>
        </div>
      </div>
    </div>
  );
}
