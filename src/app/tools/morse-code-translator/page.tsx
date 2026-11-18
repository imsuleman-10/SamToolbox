"use client";

import { useState, useMemo } from "react";
import {
  Volume2,
  Copy,
  Check,
  Trash2,
  ArrowRightLeft,
  ShieldCheck,
  Radio,
} from "lucide-react";

const MORSE_MAP: Record<string, string> = {
  A: ".-", B: "-...", C: "-.-.", D: "-..", E: ".", F: "..-.", G: "--.",
  H: "....", I: "..", J: ".---", K: "-.-", L: ".-..", M: "--", N: "-.",
  O: "---", P: ".--.", Q: "--.-", R: ".-.", S: "...", T: "-", U: "..-",
  V: "...-", W: ".--", X: "-..-", Y: "-.--", Z: "--..",
  "1": ".----", "2": "..---", "3": "...--", "4": "....-", "5": ".....",
  "6": "-....", "7": "--...", "8": "---..", "9": "----.", "0": "-----",
  " ": "/", ".": ".-.-.-", ",": "--..--", "?": "..--..", "!": "-.-.--",
};

const REVERSE_MORSE: Record<string, string> = Object.entries(MORSE_MAP).reduce(
  (acc, [char, code]) => {
    acc[code] = char;
    return acc;
  },
  {} as Record<string, string>
);

export default function MorseCodeTranslatorPage() {
  const [inputText, setInputText] = useState("SAMTOOLBOX SOS");
  const [mode, setMode] = useState<"text2morse" | "morse2text">("text2morse");
  const [copied, setCopied] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const translatedOutput = useMemo(() => {
    if (!inputText) return "";
    if (mode === "text2morse") {
      return inputText
        .toUpperCase()
        .split("")
        .map((char) => MORSE_MAP[char] || char)
        .join(" ");
    } else {
      return inputText
        .trim()
        .split(" ")
        .map((code) => (code === "/" ? " " : REVERSE_MORSE[code] || "?"))
        .join("");
    }
  }, [inputText, mode]);

  // Web Audio API playback for Morse code
  const playMorseAudio = () => {
    if (isPlaying || !translatedOutput) return;
    setIsPlaying(true);

    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const dotDuration = 0.08; // seconds
      let time = audioCtx.currentTime + 0.1;

      const morseCode = mode === "text2morse" ? translatedOutput : inputText;

      for (const symbol of morseCode) {
        if (symbol === "." || symbol === "-") {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.frequency.value = 600; // 600 Hz tone
          osc.connect(gain);
          gain.connect(audioCtx.destination);

          const duration = symbol === "." ? dotDuration : dotDuration * 3;
          osc.start(time);
          osc.stop(time + duration);
          time += duration + dotDuration; // space between parts of same letter
        } else if (symbol === " ") {
          time += dotDuration * 3; // space between letters
        } else if (symbol === "/") {
          time += dotDuration * 7; // space between words
        }
      }

      setTimeout(() => {
        setIsPlaying(false);
      }, (time - audioCtx.currentTime) * 1000);
    } catch {
      setIsPlaying(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(translatedOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-100 text-[#e5322d] text-xs font-bold mb-4">
          <Radio className="w-3.5 h-3.5" />
          International Morse Code Engine
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-3">
          Morse Code Translator &amp; Audio Player
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Translate text to Morse code and Morse code back to plain English. Listen to audio beeps with real-time Web Audio API sound synthesis.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        {/* Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="inline-flex rounded-xl bg-slate-100 p-1">
              <button
                onClick={() => setMode("text2morse")}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                  mode === "text2morse" ? "bg-[#e5322d] text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Text → Morse Code
              </button>
              <button
                onClick={() => setMode("morse2text")}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                  mode === "morse2text" ? "bg-[#e5322d] text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Morse Code → Text
              </button>
            </div>

            <button
              onClick={playMorseAudio}
              disabled={isPlaying}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer ${
                isPlaying ? "bg-amber-100 text-amber-800" : "bg-red-50 hover:bg-red-100 text-red-600"
              }`}
            >
              <Volume2 className="w-4 h-4" />
              {isPlaying ? "Playing Beeps..." : "Play Morse Audio"}
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
              {copied ? "Copied!" : "Copy"}
            </button>
            <button
              onClick={() => setInputText("")}
              className="p-2 text-slate-400 hover:text-red-600 transition-colors"
              title="Clear text"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Input & Output */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 block">
              {mode === "text2morse" ? "English Text Input" : "Morse Code (use '.' and '-' separated by space, '/' for words)"}
            </label>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={mode === "text2morse" ? "Type English sentence here..." : "e.g. ... --- ..."}
              className="w-full h-56 p-4 font-mono text-sm bg-slate-50 text-slate-900 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500 leading-relaxed resize-y"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 block">
              {mode === "text2morse" ? "Morse Code Output" : "English Text Output"}
            </label>
            <textarea
              readOnly
              value={translatedOutput}
              placeholder="Translation will appear here..."
              className="w-full h-56 p-4 font-mono text-sm bg-slate-900 text-slate-100 rounded-2xl border border-slate-800 leading-relaxed resize-y focus:outline-none select-all"
            />
          </div>
        </div>

        {/* Privacy Note */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
          <span className="flex items-center gap-1.5 text-emerald-600 font-medium">
            <ShieldCheck className="w-4 h-4" /> 100% In-Browser Audio Synthesis via Web Audio API
          </span>
          <span className="text-[11px] text-slate-400">ITU-R M.1677-1 International Standard</span>
        </div>
      </div>
    </div>
  );
}
