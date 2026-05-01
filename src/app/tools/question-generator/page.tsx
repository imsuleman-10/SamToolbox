"use client";

import { useState, useMemo } from "react";
import { 
  Brain, Plus, Trash2, Download, Zap, BookOpen, 
  Target, Sparkles, HelpCircle, Terminal, 
  ShieldCheck, Cpu, Activity, ArrowRight,
  Layers, FileText, CheckCircle2, Circle
} from "lucide-react";
import Link from "next/link";
import { generateSoftwareApplicationSchema } from "@/lib/structuredData";

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

export default function QuestionGeneratorPage() {
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: "1",
      question: "Which data structure follows the Last-In, First-Out (LIFO) principle?",
      options: ["Queue", "Stack", "Linked List", "Tree"],
      correctAnswer: 1,
    },
  ]);
  const [isGenerating, setIsGenerating] = useState(false);

  const addQuestion = () => {
    const newQuestion: Question = {
      id: Date.now().toString(),
      question: "",
      options: ["", "", "", ""],
      correctAnswer: 0,
    };
    setQuestions([...questions, newQuestion]);
  };

  const removeQuestion = (id: string) => {
    if (questions.length > 1) {
      setQuestions(questions.filter((q) => q.id !== id));
    }
  };

  const updateQuestion = (id: string, field: string, value: any) => {
    setQuestions(
      questions.map((q) =>
        q.id === id ? { ...q, [field]: value } : q
      )
    );
  };

  const updateOption = (qId: string, optIdx: number, value: string) => {
    setQuestions(
      questions.map((q) =>
        q.id === qId
          ? {
              ...q,
              options: q.options.map((opt, i) => (i === optIdx ? value : opt)),
            }
          : q
      )
    );
  };

  const downloadQuestions = async () => {
    setIsGenerating(true);
    try {
      const { jsPDF } = await import("jspdf");
      const pdf = new jsPDF();
      
      pdf.setFontSize(22);
      pdf.setFont("helvetica", "bold");
      pdf.text("MCQ Practice Set", 20, 20);
      
      pdf.setFontSize(10);
      pdf.setFont("helvetica", "normal");
      pdf.text(`Generated via SamToolbox - ${new Date().toLocaleDateString()}`, 20, 28);
      
      let y = 40;
      questions.forEach((q, i) => {
        if (y > 270) {
          pdf.addPage();
          y = 20;
        }
        
        pdf.setFontSize(12);
        pdf.setFont("helvetica", "bold");
        const lines = pdf.splitTextToSize(`Q${i + 1}: ${q.question}`, 170);
        pdf.text(lines, 20, y);
        y += lines.length * 7;
        
        pdf.setFont("helvetica", "normal");
        q.options.forEach((opt, oi) => {
          pdf.text(`${String.fromCharCode(65 + oi)}) ${opt}`, 25, y);
          y += 7;
        });
        
        y += 5;
      });
      
      // Answer Key on a new page
      pdf.addPage();
      pdf.setFontSize(18);
      pdf.setFont("helvetica", "bold");
      pdf.text("Answer Key", 20, 20);
      
      y = 35;
      questions.forEach((q, i) => {
        pdf.setFontSize(12);
        pdf.text(`Q${i + 1}: ${String.fromCharCode(65 + q.correctAnswer)}`, 20, y);
        y += 8;
        if (y > 280) {
          pdf.addPage();
          y = 20;
        }
      });
      
      pdf.save("quiz-set.pdf");
    } catch (error) {
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  const schema = useMemo(() => generateSoftwareApplicationSchema("question-generator", "Professional MCQ architect for exam synthesis and practice set generation."), []);

  return (
    <div className="min-h-screen bg-[#020617] selection:bg-indigo-500/30 selection:text-indigo-200">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* ══════════════════════════════════════════
          HERO / HEADER
      ══════════════════════════════════════════ */}
      <section className="pt-24 pb-32 px-6 relative overflow-hidden text-center">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 font-black text-[10px] uppercase tracking-[0.4em] mb-10 shadow-2xl">
            <Brain size={14} className="animate-pulse" />
            Linguistic Forge v5.1
          </div>
          <h1 className="text-6xl md:text-[7rem] font-black text-white tracking-tighter mb-8 leading-none">
            Question <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 italic">Architect.</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-3xl mx-auto font-medium leading-relaxed">
            Industrial-grade MCQ synthesis and PDF forging. 
            <span className="text-slate-200 font-bold block mt-2">Local Logic Execution. Zero Cloud Telemetry. Universal Export.</span>
          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-6">
             <button
                onClick={downloadQuestions}
                disabled={isGenerating}
                className="flex items-center gap-4 px-12 py-6 bg-white text-slate-900 rounded-[2rem] font-black uppercase tracking-widest text-[10px] shadow-3xl hover:bg-indigo-600 hover:text-white transition-all active:scale-95 disabled:opacity-50 group"
              >
                {isGenerating ? <Zap size={20} className="animate-pulse" /> : <Download size={20} className="group-hover:-translate-y-1 transition-transform" />}
                {isGenerating ? "Forging PDF..." : "Export Quiz Set"}
              </button>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          MAIN UTILITY INTERFACE
      ══════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-6 -mt-16 relative z-20 mb-32">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Editor Area */}
          <div className="lg:col-span-8 space-y-10">
            {questions.map((q, qIdx) => (
              <div key={q.id} className="bg-[#0f172a] rounded-[3.5rem] border border-white/5 shadow-3xl shadow-black overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-700">
                 <div className="bg-white/5 px-10 py-8 border-b border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                       <div className="w-12 h-12 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl flex items-center justify-center text-indigo-400 font-black italic">
                          {qIdx + 1}
                       </div>
                       <div>
                          <h3 className="text-lg font-black text-white uppercase tracking-tighter leading-none italic">Question Module</h3>
                          <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mt-1">Vector Identification</p>
                       </div>
                    </div>
                    <button
                      onClick={() => removeQuestion(q.id)}
                      className="p-4 bg-rose-500/10 text-rose-500 border border-rose-500/20 rounded-2xl hover:bg-rose-500 hover:text-white transition-all shadow-xl"
                    >
                      <Trash2 size={20} />
                    </button>
                 </div>

                 <div className="p-10 space-y-10">
                    <div className="space-y-4">
                       <label className="text-[9px] font-black text-indigo-400 uppercase tracking-widest pl-2">Subject Query</label>
                       <textarea
                         value={q.question}
                         onChange={(e) => updateQuestion(q.id, "question", e.target.value)}
                         placeholder="INPUT QUESTION PARAMETERS..."
                         rows={2}
                         className="w-full bg-white/[0.03] border border-white/5 rounded-[2rem] p-8 text-lg font-bold text-white outline-none focus:bg-white/[0.05] focus:border-indigo-500/30 transition-all placeholder:text-slate-800 tracking-tight uppercase italic"
                       />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-8">
                       {q.options.map((opt, oIdx) => (
                         <div key={oIdx} className="space-y-3 group">
                           <div className="flex justify-between items-center px-2">
                             <label className="text-[9px] font-black text-slate-600 uppercase tracking-widest">
                               Vector {String.fromCharCode(65 + oIdx)}
                             </label>
                             <button
                               onClick={() => updateQuestion(q.id, "correctAnswer", oIdx)}
                               className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${
                                 q.correctAnswer === oIdx
                                   ? "bg-emerald-500 text-white shadow-xl shadow-emerald-900/40"
                                   : "bg-white/5 text-slate-600 hover:text-white hover:bg-white/10"
                               }`}
                             >
                               {q.correctAnswer === oIdx ? "Target Identified" : "Mark Target"}
                             </button>
                           </div>
                           <input
                             type="text"
                             value={opt}
                             onChange={(e) => updateOption(q.id, oIdx, e.target.value)}
                             placeholder={`Option ${String.fromCharCode(65 + oIdx)}...`}
                             className={`w-full px-6 py-5 rounded-2xl border outline-none text-sm font-bold transition-all uppercase italic ${
                               q.correctAnswer === oIdx
                                 ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-400"
                                 : "bg-white/[0.03] border-white/5 text-white focus:border-indigo-500/30"
                             }`}
                           />
                         </div>
                       ))}
                    </div>
                 </div>
              </div>
            ))}

            <button
              onClick={addQuestion}
              className="w-full py-12 bg-white text-slate-900 rounded-[3.5rem] font-black uppercase tracking-[0.4em] text-[10px] shadow-3xl transition-all hover:scale-[1.01] active:scale-95 flex items-center justify-center gap-6"
            >
              <Plus size={24} strokeWidth={4} /> Append New Question Vector
            </button>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-10 lg:sticky lg:top-24">
             {/* Stats Dashboard */}
             <div className="bg-[#0f172a] rounded-[3.5rem] border border-white/5 shadow-3xl shadow-black p-12 relative overflow-hidden group">
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-indigo-600 rounded-full blur-[100px] opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-1000" />
                
                <div className="relative space-y-12">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl flex items-center justify-center text-indigo-400">
                      <Target size={22} />
                    </div>
                    <h2 className="text-xl font-black text-white tracking-tighter uppercase italic">Session Logic</h2>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                     <div className="p-8 bg-white/5 rounded-[2.5rem] border border-white/5 text-center sm:text-left">
                        <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-3">Total Volume</p>
                        <p className="text-3xl font-black text-white tracking-tighter italic">{questions.length}</p>
                     </div>
                     <div className="p-8 bg-white/5 rounded-[2.5rem] border border-white/5 text-center sm:text-left">
                        <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-3">Verified</p>
                        <p className="text-3xl font-black text-indigo-400 tracking-tighter italic leading-none">
                          {questions.filter(q => q.question.trim() !== "").length}
                        </p>
                     </div>
                  </div>

                  <div className="pt-8 border-t border-white/5">
                    <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6 italic">Assembly Guidelines</h4>
                    <div className="space-y-4">
                       {[
                         "High-Fidelity Distractors",
                         "Logical Target Identification",
                         "Structural Consistency",
                         "Zero Redundancy"
                       ].map((tip, i) => (
                         <div key={i} className="flex items-center gap-3 text-[10px] font-black text-white uppercase tracking-widest italic">
                            <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full" />
                            {tip}
                         </div>
                       ))}
                    </div>
                  </div>
                </div>
             </div>

             {/* Privacy Vault */}
             <div className="p-10 bg-emerald-500/5 rounded-[3rem] border border-emerald-500/10 flex items-center gap-6 shadow-2xl">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shadow-sm">
                   <ShieldCheck size={28} />
                </div>
                <div>
                   <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest leading-none mb-1.5 italic">Local Forge Active</p>
                   <p className="text-[10px] font-bold text-slate-500 leading-tight">Assembly strictly confined to browser memory.</p>
                </div>
             </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-40 border-t border-slate-800 pt-40">
           <div className="grid lg:grid-cols-2 gap-24 items-start">
              <div className="space-y-16">
                 <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-indigo-500/10 rounded-[1.5rem] flex items-center justify-center text-indigo-400 border border-indigo-500/20">
                      <HelpCircle size={32} />
                    </div>
                    <div>
                      <h2 className="text-4xl font-black text-white uppercase tracking-tight leading-none italic">Forge <span className="text-indigo-400">Intel</span></h2>
                      <p className="text-slate-500 font-bold text-[10px] uppercase tracking-widest mt-2">Protocol Queries</p>
                    </div>
                 </div>

                 <div className="space-y-6">
                    {[
                      { q: "Is my quiz data secure?", a: "Affirmative. Question Architect utilizes 100% local JavaScript execution. Your content never crosses the network interface. Zero cloud telemetry." },
                      { q: "Can I use external AI?", a: "This is a structural architect designed for manual high-precision synthesis. You provide the expertise, we provide the industrial formatting." },
                      { q: "Why PDF for exports?", a: "PDF ensures structural integrity and consistent rendering across all digital and physical output interfaces." }
                    ].map((faq, i) => (
                      <div key={i} className="p-10 bg-white/5 rounded-[3rem] border border-white/5 hover:border-indigo-500/20 transition-all group">
                        <h3 className="font-black text-white text-sm mb-6 flex items-start gap-4">
                          <span className="text-indigo-400 font-mono italic">Q.</span> {faq.q}
                        </h3>
                        <p className="text-slate-400 text-sm leading-relaxed font-medium pl-8 group-hover:text-slate-300 transition-colors">{faq.a}</p>
                      </div>
                    ))}
                 </div>
              </div>

              <div className="bg-[#0f172a] rounded-[4.5rem] p-16 md:p-24 text-white relative overflow-hidden border border-white/5">
                 <div className="absolute top-0 right-0 w-full h-full opacity-[0.03] pointer-events-none" style={{ backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
                 <div className="relative z-10 text-center sm:text-left">
                    <div className="w-24 h-24 bg-indigo-500/10 border border-indigo-500/20 rounded-[2.5rem] flex items-center justify-center mb-12 shadow-[0_0_80px_rgba(79,70,229,0.2)] mx-auto sm:mx-0">
                      <Brain size={48} className="text-indigo-400" />
                    </div>
                    <h3 className="text-4xl font-black mb-10 tracking-tight uppercase leading-[0.9] italic">Sovereign <span className="text-indigo-400">Creation.</span></h3>
                    <p className="text-slate-400 font-medium mb-16 leading-relaxed text-xl">
                       Linguistic Forge operates on a strictly local delivery model. 
                       No signups, no cloud syncing, no data harvesting. 
                       Your knowledge is your business.
                    </p>
                    
                    <div className="grid grid-cols-2 gap-12">
                       <div className="space-y-4">
                          <div className="text-4xl font-black text-white tracking-tighter italic">AIR-GAPPED</div>
                          <div className="text-[10px] font-bold text-indigo-400 uppercase tracking-[0.3em]">No Network Sync</div>
                       </div>
                       <div className="space-y-4">
                          <div className="text-4xl font-black text-white tracking-tighter italic">LOCAL-PDF</div>
                          <div className="text-[10px] font-bold text-indigo-400 uppercase tracking-[0.3em]">In-Browser Forging</div>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Explore More Tools */}
        <div className="mt-40 text-center">
           <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mb-10">Access further industrial utilities</p>
           <Link href="/tools" className="inline-flex items-center gap-6 px-20 py-8 bg-white text-slate-900 rounded-[2.5rem] font-black uppercase tracking-widest text-[10px] hover:bg-indigo-600 hover:text-white transition-all shadow-3xl group">
             Explore All Systems <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
           </Link>
        </div>
      </section>
    </div>
  );
}
