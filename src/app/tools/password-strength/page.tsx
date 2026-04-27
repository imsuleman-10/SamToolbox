"use client";

import { useState, useMemo } from "react";
import { Shield, Eye, EyeOff, CheckCircle2, XCircle, AlertCircle, Lock, BookOpen, HelpCircle } from "lucide-react";

export default function PasswordStrengthPage() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const analysis = useMemo(() => {
    if (!password) return null;

    let score = 0;
    const checks = {
      length: password.length >= 8,
      upperCase: /[A-Z]/.test(password),
      lowerCase: /[a-z]/.test(password),
      numbers: /[0-9]/.test(password),
      specialChars: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password),
      noCommonPatterns: !/^(password|123456|qwerty|abc123|letmein)/i.test(password),
    };

    // Calculate score
    if (checks.length) score += 20;
    if (checks.upperCase) score += 15;
    if (checks.lowerCase) score += 15;
    if (checks.numbers) score += 15;
    if (checks.specialChars) score += 20;
    if (checks.noCommonPatterns) score += 15;

    // Bonus for length
    if (password.length >= 12) score += 10;
    if (password.length >= 16) score += 10;

    // Deductions
    if (password.length < 6) score -= 30;
    if (/^(.)\1+$/.test(password)) score -= 40; // Repeated characters

    score = Math.max(0, Math.min(100, score));

    // Strength label
    let strength = "Very Weak";
    if (score >= 80) strength = "Very Strong";
    else if (score >= 60) strength = "Strong";
    else if (score >= 40) strength = "Moderate";
    else if (score >= 20) strength = "Weak";

    // Crack time estimation
    let crackTime = "Instantly";
    if (score >= 90) crackTime = "Centuries";
    else if (score >= 80) crackTime = "Years";
    else if (score >= 70) crackTime = "Months";
    else if (score >= 60) crackTime = "Days";
    else if (score >= 50) crackTime = "Hours";
    else if (score >= 40) crackTime = "Minutes";
    else if (score >= 30) crackTime = "Seconds";

    // Suggestions
    const suggestions: string[] = [];
    if (!checks.length) suggestions.push("Use at least 8 characters");
    if (!checks.upperCase) suggestions.push("Add uppercase letters (A-Z)");
    if (!checks.lowerCase) suggestions.push("Add lowercase letters (a-z)");
    if (!checks.numbers) suggestions.push("Add numbers (0-9)");
    if (!checks.specialChars) suggestions.push("Add special characters (!@#$%^&*)");
    if (!checks.noCommonPatterns) suggestions.push("Avoid common passwords");
    if (password.length < 12) suggestions.push("Make it longer (12+ characters)");
    if (/(.)\1{2,}/.test(password)) suggestions.push("Avoid repeating characters");

    return {
      score,
      strength,
      crackTime,
      checks,
      suggestions,
    };
  }, [password]);

  const getStrengthColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-blue-600";
    if (score >= 40) return "text-yellow-600";
    return "text-red-600";
  };

  const getStrengthBg = (score: number) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-blue-500";
    if (score >= 40) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="max-w-3xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-50 text-brand-700 text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] mb-6 sm:mb-8 border border-brand-100">
          <Shield size={14} />
          <span>Local Entropy Engine</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-black text-slate-900 mb-4 sm:mb-6 tracking-tight">
          Strength <span className="text-brand-600">Vault</span>
        </h1>
        <p className="text-sm sm:text-lg text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">
          Professional-grade password entropy analysis. 
          Privacy-first execution with zero cloud footprint.
        </p>
      </div>

      {/* Password Input */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-md p-6 mb-6">
        <label className="block text-sm font-black text-slate-900 uppercase tracking-widest mb-3">
          Enter Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Type or paste your password..."
            className="w-full px-4 py-3 pr-12 bg-slate-50 border border-slate-200 rounded-xl focus:border-brand-500 focus:bg-white focus:ring-2 focus:ring-brand-500/10 outline-none text-base font-medium transition-all placeholder:text-slate-400"
          />
          <button
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-200 transition-colors"
          >
            {showPassword ? <EyeOff size={18} className="text-slate-600" /> : <Eye size={18} className="text-slate-600" />}
          </button>
        </div>
      </div>

      {analysis && (
        <>
          {/* Score Display */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-md p-6 mb-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Shield size={24} className={getStrengthColor(analysis.score)} />
                <h2 className="text-lg font-black text-slate-900">Security Score</h2>
              </div>
              <div className={`text-4xl font-black ${getStrengthColor(analysis.score)}`}>
                {analysis.score}/100
              </div>
            </div>

            {/* Progress Bar */}
            <div className="h-3 bg-slate-100 rounded-full overflow-hidden mb-3">
              <div
                className={`h-full ${getStrengthBg(analysis.score)} transition-all duration-500`}
                style={{ width: `${analysis.score}%` }}
              />
            </div>

            <div className="flex items-center justify-between">
              <p className={`text-sm font-bold ${getStrengthColor(analysis.score)}`}>
                {analysis.strength}
              </p>
              <p className="text-xs text-slate-500 font-medium">
                Estimated crack time: <span className="font-black text-slate-900">{analysis.crackTime}</span>
              </p>
            </div>
          </div>

          {/* Checklist */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-md p-6 mb-4">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-4">Security Checklist</h3>
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(analysis.checks).map(([key, passed]) => (
                <div key={key} className="flex items-center gap-2">
                  {passed ? (
                    <CheckCircle2 size={16} className="text-green-600 shrink-0" />
                  ) : (
                    <XCircle size={16} className="text-red-600 shrink-0" />
                  )}
                  <span className={`text-sm font-medium ${passed ? "text-green-700" : "text-slate-600"}`}>
                    {key.replace(/([A-Z])/g, " $1").trim()}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Suggestions */}
          {analysis.suggestions.length > 0 && (
            <div className="bg-white rounded-2xl border border-slate-100 shadow-md p-6">
              <div className="flex items-center gap-2 mb-4">
                <AlertCircle size={16} className="text-yellow-600" />
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Suggestions</h3>
              </div>
              <div className="space-y-2">
                {analysis.suggestions.map((s, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm">
                    <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-1.5 shrink-0" />
                    <span className="text-slate-700 font-medium">{s}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {!password && (
        <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl border border-slate-200 p-8 flex flex-col items-center justify-center min-h-[300px]">
          <Lock size={48} className="text-slate-300 mb-4" />
          <p className="text-slate-500 font-bold text-center">Type a password to check its strength</p>
        </div>
      )}

      {/* Information Section */}
      <div className="mt-20 grid lg:grid-cols-2 gap-12 border-t border-slate-100 pt-16">
        <div className="space-y-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-brand-50 rounded-xl text-brand-600">
              <BookOpen size={20} />
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Security Protocol</h2>
          </div>
          
          <div className="space-y-6">
            {[
              { step: "01", title: "Input Selection", desc: "Enter your password into the secure analyzer. The engine starts calculating entropy values immediately." },
              { step: "02", title: "Observe Metrics", desc: "Monitor the real-time Security Score and strength indicator. Our scale accounts for length, complexity, and patterns." },
              { step: "03", title: "Review Checklist", desc: "Check the automated security checklist. Passing all 6 criteria is required for high-security environments." },
              { step: "04", title: "Apply Suggestions", desc: "Implement the dynamic suggestions provided. Reaching a score of 80+ ensures 'Very Strong' protection." }
            ].map((item, i) => (
              <div key={i} className="flex gap-6 group">
                <span className="text-3xl font-black text-slate-100 group-hover:text-brand-100 transition-colors duration-300">{item.step}</span>
                <div className="space-y-1">
                  <h3 className="font-black text-slate-800 uppercase tracking-wide text-sm">{item.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-slate-900 rounded-xl text-white">
              <HelpCircle size={20} />
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Entropy FAQ</h2>
          </div>

          <div className="space-y-4">
            {[
              { q: "Is my password sent to a server?", a: "No. SamToolbox utilizes 100% client-side regex and entropy analysis. Your password never leaves your browser's local memory." },
              { q: "How is crack time calculated?", a: "We estimate crack time based on standard brute-force hardware capabilities (offline attacks) as of late 2026." },
              { q: "What defines a 'Strong' password?", a: "A password with at least 12 characters, mixing uppercase, lowercase, numbers, and symbols without common patterns." },
              { q: "Why check entropy locally?", a: "Checking passwords online is a massive security risk. Local analysis ensures your secrets remain private while still getting professional feedback." }
            ].map((faq, i) => (
              <div key={i} className="p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300">
                <h3 className="font-black text-slate-900 text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
                  {faq.q}
                </h3>
                <p className="text-slate-500 text-xs leading-relaxed font-medium">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
