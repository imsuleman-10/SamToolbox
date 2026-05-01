"use client";

import { useState, useMemo } from "react";
import { 
  Globe, Copy, Check, Zap, Info, Share2, 
  Search, Target, ImageIcon, HelpCircle, 
  BookOpen, ShieldCheck, Eye, Code, Terminal, Settings, Shield, Cpu,
  Activity, SearchCode
} from "lucide-react";
import { generateSoftwareApplicationSchema } from "@/lib/structuredData";

export default function SeoMetaGeneratorPage() {
  const [title, setTitle] = useState("SAMToolBox | Professional Privacy-First Utilities");
  const [description, setDescription] = useState("Access industrial-grade developer tools designed for high-performance workflows. Universal image conversion, PDF manipulation, and SEO architecture.");
  const [keywords, setKeywords] = useState("developer tools, seo generator, pdf utilities, image converter, samtoolbox");
  const [author, setAuthor] = useState("Suleman Mughal");
  const [type, setType] = useState("website");
  const [schemaType, setSchemaType] = useState("none");
  const [copied, setCopied] = useState(false);

  const metaTags = useMemo(() => `
<!-- Primary Meta Tags -->
<title>${title || "Your Page Title"}</title>
<meta name="title" content="${title || ""}">
<meta name="description" content="${description || ""}">
<meta name="keywords" content="${keywords || ""}">
<meta name="author" content="${author || ""}">

<!-- Open Graph / Facebook -->
<meta property="og:type" content="${type}">
<meta property="og:url" content="https://yourdomain.com/">
<meta property="og:title" content="${title || ""}">
<meta property="og:description" content="${description || ""}">
<meta property="og:image" content="https://yourdomain.com/og-image.png">

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:url" content="https://yourdomain.com/">
<meta property="twitter:title" content="${title || ""}">
<meta property="twitter:description" content="${description || ""}">
<meta property="twitter:image" content="https://yourdomain.com/og-image.png">`.trim(), [title, description, keywords, author, type]);

  const jsonLd = useMemo(() => schemaType === "none" ? "" : `
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "${schemaType === "article" ? "Article" : "Product"}",
  "headline": "${title || ""}",
  "author": {
    "@type": "Person",
    "name": "${author || "SamToolbox"}"
  },
  "description": "${description || ""}",
  "image": "https://yourdomain.com/image.png"
}
</script>`.trim(), [schemaType, title, author, description]);

  const fullCode = useMemo(() => `${metaTags}\n\n${jsonLd}`.trim(), [metaTags, jsonLd]);

  const handleCopy = () => {
    navigator.clipboard.writeText(fullCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const schema = useMemo(() => generateSoftwareApplicationSchema("seo-meta-generator", "Professional SEO Meta Engine for high-ranking websites."), []);

  return (
    <div className="min-h-screen bg-[#020617] selection:bg-blue-500/30 selection:text-blue-200">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* ══════════════════════════════════════════
          HERO / HEADER
      ══════════════════════════════════════════ */}
      <section className="pt-24 pb-32 px-6 relative overflow-hidden text-center">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 font-black text-[10px] uppercase tracking-[0.4em] mb-10 shadow-2xl">
            <SearchCode size={14} className="animate-pulse" />
            Meta Architect v7.4
          </div>
          <h1 className="text-6xl md:text-[7rem] font-black text-white tracking-tighter mb-8 leading-none">
            SEO <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 italic">Gen.</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-3xl mx-auto font-medium leading-relaxed">
            Universal meta-architecture for SERP dominance. 
            <span className="text-slate-200 font-bold block mt-2">Open Graph Synthesis. JSON-LD Integration. Zero Cloud Telemetry.</span>
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          MAIN UTILITY INTERFACE
      ══════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-6 -mt-16 relative z-20 mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Workspace */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-[#0f172a] rounded-[3.5rem] border border-white/5 shadow-3xl shadow-black overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-700">
               <div className="bg-white/5 px-10 py-8 border-b border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                     <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-2xl text-blue-400">
                        <Terminal size={22} />
                     </div>
                     <div>
                        <h3 className="text-lg font-black text-white uppercase tracking-tighter leading-none">Parameter Matrix</h3>
                        <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mt-1 italic">Defining page signals</p>
                     </div>
                  </div>
                  <div className="flex items-center gap-3">
                     <button 
                       onClick={handleCopy}
                       className="px-6 py-3 bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-xl flex items-center gap-2"
                     >
                       {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? "Copied" : "Copy Architect Code"}
                     </button>
                  </div>
               </div>

               <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-10">
                  {/* Inputs */}
                  <div className="space-y-10">
                     <div className="space-y-4">
                        <div className="flex items-center justify-between ml-4">
                           <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Page Title</label>
                           <span className={`text-[10px] font-black uppercase tracking-widest ${title.length > 60 ? "text-rose-500" : "text-emerald-500"}`}>{title.length}/60</span>
                        </div>
                        <input 
                          type="text"
                          value={title}
                          onChange={e => setTitle(e.target.value)}
                          className="w-full bg-black/40 border border-white/5 rounded-2xl px-6 py-4 text-white font-bold outline-none focus:border-blue-500/30 transition-all text-sm"
                        />
                     </div>

                     <div className="space-y-4">
                        <div className="flex items-center justify-between ml-4">
                           <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Meta Description</label>
                           <span className={`text-[10px] font-black uppercase tracking-widest ${description.length > 160 ? "text-rose-500" : "text-emerald-500"}`}>{description.length}/160</span>
                        </div>
                        <textarea 
                          value={description}
                          onChange={e => setDescription(e.target.value)}
                          className="w-full h-32 bg-black/40 border border-white/5 rounded-[2rem] p-6 text-white font-medium text-sm leading-relaxed outline-none focus:border-blue-500/30 transition-all resize-none custom-scrollbar"
                        />
                     </div>

                     <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-4">
                           <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Schema Type</label>
                           <select 
                             value={schemaType}
                             onChange={e => setSchemaType(e.target.value)}
                             className="w-full bg-black/40 border border-white/5 rounded-2xl px-6 py-4 text-white font-bold outline-none appearance-none cursor-pointer focus:border-blue-500/30 transition-all text-xs"
                           >
                              <option value="none">None</option>
                              <option value="article">Article</option>
                              <option value="product">Product</option>
                           </select>
                        </div>
                        <div className="space-y-4">
                           <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Author</label>
                           <input 
                             type="text"
                             value={author}
                             onChange={e => setAuthor(e.target.value)}
                             className="w-full bg-black/40 border border-white/5 rounded-2xl px-6 py-4 text-white font-bold outline-none focus:border-blue-500/30 transition-all text-sm"
                           />
                        </div>
                     </div>
                  </div>

                  {/* Code View */}
                  <div className="relative group">
                     <div className="absolute inset-0 bg-blue-500/5 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                     <div className="relative bg-black/60 border border-white/5 rounded-[2.5rem] p-10 h-full font-mono text-sm leading-relaxed text-blue-400/90 overflow-auto custom-scrollbar">
                        <div className="flex items-center justify-between mb-8 border-b border-blue-500/10 pb-4">
                           <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-500">Output Vector</span>
                           <Code size={16} />
                        </div>
                        <pre className="whitespace-pre-wrap">{fullCode}</pre>
                     </div>
                  </div>
               </div>
            </div>
          </div>

          {/* Action Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-[#0f172a] p-10 rounded-[3.5rem] border border-white/5 shadow-3xl shadow-black relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-full blur-3xl" />
               <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-2xl text-blue-400">
                    <Activity size={24} />
                  </div>
                  <h3 className="text-xl font-black text-white uppercase tracking-tighter">Status</h3>
               </div>
               <div className="space-y-6">
                  <div className="flex items-center justify-between text-sm">
                     <span className="text-slate-500 font-bold">Protocols</span>
                     <span className="text-white font-black uppercase tracking-widest text-[10px]">OG / Twitter / LD</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                     <span className="text-slate-500 font-bold">Standard</span>
                     <span className="text-white font-black uppercase tracking-widest text-[10px]">W3C Semantic</span>
                  </div>
                  <div className="flex items-center gap-3 text-[9px] font-black text-blue-500 uppercase tracking-[0.4em] pt-4 border-t border-white/5">
                     <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                     Generator Operational
                  </div>
               </div>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-cyan-700 p-10 rounded-[3.5rem] text-white relative overflow-hidden shadow-3xl border border-blue-500/20">
               <ShieldCheck size={120} className="absolute -bottom-10 -right-10 opacity-10 group-hover:rotate-12 transition-transform duration-1000" />
               <h3 className="text-2xl font-black mb-4 uppercase tracking-tighter italic">Vault Secure</h3>
               <p className="text-blue-100 font-medium text-sm leading-relaxed">
                  SEO meta data is synthesized strictly within the browser memory buffer. No site configuration telemetry is transmitted to cloud nodes.
               </p>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════
            DOCUMENTATION & FAQ
        ══════════════════════════════════════════ */}
        <div className="mt-40 border-t border-slate-800 pt-40">
          <div className="grid lg:grid-cols-2 gap-24 items-start">
            <div className="space-y-16">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-blue-500/10 rounded-[1.5rem] flex items-center justify-center text-blue-400 border border-blue-500/20">
                  <HelpCircle size={32} />
                </div>
                <div>
                  <h2 className="text-4xl font-black text-white uppercase tracking-tight leading-none italic">Meta <span className="text-blue-400">FAQ</span></h2>
                  <p className="text-slate-500 font-bold text-[10px] uppercase tracking-widest mt-2">Architecture Queries</p>
                </div>
              </div>

              <div className="space-y-6">
                {[
                  { q: "Why 60 characters for titles?", a: "Industry standard for SERP health. Exceeding 60 characters causes engines to truncate the title, lowering click-through velocity (CTR)." },
                  { q: "What is JSON-LD Schema?", a: "A standardized format for context delivery. It enables rich results (star ratings, product info) directly on the search results page." },
                  { q: "Are social media tags included?", a: "Affirmative. Every generation includes Open Graph (Facebook/LinkedIn) and Twitter Card tags for optimized sharing visibility." }
                ].map((faq, i) => (
                  <div key={i} className="p-8 bg-white/5 rounded-[2.5rem] border border-white/5 hover:border-blue-500/20 transition-all group">
                    <h3 className="font-black text-white text-sm mb-4 flex items-start gap-4">
                      <span className="text-blue-400 font-mono">Q.</span> {faq.q}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed font-medium pl-8 group-hover:text-slate-300 transition-colors">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#0f172a] rounded-[4rem] p-16 md:p-20 text-white relative overflow-hidden border border-white/5">
               <div className="absolute top-0 right-0 w-full h-full opacity-[0.02] pointer-events-none" style={{ backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
               <div className="relative z-10 text-center sm:text-left">
                  <div className="w-24 h-24 bg-blue-500/10 border border-blue-500/20 rounded-[2rem] flex items-center justify-center mb-12 shadow-[0_0_80px_rgba(37,99,235,0.2)] mx-auto sm:mx-0">
                    <BookOpen size={48} className="text-blue-400" />
                  </div>
                  <h3 className="text-4xl font-black mb-8 tracking-tight uppercase leading-none">Best Practices</h3>
                  <p className="text-slate-400 font-medium mb-16 leading-relaxed text-xl">
                    Embed the generated architect code strictly within the 
                    &lt;head&gt; section of your HTML or Next.js layout.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-12">
                     <div className="space-y-4">
                        <div className="text-4xl font-black text-white tracking-tighter">SEMANT</div>
                        <div className="text-[10px] font-bold text-blue-400 uppercase tracking-[0.3em]">Compliance Index</div>
                     </div>
                     <div className="space-y-4">
                        <div className="text-4xl font-black text-white tracking-tighter">RICH+</div>
                        <div className="text-[10px] font-bold text-blue-400 uppercase tracking-[0.3em]">Result Logic</div>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
