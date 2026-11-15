"use client";

import ToolWorkspace from "@/components/ToolWorkspace";
import { excelToPdf } from "@/lib/pdfEngine";

export default function ExcelToPdfPage() {
  return (
    <ToolWorkspace
      title="Excel to PDF Converter"
      description="Make EXCEL spreadsheets and CSV tables easy to read by converting them into neatly paginated PDF files."
      categoryLabel="Convert to PDF"
      acceptedFileTypes=".xlsx,.xls,.csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      actionButtonText="Convert to PDF"
      optionsPanel={() => (
        <div className="p-3 bg-amber-50 border border-amber-100 rounded-xl text-xs text-slate-700">
          Spreadsheet rows and columns are automatically formatted into landscape table layout with headers.
        </div>
      )}
      onProcess={async (files) => {
        const file = files[0];
        const blob = await excelToPdf(file);
        return {
          downloadData: blob,
          filename: `${file.name.replace(/\.[^/.]+$/, "")}.pdf`,
          extraMessage: `Successfully formatted Excel sheets from ${file.name} to PDF!`,
        };
      }}
    />
  );
}
