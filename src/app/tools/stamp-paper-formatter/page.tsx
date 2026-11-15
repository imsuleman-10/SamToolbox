"use client";

import { useState } from "react";
import jsPDF from "jspdf";
import { Download, FileText, Sparkles, ShieldCheck } from "lucide-react";

export default function StampPaperFormatterPage() {
  const [stampValue, setStampValue] = useState<number>(100);
  const [topMarginMm, setTopMarginMm] = useState<number>(120); // standard 120mm top gap for e-stamp paper
  const [docType, setDocType] = useState<"affidavit" | "rental" | "undertaking">("affidavit");

  const [title, setTitle] = useState("AFFIDAVIT / DECLARATION");
  const [deponentName, setDeponentName] = useState("Muhammad Ali");
  const [cnic, setCnic] = useState("35201-XXXXXXX-X");
  const [address, setAddress] = useState("Lahore, Pakistan");

  const [statement, setStatement] = useState(
    "1. That I am a citizen of Pakistan and fully competent to depose this affidavit on solemn oath.\n" +
    "2. That the contents stated herein and the documents submitted by me are true, correct, and authentic to the best of my knowledge.\n" +
    "3. That nothing has been concealed or misrepresented.\n" +
    "4. That in case any information is found incorrect, I shall be held personally liable under relevant laws of Pakistan."
  );

  const generateStampPaperPDF = () => {
    // Legal Paper size in points: Legal is 8.5 x 14 inches = 612 x 1008 pt
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: "legal",
    });

    // Convert top margin from mm to points (1mm ~ 2.83465 pt)
    const topMarginPt = topMarginMm * 2.83465;

    // Document Title
    doc.setFont("times", "bold");
    doc.setFontSize(14);
    doc.setTextColor(15, 23, 42);
    doc.text(title.toUpperCase(), 306, topMarginPt + 20, { align: "center" });

    // Deponent Header
    doc.setFontSize(11);
    doc.setFont("times", "normal");
    const intro = `I, ${deponentName}, holding CNIC No. ${cnic}, resident of ${address}, do hereby solemnly affirm and declare on oath as under:`;
    const introLines = doc.splitTextToSize(intro, 490);
    doc.text(introLines, 60, topMarginPt + 50);

    // Statements
    const statementLines = doc.splitTextToSize(statement, 490);
    doc.text(statementLines, 60, topMarginPt + 95);

    // Signature Area
    const sigY = Math.min(topMarginPt + 260, 920);
    doc.setFont("times", "bold");
    doc.text("DEPONENT", 460, sigY);
    doc.setFont("times", "normal");
    doc.setFontSize(10);
    doc.text(`Name: ${deponentName}`, 420, sigY + 20);
    doc.text(`CNIC: ${cnic}`, 420, sigY + 35);

    // Verification
    doc.setFont("times", "bold");
    doc.text("VERIFICATION:", 60, sigY);
    doc.setFont("times", "normal");
    doc.text(
      "Verified on oath that the contents of the above affidavit are true and correct.\nVerified on " + new Date().toLocaleDateString("en-GB"),
      60,
      sigY + 20
    );

    doc.save(`estamp-paper-doc-${stampValue}PKR.pdf`);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-100 text-[#e5322d] text-xs font-bold mb-4">
          <FileText className="w-3.5 h-3.5" />
          Pakistan e-Stamp Paper Standard
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-3">
          e-Stamp Paper & Affidavit Formatter
        </h1>
        <p className="text-slate-600 text-sm leading-relaxed">
          Format legal affidavits, undertakings, and rental deeds with the exact top margin required for Pakistani Rs. 100, 500, and 1200 e-Stamp papers.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Controls */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl">
            <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
              e-Stamp Top Margin Gap ({topMarginMm} mm)
            </label>
            <input
              type="range"
              min="90"
              max="160"
              step="5"
              value={topMarginMm}
              onChange={(e) => setTopMarginMm(parseInt(e.target.value, 10))}
              className="w-full accent-[#e5322d]"
            />
            <p className="text-[11px] text-slate-500 mt-1">
              Leaves top space blank for the official Punjab/Sindh/KPK e-Stamp barcode and stamp head.
            </p>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Document Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Deponent Name</label>
            <input
              type="text"
              value={deponentName}
              onChange={(e) => setDeponentName(e.target.value)}
              className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-600 mb-1">CNIC Number</label>
            <input
              type="text"
              value={cnic}
              onChange={(e) => setCnic(e.target.value)}
              className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl"
            />
          </div>

          <button
            onClick={generateStampPaperPDF}
            className="w-full py-4 bg-[#e5322d] hover:bg-[#cc241f] text-white font-bold text-sm rounded-xl shadow-lg shadow-red-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Download className="w-4 h-4" />
            Download Legal PDF for e-Stamp
          </button>
        </div>

        {/* Content Editor & Visual Preview */}
        <div className="lg:col-span-7 space-y-4">
          <label className="block text-xs font-bold uppercase text-slate-700">
            Legal Statement / Clauses
          </label>
          <textarea
            rows={12}
            value={statement}
            onChange={(e) => setStatement(e.target.value)}
            className="w-full p-4 font-serif text-xs bg-slate-50 border border-slate-200 rounded-2xl leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#e5322d]"
          />

          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-800 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>
              Pre-aligned for Legal Size (8.5&quot; x 14&quot;) paper. Load e-stamp sheet into your printer tray and click print!
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
