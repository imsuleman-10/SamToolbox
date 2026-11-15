"use client";

import { useState } from "react";
import ToolWorkspace from "@/components/ToolWorkspace";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

export default function EditPdfPage() {
  const [annotation, setAnnotation] = useState("Reviewed & Approved");

  return (
    <ToolWorkspace
      title="Edit PDF file"
      description="Add text annotations, comments, and stamps directly onto your PDF document pages."
      categoryLabel="Edit PDF"
      badge="Studio"
      actionButtonText="Apply Edit & Save"
      optionsPanel={() => (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Text Annotation to Add
            </label>
            <input
              type="text"
              value={annotation}
              onChange={(e) => setAnnotation(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <p className="text-[11px] text-slate-500">
            Annotation will be embedded as a clean vector banner on the first page of the document.
          </p>
        </div>
      )}
      onProcess={async (files) => {
        const file = files[0];
        const buffer = await file.arrayBuffer();
        const doc = await PDFDocument.load(buffer, { ignoreEncryption: true });
        const font = await doc.embedFont(StandardFonts.HelveticaBold);
        const pages = doc.getPages();
        const firstPage = pages[0];

        // Draw note box
        firstPage.drawRectangle({
          x: 40,
          y: firstPage.getHeight() - 70,
          width: font.widthOfTextAtSize(annotation, 12) + 24,
          height: 28,
          color: rgb(0.95, 0.96, 0.98),
          borderColor: rgb(0.8, 0.2, 0.2),
          borderWidth: 1,
        });

        firstPage.drawText(annotation, {
          x: 52,
          y: firstPage.getHeight() - 58,
          size: 12,
          font,
          color: rgb(0.8, 0.1, 0.1),
        });

        const bytes = await doc.save();
        return {
          downloadData: bytes,
          filename: `edited-${file.name}`,
          extraMessage: `Successfully embedded annotation onto ${file.name}.`,
        };
      }}
    />
  );
}
