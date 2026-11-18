"use client";

import { useState, useMemo } from "react";
import {
  ShieldAlert,
  Copy,
  Check,
  ShieldCheck,
  Trash2,
  Lock,
  Clock,
  Sparkles,
  Key,
} from "lucide-react";

export default function JwtDecoderPage() {
  const [token, setToken] = useState<string>(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlN1bGVtYW4gWmFoZWVyIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMiwiZXhwIjoxOTE2MjM5MDIyfQ.4S15V2tZ7uOEvw8dZtFw1_3z0P1oG7b6qE4_aY1k2vY"
  );
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const decoded = useMemo(() => {
    if (!token.trim()) return null;
    const parts = token.trim().split(".");
    if (parts.length !== 3) {
      return { error: "Invalid JWT format. A valid JWT consists of three parts separated by dots (header.payload.signature)." };
    }

    try {
      const decodeBase64Url = (str: string) => {
        let base64 = str.replace(/-/g, "+").replace(/_/g, "/");
        while (base64.length % 4) {
          base64 += "=";
        }
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split("")
            .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
            .join("")
        );
        return JSON.parse(jsonPayload);
      };

      const header = decodeBase64Url(parts[0]);
      const payload = decodeBase64Url(parts[1]);
      const signature = parts[2];

      // Check Expiration
      let isExpired = false;
      let expDate = null;
      if (payload.exp) {
        expDate = new Date(payload.exp * 1000);
        isExpired = expDate.getTime() < Date.now();
      }

      return {
        header,
        payload,
        signature,
        isExpired,
        expDate: expDate ? expDate.toUTCString() : null,
        error: null,
      };
    } catch (err: any) {
      return { error: "Failed to decode JWT payload: " + err.message };
    }
  }, [token]);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-100 text-[#e5322d] text-xs font-bold mb-4">
          <Lock className="w-3.5 h-3.5" />
          100% In-Browser Cryptographic Token Inspector
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-3">
          JSON Web Token (JWT) Decoder &amp; Debugger
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Decode and inspect JWT headers, claims, and payload data. Unlike public third-party decoders, your sensitive tokens are 100% private and never transmitted over the internet.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        {/* Token Input */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700">
            <span>Encoded JWT Token String</span>
            <button
              onClick={() => setToken("")}
              className="text-slate-400 hover:text-red-600 transition-colors flex items-center gap-1 font-normal"
            >
              <Trash2 className="w-3.5 h-3.5" /> Clear
            </button>
          </div>
          <textarea
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="Paste your Bearer token or raw JWT here..."
            className="w-full h-32 p-4 font-mono text-xs sm:text-sm bg-slate-50 text-slate-900 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500 leading-relaxed resize-y break-all"
            spellCheck={false}
          />
        </div>

        {/* Status / Error Alert */}
        {decoded?.error ? (
          <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-red-600 shrink-0" />
            <span>{decoded.error}</span>
          </div>
        ) : decoded ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            {decoded.expDate && (
              <div
                className={`p-3 rounded-xl border flex items-center justify-between ${
                  decoded.isExpired
                    ? "bg-red-50 border-red-200 text-red-800"
                    : "bg-emerald-50 border-emerald-200 text-emerald-800"
                }`}
              >
                <span className="flex items-center gap-1.5 font-bold">
                  <Clock className="w-4 h-4" />
                  {decoded.isExpired ? "Token Status: EXPIRED" : "Token Status: ACTIVE"}
                </span>
                <span className="font-mono text-[11px]">{decoded.expDate}</span>
              </div>
            )}
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between text-slate-700">
              <span className="font-bold flex items-center gap-1.5">
                <Key className="w-4 h-4 text-red-500" /> Algorithm:
              </span>
              <span className="font-mono font-bold text-slate-900">{decoded.header?.alg || "None"}</span>
            </div>
          </div>
        ) : null}

        {/* Decoded Sections Grid */}
        {decoded && !decoded.error && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Header */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-red-600">
                <span>HEADER: Algorithm &amp; Token Type</span>
                <button
                  onClick={() => handleCopy(JSON.stringify(decoded.header, null, 2), "header")}
                  className="text-slate-500 hover:text-slate-900 flex items-center gap-1 font-normal cursor-pointer"
                >
                  {copiedKey === "header" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedKey === "header" ? "Copied" : "Copy"}
                </button>
              </div>
              <pre className="p-4 bg-slate-900 text-red-400 rounded-2xl text-xs font-mono overflow-x-auto border border-slate-800">
                {JSON.stringify(decoded.header, null, 2)}
              </pre>
            </div>

            {/* Payload */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-purple-600">
                <span>PAYLOAD: Claims &amp; Data</span>
                <button
                  onClick={() => handleCopy(JSON.stringify(decoded.payload, null, 2), "payload")}
                  className="text-slate-500 hover:text-slate-900 flex items-center gap-1 font-normal cursor-pointer"
                >
                  {copiedKey === "payload" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedKey === "payload" ? "Copied" : "Copy"}
                </button>
              </div>
              <pre className="p-4 bg-slate-900 text-purple-300 rounded-2xl text-xs font-mono overflow-x-auto border border-slate-800">
                {JSON.stringify(decoded.payload, null, 2)}
              </pre>
            </div>
          </div>
        )}

        {/* Privacy Note */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
          <span className="flex items-center gap-1.5 text-emerald-600 font-medium">
            <ShieldCheck className="w-4 h-4" /> 100% In-Browser Memory Parsing (Tokens are NEVER Sent to Any Server)
          </span>
          <span className="text-[11px] text-slate-400">Strict RFC 7519 Specification</span>
        </div>
      </div>
    </div>
  );
}
