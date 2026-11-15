"use client";

import { useState, useRef } from "react";
import ToolWorkspace from "@/components/ToolWorkspace";
import { signPDF } from "@/lib/pdfEngine";
import { PenTool, Type, Eraser } from "lucide-react";

export default function SignPdfPage() {
  const [signatureMode, setSignatureMode] = useState<"draw" | "type">("draw");
  const [typedName, setTypedName] = useState("John Doe");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const startDraw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#0f172a";
    ctx.stroke();
  };

  const stopDraw = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  return (
    <ToolWorkspace
      title="Sign PDF Document"
      description="Create your electronic signature by drawing or typing, and place it directly onto your PDF with legal confidence."
      categoryLabel="PDF Security"
      badge="Popular"
      actionButtonText="Sign & Save PDF"
      optionsPanel={() => (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSignatureMode("draw")}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg border flex items-center justify-center gap-1.5 cursor-pointer ${
                signatureMode === "draw"
                  ? "bg-teal-50 border-teal-500 text-teal-700"
                  : "bg-white border-slate-200 text-slate-600"
              }`}
            >
              <PenTool className="w-3.5 h-3.5" />
              Draw Signature
            </button>
            <button
              type="button"
              onClick={() => setSignatureMode("type")}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg border flex items-center justify-center gap-1.5 cursor-pointer ${
                signatureMode === "type"
                  ? "bg-teal-50 border-teal-500 text-teal-700"
                  : "bg-white border-slate-200 text-slate-600"
              }`}
            >
              <Type className="w-3.5 h-3.5" />
              Type Signature
            </button>
          </div>

          {signatureMode === "draw" ? (
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] text-slate-500">Draw with your mouse or finger:</span>
                <button
                  type="button"
                  onClick={clearCanvas}
                  className="text-[11px] text-red-500 hover:text-red-700 flex items-center gap-1"
                >
                  <Eraser className="w-3 h-3" /> Clear
                </button>
              </div>
              <canvas
                ref={canvasRef}
                width={300}
                height={100}
                onMouseDown={startDraw}
                onMouseMove={draw}
                onMouseUp={stopDraw}
                onMouseLeave={stopDraw}
                className="w-full h-24 bg-white border border-slate-300 rounded-xl cursor-crosshair shadow-inner"
              />
            </div>
          ) : (
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Enter Full Name</label>
              <input
                type="text"
                value={typedName}
                onChange={(e) => setTypedName(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <div className="mt-2 p-3 bg-white border border-slate-200 rounded-xl text-center italic text-lg font-serif text-slate-800">
                {typedName || "Your Signature"}
              </div>
            </div>
          )}
        </div>
      )}
      onProcess={async (files) => {
        const file = files[0];
        let dataUrl = "";

        if (signatureMode === "draw" && canvasRef.current) {
          dataUrl = canvasRef.current.toDataURL("image/png");
        } else {
          // Generate signature image from typed text
          const tempCanvas = document.createElement("canvas");
          tempCanvas.width = 400;
          tempCanvas.height = 120;
          const ctx = tempCanvas.getContext("2d");
          if (ctx) {
            ctx.fillStyle = "transparent";
            ctx.fillRect(0, 0, 400, 120);
            ctx.font = "italic 38px Georgia, serif";
            ctx.fillStyle = "#0f172a";
            ctx.fillText(typedName || "Signature", 30, 75);
          }
          dataUrl = tempCanvas.toDataURL("image/png");
        }

        const bytes = await signPDF(file, dataUrl, 0, 60, 60, 180, 60);
        return {
          downloadData: bytes,
          filename: `signed-${file.name}`,
          extraMessage: `Successfully embedded signature onto ${file.name}.`,
        };
      }}
    />
  );
}
