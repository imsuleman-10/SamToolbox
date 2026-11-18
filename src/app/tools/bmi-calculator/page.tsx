"use client";

import { useState, useMemo } from "react";
import {
  Activity,
  Heart,
  Scale,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Info,
} from "lucide-react";

export default function BmiCalculatorPage() {
  const [unitSystem, setUnitSystem] = useState<"metric" | "imperial">("metric");

  // Metric State
  const [heightCm, setHeightCm] = useState<number>(175);
  const [weightKg, setWeightKg] = useState<number>(70);

  // Imperial State
  const [heightFt, setHeightFt] = useState<number>(5);
  const [heightIn, setHeightIn] = useState<number>(9);
  const [weightLbs, setWeightLbs] = useState<number>(155);

  const bmiData = useMemo(() => {
    let bmi = 0;
    let heightInMeters = 0;

    if (unitSystem === "metric") {
      heightInMeters = heightCm / 100;
      if (heightInMeters > 0) {
        bmi = weightKg / (heightInMeters * heightInMeters);
      }
    } else {
      const totalInches = heightFt * 12 + heightIn;
      heightInMeters = totalInches * 0.0254;
      if (totalInches > 0) {
        bmi = (weightLbs / (totalInches * totalInches)) * 703;
      }
    }

    // Category Determination according to WHO standard
    let category = "Normal weight";
    let color = "text-emerald-600";
    let badgeBg = "bg-emerald-50 border-emerald-200 text-emerald-700";
    let rangeDesc = "You have a healthy and optimal body mass ratio.";

    if (bmi < 18.5) {
      category = "Underweight";
      color = "text-amber-600";
      badgeBg = "bg-amber-50 border-amber-200 text-amber-700";
      rangeDesc = "Your BMI indicates you are below the recommended healthy body weight.";
    } else if (bmi >= 18.5 && bmi < 24.9) {
      category = "Normal Weight";
      color = "text-emerald-600";
      badgeBg = "bg-emerald-50 border-emerald-200 text-emerald-700";
      rangeDesc = "Great job! Your weight is in the optimal range for your height.";
    } else if (bmi >= 25 && bmi < 29.9) {
      category = "Overweight";
      color = "text-orange-600";
      badgeBg = "bg-orange-50 border-orange-200 text-orange-700";
      rangeDesc = "Your BMI is slightly above normal. Incorporating daily activity is recommended.";
    } else {
      category = "Obesity";
      color = "text-red-600";
      badgeBg = "bg-red-50 border-red-200 text-red-700";
      rangeDesc = "Your BMI is in the obese range. We advise consulting a healthcare professional.";
    }

    // Healthy weight range (BMI 18.5 - 24.9)
    const minHealthyKg = (18.5 * (heightInMeters * heightInMeters)).toFixed(1);
    const maxHealthyKg = (24.9 * (heightInMeters * heightInMeters)).toFixed(1);

    return {
      score: bmi > 0 ? bmi.toFixed(1) : "0.0",
      category,
      color,
      badgeBg,
      rangeDesc,
      idealWeight: `${minHealthyKg} kg – ${maxHealthyKg} kg`,
    };
  }, [unitSystem, heightCm, weightKg, heightFt, heightIn, weightLbs]);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-100 text-[#e5322d] text-xs font-bold mb-4">
          <Activity className="w-3.5 h-3.5" />
          World Health Organization (WHO) Standard
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-3">
          Body Mass Index (BMI) Calculator
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Calculate your Body Mass Index (BMI), ideal weight range, and fitness category according to international WHO health standards.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-8">
        {/* Unit Toggle */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Select Unit System</span>
          <div className="inline-flex rounded-xl bg-slate-100 p-1">
            <button
              onClick={() => setUnitSystem("metric")}
              className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                unitSystem === "metric" ? "bg-[#e5322d] text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Metric (kg / cm)
            </button>
            <button
              onClick={() => setUnitSystem("imperial")}
              className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                unitSystem === "imperial" ? "bg-[#e5322d] text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Imperial (lbs / ft &amp; in)
            </button>
          </div>
        </div>

        {/* Inputs & Result Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Input Controls */}
          <div className="md:col-span-6 space-y-5">
            {unitSystem === "metric" ? (
              <>
                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-700 mb-1.5">
                    <span>Height: {heightCm} cm</span>
                    <span className="text-slate-400 font-normal">{(heightCm / 100).toFixed(2)} m</span>
                  </div>
                  <input
                    type="range"
                    min="100"
                    max="220"
                    value={heightCm}
                    onChange={(e) => setHeightCm(parseInt(e.target.value) || 170)}
                    className="w-full accent-red-600 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-700 mb-1.5">
                    <span>Weight: {weightKg} kg</span>
                    <span className="text-slate-400 font-normal">{(weightKg * 2.20462).toFixed(1)} lbs</span>
                  </div>
                  <input
                    type="range"
                    min="30"
                    max="180"
                    value={weightKg}
                    onChange={(e) => setWeightKg(parseInt(e.target.value) || 70)}
                    className="w-full accent-red-600 cursor-pointer"
                  />
                </div>
              </>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 mb-1 block">Height (Feet)</label>
                    <input
                      type="number"
                      min="3"
                      max="7"
                      value={heightFt}
                      onChange={(e) => setHeightFt(parseInt(e.target.value) || 5)}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 mb-1 block">Inches</label>
                    <input
                      type="number"
                      min="0"
                      max="11"
                      value={heightIn}
                      onChange={(e) => setHeightIn(parseInt(e.target.value) || 0)}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 mb-1 block">Weight (Pounds / lbs)</label>
                  <input
                    type="number"
                    min="50"
                    max="400"
                    value={weightLbs}
                    onChange={(e) => setWeightLbs(parseInt(e.target.value) || 150)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-sm"
                  />
                </div>
              </>
            )}
          </div>

          {/* Result Card */}
          <div className="md:col-span-6 bg-slate-50 border border-slate-200 rounded-2xl p-6 text-center space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Calculated Body Mass Index</span>
            <div className="text-5xl sm:text-6xl font-black text-slate-900 tracking-tight">
              {bmiData.score}
            </div>

            <div>
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${bmiData.badgeBg}`}>
                {bmiData.category}
              </span>
              <p className="text-xs text-slate-600 mt-2 max-w-xs mx-auto leading-relaxed">
                {bmiData.rangeDesc}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-200 text-xs text-slate-500">
              <span className="font-semibold text-slate-700">Healthy Weight Range for your height:</span>
              <div className="font-mono font-bold text-slate-800 text-sm mt-0.5">{bmiData.idealWeight}</div>
            </div>
          </div>
        </div>

        {/* WHO Reference Scale */}
        <div className="pt-4 border-t border-slate-100">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">WHO Official BMI Classifications</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
            <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200">
              <span className="font-bold text-amber-800 block">&lt; 18.5</span>
              <span className="text-[11px] text-amber-700">Underweight</span>
            </div>
            <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200">
              <span className="font-bold text-emerald-800 block">18.5 – 24.9</span>
              <span className="text-[11px] text-emerald-700 font-medium">Normal Weight</span>
            </div>
            <div className="p-2.5 rounded-xl bg-orange-50 border border-orange-200">
              <span className="font-bold text-orange-800 block">25.0 – 29.9</span>
              <span className="text-[11px] text-orange-700">Overweight</span>
            </div>
            <div className="p-2.5 rounded-xl bg-red-50 border border-red-200">
              <span className="font-bold text-red-800 block">&ge; 30.0</span>
              <span className="text-[11px] text-red-700">Obese</span>
            </div>
          </div>
        </div>

        {/* Privacy Note */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
          <span className="flex items-center gap-1.5 text-emerald-600 font-medium">
            <ShieldCheck className="w-4 h-4" /> 100% In-Browser Privacy (Zero Health Data Stored)
          </span>
          <span className="text-[11px] text-slate-400">Strict WHO Epidemiological Standard</span>
        </div>
      </div>
    </div>
  );
}
