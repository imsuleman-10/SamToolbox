"use client";

import { useState, useMemo } from "react";
import jsPDF from "jspdf";
import { Download, Building2, MapPin, CheckCircle2 } from "lucide-react";

type LandUnit =
  | "marla"
  | "kanal"
  | "sqft"
  | "sqyard"
  | "sqmeter"
  | "acre"
  | "hectare"
  | "bigha"
  | "katha"
  | "biswa"
  | "guntha";

export default function MarlaLandConverterPage() {
  const [value, setValue] = useState<number>(5);
  const [unit, setUnit] = useState<LandUnit>("marla");
  const [standard, setStandard] = useState<number>(225); // 225 sqft (Lahore/DHA/Bahria)

  const conversion = useMemo(() => {
    // Convert input unit to base Square Feet first
    let baseSqFt = 0;
    if (unit === "marla") baseSqFt = value * standard;
    else if (unit === "kanal") baseSqFt = value * 20 * standard;
    else if (unit === "sqft") baseSqFt = value;
    else if (unit === "sqyard") baseSqFt = value * 9;
    else if (unit === "sqmeter") baseSqFt = value * 10.76391;
    else if (unit === "acre") baseSqFt = value * 43560;
    else if (unit === "hectare") baseSqFt = value * 107639.1;
    else if (unit === "bigha") baseSqFt = value * 27225; // Standard Pucca Bigha (~3025 sq yds)
    else if (unit === "katha") baseSqFt = value * 1361.25; // 1/20th Bigha
    else if (unit === "biswa") baseSqFt = value * 1361.25; // 1/20th Bigha (Punjab/Haryana/UP)
    else if (unit === "guntha") baseSqFt = value * 1089; // Maharashtra/Gujarat/Karnataka (33x33 ft)

    const marla = baseSqFt / standard;
    const kanal = marla / 20;
    const sqYards = baseSqFt / 9;
    const sqMeters = baseSqFt * 0.092903;
    const acre = baseSqFt / 43560;
    const hectare = baseSqFt / 107639.1;
    const bigha = baseSqFt / 27225;
    const katha = baseSqFt / 1361.25;
    const biswa = baseSqFt / 1361.25;
    const guntha = baseSqFt / 1089;

    return {
      sqFt: baseSqFt.toLocaleString(undefined, { maximumFractionDigits: 2 }),
      marla: marla.toLocaleString(undefined, { maximumFractionDigits: 3 }),
      kanal: kanal.toLocaleString(undefined, { maximumFractionDigits: 3 }),
      sqYards: sqYards.toLocaleString(undefined, { maximumFractionDigits: 2 }),
      sqMeters: sqMeters.toLocaleString(undefined, { maximumFractionDigits: 2 }),
      acre: acre.toLocaleString(undefined, { maximumFractionDigits: 4 }),
      hectare: hectare.toLocaleString(undefined, { maximumFractionDigits: 4 }),
      bigha: bigha.toLocaleString(undefined, { maximumFractionDigits: 3 }),
      katha: katha.toLocaleString(undefined, { maximumFractionDigits: 3 }),
      biswa: biswa.toLocaleString(undefined, { maximumFractionDigits: 3 }),
      guntha: guntha.toLocaleString(undefined, { maximumFractionDigits: 3 }),
    };
  }, [value, unit, standard]);

  const downloadLandCertificate = () => {
    const doc = new jsPDF({ orientation: "portrait", unit: "pt", format: "a4" });

    doc.setFillColor(229, 50, 45);
    doc.rect(0, 0, 595, 80, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("PROPERTY LAND MEASUREMENT REPORT", 40, 45);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Official Real Estate Sizing Standard (${standard} Sq. Ft. per Marla Benchmark)`, 40, 65);

    doc.setTextColor(30, 41, 59);
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Land Measurement Conversions", 40, 115);

    doc.setDrawColor(226, 232, 240);
    doc.setFillColor(248, 250, 252);
    doc.roundedRect(40, 130, 515, 300, 8, 8, "FD");

    const rows = [
      ["Entered Dimension", `${value} ${unit.toUpperCase()}`],
      ["Applied Marla Benchmark", `${standard} Square Feet`],
      ["Total Area in Marla", `${conversion.marla} Marla`],
      ["Total Area in Kanal", `${conversion.kanal} Kanal`],
      ["Total Area in Square Feet", `${conversion.sqFt} Sq. Ft.`],
      ["Total Area in Square Yards (Guz)", `${conversion.sqYards} Sq. Yards`],
      ["Total Area in Square Meters", `${conversion.sqMeters} m²`],
      ["Total Area in Acres", `${conversion.acre} Acres`],
      ["Total Area in Hectares", `${conversion.hectare} Hectares`],
      ["Total Area in Bigha (Pucca)", `${conversion.bigha} Bigha`],
      ["Total Area in Biswa / Katha", `${conversion.biswa} Biswa`],
      ["Total Area in Guntha", `${conversion.guntha} Guntha`],
    ];

    let y = 155;
    rows.forEach(([label, val], idx) => {
      doc.setFont("helvetica", idx === 0 ? "bold" : "normal");
      doc.setFontSize(9);
      doc.setTextColor(idx === 0 ? 229 : 71, idx === 0 ? 50 : 85, idx === 0 ? 45 : 105);
      doc.text(label, 60, y);
      doc.text(val, 530, y, { align: "right" });

      if (idx < rows.length - 1) {
        doc.setDrawColor(241, 245, 249);
        doc.line(60, y + 5, 535, y + 5);
      }
      y += 22;
    });

    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184);
    doc.text("Generated securely via SamToolbox (100% In-Browser Privacy • Zero Server Uploads)", 40, 460);

    doc.save(`land-area-${value}-${unit}.pdf`);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-100 text-[#e5322d] text-xs font-bold mb-4">
          <Building2 className="w-3.5 h-3.5" />
          South Asia &amp; GCC Real Estate Standard
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-3">
          Marla, Kanal, Bigha &amp; Land Area Converter
        </h1>
        <p className="text-slate-600 text-sm leading-relaxed">
          Convert land measurements between Marla, Kanal, Bigha, Biswa, Katha, Guntha, Square Yards (Guz), Square Meters, and Acres with verified regional benchmarks.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Controls */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Enter Dimension &amp; Unit
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
                onChange={(e) => setUnit(e.target.value as LandUnit)}
                className="p-3 text-xs bg-slate-50 border border-slate-300 rounded-xl font-bold uppercase"
              >
                <option value="marla">Marla</option>
                <option value="kanal">Kanal</option>
                <option value="sqft">Sq. Feet</option>
                <option value="sqyard">Sq. Yards (Guz)</option>
                <option value="sqmeter">Sq. Meters</option>
                <option value="acre">Acre</option>
                <option value="hectare">Hectare</option>
                <option value="bigha">Bigha</option>
                <option value="katha">Katha</option>
                <option value="biswa">Biswa</option>
                <option value="guntha">Guntha</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Marla Benchmark Standard
            </label>
            <select
              value={standard}
              onChange={(e) => setStandard(parseFloat(e.target.value))}
              className="w-full p-3 text-xs bg-slate-50 border border-slate-300 rounded-xl font-medium"
            >
              <option value="225">225 Sq. Ft. (DHA, Bahria, LDA, Islamabad CDA, Modern Schemes)</option>
              <option value="250">250 Sq. Ft. (Rawalpindi / Islamabad Suburban Benchmark)</option>
              <option value="272.25">272.25 Sq. Ft. (Official Revenue Board / Patwari Karam Standard)</option>
            </select>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1.5">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-red-600" /> Regional Land Equivalents
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              1 Kanal = 20 Marlas • 1 Acre = 8 Kanals = 43,560 Sq. Ft. • 1 Pucca Bigha = 20 Biswas = 27,225 Sq. Ft.
            </p>
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
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-xs font-bold text-slate-400 uppercase">Square Feet</span>
            <div className="text-2xl font-black text-slate-900 mt-1">{conversion.sqFt}</div>
            <span className="text-[11px] text-slate-500">Sq. Ft.</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-xs font-bold text-slate-400 uppercase">Square Yards (Guz)</span>
            <div className="text-2xl font-black text-slate-900 mt-1">{conversion.sqYards}</div>
            <span className="text-[11px] text-slate-500">Sq. Yds (Guz)</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-xs font-bold text-slate-400 uppercase">Marlas</span>
            <div className="text-2xl font-black text-[#e5322d] mt-1">{conversion.marla}</div>
            <span className="text-[11px] text-slate-500">At {standard} sq ft / marla</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-xs font-bold text-slate-400 uppercase">Kanals</span>
            <div className="text-2xl font-black text-emerald-600 mt-1">{conversion.kanal}</div>
            <span className="text-[11px] text-slate-500">1 Kanal = 20 Marlas</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-xs font-bold text-slate-400 uppercase">Bigha (Pucca)</span>
            <div className="text-xl font-black text-blue-600 mt-1">{conversion.bigha}</div>
            <span className="text-[11px] text-slate-500">20 Biswas = 27,225 sq ft</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-xs font-bold text-slate-400 uppercase">Biswa / Katha</span>
            <div className="text-xl font-black text-amber-600 mt-1">{conversion.biswa}</div>
            <span className="text-[11px] text-slate-500">1,361.25 sq ft</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-xs font-bold text-slate-400 uppercase">Guntha</span>
            <div className="text-xl font-black text-purple-600 mt-1">{conversion.guntha}</div>
            <span className="text-[11px] text-slate-500">1,089 sq ft (33x33 ft)</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-xs font-bold text-slate-400 uppercase">Square Meters</span>
            <div className="text-xl font-black text-slate-800 mt-1">{conversion.sqMeters}</div>
            <span className="text-[11px] text-slate-500">m²</span>
          </div>

          <div className="col-span-2 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase">Acres Equivalent</span>
              <div className="text-2xl font-black text-slate-800 mt-0.5">{conversion.acre} Acres</div>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-slate-400 uppercase">Hectares</span>
              <div className="text-xl font-bold text-slate-700 mt-0.5">{conversion.hectare} ha</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
