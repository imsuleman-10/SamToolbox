"use client";

import { useState } from "react";
import { Brain, Plus, Trash2, Download, Zap, BookOpen, Target, Sparkles, HelpCircle } from "lucide-react";

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
      alert("Failed to generate PDF.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-[10px] font-black uppercase tracking-widest border border-brand-100">
            <Sparkles size={12} />
            <span>AI-Ready Architecture</span>
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-none">
            Question <span className="text-brand-600">Generator</span>
          </h1>
          <p className="text-slate-500 font-medium">Create professional MCQ sets for exams and practice sessions.</p>
        </div>
        
        <button
          onClick={downloadQuestions}
          disabled={isGenerating}
          className="flex items-center justify-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-2xl hover:shadow-brand-500/20 hover:-translate-y-1 transition-all active:translate-y-0 disabled:opacity-50"
        >
          {isGenerating ? <Zap className="animate-pulse" size={18} /> : <Download size={18} />}
          {isGenerating ? "FORGING PDF..." : "EXPORT QUIZ SET"}
        </button>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Editor Sidebar/List */}
        <div className="lg:col-span-8 space-y-6">
          {questions.map((q, qIdx) => (
            <div key={q.id} className="group bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center text-xs font-black">
                    {qIdx + 1}
                  </div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Question Module</span>
                </div>
                <button
                  onClick={() => removeQuestion(q.id)}
                  className="p-2 text-slate-300 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
              
              <div className="p-6 space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Question Text</label>
                  <textarea
                    value={q.question}
                    onChange={(e) => updateQuestion(q.id, "question", e.target.value)}
                    placeholder="Enter your question here..."
                    rows={2}
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-500/5 outline-none text-sm font-medium transition-all placeholder:text-slate-300"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  {q.options.map((opt, oIdx) => (
                    <div key={oIdx} className="space-y-2">
                      <div className="flex justify-between items-center px-1">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                          Option {String.fromCharCode(65 + oIdx)}
                        </label>
                        <button
                          onClick={() => updateQuestion(q.id, "correctAnswer", oIdx)}
                          className={`text-[9px] font-black uppercase tracking-tighter px-2 py-0.5 rounded-md transition-all ${
                            q.correctAnswer === oIdx
                              ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20"
                              : "bg-slate-100 text-slate-400 hover:bg-slate-200"
                          }`}
                        >
                          {q.correctAnswer === oIdx ? "Correct Answer" : "Mark Correct"}
                        </button>
                      </div>
                      <input
                        type="text"
                        value={opt}
                        onChange={(e) => updateOption(q.id, oIdx, e.target.value)}
                        placeholder={`Option ${String.fromCharCode(65 + oIdx)}...`}
                        className={`w-full px-5 py-3 rounded-xl border outline-none text-sm font-medium transition-all ${
                          q.correctAnswer === oIdx
                            ? "bg-emerald-50/30 border-emerald-200 focus:border-emerald-500"
                            : "bg-slate-50 border-slate-100 focus:border-brand-500"
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
            className="w-full py-6 border-2 border-dashed border-slate-200 rounded-3xl text-slate-400 hover:border-brand-500 hover:text-brand-600 hover:bg-brand-50/30 transition-all flex items-center justify-center gap-3 font-black uppercase tracking-widest text-xs"
          >
            <Plus size={18} />
            Append Question
          </button>
        </div>

        {/* Info & Stats */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-xl p-8 space-y-8">
            <div>
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-6 flex items-center gap-2">
                <Target size={16} className="text-brand-600" />
                Session Metrics
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total</p>
                  <p className="text-2xl font-black text-slate-900">{questions.length}</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Answered</p>
                  <p className="text-2xl font-black text-slate-900">
                    {questions.filter(q => q.question.trim() !== "").length}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-slate-100">
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-4 flex items-center gap-2">
                <BookOpen size={16} className="text-indigo-600" />
                Pro Guidelines
              </h3>
              <ul className="space-y-3 text-xs font-medium text-slate-500">
                <li className="flex gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-500 mt-1.5 shrink-0" />
                  Ensure question clarity for higher accuracy.
                </li>
                <li className="flex gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-500 mt-1.5 shrink-0" />
                  Mark the correct answer using the tag.
                </li>
                <li className="flex gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-500 mt-1.5 shrink-0" />
                  Export to PDF for print-ready sheets.
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-indigo-600 rounded-3xl p-8 text-white shadow-xl shadow-indigo-500/20 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
            <Brain size={48} className="mb-6 opacity-40" />
            <h4 className="text-xl font-black tracking-tight mb-2 uppercase">Ready for Exams?</h4>
            <p className="text-sm font-medium opacity-80 leading-relaxed">
              Use this tool to simulate real-world testing environments. Research shows that self-testing increases retention by up to 50%.
            </p>
          </div>
        </div>
      </div>
    </div>

      {/* Information Section */}
      <div className="max-w-5xl mx-auto px-4 mt-20 grid lg:grid-cols-2 gap-12 border-t border-slate-100 pt-16">
        <div className="space-y-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-brand-50 rounded-xl text-brand-600">
              <BookOpen size={20} />
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Assembly Protocol</h2>
          </div>
          
          <div className="space-y-6">
            {[
              { step: "01", title: "Module Initialization", desc: "Click 'Append Question' to generate a new quiz module. Each unit is logically separated for optimal readability." },
              { step: "02", title: "Content Formulation", desc: "Define your question and provide four distinct options. Use high-quality distractors to increase testing validity." },
              { step: "03", title: "Logical Verification", desc: "Utilize the 'Mark Correct' toggle to identify the target answer. This automatically populates the integrated Answer Key." },
              { step: "04", title: "Document Forging", desc: "Select 'Export Quiz Set'. Our engine performs an industrial-grade PDF render, perfect for digital sharing or physical print." }
            ].map((item, i) => (
              <div key={i} className="flex gap-6 group">
                <span className="text-3xl font-black text-slate-100 group-hover:text-brand-100 transition-colors duration-300">{item.step}</span>
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
            <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Quiz Intelligence FAQ</h2>
          </div>

          <div className="space-y-4">
            {[
              { q: "Is this tool AI-driven?", a: "This is a structural architect. You provide the expertise, and we provide the professional formatting, logical validation, and PDF engine." },
              { q: "Is my data private?", a: "100%. SamToolbox uses 'Air-Gapped' processing. Your questions are never transmitted to a server and exist only in your browser." },
              { q: "Can I edit after marking?", a: "Yes. You have full control over all fields and correct-answer markers until the moment you initiate the export process." },
              { q: "Why PDF format?", a: "PDF ensures that your quiz layout, font sizes, and answer keys remain consistent across all devices and printers." }
            ].map((faq, i) => (
              <div key={i} className="p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300">
                <h3 className="font-black text-slate-900 text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
                  {faq.q}
                </h3>
                <p className="text-slate-500 text-xs leading-relaxed font-medium">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
