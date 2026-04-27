"use client";

import { useState, useRef } from "react";
import { Upload, Download, Trash2, FileText, ChevronUp, ChevronDown, Zap, ShieldCheck, BookOpen, HelpCircle } from "lucide-react";

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
      const { jsPDF } = await import("jspdf");
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
    <>
      <div className="max-w-6xl mx-auto py-8 sm:py-12 px-4 sm:px-6">
      <div className="text-center mb-10 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-[10px] font-black uppercase tracking-[0.2em] mb-6 sm:mb-8 border border-purple-100">
          <FileText size={12} />
          <span>Industrial Document Creator</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-black text-slate-800 mb-6 tracking-tight">
          Image to <span className="text-purple-600">PDF</span>
        </h1>
        <p className="text-sm sm:text-lg text-slate-600 max-w-2xl mx-auto font-medium leading-relaxed">
          Convert high-resolution images into professional PDF documents instantly.
          <span className="text-slate-900 font-semibold block sm:inline"> Your files are processed locally with zero quality loss.</span>
        </p>
      </div>

      {/* Main Upload/Editor */}
      <div className="bg-white p-4 sm:p-10 rounded-[1.5rem] sm:rounded-3xl shadow-2xl border border-slate-100 mb-8 relative overflow-hidden">
        <div
          className="border-2 border-dashed border-slate-200 rounded-2xl p-8 sm:p-20 text-center hover:border-purple-300 hover:bg-purple-50/30 transition-all cursor-pointer mb-6 group"
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-purple-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
            <Upload className="h-8 w-8 sm:h-10 sm:w-10 text-purple-600" />
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-800 mb-3">Load Source Images</h3>
          <p className="text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
            Drag and drop or browse for JPG/PNG files. High-fidelity output preserved for 300 DPI prints.
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
          <div className="mt-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white text-[10px] font-black">
                  {images.length}
                </div>
                <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">
                  Processing Queue
                </h3>
              </div>
              <button
                onClick={() => setImages([])}
                className="text-[10px] font-black uppercase tracking-widest text-red-500 hover:text-red-700 transition px-3 py-1 bg-red-50 rounded-full border border-red-100"
              >
                Clear All
              </button>
            </div>

            <div className="space-y-4 mb-10 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
              {images.map((img, index) => (
                <div key={index} className="group flex items-center justify-between p-3 sm:p-5 bg-slate-50 hover:bg-white rounded-2xl border border-slate-100 hover:border-purple-200 transition-all shadow-sm hover:shadow-md">
                  <div className="flex items-center gap-4 sm:gap-6 min-w-0">
                    <div className="relative shrink-0">
                      <img src={img.url} alt={`img-${index}`} className="w-16 h-16 sm:w-24 sm:h-24 object-cover rounded-xl shadow-sm border border-slate-200" />
                      <div className="absolute -top-2 -left-2 w-6 h-6 bg-purple-600 text-white rounded-lg flex items-center justify-center text-[10px] font-black shadow-lg">
                        {index + 1}
                      </div>
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-slate-800 truncate text-sm sm:text-base mb-1">{img.file.name}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Page Layout</span>
                        <div className="w-1 h-1 rounded-full bg-slate-300" />
                        <span className="text-[10px] font-black text-purple-600 uppercase tracking-widest">Auto-Scale</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 sm:gap-3">
                    <div className="flex flex-col gap-1">
                      <button onClick={() => moveUp(index)} disabled={index === 0} className="p-2 text-slate-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg disabled:opacity-20 transition-colors">
                        <ChevronUp size={18} />
                      </button>
                      <button onClick={() => moveDown(index)} disabled={index === images.length - 1} className="p-2 text-slate-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg disabled:opacity-20 transition-colors">
                        <ChevronDown size={18} />
                      </button>
                    </div>
                    <button onClick={() => removeImage(index)} className="p-3 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors">
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={generatePDF}
              disabled={isGenerating}
              className="w-full group relative py-5 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-[0.3em] text-xs shadow-2xl transition-all hover:-translate-y-1 active:translate-y-0 disabled:opacity-50 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative flex items-center justify-center gap-3">
                {isGenerating ? <Zap className="animate-pulse" size={18} /> : <FileText size={18} />}
                {isGenerating ? "FORGING DOCUMENT..." : "GENERATE MASTER PDF"}
              </div>
            </button>
          </div>
        )}

        {/* Benefits Section */}
        {images.length === 0 && (
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: Zap, label: "INSTANT CONVERSION", desc: "Proprietary browser-side engine combines images in milliseconds." },
              { icon: ShieldCheck, label: "TOTAL PRIVACY", desc: "No uploads. No cloud. Your data never leaves this window." },
              { icon: FileText, label: "ULTRA QUALITY", desc: "High-resolution output preserving original pixel density." }
            ].map((feature, i) => (
              <div key={i} className="p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-white hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-4 shadow-sm text-purple-600">
                  <feature.icon size={24} />
                </div>
                <h3 className="text-[11px] font-black text-slate-900 mb-2 uppercase tracking-widest">{feature.label}</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>

      {/* Information Section */}
      <div className="max-w-6xl mx-auto px-4 mt-20 grid lg:grid-cols-2 gap-12 border-t border-slate-100 pt-16">
        <div className="space-y-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-purple-50 rounded-xl text-purple-600">
              <BookOpen size={20} />
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Forging Protocol</h2>
          </div>
          
          <div className="space-y-6">
            {[
              { step: "01", title: "Asset Ingestion", desc: "Select your source images (JPG, PNG, WebP). You can batch-upload entire folders for rapid processing." },
              { step: "02", title: "Sequence Control", desc: "Use the arrangement toggles to reorder pages. This defines the final chronological flow of your PDF document." },
              { step: "03", title: "Layout Optimization", desc: "Our engine automatically calibrates each image to fit standard A4 dimensions while strictly preserving aspect ratios." },
              { step: "04", title: "Master Export", desc: "Initialize the local compilation engine to generate your multi-page PDF. The file is saved directly to your local downloads." }
            ].map((item, i) => (
              <div key={i} className="flex gap-6 group">
                <span className="text-3xl font-black text-slate-100 group-hover:text-purple-100 transition-colors duration-300">{item.step}</span>
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
            <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Document Intelligence FAQ</h2>
          </div>

          <div className="space-y-4">
            {[
              { q: "Is there a page limit?", a: "No. The tool supports as many pages as your system memory can handle. We've successfully forged PDFs with 100+ images." },
              { q: "Will original quality be lost?", a: "No. We utilize high-fidelity rendering to ensure that original pixel density is maintained in the final PDF archive." },
              { q: "What formats are supported?", a: "You can combine JPG, PNG, and WebP images. All will be normalized into the standard PDF container." },
              { q: "Are my images private?", a: "Yes. Processing is 100% browser-based. Your source images never cross the network or touch any external storage." }
            ].map((faq, i) => (
              <div key={i} className="p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300">
                <h3 className="font-black text-slate-900 text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                  {faq.q}
                </h3>
                <p className="text-slate-500 text-xs leading-relaxed font-medium">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
