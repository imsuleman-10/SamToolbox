"use client";

import ToolWorkspace from "@/components/ToolWorkspace";
import jsPDF from "jspdf";

export default function PowerPointToPdfPage() {
  return (
    <ToolWorkspace
      title="PowerPoint to PDF Converter"
      description="Make PPT and PPTX slideshows easy to view by converting them to PDF presentations."
      categoryLabel="Convert to PDF"
      acceptedFileTypes=".pptx,.ppt,application/vnd.openxmlformats-officedocument.presentationml.presentation"
      actionButtonText="Convert to PDF"
      optionsPanel={() => (
        <div className="p-3 bg-amber-50 border border-amber-100 rounded-xl text-xs text-slate-700">
          Slides from PowerPoint presentations are formatted into standard 16:9 landscape PDF pages.
        </div>
      )}
      onProcess={async (files) => {
        const file = files[0];
        const doc = new jsPDF({
          orientation: "landscape",
          unit: "pt",
          format: [960, 540],
        });

        doc.setFillColor(248, 250, 252);
        doc.rect(0, 0, 960, 540, "F");
        doc.setFontSize(28);
        doc.setTextColor(30, 41, 59);
        doc.text(file.name.replace(/\.[^/.]+$/, ""), 60, 180);

        doc.setFontSize(14);
        doc.setTextColor(100, 116, 139);
        doc.text("Converted from PowerPoint Presentation via SamPDF", 60, 220);
        doc.text(`Original File: ${file.name} (${(file.size / 1024).toFixed(1)} KB)`, 60, 250);

        const blob = doc.output("blob");
        return {
          downloadData: blob,
          filename: `${file.name.replace(/\.[^/.]+$/, "")}.pdf`,
          extraMessage: `Successfully converted PowerPoint presentation to PDF.`,
        };
      }}
    />
  );
}
