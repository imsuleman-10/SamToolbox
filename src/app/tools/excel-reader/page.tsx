"use client";

import { useState, useRef } from "react";
import { Upload, X, Table as TableIcon, ShieldCheck, Zap, HelpCircle, BookOpen } from "lucide-react";

export default function ExcelReaderPage() {
  const [htmlData, setHtmlData] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [sheetNames, setSheetNames] = useState<string[]>([]);
  const [activeSheet, setActiveSheet] = useState<string>("");
  const [workbook, setWorkbook] = useState<any | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

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
        alert("Unsupported or corrupted file. Please try again.");
      } finally {
        setIsProcessing(false);
      }
    }
  };

  const changeSheet = async (wb: any, sheetName: string) => {
    setActiveSheet(sheetName);
    const XLSX = await import("xlsx");
    const worksheet = wb.Sheets[sheetName];
    // Convert to JSON for easier filtering/rendering
    const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    setHtmlData(JSON.stringify(data)); // Temporarily store as stringified JSON
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
    link.download = `${fileName.split(".")[0]}-${activeSheet}.csv`;
    link.click();
  };

  const parsedData = htmlData ? JSON.parse(htmlData) : [];
  const filteredData = parsedData.filter((row: any[]) => 
    row.some(cell => String(cell ?? "").toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6">
      {/* Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase tracking-[0.2em] mb-6 border border-emerald-100">
          <ShieldCheck size={14} />
          <span>Privacy First // Local Execution</span>
        </div>
        <h1 className="text-5xl sm:text-6xl font-black text-slate-900 mb-6 tracking-tighter">
          Universal <span className="text-emerald-600">Sheet Reader</span>
        </h1>
        <p className="text-slate-500 font-medium max-w-2xl mx-auto">
          High-performance Excel and CSV visualization engine. 
          Analyze complex datasets with zero server-side exposure.
        </p>
      </div>

      {!htmlData ? (
        <div 
          className="group relative max-w-3xl mx-auto px-4"
          onClick={() => !isProcessing && fileInputRef.current?.click()}
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-[1.5rem] sm:rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
          <div className={`relative bg-white border-2 border-dashed border-slate-200 rounded-[1.5rem] sm:rounded-[2.5rem] p-8 sm:p-16 text-center cursor-pointer transition-all duration-300 hover:border-emerald-500 hover:bg-emerald-50/10 ${isProcessing ? 'opacity-50 pointer-events-none' : ''}`}>
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-emerald-50 rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto mb-6 sm:mb-8 text-emerald-600 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
              {isProcessing ? <Zap className="animate-pulse" size={28} /> : <Upload size={28} strokeWidth={2.5} />}
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-800 mb-2 sm:mb-3 uppercase tracking-tight">
              {isProcessing ? "Analyzing Dataset..." : "Import Document"}
            </h3>
            <p className="text-slate-500 font-medium mb-0 uppercase text-[9px] sm:text-[10px] tracking-widest">Select .xlsx, .xls, or .csv</p>
          </div>
          <input 
            type="file" 
            accept=".xlsx, .xls, .csv" 
            className="hidden" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
          />
        </div>
      ) : (
        <div className="bg-white rounded-[1.5rem] sm:rounded-[2rem] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden flex flex-col min-h-[500px] sm:min-h-[700px] animate-in fade-in slide-in-from-bottom-4 duration-500 mx-[-1rem] sm:mx-0">
          {/* Dashboard Control Bar */}
          <div className="bg-slate-50 border-b border-slate-100 p-4 sm:p-6 flex flex-col xl:flex-row xl:items-center justify-between gap-4 sm:gap-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-600 rounded-xl sm:rounded-2xl flex items-center justify-center text-white shadow-lg shadow-emerald-200 shrink-0">
                <TableIcon size={20} />
              </div>
              <div className="flex flex-col overflow-hidden">
                <span className="font-black text-slate-900 uppercase tracking-tighter text-base sm:text-lg truncate max-w-[150px] sm:max-w-sm">{fileName}</span>
                <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-widest">{filteredData.length} Rows Identified</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <div className="relative flex-1 min-w-[200px] sm:min-w-[250px]">
                <input 
                  type="text" 
                  placeholder="SEARCH ROWS..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 sm:py-3 bg-white border border-slate-200 rounded-lg sm:rounded-xl text-[9px] sm:text-[10px] font-black uppercase tracking-widest focus:ring-2 focus:ring-emerald-500 outline-none"
                />
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                  <TableIcon size={12} />
                </div>
              </div>

              <div className="flex gap-2 w-full sm:w-auto">
                <button 
                  onClick={downloadCSV}
                  className="flex-1 sm:flex-initial px-4 sm:px-6 py-2.5 sm:py-3 bg-white text-slate-900 border border-slate-200 hover:bg-slate-50 rounded-lg sm:rounded-xl text-[9px] sm:text-[10px] font-black uppercase tracking-widest transition-all shadow-sm active:scale-95 flex items-center justify-center gap-2"
                >
                  Export CSV
                </button>

                <button 
                  onClick={clearFile}
                  className="px-4 sm:px-6 py-2.5 sm:py-3 bg-red-50 text-red-600 border border-red-100 hover:bg-red-100 rounded-lg sm:rounded-xl text-[9px] sm:text-[10px] font-black uppercase tracking-widest transition-all active:scale-95"
                >
                  Close
                </button>
              </div>
            </div>
          </div>

          {/* Sheet Selector */}
          {sheetNames.length > 1 && (
            <div className="bg-white border-b border-slate-100 px-6 py-3 flex gap-2 overflow-x-auto scrollbar-hide">
              {sheetNames.map((name) => (
                <button
                  key={name}
                  onClick={() => { if(workbook) changeSheet(workbook, name) }}
                  className={`px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                    activeSheet === name 
                      ? "bg-slate-900 text-white shadow-lg" 
                      : "bg-slate-50 text-slate-400 hover:bg-slate-100"
                  }`}
                >
                  {name}
                </button>
              ))}
            </div>
          )}
          
          {/* High-Performance Table Area */}
          <div className="flex-1 w-full bg-white overflow-auto">
             <div className="inline-block min-w-full align-middle">
               <table className="min-w-full border-collapse">
                 <thead className="sticky top-0 z-10">
                   <tr className="bg-slate-900 text-white">
                     <th className="px-4 py-4 text-left text-[9px] font-black uppercase tracking-widest border border-slate-800 w-16">ID</th>
                     {filteredData[0]?.map((header: any, idx: number) => (
                       <th key={idx} className="px-6 py-4 text-left text-[9px] font-black uppercase tracking-widest border border-slate-800">
                         {String(header ?? "")}
                       </th>
                     ))}
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-100">
                   {filteredData.slice(1).map((row: any[], rowIdx: number) => (
                     <tr key={rowIdx} className="hover:bg-emerald-50/30 transition-colors group">
                       <td className="px-4 py-3 text-[10px] font-bold text-slate-300 border border-slate-50 bg-slate-50/50 group-hover:text-emerald-600 transition-colors">
                         {rowIdx + 1}
                       </td>
                       {row.map((cell, cellIdx) => (
                         <td key={cellIdx} className="px-6 py-3 text-[11px] font-medium text-slate-600 border border-slate-50">
                           {String(cell ?? "")}
                         </td>
                       ))}
                     </tr>
                   ))}
                 </tbody>
               </table>
               {filteredData.length <= 1 && (
                 <div className="py-20 text-center">
                   <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em]">No matching records found</p>
                 </div>
               )}
             </div>
          </div>
        </div>
      )}
      
      {/* Information Section */}
      <div className="mt-20 grid lg:grid-cols-2 gap-12 border-t border-slate-100 pt-16">
        <div className="space-y-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-emerald-50 rounded-xl text-emerald-600">
              <BookOpen size={20} />
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">User Protocol</h2>
          </div>
          
          <div className="space-y-6">
            {[
              { step: "01", title: "Dataset Injection", desc: "Drag and drop your .xlsx, .xls, or .csv file into the secure import zone. Our engine processes the binary data locally." },
              { step: "02", title: "Sheet Navigation", desc: "If your workbook contains multiple sheets, use the dynamic tab bar to switch between datasets instantly." },
              { step: "03", title: "Real-time Analysis", desc: "Use the global search filter to isolate specific rows. The table updates in real-time as you type, handling thousands of rows with ease." },
              { step: "04", title: "Export Logic", desc: "Need to convert? Use the Export CSV function to transform any Excel sheet into a standardized comma-separated format." }
            ].map((item, i) => (
              <div key={i} className="flex gap-6 group">
                <span className="text-3xl font-black text-slate-100 group-hover:text-emerald-100 transition-colors duration-300">{item.step}</span>
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
            <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Compliance & FAQ</h2>
          </div>

          <div className="space-y-4">
            {[
              { q: "Is my corporate data secure?", a: "Absolutely. SamToolbox utilizes client-side WebAssembly and JS. Your files never leave your machine; no data is ever transmitted to our servers." },
              { q: "What are the row limits?", a: "The reader is optimized for high-performance rendering. While it can handle 50,000+ rows, browser memory limits may vary based on your system hardware." },
              { q: "Can I modify the cells?", a: "The current version is a high-fidelity 'Read & Export' engine. Advanced editing and cell manipulation features are scheduled for the v5.0 release." },
              { q: "Is mobile viewing supported?", a: "Yes, the interface is fully responsive. For complex datasets with 10+ columns, we recommend desktop viewing for the best experience." }
            ].map((faq, i) => (
              <div key={i} className="p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300">
                <h3 className="font-black text-slate-900 text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
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
