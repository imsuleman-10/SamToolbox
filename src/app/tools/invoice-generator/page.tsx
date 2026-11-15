"use client";

import { useState, useMemo } from "react";
import jsPDF from "jspdf";
import { Download, Plus, Trash2, FileText, Sparkles, Building2 } from "lucide-react";

interface InvoiceItem {
  id: string;
  description: string;
  qty: number;
  rate: number;
}

export default function InvoiceGeneratorPage() {
  const [currency, setCurrency] = useState("PKR");
  const [invoiceNumber, setInvoiceNumber] = useState("INV-2026-001");
  const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().split("T")[0]);

  const [fromName, setFromName] = useState("Your Company / Freelancer Name");
  const [fromEmail, setFromEmail] = useState("billing@yourcompany.com");
  const [toName, setToName] = useState("Client / Company Name");
  const [toEmail, setToEmail] = useState("client@company.com");

  const [taxPercent, setTaxPercent] = useState<number>(18); // Default 18% GST in PK
  const [discountPercent, setDiscountPercent] = useState<number>(0);

  const [items, setItems] = useState<InvoiceItem[]>([
    { id: "1", description: "Web Application Design & Architecture", qty: 1, rate: 120000 },
    { id: "2", description: "API Integration & Cloud Deployment", qty: 1, rate: 80000 },
  ]);

  const addItem = () => {
    setItems((prev) => [
      ...prev,
      { id: Math.random().toString(), description: "New Item / Service", qty: 1, rate: 10000 },
    ]);
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateItem = (id: string, field: keyof InvoiceItem, value: any) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const totals = useMemo(() => {
    const subtotal = items.reduce((sum, item) => sum + item.qty * item.rate, 0);
    const discount = (subtotal * discountPercent) / 100;
    const taxable = subtotal - discount;
    const tax = (taxable * taxPercent) / 100;
    const grandTotal = taxable + tax;

    return {
      subtotal,
      discount,
      tax,
      grandTotal,
    };
  }, [items, taxPercent, discountPercent]);

  const generatePDF = () => {
    const doc = new jsPDF({ orientation: "portrait", unit: "pt", format: "a4" });

    // Top Header Banner
    doc.setFillColor(229, 50, 45);
    doc.rect(0, 0, 595, 90, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(26);
    doc.text("COMMERCIAL INVOICE", 40, 50);

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Invoice #${invoiceNumber}  |  Date: ${invoiceDate}`, 40, 72);

    // From & To Info
    doc.setTextColor(30, 41, 59);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text("BILLED BY:", 40, 125);
    doc.setFont("helvetica", "normal");
    doc.text(fromName, 40, 140);
    doc.setTextColor(100, 116, 139);
    doc.text(fromEmail, 40, 155);

    doc.setTextColor(30, 41, 59);
    doc.setFont("helvetica", "bold");
    doc.text("BILLED TO:", 340, 125);
    doc.setFont("helvetica", "normal");
    doc.text(toName, 340, 140);
    doc.setTextColor(100, 116, 139);
    doc.text(toEmail, 340, 155);

    // Items Table Header
    doc.setFillColor(248, 250, 252);
    doc.roundedRect(40, 185, 515, 25, 4, 4, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(71, 85, 105);
    doc.text("DESCRIPTION", 55, 201);
    doc.text("QTY", 330, 201);
    doc.text("RATE", 390, 201);
    doc.text("AMOUNT", 495, 201);

    let y = 230;
    doc.setFont("helvetica", "normal");
    items.forEach((item) => {
      doc.setTextColor(30, 41, 59);
      doc.text(item.description, 55, y);
      doc.text(item.qty.toString(), 335, y);
      doc.text(`${currency} ${item.rate.toLocaleString()}`, 390, y);
      doc.text(`${currency} ${(item.qty * item.rate).toLocaleString()}`, 495, y);

      doc.setDrawColor(241, 245, 249);
      doc.line(40, y + 8, 555, y + 8);
      y += 24;
    });

    // Summary Section
    y = Math.max(y + 20, 520);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(100, 116, 139);

    doc.text("Subtotal:", 380, y);
    doc.text(`${currency} ${totals.subtotal.toLocaleString()}`, 495, y);
    y += 18;

    if (discountPercent > 0) {
      doc.text(`Discount (${discountPercent}%):`, 380, y);
      doc.text(`- ${currency} ${totals.discount.toLocaleString()}`, 495, y);
      y += 18;
    }

    if (taxPercent > 0) {
      doc.text(`Sales Tax / GST (${taxPercent}%):`, 380, y);
      doc.text(`${currency} ${totals.tax.toLocaleString()}`, 495, y);
      y += 18;
    }

    doc.setDrawColor(226, 232, 240);
    doc.line(380, y, 555, y);
    y += 16;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(229, 50, 45);
    doc.text("TOTAL DUE:", 380, y);
    doc.text(`${currency} ${totals.grandTotal.toLocaleString()}`, 495, y);

    doc.save(`invoice-${invoiceNumber}.pdf`);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-100 text-[#e5322d] text-xs font-bold mb-4">
          <FileText className="w-3.5 h-3.5" />
          Commercial Invoicing Standard
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-3">
          Commercial Invoice & Tax Bill Generator
        </h1>
        <p className="text-slate-600 text-sm leading-relaxed">
          Create customized, itemized business invoices with GST/VAT calculations and download in professional vector A4 PDF format.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-8">
        {/* Top Header Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-6 border-b border-slate-100">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Currency</label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl font-bold"
            >
              <option value="PKR">PKR (Pakistani Rupee)</option>
              <option value="USD">USD (US Dollar $)</option>
              <option value="EUR">EUR (Euro €)</option>
              <option value="GBP">GBP (British Pound £)</option>
              <option value="AED">AED (UAE Dirham)</option>
              <option value="SAR">SAR (Saudi Riyal)</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Invoice Number</label>
            <input
              type="text"
              value={invoiceNumber}
              onChange={(e) => setInvoiceNumber(e.target.value)}
              className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl font-bold"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Invoice Date</label>
            <input
              type="date"
              value={invoiceDate}
              onChange={(e) => setInvoiceDate(e.target.value)}
              className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl font-bold"
            />
          </div>
        </div>

        {/* Sender & Receiver */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-6 border-b border-slate-100">
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">From (Your Business)</h3>
            <input
              type="text"
              placeholder="Your Business / Full Name"
              value={fromName}
              onChange={(e) => setFromName(e.target.value)}
              className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl"
            />
            <input
              type="email"
              placeholder="Your Email / Phone"
              value={fromEmail}
              onChange={(e) => setFromEmail(e.target.value)}
              className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl"
            />
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">Bill To (Client Details)</h3>
            <input
              type="text"
              placeholder="Client Company / Name"
              value={toName}
              onChange={(e) => setToName(e.target.value)}
              className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl"
            />
            <input
              type="email"
              placeholder="Client Email"
              value={toEmail}
              onChange={(e) => setToEmail(e.target.value)}
              className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl"
            />
          </div>
        </div>

        {/* Itemized Rows */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">Itemized Services & Goods</h3>
            <button
              onClick={addItem}
              className="px-3 py-1.5 bg-red-50 text-[#e5322d] hover:bg-red-100 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" /> Add Row
            </button>
          </div>

          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.id} className="grid grid-cols-12 gap-2 items-center">
                <input
                  type="text"
                  placeholder="Service / Item Description"
                  value={item.description}
                  onChange={(e) => updateItem(item.id, "description", e.target.value)}
                  className="col-span-6 p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl font-medium"
                />
                <input
                  type="number"
                  min="1"
                  value={item.qty}
                  onChange={(e) => updateItem(item.id, "qty", parseInt(e.target.value, 10) || 1)}
                  className="col-span-2 p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl font-medium text-center"
                />
                <input
                  type="number"
                  min="0"
                  value={item.rate}
                  onChange={(e) => updateItem(item.id, "rate", parseFloat(e.target.value) || 0)}
                  className="col-span-3 p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl font-medium"
                />
                <button
                  onClick={() => removeItem(item.id)}
                  className="col-span-1 p-2 text-slate-400 hover:text-red-500 rounded-lg flex items-center justify-center cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Totals & Tax Footer */}
        <div className="pt-6 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Sales Tax / GST %</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={taxPercent}
                  onChange={(e) => setTaxPercent(parseFloat(e.target.value) || 0)}
                  className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Discount %</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={discountPercent}
                  onChange={(e) => setDiscountPercent(parseFloat(e.target.value) || 0)}
                  className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2 text-right">
            <div className="text-xs text-slate-500">
              Subtotal: <strong>{currency} {totals.subtotal.toLocaleString()}</strong>
            </div>
            {taxPercent > 0 && (
              <div className="text-xs text-slate-500">
                Tax ({taxPercent}%): <strong>{currency} {totals.tax.toLocaleString()}</strong>
              </div>
            )}
            <div className="text-2xl font-black text-[#e5322d] pt-2">
              Total: {currency} {totals.grandTotal.toLocaleString()}
            </div>
            <button
              onClick={generatePDF}
              className="mt-4 px-8 py-4 bg-[#e5322d] hover:bg-[#cc241f] text-white font-bold text-sm rounded-xl shadow-lg shadow-red-500/25 inline-flex items-center gap-2 cursor-pointer transition-all"
            >
              <Download className="w-4 h-4" />
              Download Commercial Invoice (PDF)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
