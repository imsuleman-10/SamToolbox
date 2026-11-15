"use client";

import { useState, useMemo } from "react";
import jsPDF from "jspdf";
import { Download, Building2, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";

export default function MarlaLandConverterPage() {
  const [value, setValue] = useState<number>(5);
  const [unit, setUnit] = useState<"marla" | "kanal" | "sqft" | "sqyard" | "acre">("marla");
  const [standard, setStandard] = useState<number>(225); // 225 sqft standard (Lahore/DHA/Bahria)

  const conversion = useMemo(() => {
    // Convert input unit to base Square Feet first
    let baseSqFt = 0;
    if (unit === "marla") baseSqFt = value * standard;
    else if (unit === "kanal") baseSqFt = value * 20 * standard;
    else if (unit === "sqft") baseSqFt = value;
    else if (unit === "sqyard") baseSqFt = value * 9;
    else if (unit === "acre") baseSqFt = value * 8 * 20 * standard;

    const marla = baseSqFt / standard;
    const kanal = marla / 20;
    const sqYards = baseSqFt / 9;
    const sqMeters = baseSqFt * 0.092903;
    const acre = kanal / 8;

    return {
      sqFt: baseSqFt.toLocaleString(undefined, { maximumFractionDigits: 2 }),
      marla: marla.toLocaleString(undefined, { maximumFractionDigits: 3 }),
      kanal: kanal.toLocaleString(undefined, { maximumFractionDigits: 3 }),
      sqYards: sqYards.toLocaleString(undefined, { maximumFractionDigits: 2 }),
      sqMeters: sqMeters.toLocaleString(undefined, { maximumFractionDigits: 2 }),
      acre: acre.toLocaleString(undefined, { maximumFractionDigits: 4 }),
    };
  }, [value, unit, standard]);

  const downloadLandCertificate = () => {
    const doc = new jsPDF({ orientation: "portrait", unit: "pt", format: "a4" });

    doc.setFillColor(229, 50, 45);
    doc.rect(0, 0, 595, 80, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("PROPERTY LAND MEASUREMENT REPORT", 40, 45);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Official Real Estate Sizing Standard (${standard} Sq. Ft. per Marla)`, 40, 65);

    doc.setTextColor(30, 41, 59);
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Land Measurement Conversions", 40, 120);

    doc.setDrawColor(226, 232, 240);
    doc.setFillColor(248, 250, 252);
    doc.roundedRect(40, 135, 515, 240, 8, 8, "FD");

    const rows = [
      ["Entered Dimension", `${value} ${unit.toUpperCase()}`],
      ["Applied Marla Benchmark", `${standard} Square Feet (Standard)`],
      ["Total Area in Marla", `${conversion.marla} Marla`],
      ["Total Area in Kanal", `${conversion.kanal} Kanal`],
      ["Total Area in Square Feet", `${conversion.sqFt} Sq. Ft.`],
      ["Total Area in Square Yards (Guz)", `${conversion.sqYards} Sq. Yards`],
      ["Total Area in Square Meters", `${conversion.sqMeters} m²`],
      ["Total Area in Acres", `${conversion.acre} Acres`],
    ];

    let y = 160;
    rows.forEach(([label, val], idx) => {
      doc.setFont("helvetica", idx === 0 ? "bold" : "normal");
      doc.setFontSize(9);
      doc.setTextColor(idx === 0 ? 229 : 71, idx === 0 ? 50 : 85, idx === 0 ? 45 : 105);
      doc.text(label, 60, y);
      doc.text(val, 530, y, { align: "right" });

      if (idx < rows.length - 1) {
        doc.setDrawColor(241, 245, 249);
        doc.line(60, y + 6, 535, y + 6);
      }
      y += 24;
    });

    doc.save(`land-area-${value}-${unit}.pdf`);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-100 text-[#e5322d] text-xs font-bold mb-4">
          <Building2 className="w-3.5 h-3.5" />
          Pakistan Real Estate Standard
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-3">
          Marla & Land Area Converter
        </h1>
        <p className="text-slate-600 text-sm leading-relaxed">
          Convert land measurements between Marla, Kanal, Square Feet, Square Yards (Guz), and Acres across all Pakistani regional benchmarks.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Controls */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Enter Value & Unit
            </label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                min="0"
                step="0.5"
                value={value}
                onChange={(e) => setValue(parseFloat(e.target.value) || 0)}
                className="p-3 text-base font-bold bg-slate-50 border border-slate-300 rounded-xl"
              />
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value as any)}
                className="p-3 text-xs bg-slate-50 border border-slate-300 rounded-xl font-bold uppercase"
              >
                <option value="marla">Marla</option>
                <option value="kanal">Kanal</option>
                <option value="sqft">Sq. Feet</option>
                <option value="sqyard">Sq. Yards (Guz)</option>
                <option value="acre">Acre</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Marla Sizing Standard
            </label>
            <select
              value={standard}
              onChange={(e) => setStandard(parseFloat(e.target.value))}
              className="w-full p-3 text-xs bg-slate-50 border border-slate-300 rounded-xl font-medium"
            >
              <option value="225">225 Sq. Ft. (DHA, Bahria, LDA, Modern Housing Schemes)</option>
              <option value="250">250 Sq. Ft. (Islamabad / CDA Benchmark)</option>
              <option value="272.25">272.25 Sq. Ft. (Official Revenue / Patwari Karam Standard)</option>
            </select>
          </div>

          <button
            onClick={downloadLandCertificate}
            className="w-full py-4 bg-[#e5322d] hover:bg-[#cc241f] text-white font-bold text-sm rounded-xl shadow-lg shadow-red-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Download className="w-4 h-4" />
            Download Property Report (PDF)
          </button>
        </div>

        {/* Results */}
        <div className="lg:col-span-7 grid grid-cols-2 gap-4">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <span className="text-xs font-bold text-slate-400 uppercase">Square Feet</span>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">{conversion.sqFt}</div>
            <span className="text-[11px] text-slate-500">Sq. Ft.</span>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <span className="text-xs font-bold text-slate-400 uppercase">Square Yards (Guz)</span>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">{conversion.sqYards}</div>
            <span className="text-[11px] text-slate-500">Sq. Yds</span>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <span className="text-xs font-bold text-slate-400 uppercase">Marlas</span>
            <div className="text-2xl sm:text-3xl font-black text-[#e5322d] mt-2">{conversion.marla}</div>
            <span className="text-[11px] text-slate-500">At {standard} sq ft / marla</span>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <span className="text-xs font-bold text-slate-400 uppercase">Kanals</span>
            <div className="text-2xl sm:text-3xl font-black text-emerald-600 mt-2">{conversion.kanal}</div>
            <span className="text-[11px] text-slate-500">1 Kanal = 20 Marlas</span>
          </div>

          <div className="col-span-2 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase">Acres Equivalent</span>
              <div className="text-2xl font-black text-slate-800 mt-1">{conversion.acre} Acres</div>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-slate-400 uppercase">Square Meters</span>
              <div className="text-xl font-bold text-slate-700 mt-1">{conversion.sqMeters} m²</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
