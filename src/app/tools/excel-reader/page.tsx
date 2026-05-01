"use client";

import { useState, useRef, useMemo } from "react";
import { Upload, X, Table as TableIcon, ShieldCheck, Zap, HelpCircle, BookOpen, Search, FileSpreadsheet, Download } from "lucide-react";
import { generateSoftwareApplicationSchema } from "@/lib/structuredData";

export default function ExcelReaderPage() {
  const [htmlData, setHtmlData] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [sheetNames, setSheetNames] = useState<string[]>([]);
  const [activeSheet, setActiveSheet] = useState<string>("");
  const [workbook, setWorkbook] = useState<any | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const schema = useMemo(() => generateSoftwareApplicationSchema("excel-reader", "Privacy-first Excel and CSV reader with local-only data processing and secure tabular visualization."), []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setIsProcessing(true);
      const file = e.target.files[0];
      setFileName(file.name);
      
      try {
        const XLSX = await import("xlsx");
        const buffer = await file.arrayBuffer();
        const wb = XLSX.read(buffer, { type: "buffer" });
        setWorkbook(wb);
        
        if (wb.SheetNames.length > 0) {
          setSheetNames(wb.SheetNames);
          await changeSheet(wb, wb.SheetNames[0]);
        }
      } catch (error) {
        console.error("Error reading excel file:", error);
        alert("System Conflict: Unsupported or corrupted bitstream. Re-check file encoding.");
      } finally {
        setIsProcessing(false);
      }
    }
  };

  const changeSheet = async (wb: any, sheetName: string) => {
    setActiveSheet(sheetName);
    const XLSX = await import("xlsx");
    const worksheet = wb.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    setHtmlData(JSON.stringify(data)); 
  };

  const clearFile = () => {
    setHtmlData(null);
    setFileName("");
    setWorkbook(null);
    setSheetNames([]);
    setActiveSheet("");
    setSearchQuery("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const downloadCSV = async () => {
    if (!workbook || !activeSheet) return;
    const XLSX = await import("xlsx");
    const worksheet = workbook.Sheets[activeSheet];
    const csv = XLSX.utils.sheet_to_csv(worksheet);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `extracted-${fileName.split(".")[0]}-${activeSheet}.csv`;
    link.click();
  };

  const parsedData = htmlData ? JSON.parse(htmlData) : [];
  const filteredData = parsedData.filter((row: any[]) => 
    row.some(cell => String(cell ?? "").toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-[#020617] selection:bg-emerald-500/30 selection:text-emerald-200">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* ══════════════════════════════════════════
          HERO / HEADER
      ══════════════════════════════════════════ */}
      <section className="pt-24 pb-32 px-6 relative overflow-hidden text-center">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 font-black text-[10px] uppercase tracking-[0.4em] mb-10 shadow-2xl">
            <Zap size={14} className="animate-pulse" />
            Sheet Analyzer v12.1
          </div>
          <h1 className="text-6xl md:text-[7rem] font-black text-white tracking-tighter mb-8 leading-none">
            Universal <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400 italic">Sheet.</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-3xl mx-auto font-medium leading-relaxed">
            High-performance data visualization. 
            <span className="text-slate-200 font-bold block mt-2">Local Binary Parsing. Zero Cloud Storage. Absolute Sovereignty.</span>
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          MAIN UTILITY INTERFACE
      ══════════════════════════════════════════ */}
      <section className="max-w-[1600px] mx-auto px-6 -mt-16 relative z-20 mb-32">
        {!htmlData ? (
          <div className="max-w-4xl mx-auto">
            <div 
              onClick={() => !isProcessing && fileInputRef.current?.click()}
              className="bg-[#0f172a] rounded-[3.5rem] border border-white/5 shadow-3xl shadow-black p-20 flex flex-col items-center justify-center group cursor-pointer hover:border-emerald-500/30 transition-all hover:bg-emerald-500/[0.02] text-center animate-in fade-in slide-in-from-bottom-8 duration-700"
            >
               <div className="w-32 h-32 bg-white/5 rounded-[2.5rem] flex items-center justify-center text-slate-500 group-hover:text-emerald-400 group-hover:scale-110 transition-all duration-500 mb-10 border border-white/5">
                  <FileSpreadsheet size={56} />
               </div>
               <h3 className="text-3xl font-black text-white uppercase tracking-tighter mb-4 italic">Inject Dataset</h3>
               <p className="text-slate-500 font-bold uppercase tracking-widest text-xs max-w-sm leading-relaxed">
                  Support for .xlsx, .xls, and .csv binaries. Pure local ingestion.
               </p>
               <input
                 type="file"
                 accept=".xlsx, .xls, .csv"
                 className="hidden"
                 ref={fileInputRef}
                 onChange={handleFileChange}
               />
            </div>
          </div>
        ) : (
          <div className="bg-[#0f172a] rounded-[3.5rem] border border-white/5 shadow-3xl shadow-black overflow-hidden animate-in zoom-in-95 duration-500 min-h-[800px] flex flex-col">
             {/* Header Control */}
             <div className="bg-white/5 px-10 py-8 border-b border-white/5 flex flex-col xl:flex-row items-center justify-between gap-8 shrink-0">
                <div className="flex items-center gap-6 min-w-0">
                   <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-emerald-400">
                      <TableIcon size={24} />
                   </div>
                   <div className="min-w-0">
                      <h4 className="text-white font-black truncate max-w-[200px] md:max-w-md tracking-tight uppercase leading-none">{fileName}</h4>
                      <div className="text-[10px] font-black text-slate-600 uppercase tracking-widest mt-1 italic">Local Buffer Active</div>
                   </div>
                </div>

                <div className="flex-1 max-w-2xl relative group">
                   <Search size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-emerald-400 transition-colors" />
                   <input 
                     value={searchQuery}
                     onChange={e => setSearchQuery(e.target.value)}
                     placeholder="QUERY BUFFER..."
                     className="w-full pl-16 pr-8 py-4 bg-black/40 border border-white/5 rounded-2xl focus:border-emerald-500/30 outline-none text-white font-bold transition-all uppercase text-xs tracking-widest"
                   />
                </div>

                <div className="flex items-center gap-4">
                   <button 
                     onClick={downloadCSV}
                     className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 border border-white/5 shadow-xl"
                   >
                     <Download size={16} /> Export CSV
                   </button>
                   <button 
                     onClick={clearFile}
                     className="px-8 py-4 bg-rose-600/10 hover:bg-rose-600/20 text-rose-400 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 border border-rose-500/20 shadow-xl"
                   >
                     <X size={16} /> Purge Buffer
                   </button>
                </div>
             </div>

             {/* Sheet Selector */}
             {sheetNames.length > 1 && (
               <div className="bg-white/5 px-10 py-4 border-b border-white/5 flex items-center gap-4 overflow-x-auto no-scrollbar">
                  {sheetNames.map(name => (
                    <button
                      key={name}
                      onClick={() => changeSheet(workbook, name)}
                      className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeSheet === name ? "bg-emerald-600 text-white shadow-lg" : "bg-white/5 text-slate-500 hover:text-white"}`}
                    >
                      {name}
                    </button>
                  ))}
               </div>
             )}

             {/* Table Workspace */}
             <div className="flex-1 overflow-auto custom-scrollbar bg-black/20 p-10">
                <table className="w-full text-left border-collapse min-w-[1000px]">
                   <thead>
                      <tr className="border-b border-white/10">
                         {parsedData[0]?.map((col: any, i: number) => (
                           <th key={i} className="px-6 py-4 text-[10px] font-black text-emerald-400 uppercase tracking-widest bg-white/5 border-r border-white/5">
                              {col || `Vector ${i+1}`}
                           </th>
                         ))}
                      </tr>
                   </thead>
                   <tbody>
                      {filteredData.slice(1).map((row: any[], i: number) => (
                        <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group">
                           {row.map((cell: any, j: number) => (
                             <td key={j} className="px-6 py-4 text-xs font-medium text-slate-400 group-hover:text-white transition-colors border-r border-white/5">
                                {cell ?? ""}
                             </td>
                           ))}
                        </tr>
                      ))}
                   </tbody>
                </table>
             </div>
          </div>
        )}

        {/* ══════════════════════════════════════════
            DOCUMENTATION & FAQ
        ══════════════════════════════════════════ */}
        <div className="mt-40 border-t border-slate-800 pt-40">
          <div className="grid lg:grid-cols-2 gap-24 items-start">
            <div className="space-y-16">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-emerald-500/10 rounded-[1.5rem] flex items-center justify-center text-emerald-400 border border-emerald-500/20">
                  <HelpCircle size={32} />
                </div>
                <div>
                  <h2 className="text-4xl font-black text-white uppercase tracking-tight leading-none italic">Analyzer <span className="text-emerald-400">FAQ</span></h2>
                  <p className="text-slate-500 font-bold text-[10px] uppercase tracking-widest mt-2">Data Queries</p>
                </div>
              </div>

              <div className="space-y-6">
                {[
                  { q: "Is data synchronized to the cloud?", a: "Negative. The engine utilizes browser-side array buffers. Your data never leaves your workstation's local environment." },
                  { q: "Maximum dataset capacity?", a: "The analyzer is optimized for high-concurrency binary parsing; however, workstation RAM limits apply for multi-million row datasets." },
                  { q: "CSV Export Fidelity?", a: "Absolute. The export engine maps active sheet buffers directly to standard RFC-compliant CSV bitstreams." }
                ].map((faq, i) => (
                  <div key={i} className="p-8 bg-white/5 rounded-[2.5rem] border border-white/5 hover:border-emerald-500/20 transition-all group">
                    <h3 className="font-black text-white text-sm mb-4 flex items-start gap-4">
                      <span className="text-emerald-400 font-mono">Q.</span> {faq.q}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed font-medium pl-8 group-hover:text-slate-300 transition-colors">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#0f172a] rounded-[4rem] p-16 md:p-20 text-white relative overflow-hidden border border-white/5">
               <div className="absolute top-0 right-0 w-full h-full opacity-[0.02] pointer-events-none" style={{ backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
               <div className="relative z-10 text-center sm:text-left">
                  <div className="w-24 h-24 bg-emerald-500/10 border border-emerald-500/20 rounded-[2rem] flex items-center justify-center mb-12 shadow-[0_0_80px_rgba(16,185,129,0.2)] mx-auto sm:mx-0">
                    <BookOpen size={48} className="text-emerald-400" />
                  </div>
                  <h3 className="text-4xl font-black mb-8 tracking-tight uppercase leading-none">Best Practices</h3>
                  <p className="text-slate-400 font-medium mb-16 leading-relaxed text-xl">
                    For optimal visualization of complex datasets, utilize the 
                    'Query Buffer' to isolate specific data vectors.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-12">
                     <div className="space-y-4">
                        <div className="text-4xl font-black text-white tracking-tighter">0-LOG</div>
                        <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-[0.3em]">Privacy Index</div>
                     </div>
                     <div className="space-y-4">
                        <div className="text-4xl font-black text-white tracking-tighter">RAW</div>
                        <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-[0.3em]">Memory Parse</div>
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
