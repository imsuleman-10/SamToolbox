"use client";

import { useState } from "react";
import jsPDF from "jspdf";
import { Download, Percent, Sparkles, ArrowRight } from "lucide-react";

export default function PercentageCalculatorPage() {
  // Mode 1: What is X% of Y?
  const [p1, setP1] = useState<number>(15);
  const [v1, setV1] = useState<number>(2500);

  // Mode 2: Percentage Increase / Decrease from X to Y
  const [fromVal, setFromVal] = useState<number>(120);
  const [toVal, setToVal] = useState<number>(180);

  // Mode 3: Discount calculation
  const [origPrice, setOrigPrice] = useState<number>(8500);
  const [discPercent, setDiscPercent] = useState<number>(30);

  // Calculations
  const r1 = ((p1 / 100) * v1).toFixed(2);

  const diff = toVal - fromVal;
  const pctChange = fromVal !== 0 ? ((diff / fromVal) * 100).toFixed(2) : "0.00";

  const savedAmount = ((discPercent / 100) * origPrice).toFixed(2);
  const finalPrice = (origPrice - parseFloat(savedAmount)).toFixed(2);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-100 text-[#e5322d] text-xs font-bold mb-4">
          <Percent className="w-3.5 h-3.5" />
          Math & Commercial Standard
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-3">
          Percentage & Discount Calculator
        </h1>
        <p className="text-slate-600 text-sm leading-relaxed">
          Solve everyday percentage questions, compute sale discounts, price markups, and percentage increase or decrease.
        </p>
      </div>

      <div className="space-y-6">
        {/* Module 1: X% of Y */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">
            1. What is X% of Y?
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
            <div className="sm:col-span-4 flex items-center gap-2">
              <span className="text-sm font-semibold text-slate-600">What is</span>
              <input
                type="number"
                value={p1}
                onChange={(e) => setP1(parseFloat(e.target.value) || 0)}
                className="w-20 p-2 text-sm font-bold bg-slate-50 border border-slate-300 rounded-lg text-center"
              />
              <span className="text-sm font-semibold text-slate-600">%</span>
            </div>

            <div className="sm:col-span-4 flex items-center gap-2">
              <span className="text-sm font-semibold text-slate-600">of</span>
              <input
                type="number"
                value={v1}
                onChange={(e) => setV1(parseFloat(e.target.value) || 0)}
                className="w-full p-2 text-sm font-bold bg-slate-50 border border-slate-300 rounded-lg text-center"
              />
            </div>

            <div className="sm:col-span-4 text-right">
              <span className="text-xs font-bold text-slate-400 block">Result:</span>
              <span className="text-2xl font-black text-[#e5322d]">{r1}</span>
            </div>
          </div>
        </div>

        {/* Module 2: Percentage Increase / Decrease */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">
            2. Percentage Change (Increase / Decrease)
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
            <div className="sm:col-span-4 flex items-center gap-2">
              <span className="text-sm font-semibold text-slate-600">From</span>
              <input
                type="number"
                value={fromVal}
                onChange={(e) => setFromVal(parseFloat(e.target.value) || 0)}
                className="w-full p-2 text-sm font-bold bg-slate-50 border border-slate-300 rounded-lg text-center"
              />
            </div>

            <div className="sm:col-span-4 flex items-center gap-2">
              <span className="text-sm font-semibold text-slate-600">to</span>
              <input
                type="number"
                value={toVal}
                onChange={(e) => setToVal(parseFloat(e.target.value) || 0)}
                className="w-full p-2 text-sm font-bold bg-slate-50 border border-slate-300 rounded-lg text-center"
              />
            </div>

            <div className="sm:col-span-4 text-right">
              <span className="text-xs font-bold text-slate-400 block">Difference:</span>
              <span className={`text-2xl font-black ${parseFloat(pctChange) >= 0 ? "text-emerald-600" : "text-red-600"}`}>
                {parseFloat(pctChange) >= 0 ? `+${pctChange}%` : `${pctChange}%`}
              </span>
            </div>
          </div>
        </div>

        {/* Module 3: Retail Discount Calculator */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">
            3. Retail Sale Discount Calculator
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
            <div>
              <label className="block text-[11px] font-bold text-slate-500 mb-1">Original Price</label>
              <input
                type="number"
                value={origPrice}
                onChange={(e) => setOrigPrice(parseFloat(e.target.value) || 0)}
                className="w-full p-2.5 text-sm font-bold bg-slate-50 border border-slate-300 rounded-xl"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-500 mb-1">Discount % Off</label>
              <input
                type="number"
                value={discPercent}
                onChange={(e) => setDiscPercent(parseFloat(e.target.value) || 0)}
                className="w-full p-2.5 text-sm font-bold bg-slate-50 border border-slate-300 rounded-xl"
              />
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl text-right">
              <p className="text-xs text-slate-500">You Save: <strong className="text-emerald-600">{savedAmount}</strong></p>
              <p className="text-xl font-black text-[#e5322d]">Pay: {finalPrice}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
