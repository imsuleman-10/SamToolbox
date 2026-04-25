"use client";

import { useState, useRef } from "react";
import jsPDF from "jspdf";
import { Upload, Download, Trash2, FileText, ChevronUp, ChevronDown, Zap, ShieldCheck } from "lucide-react";

export default function ImageToPdfPage() {
  const [images, setImages] = useState<{ url: string; file: File }[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newImages = Array.from(e.target.files).map(file => ({
        file,
        url: URL.createObjectURL(file)
      }));
      setImages(prev => [...prev, ...newImages]);
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => {
      const copy = [...prev];
      URL.revokeObjectURL(copy[index].url);
      copy.splice(index, 1);
      return copy;
    });
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    setImages(prev => {
      const copy = [...prev];
      [copy[index - 1], copy[index]] = [copy[index], copy[index - 1]];
      return copy;
    });
  };

  const moveDown = (index: number) => {
    if (index === images.length - 1) return;
    setImages(prev => {
      const copy = [...prev];
      [copy[index + 1], copy[index]] = [copy[index], copy[index + 1]];
      return copy;
    });
  };

  const generatePDF = async () => {
    if (images.length === 0) return;
    setIsGenerating(true);
    
    try {
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      for (let i = 0; i < images.length; i++) {
        if (i > 0) pdf.addPage();
        
        const img = new Image();
        img.src = images[i].url;
        await new Promise((resolve) => {
          img.onload = resolve;
        });

        const imgRatio = img.width / img.height;
        const pdfRatio = pdfWidth / pdfHeight;

        let finalWidth = pdfWidth;
        let finalHeight = pdfHeight;
        
        // Fit within page maintaining aspect ratio
        if (imgRatio > pdfRatio) {
          finalHeight = pdfWidth / imgRatio;
        } else {
          finalWidth = pdfHeight * imgRatio;
        }

        // Center on page
        const x = (pdfWidth - finalWidth) / 2;
        const y = (pdfHeight - finalHeight) / 2;

        pdf.addImage(img, "JPEG", x, y, finalWidth, finalHeight);
      }
      
      pdf.save("converted.pdf");
    } catch (err) {
      console.error(err);
      alert("Failed to generate PDF.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 text-purple-700 text-[10px] font-black uppercase tracking-[0.2em] mb-8 border border-purple-100">
          <FileText size={14} />
          <span>Instant Document Creator</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-slate-800 mb-4 tracking-tight">
          Image to <span className="text-purple-600">PDF Converter</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto font-medium leading-relaxed">
          Turn JPG and PNG images into professional PDF documents instantly.
          <span className="text-slate-900 font-semibold"> Perfect for portfolios, reports, presentations, and archiving — all processed locally with zero quality loss.</span>
        </p>
      </div>

      {/* Main Upload/Editor */}
      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-slate-200 mb-8">
        <div
          className="border-2 border-dashed border-slate-300 rounded-xl p-12 text-center hover:border-purple-300 hover:bg-purple-50/20 transition cursor-pointer mb-6"
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="mx-auto h-14 w-14 text-purple-500 mb-5" />
          <h3 className="text-xl font-bold text-slate-800 mb-2">Select Images to Convert</h3>
          <p className="text-slate-500 max-w-md mx-auto">
            Choose multiple JPG or PNG files. They'll be converted into a single PDF — private, fast, and completely free.
          </p>
        </div>

        <input
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileChange}
        />

        {images.length > 0 && (
          <div className="mt-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-slate-800">
                Images Ready ({images.length})
              </h3>
              <button
                onClick={() => setImages([])}
                className="text-sm text-red-500 hover:text-red-700 font-medium transition"
              >
                Clear All
              </button>
            </div>

            <div className="space-y-3 mb-8 max-h-[400px] overflow-y-auto pr-2">
              {images.map((img, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="flex items-center gap-4">
                    <img src={img.url} alt={`img-${index}`} className="w-16 h-16 object-cover rounded-md border border-slate-200" />
                    <div>
                      <p className="font-medium text-slate-800 truncate max-w-xs">{img.file.name}</p>
                      <p className="text-xs text-slate-500 uppercase">Page {index + 1}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex flex-col">
                      <button onClick={() => moveUp(index)} disabled={index === 0} className="p-1 text-slate-400 hover:text-purple-600 disabled:opacity-30">
                        <ChevronUp size={18} />
                      </button>
                      <button onClick={() => moveDown(index)} disabled={index === images.length - 1} className="p-1 text-slate-400 hover:text-purple-600 disabled:opacity-30">
                        <ChevronDown size={18} />
                      </button>
                    </div>
                    <button onClick={() => removeImage(index)} className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition ml-2">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={generatePDF}
              disabled={isGenerating}
              className="w-full py-4 bg-purple-600 text-white rounded-xl font-bold shadow-md hover:bg-purple-700 transition flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isGenerating ? "Generating..." : <><FileText size={20} /> Generate & Download PDF</>}
            </button>
          </div>
        )}

        {/* Benefits Section */}
        {images.length === 0 && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-purple-50 p-5 rounded-xl border border-purple-100">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
                <Zap size={20} className="text-purple-600" />
              </div>
              <h3 className="text-sm font-black text-slate-800 mb-1">Instant Conversion</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Multiple images combined into a single PDF in under a second.
              </p>
            </div>
            <div className="bg-purple-50 p-5 rounded-xl border border-purple-100">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
                <ShieldCheck size={20} className="text-purple-600" />
              </div>
              <h3 className="text-sm font-black text-slate-800 mb-1">100% Private</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                All processing happens locally. Your images are never uploaded anywhere.
              </p>
            </div>
            <div className="bg-purple-50 p-5 rounded-xl border border-purple-100">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
                <FileText size={20} className="text-purple-600" />
              </div>
              <h3 className="text-sm font-black text-slate-800 mb-1">Quality Preserved</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Original image quality maintained. Perfect for professional documents.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
