"use client";

import { useState } from "react";
import { htmlToPdf } from "@/lib/pdfEngine";
import { Code, Download, Sparkles } from "lucide-react";

export default function HtmlToPdfPage() {
  const [htmlCode, setHtmlCode] = useState(
    `<!DOCTYPE html>
<html>
<head>
  <title>Invoice Sample</title>
</head>
<body>
  <h1>Sample Document Heading</h1>
  <p>This is a paragraph rendered from HTML to PDF directly in the browser.</p>
  <ul>
    <li>High-resolution vector text</li>
    <li>100% Private local rendering</li>
    <li>Compliant PDF output</li>
  </ul>
</body>
</html>`
  );
  const [isProcessing, setIsProcessing] = useState(false);

  const handleConvert = async () => {
    setIsProcessing(true);
    try {
      const blob = await htmlToPdf(htmlCode);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `html-document-${Date.now()}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err: any) {
      alert("Error generating PDF: " + err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-[85vh] bg-[#f8fafc] text-slate-800 py-10 px-4 max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-xs font-bold mb-3 border border-amber-200">
          <Sparkles className="w-3.5 h-3.5" />
          Convert to PDF
        </div>
        <h1 className="text-3xl font-black text-slate-900 mb-2">HTML to PDF</h1>
        <p className="text-sm text-slate-600">
          Paste HTML code or markup to generate a formatted PDF document.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-2 flex items-center gap-1.5">
            <Code className="w-4 h-4 text-amber-500" />
            HTML Markup Code
          </label>
          <textarea
            rows={12}
            value={htmlCode}
            onChange={(e) => setHtmlCode(e.target.value)}
            className="w-full p-4 font-mono text-xs bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        <button
          onClick={handleConvert}
          disabled={isProcessing}
          className="w-full py-4 bg-[#e5322d] hover:bg-[#cc241f] text-white font-bold text-base rounded-xl shadow-lg shadow-red-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <Download className="w-5 h-5" />
          {isProcessing ? "Converting..." : "Convert HTML to PDF & Download"}
        </button>
      </div>
    </div>
  );
}
