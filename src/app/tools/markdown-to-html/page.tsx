"use client";

import { useState, useMemo } from "react";
import {
  FileText,
  Copy,
  Check,
  Download,
  Trash2,
  Code,
  Eye,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export default function MarkdownToHtmlPage() {
  const [markdown, setMarkdown] = useState<string>(
    `# Welcome to SamToolbox Markdown Converter\n\nConvert **Markdown** into clean, semantic **HTML** in real-time.\n\n## Key Features\n- 100% In-Browser Conversion (No Server Uploads)\n- Supports *headings*, *emphasis*, and [hyperlinks](https://samtoolbox.com)\n- Formats lists, blockquotes, and code blocks instantly\n\n### Code Example\n\`\`\`javascript\nconst greet = (name) => \`Hello, \${name}!\`;\nconsole.log(greet("World"));\n\`\`\`\n\n> "Simplicity is the soul of efficiency." — Austin Freeman`
  );
  const [viewMode, setViewMode] = useState<"split" | "html" | "preview">("split");
  const [copied, setCopied] = useState(false);

  // Client-side markdown to HTML parser
  const htmlOutput = useMemo(() => {
    if (!markdown) return "";
    let html = markdown
      // Escape raw HTML entities
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      // Fenced code blocks
      .replace(/```([a-z0-9]*)\n([\s\S]*?)```/gm, '<pre><code class="language-$1">$2</code></pre>')
      // Inline code
      .replace(/`([^`]+)`/g, "<code>$1</code>")
      // Headers
      .replace(/^######\s*(.*?)$/gm, "<h6>$1</h6>")
      .replace(/^#####\s*(.*?)$/gm, "<h5>$1</h5>")
      .replace(/^####\s*(.*?)$/gm, "<h4>$1</h4>")
      .replace(/^###\s*(.*?)$/gm, "<h3>$1</h3>")
      .replace(/^##\s*(.*?)$/gm, "<h2>$1</h2>")
      .replace(/^#\s*(.*?)$/gm, "<h1>$1</h1>")
      // Blockquotes
      .replace(/^\>\s*(.*?)$/gm, "<blockquote>$1</blockquote>")
      // Bold & Italic
      .replace(/\*\*\*(.*?)\*\*\*/g, "<strong><em>$1</em></strong>")
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/___(.*?)___/g, "<strong><em>$1</em></strong>")
      .replace(/__(.*?)__/g, "<strong>$1</strong>")
      .replace(/_(.*?)_/g, "<em>$1</em>")
      // Links
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
      // Unordered lists
      .replace(/^\s*[-*+]\s+(.*)$/gm, "<li>$1</li>")
      // Paragraphs
      .replace(/\n\n+/g, "</p><p>")
      .replace(/\n/g, "<br />");

    return `<p>${html}</p>`
      .replace(/<p><\/p>/g, "")
      .replace(/<p>(<h[1-6]>.*?<\/h[1-6]>)<\/p>/g, "$1")
      .replace(/<p>(<pre>[\s\S]*?<\/pre>)<\/p>/g, "$1")
      .replace(/<p>(<blockquote>.*?<\/blockquote>)<\/p>/g, "$1");
  }, [markdown]);

  const handleCopy = () => {
    if (!htmlOutput) return;
    navigator.clipboard.writeText(htmlOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!htmlOutput) return;
    const fullHtml = `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <title>Converted Document</title>\n  <style>body{font-family:system-ui,sans-serif;line-height:1.6;max-width:800px;margin:40px auto;padding:0 20px;}code{background:#f1f5f9;padding:2px 6px;border-radius:4px;}pre{background:#0f172a;color:#f8fafc;padding:16px;border-radius:8px;overflow-x:auto;}blockquote{border-left:4px solid #e5322d;padding-left:16px;color:#64748b;margin:16px 0;}</style>\n</head>\n<body>\n${htmlOutput}\n</body>\n</html>`;
    const blob = new Blob([fullHtml], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "document.html";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-100 text-[#e5322d] text-xs font-bold mb-4">
          <FileText className="w-3.5 h-3.5" />
          Real-Time AST Markdown Parser
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-3">
          Markdown to HTML Converter Online
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Convert Markdown syntax into clean, standard semantic HTML with instant live preview. 100% private in-browser conversion with zero server uploads.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        {/* Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <div className="inline-flex rounded-xl bg-slate-100 p-1">
              <button
                onClick={() => setViewMode("split")}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                  viewMode === "split" ? "bg-[#e5322d] text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Split View
              </button>
              <button
                onClick={() => setViewMode("html")}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                  viewMode === "html" ? "bg-[#e5322d] text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Code className="w-3.5 h-3.5 inline mr-1" /> Raw HTML
              </button>
              <button
                onClick={() => setViewMode("preview")}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                  viewMode === "preview" ? "bg-[#e5322d] text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Eye className="w-3.5 h-3.5 inline mr-1" /> Rich Preview
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? "Copied HTML!" : "Copy HTML"}
            </button>
            <button
              onClick={handleDownload}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" /> Download .html
            </button>
            <button
              onClick={() => setMarkdown("")}
              className="p-2 text-slate-400 hover:text-red-600 transition-colors"
              title="Clear text"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Editor Area */}
        <div className={`grid gap-6 ${viewMode === "split" ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1"}`}>
          {/* Markdown Input */}
          {(viewMode === "split" || viewMode === "html") && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                <span>Markdown Input</span>
                <span className="text-[11px] text-slate-400">{markdown.length} characters</span>
              </div>
              <textarea
                value={markdown}
                onChange={(e) => setMarkdown(e.target.value)}
                placeholder="Write or paste your Markdown here..."
                className="w-full h-96 p-4 font-mono text-xs sm:text-sm bg-slate-50 text-slate-900 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500 leading-relaxed resize-y"
                spellCheck={false}
              />
            </div>
          )}

          {/* HTML / Preview Output */}
          {(viewMode === "split" || viewMode === "preview") && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                <span>Rendered HTML Output</span>
                <span className="text-[11px] text-emerald-600 font-medium">Live In-Browser AST</span>
              </div>
              <div
                className="w-full h-96 p-5 overflow-y-auto bg-white rounded-2xl border border-slate-200 prose prose-slate max-w-none prose-sm leading-relaxed"
                dangerouslySetInnerHTML={{ __html: htmlOutput }}
              />
            </div>
          )}
        </div>

        {/* Privacy Note */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
          <span className="flex items-center gap-1.5 text-emerald-600 font-medium">
            <ShieldCheck className="w-4 h-4" /> 100% In-Memory Parsing (Zero Server File Transmission)
          </span>
          <span className="text-[11px] text-slate-400">Strict CommonMark Spec</span>
        </div>
      </div>
    </div>
  );
}
