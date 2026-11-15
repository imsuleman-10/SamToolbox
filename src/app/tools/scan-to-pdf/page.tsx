"use client";

import { useState, useRef } from "react";
import ToolWorkspace from "@/components/ToolWorkspace";
import { imagesToPDF } from "@/lib/pdfEngine";
import { Camera, RefreshCw } from "lucide-react";

export default function ScanToPdfPage() {
  const [capturedImages, setCapturedImages] = useState<string[]>([]);
  const [cameraActive, setCameraActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const startCamera = async () => {
    try {
      setCameraActive(true);
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      alert("Unable to access camera. Please allow camera permissions in your browser.");
      setCameraActive(false);
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth || 1280;
    canvas.height = videoRef.current.videoHeight || 720;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL("image/jpeg", 0.9);
      setCapturedImages(prev => [...prev, dataUrl]);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
    }
    setCameraActive(false);
  };

  return (
    <div className="min-h-[85vh] bg-[#f8fafc] text-slate-800 py-10 px-4 max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-black text-slate-900 mb-2">Scan to PDF</h1>
        <p className="text-sm text-slate-600">
          Use your device camera or webcam to capture pages and convert them directly into a multi-page PDF document.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        {cameraActive ? (
          <div className="space-y-4">
            <div className="relative rounded-2xl overflow-hidden bg-black aspect-video max-w-lg mx-auto">
              <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
            </div>
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={capturePhoto}
                className="px-6 py-3 bg-[#e5322d] text-white rounded-xl font-bold text-sm shadow-md flex items-center gap-2 hover:bg-[#cc241f]"
              >
                <Camera className="w-4 h-4" />
                Capture Page ({capturedImages.length} taken)
              </button>
              <button
                onClick={stopCamera}
                className="px-4 py-3 bg-slate-100 text-slate-700 rounded-xl font-semibold text-sm hover:bg-slate-200"
              >
                Done Scanning
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <button
              onClick={startCamera}
              className="px-8 py-4 bg-[#e5322d] text-white rounded-2xl font-bold text-base shadow-lg shadow-red-500/25 inline-flex items-center gap-3 hover:scale-105 transition-all"
            >
              <Camera className="w-6 h-6" />
              Open Camera Scanner
            </button>
            <p className="text-xs text-slate-500 mt-3">
              Captures are processed 100% locally on your device.
            </p>
          </div>
        )}

        {capturedImages.length > 0 && (
          <div className="mt-8 pt-6 border-t border-slate-100">
            <h3 className="text-sm font-bold text-slate-900 mb-4">
              Scanned Pages ({capturedImages.length})
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              {capturedImages.map((img, idx) => (
                <div key={idx} className="relative rounded-xl overflow-hidden border border-slate-200 aspect-[3/4]">
                  <img src={img} alt={`Scan ${idx + 1}`} className="w-full h-full object-cover" />
                  <span className="absolute bottom-2 left-2 bg-black/70 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                    Page {idx + 1}
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={async () => {
                const files = await Promise.all(
                  capturedImages.map(async (dataUrl, i) => {
                    const res = await fetch(dataUrl);
                    const blob = await res.blob();
                    return new File([blob], `scan-page-${i + 1}.jpg`, { type: "image/jpeg" });
                  })
                );
                const pdfBytes = await imagesToPDF(files, { pageSize: "a4", margin: 20 });
                const blob = new Blob([pdfBytes as any], { type: "application/pdf" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `scanned-document-${Date.now()}.pdf`;
                a.click();
                URL.revokeObjectURL(url);
              }}
              className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base rounded-xl shadow-lg transition-all"
            >
              Generate & Download Scanned PDF
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
