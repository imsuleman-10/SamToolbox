"use client";

import { useState, useEffect } from "react";
import { KeyRound, Copy, Check, RefreshCw, ShieldCheck, Sparkles } from "lucide-react";

export default function PasswordGeneratorPage() {
  const [length, setLength] = useState<number>(16);
  const [useUpper, setUseUpper] = useState(true);
  const [useLower, setUseLower] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);

  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const generatePassword = () => {
    let charset = "";
    if (useUpper) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (useLower) charset += "abcdefghijklmnopqrstuvwxyz";
    if (useNumbers) charset += "0123456789";
    if (useSymbols) charset += "!@#$%^&*()_+-=[]{}|;:,.<>?";

    if (!charset) {
      setPassword("Select at least one character type");
      return;
    }

    let result = "";
    const array = new Uint32Array(length);
    window.crypto.getRandomValues(array);
    for (let i = 0; i < length; i++) {
      result += charset[array[i] % charset.length];
    }
    setPassword(result);
    setCopied(false);
  };

  useEffect(() => {
    generatePassword();
  }, [length, useUpper, useLower, useNumbers, useSymbols]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-100 text-[#e5322d] text-xs font-bold mb-4">
          <KeyRound className="w-3.5 h-3.5" />
          Cryptographic Security Standard
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-3">
          Strong Password & Key Generator
        </h1>
        <p className="text-slate-600 text-sm leading-relaxed">
          Generate cryptographically secure, randomized passwords using hardware entropy for accounts, APIs, and encryption keys.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        {/* Output Box */}
        <div className="relative flex items-center bg-slate-50 border border-slate-200 rounded-2xl p-4">
          <span className="font-mono text-base sm:text-lg font-bold text-slate-900 truncate flex-1 select-all">
            {password}
          </span>
          <div className="flex items-center gap-2 shrink-0 ml-3">
            <button
              onClick={generatePassword}
              className="p-2 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-200 transition-colors"
              title="Regenerate"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={copyToClipboard}
              className="px-4 py-2 bg-[#e5322d] hover:bg-[#cc241f] text-white rounded-xl text-xs font-bold shadow-md shadow-red-500/20 flex items-center gap-1.5 transition-all"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
        </div>

        {/* Length Slider */}
        <div>
          <div className="flex justify-between items-center text-xs font-bold uppercase text-slate-600 mb-2">
            <span>Password Length</span>
            <span className="text-[#e5322d] font-black text-sm">{length} characters</span>
          </div>
          <input
            type="range"
            min="8"
            max="64"
            value={length}
            onChange={(e) => setLength(parseInt(e.target.value, 10))}
            className="w-full accent-[#e5322d]"
          />
        </div>

        {/* Options Toggles */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          {[
            { label: "Uppercase (A-Z)", state: useUpper, set: setUseUpper },
            { label: "Lowercase (a-z)", state: useLower, set: setUseLower },
            { label: "Numbers (0-9)", state: useNumbers, set: setUseNumbers },
            { label: "Symbols (!@#$)", state: useSymbols, set: setUseSymbols },
          ].map((opt, i) => (
            <label
              key={i}
              className={`p-3 rounded-xl border text-xs font-semibold flex items-center gap-2 cursor-pointer transition-colors ${
                opt.state ? "border-[#e5322d] bg-red-50/50 text-slate-900" : "border-slate-200 bg-white text-slate-500"
              }`}
            >
              <input
                type="checkbox"
                checked={opt.state}
                onChange={(e) => opt.set(e.target.checked)}
                className="rounded text-[#e5322d] focus:ring-[#e5322d]"
              />
              {opt.label}
            </label>
          ))}
        </div>

        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3 text-xs text-emerald-800">
          <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>
            Passwords are generated using browser <code>window.crypto.getRandomValues()</code> and never transmitted across the network.
          </span>
        </div>
      </div>
    </div>
  );
}
