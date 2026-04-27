"use client";

import { useState } from "react";
import { Type, Copy, RefreshCw, Sparkles, BookOpen, HelpCircle } from "lucide-react";

const UNICODE_FONTS = [
  {
    name: "Bold",
    map: {
      a: "𝐚", b: "𝐛", c: "𝐜", d: "𝐝", e: "𝐞", f: "𝐟", g: "𝐠", h: "𝐡", i: "𝐢", j: "𝐣", k: "𝐤", l: "𝐥", m: "𝐦", n: "𝐧", o: "𝐨", p: "𝐩", q: "𝐪", r: "𝐫", s: "𝐬", t: "𝐭", u: "𝐮", v: "𝐯", w: "𝐰", x: "𝐱", y: "𝐲", z: "𝐳",
      A: "𝐀", B: "𝐁", C: "𝐂", D: "𝐃", E: "𝐄", F: "𝐅", G: "𝐆", H: "𝐇", I: "𝐈", J: "𝐉", K: "𝐊", L: "𝐋", M: "𝐌", N: "𝐍", O: "𝐎", P: "𝐏", Q: "𝐐", R: "𝐑", S: "𝐒", T: "𝐓", U: "𝐔", V: "𝐕", W: "𝐖", X: "𝐗", Y: "𝐘", Z: "𝐙",
      0: "𝟎", 1: "𝟏", 2: "𝟐", 3: "𝟑", 4: "𝟒", 5: "𝟟", 6: "𝟔", 7: "𝟕", 8: "𝟖", 9: "𝟗"
    }
  },
  {
    name: "Italic",
    map: {
      a: "𝑎", b: "𝑏", c: "𝑐", d: "𝑑", e: "𝑒", f: "𝑓", g: "𝑔", h: "ℎ", i: "𝑖", j: "𝑗", k: "𝑘", l: "𝑙", m: "𝑚", n: "𝑛", o: "𝑜", p: "𝑝", q: "𝑞", r: "𝑟", s: "𝑠", t: "𝑡", u: "𝑢", v: "𝑣", w: "𝑤", x: "𝑥", y: "𝑦", z: "𝑧",
      A: "𝐴", B: "𝐵", C: "𝐶", D: "𝐷", E: "𝐸", F: "𝐹", G: "𝐺", H: "𝐻", I: "𝐼", J: "𝐽", K: "𝐾", L: "𝐿", M: "𝑀", N: "𝑁", O: "𝑂", P: "𝑃", Q: "𝑄", R: "𝑅", S: "𝑆", T: "𝑇", U: "𝑈", V: "𝑉", W: "𝑊", X: "𝑋", Y: "𝑌", Z: "𝑍"
    }
  },
  {
    name: "Bold Italic",
    map: {
      a: "𝒂", b: "𝒃", c: "𝒄", d: "𝒅", e: "𝒆", f: "𝒇", g: "𝒈", h: "𝒉", i: "𝒊", j: "𝒋", k: "𝒌", l: "𝒍", m: "𝒎", n: "𝒏", o: "𝒐", p: "𝒑", q: "𝒒", r: "𝒓", s: "𝒔", t: "𝒕", u: "𝒖", v: "𝒗", w: "𝒘", x: "𝒙", y: "𝒚", z: "𝒛",
      A: "𝑨", B: "𝑩", C: "𝑪", D: "𝑫", E: "𝑬", F: "𝑭", G: "𝑮", H: "𝑯", I: "𝑰", J: "𝑱", K: "𝑲", L: "𝑳", M: "𝑴", N: "𝑵", O: "𝑶", P: "𝑷", Q: "𝑸", R: "𝑹", S: "𝑺", T: "𝑻", U: "𝑼", V: "𝑽", W: "𝑾", X: "𝑿", Y: "𝒀", Z: "𝒁"
    }
  },
  {
    name: "Script",
    map: {
      a: "𝒶", b: "𝒷", c: "𝒸", d: "𝒹", e: "ℯ", f: "𝒻", g: "ℊ", h: "𝒽", i: "𝒾", j: "𝒿", k: "𝓀", l: "𝓁", m: "𝓂", n: "𝓃", o: "ℴ", p: "𝓅", q: "𝓆", r: "𝓇", s: "𝓈", t: "𝓉", u: "𝓊", v: "𝓋", w: "𝓌", x: "𝓍", y: "𝓎", z: "𝓏",
      A: "𝒜", B: "ℬ", C: "𝒞", D: "𝒟", E: "ℰ", F: "ℱ", G: "𝒢", H: "ℋ", I: "ℐ", J: "𝒥", K: "𝒦", L: "ℒ", M: "ℳ", N: "𝒩", O: "𝒪", P: "𝒫", Q: "𝒬", R: "ℛ", S: "𝒮", T: "𝒯", U: "𝒰", V: "𝒱", W: "𝒲", X: "𝒳", Y: "𝒴", Z: "𝒵"
    }
  },
  {
    name: "Monospace",
    map: {
      a: "𝚊", b: "𝚋", c: "𝚌", d: "𝚍", e: "𝚎", f: "𝚏", g: "𝚐", h: "𝚑", i: "𝚒", j: "𝚓", k: "𝚔", l: "𝚕", m: "𝚖", n: "𝚗", o: "𝚘", p: "𝚙", q: "𝚚", r: "𝚛", s: "𝚜", t: "𝚝", u: "𝚞", v: "𝚟", w: "𝚠", x: "𝚡", y: "𝚢", z: "𝚣",
      A: "𝙰", B: "𝙱", C: "𝙲", D: "𝙳", E: "𝙴", F: "𝙵", G: "𝙶", H: "𝙷", I: "𝙸", J: "𝙹", K: "𝙺", L: "𝙻", M: "𝙼", N: "𝙽", O: "𝙾", P: "𝙿", Q: "𝚀", R: "𝚁", S: "𝚂", T: "𝚃", U: "𝚄", V: "𝚅", W: "𝚆", X: "𝚇", Y: "𝚈", Z: "𝚉",
      0: "𝟶", 1: "𝟷", 2: "𝟸", 3: "𝟹", 4: "𝟺", 5: "𝟻", 6: "𝟼", 7: "𝟽", 8: "𝟾", 9: "𝟿"
    }
  },
  {
    name: "Double Struck",
    map: {
      a: "𝕒", b: "𝕓", c: "𝕔", d: "𝕕", e: "𝕖", f: "𝕗", g: "𝕘", h: "𝕙", i: "𝕚", j: "𝕛", k: "𝕜", l: "𝕝", m: "𝕞", n: "𝕟", o: "𝕠", p: "𝕡", q: "𝕢", r: "𝕣", s: "𝕤", t: "𝕥", u: "𝕦", v: "𝕧", w: "𝕨", x: "𝕩", y: "𝕪", z: "𝕫",
      A: "𝔸", B: "𝔹", C: "ℂ", D: "𝔻", E: "𝔼", F: "𝔽", G: "𝔾", H: "ℍ", I: "𝕀", J: "𝕁", K: "𝕂", L: "𝕃", M: "𝕄", N: "ℕ", O: "𝕆", P: "ℙ", Q: "ℚ", R: "ℝ", S: "𝕊", T: "𝕋", U: "𝕌", V: "𝕍", W: "𝕎", X: "𝕏", Y: "𝕐", Z: "ℤ",
      0: "𝟘", 1: "𝟙", 2: "𝟚", 3: "𝟛", 4: "𝟟", 5: "𝟝", 6: "𝟞", 7: "𝟟", 8: "𝟠", 9: "𝟡"
    }
  },
  {
    name: "Bubble",
    map: {
      a: "ⓐ", b: "ⓑ", c: "ⓒ", d: "ⓓ", e: "ⓔ", f: "ⓕ", g: "ⓖ", h: "ⓗ", i: "ⓘ", j: "ⓙ", k: "ⓚ", l: "ⓛ", m: "ⓜ", n: "ⓝ", o: "ⓞ", p: "ⓟ", q: "ⓠ", r: "ⓡ", s: "ⓢ", t: "ⓣ", u: "ⓤ", v: "ⓥ", w: "ⓦ", x: "ⓧ", y: "ⓨ", z: "ⓩ",
      A: "Ⓐ", B: "Ⓑ", C: "Ⓒ", D: "Ⓓ", E: "Ⓔ", F: "Ⓕ", G: "Ⓖ", H: "Ⓗ", I: "Ⓘ", J: "Ⓙ", K: "Ⓚ", L: "Ⓛ", M: "Ⓜ", N: "Ⓝ", O: "Ⓞ", P: "Ⓟ", Q: "Ⓠ", R: "Ⓡ", S: "Ⓢ", T: "Ⓣ", U: "Ⓤ", V: "Ⓥ", W: "Ⓦ", X: "Ⓧ", Y: "Ⓨ", Z: "Ⓩ",
      0: "⓪", 1: "①", 2: "②", 3: "③", 4: "④", 5: "⑤", 6: "⑥", 7: "⑦", 8: "⑧", 9: "⑨"
    }
  }
];

export default function FontGeneratorPage() {
  const [text, setText] = useState("Type something cool...");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const applyMapping = (input: string, map: Record<string, string | undefined>) => {
    return input.split('').map(char => map[char] || char).join('');
  };

  const handleCopy = (convertedText: string, index: number) => {
    navigator.clipboard.writeText(convertedText);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">

      {/* Pro Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 text-brand-600 text-[10px] font-black uppercase tracking-[0.2em] mb-8 shadow-sm">
          <Sparkles size={14} />
          <span>Stand Out on Social Media</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-slate-800 mb-4 tracking-tight">
          Stylish <span className="text-brand-600">Font Generator</span>
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto font-medium leading-relaxed">
          Transform plain text into bold, italic, script, and unique Unicode styles.
          <span className="text-slate-900 font-semibold"> Perfect for Instagram bios, Twitter posts, gaming tags, and creative content — all processed privately in your browser.</span>
        </p>
      </div>

      {/* Text Input Card */}
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200 mb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-brand-50 rounded-lg text-brand-600">
            <Type size={20} />
          </div>
          <h2 className="text-lg font-black text-slate-800">Enter Your Text</h2>
        </div>
        <div className="relative">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type something cool... Watch it transform instantly into bold, italic, script, and 5+ unique font styles that copy-paste anywhere."
            className="w-full h-32 pl-4 pr-12 pt-4 pb-4 rounded-xl border-2 border-slate-200 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 outline-none resize-none text-slate-700 text-lg font-medium transition bg-slate-50/50"
            autoFocus
          />
          <button
            onClick={() => setText("")}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition"
            title="Clear text"
          >
            <RefreshCw size={18} />
          </button>
        </div>
        <p className="text-[10px] text-slate-400 mt-2 uppercase tracking-wider">
          Tip: Try mixing styles — copy individual fonts or combine them for maximum impact
        </p>
      </div>

      {/* Font Styles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {UNICODE_FONTS.map((font, index) => {
          const converted = applyMapping(text, font.map);
          return (
            <div key={index} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-brand-200 transition group">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">{font.name}</span>
                <button
                  onClick={() => handleCopy(converted, index)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                    copiedIndex === index
                      ? "bg-green-100 text-green-700"
                      : "bg-brand-50 text-brand-600 hover:bg-brand-100 opacity-0 group-hover:opacity-100 md:opacity-100"
                  }`}
                >
                  <Copy size={14} />
                  {copiedIndex === index ? "Copied!" : "Copy"}
                </button>
              </div>
              <p className="text-xl text-slate-800 break-words min-h-[3rem] font-medium leading-relaxed">
                {converted || <span className="text-slate-300 italic">Start typing above...</span>}
              </p>
            </div>
          )
        })}
      </div>

      {/* Information Section */}
      <div className="max-w-7xl mx-auto mt-20 grid lg:grid-cols-2 gap-12 border-t border-slate-100 pt-16">
        <div className="space-y-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-brand-50 rounded-xl text-brand-600">
              <BookOpen size={20} />
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Styling Protocol</h2>
          </div>
          
          <div className="space-y-6">
            {[
              { step: "01", title: "Character Injection", desc: "Enter your phrase into the primary workspace. Our engine maps your input to specialized Unicode planes in real-time." },
              { step: "02", title: "Visual Selection", desc: "Choose from Bold, Script, or Bubble styles. These are unique character sets that maintain styling across all platforms." },
              { step: "03", title: "Rapid Deployment", desc: "Utilize the one-click copy mechanism. The styled text is stored in your clipboard, ready for instant social media integration." },
              { step: "04", title: "Privacy Integrity", desc: "Every character transformation is performed via local JavaScript. No keystrokes are logged, ensuring total privacy." }
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
            <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Typography FAQ</h2>
          </div>

          <div className="space-y-4">
            {[
              { q: "Why does it work everywhere?", a: "These aren't font files; we use 'Mathematical Alphanumeric Symbols', which are natively supported by modern operating systems." },
              { q: "Is it safe for bios?", a: "Yes. Copying these characters into your Instagram, Twitter, or LinkedIn bio is safe and helps your profile stand out visually." },
              { q: "Why do some characters shift?", a: "Certain Unicode styles utilize specialized symbols that might have slight variations depending on the system's rendering engine." },
              { q: "Can I use this for gaming?", a: "Absolutely. These styles are perfect for gaming tags or handles, provided the platform supports Unicode character sets." }
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
