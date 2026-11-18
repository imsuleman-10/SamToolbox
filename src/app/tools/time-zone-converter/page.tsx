"use client";

import { useState, useMemo } from "react";
import {
  Clock,
  Globe2,
  Calendar,
  RefreshCw,
  ShieldCheck,
  MapPin,
  ArrowRight,
} from "lucide-react";

interface CityZone {
  city: string;
  country: string;
  zone: string;
  offset: string;
}

const GLOBAL_ZONES: CityZone[] = [
  { city: "London", country: "United Kingdom", zone: "Europe/London", offset: "GMT / BST" },
  { city: "New York", country: "United States", zone: "America/New_York", offset: "EST / EDT" },
  { city: "San Francisco", country: "United States", zone: "America/Los_Angeles", offset: "PST / PDT" },
  { city: "Dubai", country: "United Arab Emirates", zone: "Asia/Dubai", offset: "GST (UTC+4)" },
  { city: "Lahore / Karachi", country: "Pakistan", zone: "Asia/Karachi", offset: "PKT (UTC+5)" },
  { city: "New Delhi / Mumbai", country: "India", zone: "Asia/Kolkata", offset: "IST (UTC+5:30)" },
  { city: "Tokyo", country: "Japan", zone: "Asia/Tokyo", offset: "JST (UTC+9)" },
  { city: "Sydney", country: "Australia", zone: "Australia/Sydney", offset: "AEST / AEDT" },
  { city: "Berlin / Paris", country: "Germany / France", zone: "Europe/Berlin", offset: "CET / CEST" },
  { city: "Toronto", country: "Canada", zone: "America/Toronto", offset: "EST / EDT" },
  { city: "Singapore", country: "Singapore", zone: "Asia/Singapore", offset: "SGT (UTC+8)" },
];

export default function TimeZoneConverterPage() {
  const [selectedHour, setSelectedHour] = useState<number>(14); // 2:00 PM base time
  const [baseZone, setBaseZone] = useState<string>("UTC");

  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();
  const currentDate = now.getDate();

  // Base timestamp for selected hour
  const baseTimestamp = useMemo(() => {
    return new Date(Date.UTC(currentYear, currentMonth, currentDate, selectedHour, 0, 0));
  }, [currentYear, currentMonth, currentDate, selectedHour]);

  const getTimeForZone = (timeZone: string) => {
    try {
      const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone,
        hour: "numeric",
        minute: "numeric",
        hour12: true,
        weekday: "short",
      });
      return formatter.format(baseTimestamp);
    } catch {
      return "N/A";
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-100 text-[#e5322d] text-xs font-bold mb-4">
          <Clock className="w-3.5 h-3.5" />
          Global Meeting &amp; Time Zone Planner
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-3">
          World Time Zone Converter &amp; Scheduler
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Compare international time zones, plan cross-border remote meetings, and convert hours across London, New York, Dubai, Lahore, Delhi, Tokyo, and Sydney.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        {/* Slider Timeline Control */}
        <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Scrub Time Slider (UTC Base Reference)
            </span>
            <span className="text-sm font-black font-mono text-[#e5322d]">
              {selectedHour === 0 ? "12:00 AM (Midnight)" : selectedHour === 12 ? "12:00 PM (Noon)" : selectedHour > 12 ? `${selectedHour - 12}:00 PM` : `${selectedHour}:00 AM`} UTC
            </span>
          </div>

          <input
            type="range"
            min="0"
            max="23"
            step="1"
            value={selectedHour}
            onChange={(e) => setSelectedHour(parseInt(e.target.value) || 0)}
            className="w-full accent-red-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
          />

          <div className="flex justify-between text-[11px] text-slate-400 font-mono">
            <span>00:00 UTC</span>
            <span>06:00 UTC</span>
            <span>12:00 UTC</span>
            <span>18:00 UTC</span>
            <span>23:00 UTC</span>
          </div>
        </div>

        {/* Global Cities Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {GLOBAL_ZONES.map((city) => {
            const timeStr = getTimeForZone(city.zone);
            const isNight = timeStr.includes("PM") && (parseInt(timeStr) >= 9 || parseInt(timeStr) === 12);
            return (
              <div
                key={city.city}
                className="p-4 bg-white border border-slate-200 hover:border-red-300 rounded-2xl shadow-2xs transition-all space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5 truncate">
                    <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                    {city.city}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono shrink-0">{city.offset}</span>
                </div>

                <div className="text-2xl font-black tracking-tight text-slate-900 pt-1">
                  {timeStr}
                </div>

                <p className="text-[11px] text-slate-500 truncate">
                  {city.country}
                </p>
              </div>
            );
          })}
        </div>

        {/* Privacy Note */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
          <span className="flex items-center gap-1.5 text-emerald-600 font-medium">
            <ShieldCheck className="w-4 h-4" /> 100% In-Browser Calculation via Intl Web API
          </span>
          <span className="text-[11px] text-slate-400">IANA Time Zone Database Compliant</span>
        </div>
      </div>
    </div>
  );
}
