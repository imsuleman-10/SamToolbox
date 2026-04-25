"use client";

import { useState, useRef } from "react";
import Compressor from "compressorjs";
import { Upload, Download, RefreshCw, FileImage } from "lucide-react";

export default function ImageCompressorPage() {
  const [file, setFile] = useState<File | null>(null);
  const [compressedFile, setCompressedFile] = useState<File | Blob | null>(null);
  const [quality, setQuality] = useState(0.8);
  const [isCompressing, setIsCompressing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setCompressedFile(null);
    }
  };

  const handleCompress = () => {
    if (!file) return;
    setIsCompressing(true);

    new Compressor(file, {
      quality: quality,
      success(result) {
        setCompressedFile(result);
        setIsCompressing(false);
      },
      error(err) {
        console.error(err.message);
        setIsCompressing(false);
      },
    });
  };

  const handleDownload = () => {
    if (!compressedFile) return;
    const url = URL.createObjectURL(compressedFile);
    const a = document.createElement("a");
    a.href = url;
    a.download = `compressed-${file?.name || "image.jpg"}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-slate-800 mb-4">Image Compressor</h1>
        <p className="text-slate-600">Compress your images locally without losing quality. Your files never leave your device.</p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-8">
        {!file ? (
          <div 
            className="border-2 border-dashed border-slate-300 rounded-xl p-12 text-center hover:bg-slate-50 transition cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="mx-auto h-12 w-12 text-brand-500 mb-4" />
            <h3 className="text-lg font-medium text-slate-800 mb-2">Click to select an image</h3>
            <p className="text-slate-500">Supports JPG, PNG, WEBP (Max 10MB)</p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-brand-100 text-brand-600 rounded-lg flex items-center justify-center">
                  <FileImage />
                </div>
                <div>
                  <h4 className="font-medium text-slate-800">{file.name}</h4>
                  <p className="text-sm text-slate-500">Original Size: {formatSize(file.size)}</p>
                </div>
              </div>
              <button 
                onClick={() => { setFile(null); setCompressedFile(null); }}
                className="text-slate-400 hover:text-red-500 transition"
              >
                Remove
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Compression Quality: {Math.round(quality * 100)}%
              </label>
              <input 
                type="range" 
                min="0.1" 
                max="1" 
                step="0.1" 
                value={quality} 
                onChange={(e) => setQuality(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-2">
                <span>Smaller File</span>
                <span>Better Quality</span>
              </div>
            </div>

            <button
              onClick={handleCompress}
              disabled={isCompressing}
              className="w-full py-3 bg-brand-600 text-white rounded-xl font-semibold shadow-md hover:bg-brand-700 transition disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isCompressing ? <RefreshCw className="animate-spin" /> : "Compress Image"}
            </button>
          </div>
        )}
        <input 
          type="file" 
          accept="image/*" 
          className="hidden" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
        />
      </div>

      {compressedFile && (
        <div className="bg-brand-50 p-6 rounded-2xl border border-brand-100 flex flex-col items-center">
          <h3 className="text-lg font-bold text-slate-800 mb-2">Compression Successful!</h3>
          <div className="flex gap-8 mb-6 text-center">
            <div>
              <p className="text-sm text-slate-500 mb-1">Old Size</p>
              <p className="font-semibold text-slate-700">{formatSize(file!.size)}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500 mb-1">New Size</p>
              <p className="font-bold text-green-600">{formatSize(compressedFile.size)}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500 mb-1">Saved</p>
              <p className="font-bold text-brand-600">
                {Math.round((1 - compressedFile.size / file!.size) * 100)}%
              </p>
            </div>
          </div>
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-8 py-3 bg-brand-600 text-white rounded-xl font-semibold shadow-md hover:bg-brand-700 transition"
          >
            <Download size={20} />
            Download Compressed Image
          </button>
        </div>
      )}
    </div>
  );
}
