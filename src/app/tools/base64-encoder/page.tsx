"use client";

import { useState } from "react";
import {
  Binary,
  Copy,
  Check,
  Trash2,
  Upload,
  Download,
  ShieldCheck,
  ArrowRightLeft,
  FileCode,
} from "lucide-react";

export default function Base64EncoderPage() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConvert = (text: string, currentMode: "encode" | "decode") => {
    setInputText(text);
    setError(null);
    if (!text) {
      setOutputText("");
      return;
    }
    try {
      if (currentMode === "encode") {
        // UTF-8 safe base64 encoding
        const bytes = new TextEncoder().encode(text);
        const binString = Array.from(bytes, (byte) => String.fromCharCode(byte)).join("");
        setOutputText(btoa(binString));
      } else {
        // UTF-8 safe base64 decoding
        const binString = atob(text.trim());
        const bytes = Uint8Array.from(binString, (m) => m.charCodeAt(0));
        setOutputText(new TextDecoder().decode(bytes));
      }
    } catch (err: any) {
      setError(currentMode === "decode" ? "Invalid Base64 string format" : "Encoding error: " + err.message);
      setOutputText("");
    }
  };

  const handleSwitchMode = (newMode: "encode" | "decode") => {
    setMode(newMode);
    // Swap input and output if valid
    if (outputText && !error) {
      setInputText(outputText);
      handleConvert(outputText, newMode);
    } else {
      handleConvert(inputText, newMode);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (mode === "encode") {
        // Extract raw base64 or whole data URL
        setInputText(`[File: ${file.name}]`);
        setOutputText(result.split(",")[1] || result);
      } else {
        setInputText(result);
        handleConvert(result, "decode");
      }
    };
    if (mode === "encode") {
      reader.readAsDataURL(file);
    } else {
      reader.readAsText(file);
    }
  };

  const handleCopy = () => {
    if (!outputText) return;
    navigator.clipboard.writeText(outputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!outputText) return;
    const blob = new Blob([outputText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = mode === "encode" ? "encoded-base64.txt" : "decoded-output.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-100 text-[#e5322d] text-xs font-bold mb-4">
          <Binary className="w-3.5 h-3.5" />
          RFC 4648 Compliant Base64 Engine
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-3">
          Base64 Encoder &amp; Decoder Online
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Encode plain text, files, and images into Base64 strings, or decode Base64 into clean UTF-8 text. 100% private in-browser computation with zero cloud transmission.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        {/* Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <div className="inline-flex rounded-xl bg-slate-100 p-1">
              <button
                onClick={() => handleSwitchMode("encode")}
                className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                  mode === "encode"
                    ? "bg-[#e5322d] text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Base64 Encode
              </button>
              <button
                onClick={() => handleSwitchMode("decode")}
                className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                  mode === "decode"
                    ? "bg-[#e5322d] text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Base64 Decode
              </button>
            </div>

            <label className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold rounded-xl cursor-pointer flex items-center gap-1.5 transition-colors">
              <Upload className="w-3.5 h-3.5 text-slate-500" /> Upload File
              <input type="file" onChange={handleFileUpload} className="hidden" />
            </label>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                const sample = mode === "encode" ? "Hello World! SamToolbox Base64 Test." : "SGVsbG8gV29ybGQhIFNhbVRvb2xib3ggQmFzZTY0IFRlc3Qu";
                handleConvert(sample, mode);
              }}
              className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors font-medium"
            >
              Load Sample
            </button>
            <button
              onClick={() => {
                setInputText("");
                setOutputText("");
                setError(null);
              }}
              className="p-2 text-slate-400 hover:text-red-600 transition-colors"
              title="Clear all"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Input & Output Split View */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700">
              <span>{mode === "encode" ? "Source Text / String" : "Base64 Input"}</span>
              <span className="text-[11px] text-slate-400">{inputText.length} characters</span>
            </div>
            <textarea
              value={inputText}
              onChange={(e) => handleConvert(e.target.value, mode)}
              placeholder={mode === "encode" ? "Type or paste text to encode into Base64..." : "Paste Base64 encoded string to decode..."}
              className="w-full h-64 p-4 font-mono text-xs sm:text-sm bg-slate-50 text-slate-900 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500 leading-relaxed resize-y"
              spellCheck={false}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700">
              <span>{mode === "encode" ? "Base64 Result" : "Decoded Text"}</span>
              {outputText && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopy}
                    className="px-2.5 py-1 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? "Copied" : "Copy"}
                  </button>
                  <button
                    onClick={handleDownload}
                    className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" /> Save
                  </button>
                </div>
              )}
            </div>
            <textarea
              readOnly
              value={error || outputText}
              placeholder="Base64 output will appear here automatically..."
              className={`w-full h-64 p-4 font-mono text-xs sm:text-sm rounded-2xl border leading-relaxed resize-y focus:outline-none ${
                error
                  ? "bg-red-50 text-red-700 border-red-200 font-sans"
                  : "bg-slate-900 text-slate-100 border-slate-800 selection:bg-red-500/40"
              }`}
              spellCheck={false}
            />
          </div>
        </div>

        {/* Security & Standard Guarantee */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
          <span className="flex items-center gap-1.5 text-emerald-600 font-medium">
            <ShieldCheck className="w-4 h-4" /> 100% In-Browser Memory Conversion (Zero Remote Logging)
          </span>
          <span className="text-[11px] text-slate-400">Strict RFC 4648 UTF-8 Byte Support</span>
        </div>
      </div>
    </div>
  );
}
