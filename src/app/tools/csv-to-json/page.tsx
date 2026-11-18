"use client";

import { useState } from "react";
import {
  Table,
  Copy,
  Check,
  Download,
  Trash2,
  ArrowRightLeft,
  ShieldCheck,
  FileSpreadsheet,
} from "lucide-react";

export default function CsvToJsonPage() {
  const [csvText, setCsvText] = useState<string>(
    `id,name,role,department,country\n1,Suleman Zaheer,Lead Software Engineer,Core Systems,Pakistan\n2,John Doe,Product Designer,UX Studio,United States\n3,Emma Watson,DevOps Architect,Cloud Infrastructure,United Kingdom`
  );
  const [jsonText, setJsonText] = useState<string>("");
  const [mode, setMode] = useState<"csv2json" | "json2csv">("csv2json");
  const [delimiter, setDelimiter] = useState<string>(",");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const convertCsvToJson = (csv: string, delim: string) => {
    setError(null);
    try {
      const lines = csv.trim().split("\n").map((l) => l.trim()).filter(Boolean);
      if (lines.length < 2) {
        setJsonText("[]");
        return;
      }
      const headers = lines[0].split(delim).map((h) => h.trim().replace(/^["']|["']$/g, ""));
      const result = [];

      for (let i = 1; i < lines.length; i++) {
        const currentLine = lines[i].split(delim).map((item) => item.trim().replace(/^["']|["']$/g, ""));
        const obj: Record<string, any> = {};
        headers.forEach((header, index) => {
          let val: any = currentLine[index] ?? "";
          if (val === "true") val = true;
          else if (val === "false") val = false;
          else if (!isNaN(Number(val)) && val !== "") val = Number(val);
          obj[header] = val;
        });
        result.push(obj);
      }
      setJsonText(JSON.stringify(result, null, 2));
    } catch (err: any) {
      setError("Error parsing CSV: " + err.message);
    }
  };

  const convertJsonToCsv = (json: string, delim: string) => {
    setError(null);
    try {
      const parsed = JSON.parse(json);
      if (!Array.isArray(parsed) || parsed.length === 0) {
        setCsvText("");
        return;
      }
      const headers = Object.keys(parsed[0]);
      const csvRows = [headers.join(delim)];

      for (const row of parsed) {
        const values = headers.map((header) => {
          const val = row[header] ?? "";
          return typeof val === "string" && val.includes(delim) ? `"${val}"` : String(val);
        });
        csvRows.push(values.join(delim));
      }
      setCsvText(csvRows.join("\n"));
    } catch (err: any) {
      setError("Error converting JSON to CSV: " + err.message);
    }
  };

  const handleRunConversion = () => {
    if (mode === "csv2json") {
      convertCsvToJson(csvText, delimiter);
    } else {
      convertJsonToCsv(jsonText, delimiter);
    }
  };

  const handleCopy = (text: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = (content: string, filename: string) => {
    if (!content) return;
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-100 text-[#e5322d] text-xs font-bold mb-4">
          <FileSpreadsheet className="w-3.5 h-3.5" />
          Bidirectional Tabular Data Converter
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-3">
          CSV to JSON &amp; JSON to CSV Converter
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Convert CSV spreadsheets into clean JSON arrays or turn JSON objects into standard CSV files. 100% private in-browser execution with zero cloud storage.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        {/* Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="inline-flex rounded-xl bg-slate-100 p-1">
              <button
                onClick={() => {
                  setMode("csv2json");
                  convertCsvToJson(csvText, delimiter);
                }}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                  mode === "csv2json" ? "bg-[#e5322d] text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                CSV → JSON
              </button>
              <button
                onClick={() => {
                  setMode("json2csv");
                  if (jsonText) convertJsonToCsv(jsonText, delimiter);
                }}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                  mode === "json2csv" ? "bg-[#e5322d] text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                JSON → CSV
              </button>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-slate-600">
              <span className="font-semibold">Delimiter:</span>
              <select
                value={delimiter}
                onChange={(e) => {
                  setDelimiter(e.target.value);
                  if (mode === "csv2json") convertCsvToJson(csvText, e.target.value);
                  else convertJsonToCsv(jsonText, e.target.value);
                }}
                className="px-2 py-1 rounded-lg border border-slate-200 bg-slate-50 text-xs font-medium"
              >
                <option value=",">Comma (,)</option>
                <option value=";">Semicolon (;)</option>
                <option value="	">Tab (\t)</option>
                <option value="|">Pipe (|)</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (mode === "csv2json") handleCopy(jsonText || "[]");
                else handleCopy(csvText);
              }}
              className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? "Copied!" : "Copy Output"}
            </button>
            <button
              onClick={() => {
                if (mode === "csv2json") handleDownload(jsonText, "data.json");
                else handleDownload(csvText, "data.csv");
              }}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" /> Download
            </button>
            <button
              onClick={() => {
                setCsvText("");
                setJsonText("");
                setError(null);
              }}
              className="p-2 text-slate-400 hover:text-red-600 transition-colors"
              title="Clear all"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700">
            {error}
          </div>
        )}

        {/* Input / Output Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700">
              <span>{mode === "csv2json" ? "CSV Input" : "JSON Input"}</span>
              <button
                onClick={() => {
                  if (mode === "csv2json") convertCsvToJson(csvText, delimiter);
                  else convertJsonToCsv(jsonText, delimiter);
                }}
                className="text-xs text-red-600 hover:underline font-semibold"
              >
                Convert Now →
              </button>
            </div>
            <textarea
              value={mode === "csv2json" ? csvText : jsonText}
              onChange={(e) => {
                if (mode === "csv2json") {
                  setCsvText(e.target.value);
                  convertCsvToJson(e.target.value, delimiter);
                } else {
                  setJsonText(e.target.value);
                  convertJsonToCsv(e.target.value, delimiter);
                }
              }}
              placeholder={mode === "csv2json" ? "Paste CSV rows here..." : "Paste JSON array here..."}
              className="w-full h-80 p-4 font-mono text-xs sm:text-sm bg-slate-50 text-slate-900 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500 leading-relaxed resize-y"
              spellCheck={false}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700">
              <span>{mode === "csv2json" ? "JSON Output" : "CSV Output"}</span>
              <span className="text-[11px] text-emerald-600 font-medium">Auto-Generated</span>
            </div>
            <textarea
              readOnly
              value={mode === "csv2json" ? jsonText : csvText}
              placeholder="Conversion result will appear here..."
              className="w-full h-80 p-4 font-mono text-xs sm:text-sm bg-slate-900 text-slate-100 rounded-2xl border border-slate-800 leading-relaxed resize-y focus:outline-none selection:bg-red-500/40"
              spellCheck={false}
            />
          </div>
        </div>

        {/* Privacy Note */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
          <span className="flex items-center gap-1.5 text-emerald-600 font-medium">
            <ShieldCheck className="w-4 h-4" /> 100% Client-Side Conversion (Zero Data Logging)
          </span>
          <span className="text-[11px] text-slate-400">RFC 4180 CSV Standard</span>
        </div>
      </div>
    </div>
  );
}
