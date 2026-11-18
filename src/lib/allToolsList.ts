export interface ToolItem {
  id: string;
  title: string;
  description: string;
  category: "all" | "organize" | "optimize" | "convert-to-pdf" | "convert-from-pdf" | "edit" | "security" | "developer" | "calculators" | "converters" | "academic";
  categoryLabel: string;
  href: string;
  badge?: string;
  color: string;
  icon: string;
}

export const CATEGORIES = [
  { id: "all", label: "All 84+ Tools" },
  { id: "organize", label: "Organize PDF" },
  { id: "optimize", label: "Optimize PDF" },
  { id: "convert-to-pdf", label: "Convert to PDF" },
  { id: "convert-from-pdf", label: "Convert from PDF" },
  { id: "edit", label: "Edit & Security" },
  { id: "developer", label: "Developer Utilities" },
  { id: "calculators", label: "Calculators & Finance" },
  { id: "converters", label: "Converters & Generators" },
  { id: "academic", label: "Academic & Career" },
] as const;

export const ALL_TOOLS: ToolItem[] = [
  {
    "id": "age-calculator",
    "title": "Age Calculator",
    "description": "Free online Age Calculator tool. 100% private in-browser client-side execution with zero server uploads.",
    "category": "calculators",
    "categoryLabel": "Calculators & Finance",
    "href": "/tools/age-calculator",
    "color": "emerald",
    "icon": "Calculator"
  },
  {
    "id": "aspect-ratio-calculator",
    "title": "Aspect Ratio & Resolution Calculator",
    "description": "Calculate image dimensions, video aspect ratios, and pixel scaling for 16:9 (HD/4K), 4:3, 1:1, 9:16 (TikTok/Reels), and 21:9 ultrawide screens. 100% free.",
    "category": "converters",
    "categoryLabel": "Converters & Utilities",
    "href": "/tools/aspect-ratio-calculator",
    "color": "teal",
    "icon": "RotateCw"
  },
  {
    "id": "assignment-formatter",
    "title": "Academic Assignment Formatter Online",
    "description": "Format university, college, and school assignments to professional academic standards. Standard margins, cover page generator, citation styling, and instant PDF export.",
    "category": "academic",
    "categoryLabel": "Academic & Regional",
    "href": "/tools/assignment-formatter",
    "color": "purple",
    "icon": "GraduationCap"
  },
  {
    "id": "barcode-generator",
    "title": "Free Online Barcode Generator",
    "description": "Create linear barcodes for retail products, shipping labels, inventory SKUs, and packaging. High-resolution PNG download with zero server uploads.",
    "category": "developer",
    "categoryLabel": "Developer Tools",
    "href": "/tools/barcode-generator",
    "color": "blue",
    "icon": "Code"
  },
  {
    "id": "base64-encoder",
    "title": "Base64 Encoder & Decoder Online",
    "description": "Encode text, files, and images into Base64 strings or decode Base64 into clean UTF-8 text. Fast in-browser Base64 converter with zero cloud file storage.",
    "category": "developer",
    "categoryLabel": "Developer Tools",
    "href": "/tools/base64-encoder",
    "badge": "Dev",
    "color": "blue",
    "icon": "Code"
  },
  {
    "id": "bmi-calculator",
    "title": "Body Mass Index (BMI) Calculator",
    "description": "Calculate your Body Mass Index (BMI), ideal weight range, and WHO fitness category. Supports metric (kg/cm) and imperial (lbs/ft/in) with zero health data tracking.",
    "category": "calculators",
    "categoryLabel": "Calculators & Finance",
    "href": "/tools/bmi-calculator",
    "color": "emerald",
    "icon": "Calculator"
  },
  {
    "id": "case-converter",
    "title": "Text Case Converter Online",
    "description": "Convert text case online instantly. Switch between UPPERCASE, lowercase, Title Case, Sentence case, camelCase, snake_case, PascalCase, and kebab-case. 100% free with 0 server uploads.",
    "category": "converters",
    "categoryLabel": "Converters & Utilities",
    "href": "/tools/case-converter",
    "color": "teal",
    "icon": "RotateCw"
  },
  {
    "id": "color-picker",
    "title": "Color Picker & Converter (HEX, RGB, HSL, CMYK)",
    "description": "Pick colors, extract color codes across HEX, RGB, HSL, and CMYK formats, and generate harmonized tints and monochromatic shades. 100% free web designer tool.",
    "category": "converters",
    "categoryLabel": "Converters & Utilities",
    "href": "/tools/color-picker",
    "color": "teal",
    "icon": "RotateCw"
  },
  {
    "id": "compare-pdf",
    "title": "Compare PDF Files Online",
    "description": "Compare two PDF documents side-by-side to highlight differences, additions, and deletions. Visual overlay and text diffing with zero cloud file uploads.",
    "category": "edit",
    "categoryLabel": "Edit PDF",
    "href": "/tools/compare-pdf",
    "color": "red",
    "icon": "PenTool"
  },
  {
    "id": "compound-interest",
    "title": "Compound Interest",
    "description": "Free online Compound Interest tool. 100% private in-browser client-side execution with zero server uploads.",
    "category": "calculators",
    "categoryLabel": "Calculators & Finance",
    "href": "/tools/compound-interest",
    "color": "emerald",
    "icon": "Calculator"
  },
  {
    "id": "cron-generator",
    "title": "Cron Expression Generator & Explainer",
    "description": "Build, validate, and understand standard Unix / Linux crontab expressions with instant human-readable descriptions. Free DevOps schedule builder with zero tracking.",
    "category": "developer",
    "categoryLabel": "Developer Tools",
    "href": "/tools/cron-generator",
    "color": "blue",
    "icon": "Code"
  },
  {
    "id": "css-minifier",
    "title": "CSS Minifier & Beautifier Online",
    "description": "Minify CSS code by stripping comments and redundant whitespace, or beautify CSS with clean indentation. Boost Core Web Vitals and page speed with zero uploads.",
    "category": "developer",
    "categoryLabel": "Developer Tools",
    "href": "/tools/css-minifier",
    "color": "blue",
    "icon": "Code"
  },
  {
    "id": "csv-to-json",
    "title": "CSV to JSON & JSON to CSV Converter",
    "description": "Convert CSV spreadsheets into clean JSON arrays or turn JSON objects into standard CSV files. Supports comma, semicolon, tab, and pipe delimiters with zero uploads.",
    "category": "developer",
    "categoryLabel": "Developer Tools",
    "href": "/tools/csv-to-json",
    "color": "blue",
    "icon": "Code"
  },
  {
    "id": "currency-converter",
    "title": "Live Multi-Currency Converter",
    "description": "Convert global currencies in real-time. Instant exchange rates for PKR, USD, EUR, GBP, AED, SAR, CAD, and AUD with historical trend calculator and zero tracking.",
    "category": "converters",
    "categoryLabel": "Converters & Utilities",
    "href": "/tools/currency-converter",
    "badge": "Utility",
    "color": "teal",
    "icon": "RotateCw"
  },
  {
    "id": "cv-maker",
    "title": "Professional CV Maker & Resume Builder",
    "description": "Build a job-winning, ATS-friendly curriculum vitae (CV) and resume in minutes. Modern executive templates, custom sections, live preview, and instant vector PDF export.",
    "category": "academic",
    "categoryLabel": "Academic & Regional",
    "href": "/tools/cv-maker",
    "color": "purple",
    "icon": "GraduationCap"
  },
  {
    "id": "diff-checker",
    "title": "Text & Code Diff Checker Online",
    "description": "Compare two text documents, code snippets, or revision drafts to highlight additions, deletions, and line changes. Side-by-side split and unified diff with zero uploads.",
    "category": "developer",
    "categoryLabel": "Developer Tools",
    "href": "/tools/diff-checker",
    "color": "blue",
    "icon": "Code"
  },
  {
    "id": "edit-pdf",
    "title": "Edit PDF Online Free",
    "description": "Edit PDF documents directly in your web browser. Add text, draw signatures, insert images, highlight paragraphs, and blackout content with 100% private client-side processing.",
    "category": "edit",
    "categoryLabel": "Edit PDF",
    "href": "/tools/edit-pdf",
    "color": "red",
    "icon": "PenTool"
  },
  {
    "id": "excel-reader",
    "title": "Excel File Viewer Online",
    "description": "Open and view Microsoft Excel spreadsheets (.xlsx, .xls) and CSV files in your browser without Microsoft Office. Interactive sheet tabs, cell formulas, and zero file uploads.",
    "category": "academic",
    "categoryLabel": "Academic & Regional",
    "href": "/tools/excel-reader",
    "color": "purple",
    "icon": "GraduationCap"
  },
  {
    "id": "excel-to-pdf",
    "title": "Excel To Pdf",
    "description": "Free online Excel To Pdf tool. 100% private in-browser client-side execution with zero server uploads.",
    "category": "convert-to-pdf",
    "categoryLabel": "Convert to PDF",
    "href": "/tools/excel-to-pdf",
    "color": "amber",
    "icon": "FileText"
  },
  {
    "id": "font-generator",
    "title": "Fancy Font Generator Online",
    "description": "Generate stylish, aesthetic Unicode fonts for Instagram bio, Twitter, TikTok, and gaming nicknames. Bold, italic, cursive, gothic, and glitch styles to copy and paste.",
    "category": "converters",
    "categoryLabel": "Converters & Utilities",
    "href": "/tools/font-generator",
    "color": "teal",
    "icon": "RotateCw"
  },
  {
    "id": "goal-planner",
    "title": "Daily Goal Planner & Productivity Tracker",
    "description": "Organize daily tasks, track habits, and achieve long-term milestones with our private productivity planner. Local storage persistence, zero tracking, and printable PDF export.",
    "category": "academic",
    "categoryLabel": "Academic & Regional",
    "href": "/tools/goal-planner",
    "color": "purple",
    "icon": "GraduationCap"
  },
  {
    "id": "gpa-calculator",
    "title": "Gpa Calculator",
    "description": "Free online Gpa Calculator tool. 100% private in-browser client-side execution with zero server uploads.",
    "category": "calculators",
    "categoryLabel": "Calculators & Finance",
    "href": "/tools/gpa-calculator",
    "color": "emerald",
    "icon": "Calculator"
  },
  {
    "id": "hash-generator",
    "title": "SHA-256, SHA-512 & MD5 Hash Generator",
    "description": "Generate cryptographic hashes directly in your browser using hardware-accelerated Web Crypto API. Support for SHA-256, SHA-512, SHA-384, SHA-1, and MD5 with zero server logs.",
    "category": "developer",
    "categoryLabel": "Developer Tools",
    "href": "/tools/hash-generator",
    "color": "blue",
    "icon": "Code"
  },
  {
    "id": "html-minifier",
    "title": "HTML Minifier & Code Compressor",
    "description": "Minify HTML markup by collapsing whitespace, removing comments, and stripping tag spacing. Boost website speed and Core Web Vitals with 100% private in-browser compression.",
    "category": "developer",
    "categoryLabel": "Developer Tools",
    "href": "/tools/html-minifier",
    "color": "blue",
    "icon": "Code"
  },
  {
    "id": "html-to-pdf",
    "title": "HTML to PDF Converter Online",
    "description": "Convert raw HTML, CSS, and web snippets into clean vector PDF documents. Perfect for developers generating invoices, reports, and receipts directly in-browser.",
    "category": "convert-to-pdf",
    "categoryLabel": "Convert to PDF",
    "href": "/tools/html-to-pdf",
    "color": "amber",
    "icon": "FileText"
  },
  {
    "id": "image-compress",
    "title": "Image Compressor Online",
    "description": "Compress images online without quality degradation. Reduce JPG, PNG, and WebP file sizes by up to 90% for faster website loading and email attachments. 100% private.",
    "category": "converters",
    "categoryLabel": "Converters & Utilities",
    "href": "/tools/image-compress",
    "color": "teal",
    "icon": "RotateCw"
  },
  {
    "id": "image-converter",
    "title": "Batch Image Format Converter",
    "description": "Convert images between JPG, PNG, WebP, AVIF, GIF, and SVG formats in your browser. Batch processing, customizable quality slider, and zero server file uploads.",
    "category": "converters",
    "categoryLabel": "Converters & Utilities",
    "href": "/tools/image-converter",
    "color": "teal",
    "icon": "RotateCw"
  },
  {
    "id": "image-resize",
    "title": "Image Resizer Online",
    "description": "Resize photos and images to exact pixel dimensions, millimeters, or percentages. Presets for Instagram, YouTube thumbnails, Facebook, and passport standards.",
    "category": "converters",
    "categoryLabel": "Converters & Utilities",
    "href": "/tools/image-resize",
    "color": "teal",
    "icon": "RotateCw"
  },
  {
    "id": "image-to-pdf",
    "title": "Image to PDF Converter Online",
    "description": "Combine multiple photos, scans, and images into a single professional PDF document. Reorder pages, adjust margins and page orientation with zero server uploads.",
    "category": "convert-to-pdf",
    "categoryLabel": "Convert to PDF",
    "href": "/tools/image-to-pdf",
    "color": "amber",
    "icon": "FileText"
  },
  {
    "id": "invoice-generator",
    "title": "Invoice Generator",
    "description": "Free online Invoice Generator tool. 100% private in-browser client-side execution with zero server uploads.",
    "category": "calculators",
    "categoryLabel": "Calculators & Finance",
    "href": "/tools/invoice-generator",
    "color": "emerald",
    "icon": "Calculator"
  },
  {
    "id": "json-formatter",
    "title": "Online JSON Formatter & Validator",
    "description": "Format, beautify, validate, minify, and auto-repair JSON data online. Fast client-side JSON parser with syntax error highlighting and zero cloud uploads.",
    "category": "developer",
    "categoryLabel": "Developer Tools",
    "href": "/tools/json-formatter",
    "badge": "Dev",
    "color": "blue",
    "icon": "Code"
  },
  {
    "id": "jwt-decoder",
    "title": "JSON Web Token (JWT) Decoder & Debugger",
    "description": "Decode and inspect JWT headers, payload claims, and expiration timestamps. Unlike third-party token decoders, your sensitive tokens are 100% private and never sent to a server.",
    "category": "developer",
    "categoryLabel": "Developer Tools",
    "href": "/tools/jwt-decoder",
    "color": "blue",
    "icon": "Code"
  },
  {
    "id": "loan-calculator",
    "title": "Loan Calculator",
    "description": "Free online Loan Calculator tool. 100% private in-browser client-side execution with zero server uploads.",
    "category": "calculators",
    "categoryLabel": "Calculators & Finance",
    "href": "/tools/loan-calculator",
    "color": "emerald",
    "icon": "Calculator"
  },
  {
    "id": "lorem-ipsum-generator",
    "title": "Lorem Ipsum & Dummy Text Generator",
    "description": "Generate classic Lorem Ipsum placeholder dummy text by paragraphs, sentences, or word count. Optional HTML tag wrapping and instant copy for designers & developers.",
    "category": "developer",
    "categoryLabel": "Developer Tools",
    "href": "/tools/lorem-ipsum-generator",
    "color": "blue",
    "icon": "Code"
  },
  {
    "id": "markdown-to-html",
    "title": "Markdown to HTML Converter Online",
    "description": "Convert Markdown syntax into clean, semantic HTML with instant split-pane preview. Format headings, lists, code blocks, and blockquotes with 0 server uploads.",
    "category": "developer",
    "categoryLabel": "Developer Tools",
    "href": "/tools/markdown-to-html",
    "color": "blue",
    "icon": "Code"
  },
  {
    "id": "marla-converter",
    "title": "Marla Converter",
    "description": "Free online Marla Converter tool. 100% private in-browser client-side execution with zero server uploads.",
    "category": "converters",
    "categoryLabel": "Converters & Utilities",
    "href": "/tools/marla-converter",
    "badge": "Utility",
    "color": "teal",
    "icon": "RotateCw"
  },
  {
    "id": "merit-calculator",
    "title": "Merit Calculator",
    "description": "Free online Merit Calculator tool. 100% private in-browser client-side execution with zero server uploads.",
    "category": "calculators",
    "categoryLabel": "Calculators & Finance",
    "href": "/tools/merit-calculator",
    "color": "emerald",
    "icon": "Calculator"
  },
  {
    "id": "morse-code-translator",
    "title": "Morse Code Translator & Audio Player",
    "description": "Translate text to Morse code and Morse code to plain English. Listen to audio beeps with real-time Web Audio API sound synthesis. 100% free educational tool.",
    "category": "converters",
    "categoryLabel": "Converters & Utilities",
    "href": "/tools/morse-code-translator",
    "color": "teal",
    "icon": "RotateCw"
  },
  {
    "id": "notes-to-pdf",
    "title": "Notes to PDF Formatter & Converter",
    "description": "Convert plain text and study notes into formatted PDF documents with headings, bullet points, and headers. Ideal for students, researchers, and lecture summaries.",
    "category": "convert-to-pdf",
    "categoryLabel": "Convert to PDF",
    "href": "/tools/notes-to-pdf",
    "color": "amber",
    "icon": "FileText"
  },
  {
    "id": "ocr-pdf",
    "title": "Ocr Pdf",
    "description": "Free online Ocr Pdf tool. 100% private in-browser client-side execution with zero server uploads.",
    "category": "optimize",
    "categoryLabel": "Optimize PDF",
    "href": "/tools/ocr-pdf",
    "color": "emerald",
    "icon": "Minimize2"
  },
  {
    "id": "organize-pdf",
    "title": "Organize PDF Pages Online",
    "description": "Rearrange, delete, duplicate, and rotate PDF pages with an intuitive visual thumbnail organizer. Combine or restructure documents with 100% in-browser processing.",
    "category": "organize",
    "categoryLabel": "Organize PDF",
    "href": "/tools/organize-pdf",
    "color": "red",
    "icon": "Layers"
  },
  {
    "id": "page-numbers",
    "title": "Page Numbers",
    "description": "Free online Page Numbers tool. 100% private in-browser client-side execution with zero server uploads.",
    "category": "organize",
    "categoryLabel": "Organize PDF",
    "href": "/tools/page-numbers",
    "color": "red",
    "icon": "Layers"
  },
  {
    "id": "passport-photo-resizer",
    "title": "Passport Photo Resizer",
    "description": "Free online Passport Photo Resizer tool. 100% private in-browser client-side execution with zero server uploads.",
    "category": "academic",
    "categoryLabel": "Academic & Regional",
    "href": "/tools/passport-photo-resizer",
    "color": "purple",
    "icon": "GraduationCap"
  },
  {
    "id": "password-generator",
    "title": "Secure Hardware-Entropy Password Generator",
    "description": "Generate unbreakable, random passwords using your device's cryptographic Web Crypto API entropy. Configure character sets, lengths, and memorable passphrases with zero telemetry.",
    "category": "converters",
    "categoryLabel": "Converters & Utilities",
    "href": "/tools/password-generator",
    "color": "teal",
    "icon": "RotateCw"
  },
  {
    "id": "password-strength",
    "title": "Password Strength Auditor & Crack-Time Analyzer",
    "description": "Audit your password security instantly. Calculate information entropy bits, estimated brute-force crack time across supercomputers, and detect common dictionary vulnerabilities.",
    "category": "converters",
    "categoryLabel": "Converters & Utilities",
    "href": "/tools/password-strength",
    "color": "teal",
    "icon": "RotateCw"
  },
  {
    "id": "pdf-compress",
    "title": "Pdf Compress",
    "description": "Free online Pdf Compress tool. 100% private in-browser client-side execution with zero server uploads.",
    "category": "optimize",
    "categoryLabel": "Optimize PDF",
    "href": "/tools/pdf-compress",
    "badge": "Essential",
    "color": "emerald",
    "icon": "Minimize2"
  },
  {
    "id": "pdf-merge",
    "title": "Pdf Merge",
    "description": "Free online Pdf Merge tool. 100% private in-browser client-side execution with zero server uploads.",
    "category": "organize",
    "categoryLabel": "Organize PDF",
    "href": "/tools/pdf-merge",
    "badge": "Popular",
    "color": "red",
    "icon": "Layers"
  },
  {
    "id": "pdf-reader",
    "title": "Lightweight Online PDF Reader",
    "description": "Open and read PDF documents instantly in your web browser without installing heavy software. Features thumbnail navigation, text search, zoom, and 100% offline privacy.",
    "category": "edit",
    "categoryLabel": "Edit PDF",
    "href": "/tools/pdf-reader",
    "color": "red",
    "icon": "PenTool"
  },
  {
    "id": "pdf-split",
    "title": "Pdf Split",
    "description": "Free online Pdf Split tool. 100% private in-browser client-side execution with zero server uploads.",
    "category": "organize",
    "categoryLabel": "Organize PDF",
    "href": "/tools/pdf-split",
    "color": "red",
    "icon": "Layers"
  },
  {
    "id": "pdf-to-excel",
    "title": "PDF to Excel Converter Online",
    "description": "Extract tabular data and financial statements from PDF files into editable Microsoft Excel (.xlsx) and CSV spreadsheets. High table structure fidelity with 0 server uploads.",
    "category": "convert-from-pdf",
    "categoryLabel": "Convert from PDF",
    "href": "/tools/pdf-to-excel",
    "color": "blue",
    "icon": "FileSpreadsheet"
  },
  {
    "id": "pdf-to-jpg",
    "title": "PDF to JPG Converter Online",
    "description": "Convert PDF pages into high-resolution JPG or PNG images. Extract all pages or specific sheets as crystal-clear images with batch ZIP download and zero server uploads.",
    "category": "convert-from-pdf",
    "categoryLabel": "Convert from PDF",
    "href": "/tools/pdf-to-jpg",
    "color": "blue",
    "icon": "FileSpreadsheet"
  },
  {
    "id": "pdf-to-pdfa",
    "title": "Pdf To Pdfa",
    "description": "Free online Pdf To Pdfa tool. 100% private in-browser client-side execution with zero server uploads.",
    "category": "convert-to-pdf",
    "categoryLabel": "Convert to PDF",
    "href": "/tools/pdf-to-pdfa",
    "color": "amber",
    "icon": "FileText"
  },
  {
    "id": "pdf-to-powerpoint",
    "title": "PDF to PowerPoint Converter Online",
    "description": "Convert PDF presentations and slide decks into editable Microsoft PowerPoint (.pptx) files. Maintain slide layouts, text blocks, and vector visuals with zero cloud uploads.",
    "category": "convert-from-pdf",
    "categoryLabel": "Convert from PDF",
    "href": "/tools/pdf-to-powerpoint",
    "color": "blue",
    "icon": "FileSpreadsheet"
  },
  {
    "id": "pdf-to-word",
    "title": "Pdf To Word",
    "description": "Free online Pdf To Word tool. 100% private in-browser client-side execution with zero server uploads.",
    "category": "convert-from-pdf",
    "categoryLabel": "Convert from PDF",
    "href": "/tools/pdf-to-word",
    "color": "blue",
    "icon": "FileSpreadsheet"
  },
  {
    "id": "pdf-watermark",
    "title": "Add Watermark to PDF Online",
    "description": "Apply custom text or transparent image logos as watermarks across PDF documents. Customize opacity, rotation, font size, and page ranges with 100% private in-browser processing.",
    "category": "security",
    "categoryLabel": "PDF Security",
    "href": "/tools/pdf-watermark",
    "color": "purple",
    "icon": "Lock"
  },
  {
    "id": "percentage-calculator",
    "title": "Multi-Purpose Percentage Calculator",
    "description": "Calculate percentage changes, markups, discounts, profit margins, and ratios instantly. 6-in-1 financial and mathematical percentage calculator with step-by-step formula breakdown.",
    "category": "calculators",
    "categoryLabel": "Calculators & Finance",
    "href": "/tools/percentage-calculator",
    "color": "emerald",
    "icon": "Calculator"
  },
  {
    "id": "powerpoint-to-pdf",
    "title": "Powerpoint To Pdf",
    "description": "Free online Powerpoint To Pdf tool. 100% private in-browser client-side execution with zero server uploads.",
    "category": "convert-to-pdf",
    "categoryLabel": "Convert to PDF",
    "href": "/tools/powerpoint-to-pdf",
    "color": "amber",
    "icon": "FileText"
  },
  {
    "id": "ppt-reader",
    "title": "PowerPoint Presentation Viewer Online",
    "description": "Open and view Microsoft PowerPoint slide decks (.pptx, .ppt) directly in your web browser. Slide preview, full-screen presentation mode, and zero server file uploads.",
    "category": "academic",
    "categoryLabel": "Academic & Regional",
    "href": "/tools/ppt-reader",
    "color": "purple",
    "icon": "GraduationCap"
  },
  {
    "id": "protect-pdf",
    "title": "Protect Pdf",
    "description": "Free online Protect Pdf tool. 100% private in-browser client-side execution with zero server uploads.",
    "category": "security",
    "categoryLabel": "PDF Security",
    "href": "/tools/protect-pdf",
    "color": "purple",
    "icon": "Lock"
  },
  {
    "id": "qr-generator",
    "title": "Custom High-Resolution QR Code Generator",
    "description": "Create custom high-resolution QR codes for websites, WiFi networks, vCards, WhatsApp messages, and text. Customize colors, add logos, and export vector SVG or PNG with zero expiration.",
    "category": "developer",
    "categoryLabel": "Developer Tools",
    "href": "/tools/qr-generator",
    "badge": "Dev",
    "color": "blue",
    "icon": "Code"
  },
  {
    "id": "question-generator",
    "title": "MCQ & Quiz Question Generator",
    "description": "Generate customized multiple choice questions, quizzes, and exam test papers. Add answer keys, configure difficulty levels, and export to printable PDF format.",
    "category": "academic",
    "categoryLabel": "Academic & Regional",
    "href": "/tools/question-generator",
    "color": "purple",
    "icon": "GraduationCap"
  },
  {
    "id": "redact-pdf",
    "title": "Redact PDF Online - Black Out Sensitive Text",
    "description": "Permanently remove and blackout confidential text, CNIC numbers, credit cards, and personal data from PDF files. True cryptographic sanitization with zero server uploads.",
    "category": "security",
    "categoryLabel": "PDF Security",
    "href": "/tools/redact-pdf",
    "color": "purple",
    "icon": "Lock"
  },
  {
    "id": "regex-tester",
    "title": "Online Regular Expression (RegEx) Tester",
    "description": "Test and debug regular expressions with real-time match highlighting, flag toggles (g, i, m, s), and pre-built pattern libraries. 100% in-browser evaluation with zero logs.",
    "category": "developer",
    "categoryLabel": "Developer Tools",
    "href": "/tools/regex-tester",
    "color": "blue",
    "icon": "Code"
  },
  {
    "id": "remove-pages",
    "title": "Remove Pages from PDF Online",
    "description": "Select and permanently delete specific pages or page ranges from any PDF document. Fast visual thumbnail preview, zero quality loss, and 100% private in-browser processing.",
    "category": "organize",
    "categoryLabel": "Organize PDF",
    "href": "/tools/remove-pages",
    "color": "red",
    "icon": "Layers"
  },
  {
    "id": "repair-pdf",
    "title": "Repair Corrupted PDF Online",
    "description": "Repair broken, damaged, or unreadable PDF files online. Reconstruct damaged cross-reference tables, fix corrupt file headers, and recover text streams in your browser.",
    "category": "optimize",
    "categoryLabel": "Optimize PDF",
    "href": "/tools/repair-pdf",
    "color": "emerald",
    "icon": "Minimize2"
  },
  {
    "id": "resume-score",
    "title": "ATS Resume Checker & Score Analyzer",
    "description": "Audit your resume against modern Applicant Tracking System (ATS) hiring standards. Check keyword density, formatting red flags, typography, and get an instant score.",
    "category": "academic",
    "categoryLabel": "Academic & Regional",
    "href": "/tools/resume-score",
    "color": "purple",
    "icon": "GraduationCap"
  },
  {
    "id": "robots-txt-builder",
    "title": "Robots.txt Builder & Generator",
    "description": "Build perfectly formatted robots.txt files for Googlebot, Bingbot, and AI crawlers. Configure allow/disallow rules, sitemap links, and crawl delays with 1-click download.",
    "category": "developer",
    "categoryLabel": "Developer Tools",
    "href": "/tools/robots-txt-builder",
    "color": "blue",
    "icon": "Code"
  },
  {
    "id": "rotate-pdf",
    "title": "Rotate Pdf",
    "description": "Free online Rotate Pdf tool. 100% private in-browser client-side execution with zero server uploads.",
    "category": "organize",
    "categoryLabel": "Organize PDF",
    "href": "/tools/rotate-pdf",
    "color": "red",
    "icon": "Layers"
  },
  {
    "id": "salary-tax-calculator",
    "title": "Salary Tax Calculator",
    "description": "Free online Salary Tax Calculator tool. 100% private in-browser client-side execution with zero server uploads.",
    "category": "calculators",
    "categoryLabel": "Calculators & Finance",
    "href": "/tools/salary-tax-calculator",
    "badge": "Trending",
    "color": "emerald",
    "icon": "Calculator"
  },
  {
    "id": "scan-to-pdf",
    "title": "Scan to PDF Online Free",
    "description": "Scan documents, receipts, and notes using your mobile phone or laptop camera directly into clean, high-contrast PDF files. Auto-cropping, contrast enhancement, and zero uploads.",
    "category": "convert-to-pdf",
    "categoryLabel": "Convert to PDF",
    "href": "/tools/scan-to-pdf",
    "color": "amber",
    "icon": "FileText"
  },
  {
    "id": "seo-meta-generator",
    "title": "SEO Meta Tag Generator Online",
    "description": "Generate perfectly optimized SEO title tags, meta descriptions, OpenGraph social cards, Twitter cards, and Schema markup for your website in seconds.",
    "category": "developer",
    "categoryLabel": "Developer Tools",
    "href": "/tools/seo-meta-generator",
    "color": "blue",
    "icon": "Code"
  },
  {
    "id": "sign-pdf",
    "title": "Sign Pdf",
    "description": "Free online Sign Pdf tool. 100% private in-browser client-side execution with zero server uploads.",
    "category": "security",
    "categoryLabel": "PDF Security",
    "href": "/tools/sign-pdf",
    "color": "purple",
    "icon": "Lock"
  },
  {
    "id": "slug-generator",
    "title": "URL Slug & Permalink Generator",
    "description": "Convert article titles, product names, and headlines into clean, search-engine-friendly URL slugs. Handles accents, punctuation, and separator selection with zero tracking.",
    "category": "developer",
    "categoryLabel": "Developer Tools",
    "href": "/tools/slug-generator",
    "color": "blue",
    "icon": "Code"
  },
  {
    "id": "stamp-paper-formatter",
    "title": "Stamp Paper Formatter",
    "description": "Free online Stamp Paper Formatter tool. 100% private in-browser client-side execution with zero server uploads.",
    "category": "academic",
    "categoryLabel": "Academic & Regional",
    "href": "/tools/stamp-paper-formatter",
    "color": "purple",
    "icon": "GraduationCap"
  },
  {
    "id": "study-timer",
    "title": "Focus Study Timer & Pomodoro Clock",
    "description": "Maximize academic concentration and deep work productivity with our customizable Pomodoro study timer. 25-minute intervals, short/long break timers, and session audio cues.",
    "category": "academic",
    "categoryLabel": "Academic & Regional",
    "href": "/tools/study-timer",
    "color": "purple",
    "icon": "GraduationCap"
  },
  {
    "id": "svg-to-png",
    "title": "SVG to PNG & WebP Converter Online",
    "description": "Convert SVG vector graphics into high-resolution PNG or WebP images with custom resolution scaling (1x, 2x, 4x, 8x). 100% private in-browser vector rendering.",
    "category": "converters",
    "categoryLabel": "Converters & Utilities",
    "href": "/tools/svg-to-png",
    "color": "teal",
    "icon": "RotateCw"
  },
  {
    "id": "time-zone-converter",
    "title": "World Time Zone Converter & Scheduler",
    "description": "Convert international time zones and plan cross-border meetings across London, New York, Dubai, Lahore, Delhi, Tokyo, and Sydney with an interactive time slider.",
    "category": "converters",
    "categoryLabel": "Converters & Utilities",
    "href": "/tools/time-zone-converter",
    "color": "teal",
    "icon": "RotateCw"
  },
  {
    "id": "unit-converter",
    "title": "Universal Unit & Measurement Converter",
    "description": "Convert length, mass, temperature, speed, digital storage, and volume measurements across metric and imperial systems. Certified international standards with 0 tracking.",
    "category": "converters",
    "categoryLabel": "Converters & Utilities",
    "href": "/tools/unit-converter",
    "color": "teal",
    "icon": "RotateCw"
  },
  {
    "id": "unlock-pdf",
    "title": "Unlock Pdf",
    "description": "Free online Unlock Pdf tool. 100% private in-browser client-side execution with zero server uploads.",
    "category": "security",
    "categoryLabel": "PDF Security",
    "href": "/tools/unlock-pdf",
    "color": "purple",
    "icon": "Lock"
  },
  {
    "id": "url-encoder",
    "title": "URL Encoder & Decoder Online",
    "description": "Encode and decode URLs, URI components, and query strings online according to RFC 3986. Fast in-browser percent-encoding tool with instant query parameter inspection.",
    "category": "developer",
    "categoryLabel": "Developer Tools",
    "href": "/tools/url-encoder",
    "color": "blue",
    "icon": "Code"
  },
  {
    "id": "word-counter",
    "title": "Real-Time Word & Character Counter",
    "description": "Accurate real-time word counter, character counter (with and without spaces), sentence tracker, paragraph counter, reading time calculator, and keyword density analyzer.",
    "category": "converters",
    "categoryLabel": "Converters & Utilities",
    "href": "/tools/word-counter",
    "badge": "Utility",
    "color": "teal",
    "icon": "RotateCw"
  },
  {
    "id": "word-reader",
    "title": "Word Document Reader Online (DOCX)",
    "description": "Open and read Microsoft Word documents (.docx, .doc) in your browser without Microsoft Office. Clean typography, table rendering, fast loading, and zero server file uploads.",
    "category": "academic",
    "categoryLabel": "Academic & Regional",
    "href": "/tools/word-reader",
    "color": "purple",
    "icon": "GraduationCap"
  },
  {
    "id": "word-to-pdf",
    "title": "Word To Pdf",
    "description": "Free online Word To Pdf tool. 100% private in-browser client-side execution with zero server uploads.",
    "category": "convert-to-pdf",
    "categoryLabel": "Convert to PDF",
    "href": "/tools/word-to-pdf",
    "color": "amber",
    "icon": "FileText"
  },
  {
    "id": "zakat-calculator",
    "title": "Zakat Calculator",
    "description": "Free online Zakat Calculator tool. 100% private in-browser client-side execution with zero server uploads.",
    "category": "calculators",
    "categoryLabel": "Calculators & Finance",
    "href": "/tools/zakat-calculator",
    "badge": "Trending",
    "color": "emerald",
    "icon": "Calculator"
  }
];
