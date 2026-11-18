"use client";

import { useState, useMemo } from "react";
import {
  Ruler,
  Scale,
  Thermometer,
  Gauge,
  HardDrive,
  Droplets,
  ArrowRightLeft,
  ShieldCheck,
  Check,
  Copy,
} from "lucide-react";

type UnitCategory = "length" | "weight" | "temperature" | "speed" | "storage" | "volume";

const CONVERSION_FACTORS: Record<string, Record<string, number>> = {
  length: {
    m: 1,
    km: 1000,
    cm: 0.01,
    mm: 0.001,
    mi: 1609.344,
    yd: 0.9144,
    ft: 0.3048,
    in: 0.0254,
  },
  weight: {
    kg: 1,
    g: 0.001,
    mg: 0.000001,
    lb: 0.45359237,
    oz: 0.0283495,
    tonne: 1000,
  },
  speed: {
    "km/h": 1,
    "mph": 1.60934,
    "m/s": 3.6,
    "knot": 1.852,
  },
  storage: {
    B: 1,
    KB: 1024,
    MB: 1024 ** 2,
    GB: 1024 ** 3,
    TB: 1024 ** 4,
  },
  volume: {
    l: 1,
    ml: 0.001,
    gal: 3.78541,
    cup: 0.236588,
    fl_oz: 0.0295735,
  },
};

const UNIT_LABELS: Record<string, Record<string, string>> = {
  length: {
    m: "Meters (m)",
    km: "Kilometers (km)",
    cm: "Centimeters (cm)",
    mm: "Millimeters (mm)",
    mi: "Miles (mi)",
    yd: "Yards (yd)",
    ft: "Feet (ft)",
    in: "Inches (in)",
  },
  weight: {
    kg: "Kilograms (kg)",
    g: "Grams (g)",
    mg: "Milligrams (mg)",
    lb: "Pounds (lbs)",
    oz: "Ounces (oz)",
    tonne: "Metric Tonnes (t)",
  },
  temperature: {
    c: "Celsius (°C)",
    f: "Fahrenheit (°F)",
    k: "Kelvin (K)",
  },
  speed: {
    "km/h": "Kilometers per hour (km/h)",
    "mph": "Miles per hour (mph)",
    "m/s": "Meters per second (m/s)",
    "knot": "Knots (kn)",
  },
  storage: {
    B: "Bytes (B)",
    KB: "Kilobytes (KB)",
    MB: "Megabytes (MB)",
    GB: "Gigabytes (GB)",
    TB: "Terabytes (TB)",
  },
  volume: {
    l: "Liters (L)",
    ml: "Milliliters (mL)",
    gal: "US Gallons (gal)",
    cup: "US Cups",
    fl_oz: "Fluid Ounces (fl oz)",
  },
};

export default function UnitConverterPage() {
  const [category, setCategory] = useState<UnitCategory>("length");
  const [fromUnit, setFromUnit] = useState<string>("km");
  const [toUnit, setToUnit] = useState<string>("mi");
  const [value, setValue] = useState<number>(10);
  const [copied, setCopied] = useState(false);

  // Switch category defaults
  const handleCategoryChange = (newCat: UnitCategory) => {
    setCategory(newCat);
    const keys = Object.keys(UNIT_LABELS[newCat]);
    setFromUnit(keys[0]);
    setToUnit(keys[1] || keys[0]);
  };

  const convertedValue = useMemo(() => {
    if (isNaN(value)) return "0";

    if (category === "temperature") {
      let tempC = value;
      if (fromUnit === "f") tempC = ((value - 32) * 5) / 9;
      else if (fromUnit === "k") tempC = value - 273.15;

      let target = tempC;
      if (toUnit === "f") target = (tempC * 9) / 5 + 32;
      else if (toUnit === "k") target = tempC + 273.15;

      return target.toFixed(2);
    }

    const catFactors = CONVERSION_FACTORS[category];
    const baseValue = value * (catFactors[fromUnit] || 1);
    const result = baseValue / (catFactors[toUnit] || 1);
    return result.toLocaleString(undefined, { maximumFractionDigits: 6 });
  }, [category, fromUnit, toUnit, value]);

  const handleSwap = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`${convertedValue} ${toUnit}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-100 text-[#e5322d] text-xs font-bold mb-4">
          <Ruler className="w-3.5 h-3.5" />
          NIST &amp; BIPM Standard International Units
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-3">
          Universal Measurement &amp; Unit Converter
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Convert length, mass, temperature, speed, data storage, and volume measurements across metric and imperial systems instantly.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        {/* Categories Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 border-b border-slate-100 pb-4">
          {[
            { id: "length", label: "Length", icon: <Ruler className="w-3.5 h-3.5" /> },
            { id: "weight", label: "Weight & Mass", icon: <Scale className="w-3.5 h-3.5" /> },
            { id: "temperature", label: "Temperature", icon: <Thermometer className="w-3.5 h-3.5" /> },
            { id: "speed", label: "Speed", icon: <Gauge className="w-3.5 h-3.5" /> },
            { id: "storage", label: "Digital Storage", icon: <HardDrive className="w-3.5 h-3.5" /> },
            { id: "volume", label: "Volume & Liquid", icon: <Droplets className="w-3.5 h-3.5" /> },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id as UnitCategory)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer ${
                category === cat.id
                  ? "bg-[#e5322d] text-white shadow-xs"
                  : "bg-slate-50 text-slate-600 hover:bg-slate-100"
              }`}
            >
              {cat.icon}
              {cat.label}
            </button>
          ))}
        </div>

        {/* Converter Inputs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center pt-2">
          {/* From */}
          <div className="md:col-span-5 space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase block">From</label>
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(parseFloat(e.target.value) || 0)}
              className="w-full p-3.5 text-lg font-bold bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <select
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
              className="w-full p-2.5 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl"
            >
              {Object.entries(UNIT_LABELS[category]).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>

          {/* Swap Button */}
          <div className="md:col-span-2 flex justify-center py-2 md:py-0">
            <button
              onClick={handleSwap}
              className="p-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full transition-transform active:rotate-180 cursor-pointer"
              title="Swap Units"
            >
              <ArrowRightLeft className="w-4 h-4" />
            </button>
          </div>

          {/* To */}
          <div className="md:col-span-5 space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase block">To</label>
            <div className="p-3.5 bg-slate-900 text-slate-100 rounded-2xl border border-slate-800 text-lg font-bold font-mono truncate">
              {convertedValue}
            </div>
            <select
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value)}
              className="w-full p-2.5 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl"
            >
              {Object.entries(UNIT_LABELS[category]).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Copy Result */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs text-slate-500 font-mono">
            {value} {fromUnit} = {convertedValue} {toUnit}
          </span>
          <button
            onClick={handleCopy}
            className="px-3.5 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? "Copied!" : "Copy Result"}
          </button>
        </div>

        {/* Privacy Note */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
          <span className="flex items-center gap-1.5 text-emerald-600 font-medium">
            <ShieldCheck className="w-4 h-4" /> 100% In-Browser Math Calculations
          </span>
          <span className="text-[11px] text-slate-400">SI &amp; Imperial Certified Benchmarks</span>
        </div>
      </div>
    </div>
  );
}
