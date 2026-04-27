"use client";

import { useState } from "react";
import { Globe, Copy, Check, Zap, Info, Share2, Search, Target, ImageIcon, HelpCircle, BookOpen } from "lucide-react";

import { generateSoftwareApplicationSchema } from "@/lib/structuredData";

export default function SeoMetaGeneratorPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [keywords, setKeywords] = useState("");
  const [author, setAuthor] = useState("");
  const [type, setType] = useState("website");
  const [schemaType, setSchemaType] = useState("none");
  const [copied, setCopied] = useState(false);

  const metaTags = `
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
<meta property="twitter:image" content="https://yourdomain.com/og-image.png">`.trim();

  const jsonLd = schemaType === "none" ? "" : `
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
</script>`.trim();

  const fullCode = `${metaTags}\n\n${jsonLd}`.trim();

  const handleCopy = () => {
    navigator.clipboard.writeText(fullCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getHealth = (val: string, target: number) => {
    if (val.length === 0) return "text-slate-300";
    if (val.length <= target) return "text-emerald-500";
    return "text-rose-500";
  };

  return (
    <div className="max-w-7xl mx-auto py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateSoftwareApplicationSchema("seo-meta-generator", "Professional SEO Meta Engine for high-ranking websites.")) }}
      />

      {/* Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 mb-12 sm:mb-16">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-[10px] font-black uppercase tracking-[0.2em] border border-blue-100">
            <Zap size={12} />
            <span>SEO Engineering Protocol</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tighter leading-none">
            Meta <span className="text-blue-600">Architect</span>
          </h1>
          <p className="text-slate-500 text-sm sm:text-base font-medium max-w-md">
            Generate industrial-grade metadata and structured JSON-LD schemas to dominate search rankings.
          </p>
        </div>

        <div className="flex items-center gap-4 p-6 bg-slate-50 rounded-3xl border border-slate-100">
           <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center text-blue-500 shadow-sm border border-slate-100">
              <Target size={20} />
           </div>
           <div>
              <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest leading-none mb-1">Index Ready</p>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tight">V3 Core Web Vital Compliant</p>
           </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-12">
        {/* Workspace */}
        <div className="lg:col-span-7 space-y-8">
          <div className="bg-white rounded-[2rem] sm:rounded-[2.5rem] border border-slate-100 shadow-2xl overflow-hidden">
            <div className="bg-slate-50/50 px-6 sm:px-10 py-5 sm:py-6 border-b border-slate-100 flex items-center justify-between">
               <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Metadata Configuration</span>
               </div>
               <div className="flex gap-2">
                  <div className="w-2 h-2 rounded-full bg-slate-200" />
                  <div className="w-2 h-2 rounded-full bg-slate-200" />
               </div>
            </div>

            <div className="p-6 sm:p-10 space-y-8">
              <div>
                <div className="flex justify-between items-end mb-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Page Title</label>
                  <span className={`text-[10px] font-black uppercase ${getHealth(title, 60)}`}>{title.length}/60</span>
                </div>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Best Software Engineering Tools | SAMToolBox"
                  className="w-full px-5 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-slate-50 border-2 border-transparent focus:border-blue-500/20 focus:bg-white focus:ring-4 focus:ring-blue-500/5 outline-none transition-all text-sm font-bold text-slate-700 placeholder:text-slate-200"
                />
              </div>

              <div>
                <div className="flex justify-between items-end mb-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Meta Description</label>
                  <span className={`text-[10px] font-black uppercase ${getHealth(description, 160)}`}>{description.length}/160</span>
                </div>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Summarize your content to drive clicks from Google..."
                  rows={4}
                  className="w-full px-5 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-slate-50 border-2 border-transparent focus:border-blue-500/20 focus:bg-white focus:ring-4 focus:ring-blue-500/5 outline-none transition-all text-sm font-bold text-slate-700 placeholder:text-slate-200 resize-none leading-relaxed"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-6 sm:grid-cols-2 gap-8">
                 <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block px-1">Author / Brand</label>
                    <input
                      type="text"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      placeholder="SAMToolBox"
                      className="w-full px-5 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-slate-50 border-2 border-transparent focus:border-blue-500/20 focus:bg-white focus:ring-4 focus:ring-blue-500/5 outline-none transition-all text-sm font-bold text-slate-700"
                    />
                 </div>
                 <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block px-1">Content Type</label>
                    <select
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                      className="w-full px-5 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-slate-50 border-2 border-transparent focus:border-blue-500/20 focus:bg-white outline-none transition-all text-sm font-bold text-slate-700 cursor-pointer"
                    >
                      <option value="website">Website</option>
                      <option value="article">Article</option>
                      <option value="product">Product</option>
                    </select>
                 </div>
              </div>

              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block px-1">JSON-LD Schema</label>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                   {["none", "article", "product"].map((s) => (
                      <button
                        key={s}
                        onClick={() => setSchemaType(s)}
                        className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${schemaType === s ? "bg-blue-600 text-white shadow-lg shadow-blue-200" : "bg-slate-50 text-slate-400 hover:bg-slate-100"}`}
                      >
                        {s}
                      </button>
                   ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Output & Preview */}
        <div className="lg:col-span-5 space-y-8">
           {/* Code Editor */}
           <div className="bg-[#0f172a] rounded-[2rem] sm:rounded-[2.5rem] shadow-2xl p-6 sm:p-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-blue-500 rounded-full blur-[80px] opacity-20" />
              
              <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                 <h3 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-3">
                    <Globe size={18} className="text-blue-400" />
                    Source Code
                 </h3>
                 <button
                   onClick={handleCopy}
                   className={`w-full sm:w-auto px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${copied ? "bg-emerald-500 text-white" : "bg-white/10 text-white hover:bg-white/20"}`}
                 >
                   {copied ? <Check size={14} /> : <Copy size={14} />}
                   {copied ? "COPIED" : "COPY CODE"}
                 </button>
              </div>

              <div className="bg-slate-900/50 rounded-2xl p-4 sm:p-6 border border-white/5 font-mono text-[10px] sm:text-[11px] text-blue-300/80 leading-relaxed h-[300px] overflow-auto scrollbar-hide whitespace-pre-wrap break-all">
                 {fullCode}
              </div>
           </div>

           {/* Google Preview */}
           <div className="bg-white rounded-[2rem] sm:rounded-[2.5rem] border border-slate-100 shadow-xl p-6 sm:p-10">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 sm:mb-8 flex items-center gap-3">
                <Search size={16} />
                SERP Preview
              </h3>
              
              <div className="space-y-2 w-full overflow-hidden">
                 <p className="text-slate-400 text-[10px] sm:text-xs truncate">https://yourdomain.com › tools › architect</p>
                 <h4 className="text-blue-700 text-lg sm:text-xl font-medium hover:underline cursor-pointer truncate">
                   {title || "Enter a page title..."}
                 </h4>
                 <p className="text-slate-600 text-xs sm:text-sm line-clamp-2 leading-relaxed">
                   {description || "Meta description will appear here as a snippet in search results. Make it compelling to increase CTR."}
                 </p>
              </div>
           </div>

           {/* Insights */}
           <div className="bg-blue-600 rounded-[2rem] p-8 text-white shadow-2xl shadow-blue-200">
              <div className="flex items-center gap-3 mb-4">
                <Info size={18} />
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">Optimization Tip</span>
              </div>
              <p className="text-xs font-bold text-blue-100 leading-relaxed">
                Google prioritizes "Information Gain". Ensure your title contains your primary keyword, and your description provides a clear benefit to the user.
              </p>
           </div>
        </div>
      </div>

      {/* Information Section */}
      <div className="mt-20 grid lg:grid-cols-2 gap-12 border-t border-slate-100 pt-16">
        <div className="space-y-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-50 rounded-xl text-blue-600">
              <BookOpen size={20} />
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Deployment Protocol</h2>
          </div>
          
          <div className="space-y-6">
            {[
              { step: "01", title: "Title Optimization", desc: "Input your primary page title. Our engine monitors length in real-time to ensure zero truncation on Google SERPs." },
              { step: "02", title: "Semantic Description", desc: "Craft a meta description that includes your secondary keywords. This acts as your 'Ad Copy' in search results." },
              { step: "03", title: "Schema Injection", desc: "Select a JSON-LD schema (Article or Product). This provides structured data that search engines use for rich snippets." },
              { step: "04", title: "Code Integration", desc: "Click 'Copy Code' and paste the entire block inside the <head> tags of your website for immediate indexing." }
            ].map((item, i) => (
              <div key={i} className="flex gap-6 group">
                <span className="text-3xl font-black text-slate-100 group-hover:text-blue-100 transition-colors duration-300">{item.step}</span>
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
            <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">SEO Intelligence FAQ</h2>
          </div>

          <div className="space-y-4">
            {[
              { q: "Why do you recommend 60 characters for titles?", a: "Most browsers and search engines (Google, Bing) have a pixel width limit. 60 characters is the safe threshold for full visibility." },
              { q: "What is the benefit of JSON-LD schemas?", a: "Schemas help search engines understand context (e.g., this is a 'Product' with a 'Price'). This can lead to 20-30% higher click-through rates." },
              { q: "Are social media tags included?", a: "Yes. Every generation automatically includes Open Graph (Facebook/LinkedIn) and Twitter Card tags to ensure your links look professional when shared." },
              { q: "Is this tool GDPR compliant?", a: "SamToolbox is privacy-first. We do not track, store, or transmit any of the keywords or titles you enter. Processing is 100% local." }
            ].map((faq, i) => (
              <div key={i} className="p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300">
                <h3 className="font-black text-slate-900 text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
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
