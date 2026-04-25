"use client";

import { useState, useRef } from "react";
import * as XLSX from "xlsx";
import { Upload, X, Table as TableIcon } from "lucide-react";

export default function ExcelReaderPage() {
  const [htmlData, setHtmlData] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [sheetNames, setSheetNames] = useState<string[]>([]);
  const [activeSheet, setActiveSheet] = useState<string>("");
  const [workbook, setWorkbook] = useState<XLSX.WorkBook | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFileName(file.name);
      
      const buffer = await file.arrayBuffer();
      const wb = XLSX.read(buffer, { type: "buffer" });
      setWorkbook(wb);
      
      if (wb.SheetNames.length > 0) {
        setSheetNames(wb.SheetNames);
        changeSheet(wb, wb.SheetNames[0]);
      }
    }
  };

  const changeSheet = (wb: XLSX.WorkBook, sheetName: string) => {
    setActiveSheet(sheetName);
    const worksheet = wb.Sheets[sheetName];
    // Generate HTML and add tailwind classes directly or wrap heavily
    const html = XLSX.utils.sheet_to_html(worksheet, { id: "excel-data-table" });
    setHtmlData(html);
  };

  const clearFile = () => {
    setHtmlData(null);
    setFileName("");
    setWorkbook(null);
    setSheetNames([]);
    setActiveSheet("");
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-slate-800 mb-4">Excel & CSV Viewer</h1>
        <p className="text-slate-600">Instantly read and interact with Excel (.xlsx, .xls) and CSV sheets directly in your browser.</p>
      </div>

      {!htmlData ? (
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div 
            className="border-2 border-dashed border-slate-300 rounded-xl p-16 text-center hover:bg-slate-50 transition cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="mx-auto h-16 w-16 text-emerald-500 mb-6" />
            <h3 className="text-xl font-medium text-slate-800 mb-2">Select an Excel or CSV file</h3>
            <p className="text-slate-500">100% Private - Your data never leaves your device.</p>
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
        <div className="bg-white rounded-2xl shadow-[0_4px_25px_rgba(0,0,0,0.05)] border border-slate-200 overflow-hidden flex flex-col min-h-[600px]">
          {/* Header */}
          <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex flex-col md:flex-row md:justify-between p-4 gap-4 items-center">
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="bg-emerald-100 p-2 rounded-lg text-emerald-600">
                <TableIcon size={24} />
              </div>
              <span className="font-semibold text-slate-800 font-mono truncate max-w-sm" title={fileName}>{fileName}</span>
            </div>
            
            {/* Sheet Tabs */}
            {sheetNames.length > 1 && (
              <div className="flex overflow-x-auto max-w-full space-x-2 py-1 scrollbar-hide">
                {sheetNames.map((name) => (
                  <button
                    key={name}
                    onClick={() => { if(workbook) changeSheet(workbook, name) }}
                    className={`px-4 py-1.5 rounded-lg text-sm font-medium transition whitespace-nowrap ${
                      activeSheet === name 
                        ? "bg-brand-600 text-white shadow-md" 
                        : "bg-white text-slate-600 border border-slate-200 hover:bg-brand-50"
                    }`}
                  >
                    {name}
                  </button>
                ))}
              </div>
            )}

            <button 
              onClick={clearFile}
              className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 border border-red-100 hover:bg-red-100 rounded-lg font-medium text-sm transition shrink-0"
            >
              <X size={16} /> Close File
            </button>
          </div>
          
          {/* Excel Viewer Area */}
          <div className="flex-1 w-full bg-slate-50 overflow-auto p-4 md:p-8">
             <div 
               className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-auto excel-table-container max-w-full"
               dangerouslySetInnerHTML={{ __html: htmlData }}
             />
          </div>

          <style dangerouslySetInnerHTML={{__html: `
            .excel-table-container table {
              width: 100%;
              border-collapse: collapse;
              font-family: inherit;
              font-size: 14px;
            }
            .excel-table-container td, .excel-table-container th {
              border: 1px solid #e2e8f0;
              padding: 8px 12px;
              min-width: max-content;
            }
            .excel-table-container tr:nth-child(even) {
              background-color: #f8fafc;
            }
            .excel-table-container tr:first-child td {
              background-color: #f1f5f9;
              font-weight: 600;
              color: #334155;
            }
          `}} />
        </div>
      )}
    </div>
  );
}
