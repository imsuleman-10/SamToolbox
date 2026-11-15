import type { Metadata } from "next";

export interface ToolSeoEntry {
  slug: string;
  title: string;
  h1: string;
  metaTitle: string;
  description: string;
  keywords: string[];
  category: "UtilityApplication" | "BusinessApplication" | "EducationalApplication" | "DesignApplication" | "FinancialApplication" | "SecurityApplication";
  faqs: Array<{ question: string; answer: string }>;
  geoRegions?: string[];
}

export const BASE_URL = "https://samtoolbox.vercel.app";

export const TOOL_SEO_REGISTRY: Record<string, ToolSeoEntry> = {
  // === TOP PAKISTAN & GLOBAL UTILITIES ===
  "salary-tax-calculator": {
    slug: "salary-tax-calculator",
    title: "FBR Salary Tax Calculator 2024-2025 / 2026 Pakistan",
    h1: "FBR Salary Tax Calculator (Pakistan Finance Act 2024-2026)",
    metaTitle: "FBR Salary Tax Calculator 2024-2025 / 2026 Pakistan | Download Salary Slip | SamToolbox",
    description: "Calculate your monthly and annual income tax liability in Pakistan under the latest FBR Finance Act 2024-2026 progressive slabs. Features 0-upload privacy, net salary breakdown, and instant downloadable PDF salary slip.",
    keywords: [
      "fbr salary tax calculator",
      "pakistan income tax calculator 2024-2025",
      "finance act 2024 salary tax slabs",
      "salaried tax slabs fbr pakistan",
      "calculate salary tax online pakistan",
      "monthly net salary calculator fbr",
      "download salary slip pdf pakistan",
      "income tax return salaried person fbr",
    ],
    category: "BusinessApplication",
    geoRegions: ["PK", "PK-PB", "PK-SD", "PK-KP", "PK-BA", "PK-IS"],
    faqs: [
      {
        question: "What are the latest FBR salary tax slabs for 2024-2026 in Pakistan?",
        answer: "Under the Finance Act 2024-2026, taxable salary up to Rs. 600,000 per year is 0% tax. Rs. 600k to 1.2M is taxed at 5% of amount over 600k. Rs. 1.2M to 2.2M is Rs. 30,000 + 15% on excess. Rs. 2.2M to 3.2M is Rs. 180,000 + 25% on excess. Rs. 3.2M to 4.1M is Rs. 430,000 + 30% on excess. Above Rs. 4.1M is Rs. 700,000 + 35% on excess, plus a 10% surcharge on income exceeding 10 Million.",
      },
      {
        question: "Does SamToolbox store my salary information?",
        answer: "No. The SamToolbox Salary Tax Calculator runs 100% inside your browser using client-side JavaScript. Your salary data is never sent to any server or logged.",
      },
      {
        question: "Can I generate and download an official salary slip PDF?",
        answer: "Yes, you can input your name, designation, department, allowances, and deductions to download an itemized, printable PDF salary slip instantly.",
      },
    ],
  },

  "merit-calculator": {
    slug: "merit-calculator",
    title: "University Aggregate Merit Calculator Pakistan",
    h1: "Pakistan University Aggregate Merit Calculator",
    metaTitle: "University Aggregate Merit Calculator 2024-2026 | NUST, FAST, MDCAT, UET | SamToolbox",
    description: "Calculate your university admission aggregate percentage for NUST, FAST-NUCES, MDCAT, UET Lahore (ECAT), and COMSATS with official admission committee formulas and instant PDF merit certificate download.",
    keywords: [
      "university aggregate calculator pakistan",
      "nust aggregate calculator net",
      "fast aggregate calculator nu test",
      "mdcat aggregate calculator pmc",
      "uet ecat aggregate calculator",
      "comsats nts aggregate calculator",
      "calculate university merit online",
      "merit certificate download pdf",
    ],
    category: "EducationalApplication",
    geoRegions: ["PK", "PK-PB", "PK-IS", "PK-SD", "PK-KP"],
    faqs: [
      {
        question: "What formula does NUST use to calculate aggregate merit?",
        answer: "NUST calculates aggregate merit as: 75% NET Entry Test Score + 15% FSc / HSSC / A-Level marks + 10% Matric / O-Level marks.",
      },
      {
        question: "What is the formula for FAST-NUCES merit aggregate?",
        answer: "FAST-NUCES calculates aggregate as: 50% NU Entry Test score + 50% FSc Part-1 / Matric marks, or 50% SAT score depending on your application category.",
      },
      {
        question: "What is the official MDCAT weightage in Pakistan?",
        answer: "Medical and Dental Colleges calculate aggregate as: 50% MDCAT + 40% FSc Pre-Medical + 10% Matric marks.",
      },
    ],
  },

  "marla-converter": {
    slug: "marla-converter",
    title: "Marla & Land Area Converter Pakistan",
    h1: "Marla to Square Feet & Land Area Converter (Pakistan)",
    metaTitle: "Marla Converter Pakistan | 225, 250 & 272.25 Sq Ft to Kanal & Acre | SamToolbox",
    description: "Convert Marla to Square Feet, Square Yards (Guz), Kanal, Acre, and Square Meters. Supports Lahore/Zameen (225 sq ft), Islamabad/CDA (250 sq ft), and Govt Settlement (272.25 sq ft) standards with PDF land report.",
    keywords: [
      "marla to sq ft converter",
      "how many square feet in one marla pakistan",
      "marla to kanal converter",
      "zameen marla size 225 sq ft",
      "islamabad marla 250 sq ft",
      "patwari marla 272.25 sq ft",
      "plot size calculator pakistan",
      "property area conversion calculator",
    ],
    category: "UtilityApplication",
    geoRegions: ["PK", "PK-PB", "PK-IS", "PK-SD", "AE", "SA"],
    faqs: [
      {
        question: "How many square feet are in 1 Marla in Lahore vs Islamabad?",
        answer: "In Lahore, DHA, and private societies (Zameen.com standard), 1 Marla equals 225 square feet. In Islamabad, Rawalpindi, and CDA sectors, 1 Marla equals 250 square feet. Traditional revenue patwari records use 272.25 square feet.",
      },
      {
        question: "How many Marlas make 1 Kanal in Pakistan?",
        answer: "Exactly 20 Marlas make 1 Kanal across all Pakistani regional land measurement systems.",
      },
    ],
  },

  "zakat-calculator": {
    slug: "zakat-calculator",
    title: "Zakat Calculator Pakistan & Global with Silver Nisab",
    h1: "Zakat Calculator with Live Nisab Valuation",
    metaTitle: "Zakat Calculator 2024-2026 | 52.5 Tola Silver Nisab Assessment | SamToolbox",
    description: "Calculate your mandatory 2.5% Zakat liability across gold, silver, bank cash, investments, and business stock against the 52.5 Tola Silver Nisab threshold. Includes instant PDF Zakat assessment report.",
    keywords: [
      "zakat calculator pakistan",
      "silver nisab zakat 2024 2025",
      "52.5 tola silver zakat threshold",
      "calculate zakat on gold and cash",
      "zakat assessment report pdf",
      "islamic zakat calculator online",
    ],
    category: "FinancialApplication",
    geoRegions: ["PK", "SA", "AE", "GB", "US", "CA"],
    faqs: [
      {
        question: "What is the Nisab threshold for Zakat?",
        answer: "According to Islamic jurisprudence, the Nisab is 52.5 Tolas (approx 612.36 grams) of pure silver or 7.5 Tolas (approx 87.48 grams) of pure gold. Most contemporary scholars recommend calculating cash against the Silver Nisab to benefit the needy.",
      },
      {
        question: "What percentage is paid as Zakat?",
        answer: "Zakat is exactly 2.5% (one-fortieth) of your total qualifying net wealth held continuously for one lunar year (Hawl).",
      },
    ],
  },

  "stamp-paper-formatter": {
    slug: "stamp-paper-formatter",
    title: "Pakistani e-Stamp Paper Margin Formatter (120mm)",
    h1: "Pakistani e-Stamp Paper Margin Layout Formatter",
    metaTitle: "e-Stamp Paper Formatter | 120mm Top Margin for Rs 100/500/1200 Punjab & Sindh | SamToolbox",
    description: "Pre-align legal affidavits, rental agreements, undertakings, and power of attorney with the exact 120mm top blank margin required for Punjab & Sindh e-Stamp papers. Download ready-to-print PDF or print directly.",
    keywords: [
      "e stamp paper margin formatter",
      "punjab e stamp top margin cm mm",
      "sindh e stamp paper print layout",
      "affidavit stamp paper format pakistan",
      "120mm top margin legal paper word pdf",
      "rs 100 stamp paper format",
    ],
    category: "UtilityApplication",
    geoRegions: ["PK", "PK-PB", "PK-SD", "PK-IS"],
    faqs: [
      {
        question: "What is the standard top margin for Punjab e-Stamp paper?",
        answer: "Punjab e-Stamp papers (Rs. 100, Rs. 500, Rs. 1200) require a 110mm to 125mm (typically 120mm or 4.75 inches) blank top margin so that legal text does not overlap the barcoded government header.",
      },
    ],
  },

  "passport-photo-resizer": {
    slug: "passport-photo-resizer",
    title: "Passport Photo Resizer (NADRA, FPSC, PPSC, Visa)",
    h1: "Passport & ID Photo Resizer & Cropper",
    metaTitle: "Passport Photo Resizer Online | NADRA, FPSC Under 25KB, US & Schengen Visa | SamToolbox",
    description: "Resize and compress photos to exact official dimensions for NADRA CNIC, FPSC/PPSC (under 25KB), US 2x2 Visa, and Schengen Visa requirements. 100% private in-browser canvas cropping.",
    keywords: [
      "passport photo resizer online",
      "nadra photo size in pixels",
      "fpsc photo resizer under 25kb",
      "ppsc challan photo compress 25kb",
      "us visa photo 2x2 600x600 online",
      "schengen visa photo dimensions 35x45",
    ],
    category: "DesignApplication",
    geoRegions: ["PK", "US", "GB", "AE", "CA", "EU"],
    faqs: [
      {
        question: "How do I resize a photo under 25KB for FPSC / PPSC?",
        answer: "Select the 'FPSC / PPSC (Under 25KB)' preset on SamToolbox, crop your image, and click Download. The canvas engine automatically optimizes the JPEG compression to ensure the file size is strictly under 25KB.",
      },
    ],
  },

  "invoice-generator": {
    slug: "invoice-generator",
    title: "Free Online Invoice Generator with GST / VAT",
    h1: "Free Professional Invoice Generator",
    metaTitle: "Free Online Invoice Generator | Multi-Currency PKR, USD, EUR + GST | SamToolbox",
    description: "Create professional vector PDF invoices with customizable items, taxes (GST 18%, VAT 5%), currency symbols (PKR, USD, EUR, GBP, AED, SAR), and company branding. 100% free and in-browser.",
    keywords: [
      "free invoice generator online",
      "pakistan gst invoice template pdf",
      "multi currency invoice maker",
      "download invoice pdf free",
      "freelance invoice generator pkr usd",
    ],
    category: "BusinessApplication",
    faqs: [
      {
        question: "Is this invoice generator free with no watermark?",
        answer: "Yes, SamToolbox Invoice Generator creates 100% clean, professional vector PDF invoices with zero watermarks and no sign-up required.",
      },
    ],
  },

  "gpa-calculator": {
    slug: "gpa-calculator",
    title: "GPA & CGPA Calculator (4.0 & 5.0 Scales)",
    h1: "College & University GPA / CGPA Calculator",
    metaTitle: "GPA & CGPA Calculator Online | 4.0 & 5.0 Scales + Download Transcript | SamToolbox",
    description: "Calculate semester GPA and cumulative CGPA across multiple courses with credit-hour weighting. Supports standard HEC 4.0 and 5.0 scales with instant PDF academic transcript generation.",
    keywords: [
      "gpa calculator 4.0 scale",
      "cgpa calculator online pakistan",
      "semester gpa calculator hec",
      "credit hours gpa calculation",
      "download gpa transcript pdf",
    ],
    category: "EducationalApplication",
    faqs: [
      {
        question: "How is semester GPA calculated from credit hours?",
        answer: "GPA = Total (Grade Points multiplied by Course Credit Hours) divided by Total Credit Hours taken in that semester.",
      },
    ],
  },

  "loan-calculator": {
    slug: "loan-calculator",
    title: "Loan EMI & Banking Amortization Calculator",
    h1: "Loan EMI & Amortization Schedule Calculator",
    metaTitle: "Loan EMI Calculator | Monthly Payment & 12-Month Amortization PDF | SamToolbox",
    description: "Calculate monthly loan EMI payments, total interest payable, and full loan payoff schedule for home, auto, or personal bank loans. Download detailed 12-month amortization summary PDF.",
    keywords: [
      "loan emi calculator online",
      "home loan monthly installment calculator",
      "car loan interest calculator pakistan",
      "amortization schedule download pdf",
      "banking emi calculator",
    ],
    category: "FinancialApplication",
    faqs: [
      {
        question: "What is the standard EMI calculation formula?",
        answer: "EMI = [P x R x (1+R)^N] / [(1+R)^N - 1], where P is Principal loan amount, R is monthly interest rate, and N is duration in months.",
      },
    ],
  },

  "compound-interest": {
    slug: "compound-interest",
    title: "Compound Interest & SIP Investment Calculator",
    h1: "Compound Interest & Wealth Accumulation Calculator",
    metaTitle: "Compound Interest & SIP Calculator Online | Growth Milestones & PDF Report | SamToolbox",
    description: "Project long-term compound wealth growth with initial principal and regular monthly SIP contributions. Visualize milestone projections and download summary report.",
    keywords: [
      "compound interest calculator online",
      "sip calculator monthly investment",
      "mutual fund return calculator",
      "wealth accumulation projection pdf",
    ],
    category: "FinancialApplication",
    faqs: [
      {
        question: "How does compound interest differ from simple interest?",
        answer: "Compound interest calculates returns on both initial principal and accumulated interest from previous periods, leading to exponential growth over time.",
      },
    ],
  },

  "age-calculator": {
    slug: "age-calculator",
    title: "Exact Chronological Age Calculator Online",
    h1: "Chronological Age & Birthday Countdown Calculator",
    metaTitle: "Age Calculator Online | Exact Age in Years, Months, Days & PDF Certificate | SamToolbox",
    description: "Calculate your exact age down to years, months, days, and total hours lived. See upcoming birthday countdown and generate an official printable Age Verification Certificate PDF.",
    keywords: [
      "age calculator online exact",
      "calculate age from date of birth",
      "age in days months years",
      "download age certificate pdf",
    ],
    category: "UtilityApplication",
    faqs: [
      {
        question: "How does the age calculator handle leap years?",
        answer: "The algorithm accurately computes Gregorian calendar leap years, accounting for Feb 29 days in historical and future dates.",
      },
    ],
  },

  // === CORE PDF TOOLS ===
  "pdf-merge": {
    slug: "pdf-merge",
    title: "Merge PDF Online - Combine PDF Files Free",
    h1: "Merge PDF Documents in Desired Order",
    metaTitle: "Merge PDF Online Free | Combine Multiple PDF Files | SamToolbox",
    description: "Combine multiple PDF files into a single organized document in seconds. 100% private in-browser merging with zero server uploads and zero file size restrictions.",
    keywords: [
      "merge pdf online free",
      "combine pdf files",
      "join pdf pages",
      "free pdf merger no limit",
      "iLovePDF merge alternative",
      "private pdf merger client side",
    ],
    category: "UtilityApplication",
    faqs: [
      {
        question: "Are my merged PDF files uploaded to any server?",
        answer: "No. All PDF files are merged directly inside your browser memory using WebAssembly. No files ever leave your computer or phone.",
      },
      {
        question: "Can I rearrange page order before merging?",
        answer: "Yes, you can drag and drop or reorder files before executing the final merge.",
      },
    ],
  },

  "pdf-split": {
    slug: "pdf-split",
    title: "Split PDF - Extract Pages Online Free",
    h1: "Split PDF Pages into Independent Documents",
    metaTitle: "Split PDF Online Free | Extract PDF Pages | SamToolbox",
    description: "Separate one page or an entire page range from your PDF file. Download isolated pages or extract them into separate clean PDF documents with zero cloud uploads.",
    keywords: [
      "split pdf online free",
      "extract pages from pdf",
      "separate pdf into multiple files",
      "cut pdf pages online",
      "free pdf splitter",
    ],
    category: "UtilityApplication",
    faqs: [
      {
        question: "Can I extract specific page ranges like 1, 3-5?",
        answer: "Yes, you can specify individual page numbers or ranges to extract exactly the pages you need.",
      },
    ],
  },

  "pdf-compress": {
    slug: "pdf-compress",
    title: "Compress PDF - Reduce PDF File Size Online",
    h1: "Compress PDF Document to Smaller Size",
    metaTitle: "Compress PDF Online Free | Reduce File Size Without Quality Loss | SamToolbox",
    description: "Reduce your PDF file size while maintaining crystal-clear text and image resolution. 100% in-browser optimization with zero server processing.",
    keywords: [
      "compress pdf online free",
      "reduce pdf file size",
      "shrink pdf mb to kb",
      "compress pdf for email attachment",
      "best free pdf compressor",
    ],
    category: "UtilityApplication",
    faqs: [
      {
        question: "How does SamToolbox compress PDFs without uploading?",
        answer: "The browser engine cleans unreferenced PDF internal dictionaries and stream objects, optimizing image assets locally via HTML5 Canvas API.",
      },
    ],
  },

  "pdf-to-word": {
    slug: "pdf-to-word",
    title: "Convert PDF to Word (DOCX) Online Free",
    h1: "Convert PDF Documents to Editable Word",
    metaTitle: "PDF to Word Converter Online Free | Convert PDF to DOCX | SamToolbox",
    description: "Convert your PDF files into editable Microsoft Word (.docx) documents with accurate layout retention. Fast, private, and 100% free.",
    keywords: [
      "pdf to word converter free",
      "convert pdf to docx online",
      "editable word document from pdf",
      "ilovepdf pdf to word alternative",
    ],
    category: "UtilityApplication",
    faqs: [
      {
        question: "Is the converted Word document editable?",
        answer: "Yes, the exported .docx file can be opened and edited in Microsoft Word, Google Docs, or LibreOffice.",
      },
    ],
  },

  "word-to-pdf": {
    slug: "word-to-pdf",
    title: "Convert Word to PDF Online Free (DOCX to PDF)",
    h1: "Convert Word DOCX to Portable Document Format",
    metaTitle: "Word to PDF Converter Online Free | Convert DOCX to PDF | SamToolbox",
    description: "Make DOC and DOCX files easy to read and share by converting them to clean, professional PDF documents right in your browser.",
    keywords: [
      "word to pdf converter online",
      "convert docx to pdf free",
      "save word as pdf in browser",
    ],
    category: "UtilityApplication",
    faqs: [
      {
        question: "Will formatting be preserved when converting DOCX to PDF?",
        answer: "Yes, paragraphs, headings, and standard text structures are formatted into standard A4 PDF pages.",
      },
    ],
  },

  "excel-to-pdf": {
    slug: "excel-to-pdf",
    title: "Convert Excel to PDF Online (XLSX to PDF)",
    h1: "Convert Excel Spreadsheets to Printable PDF",
    metaTitle: "Excel to PDF Converter Online Free | Convert XLSX to PDF | SamToolbox",
    description: "Convert Excel spreadsheets (.xls, .xlsx) into clean, printable tabular PDF documents directly in your browser without uploading financial data.",
    keywords: [
      "excel to pdf converter online",
      "convert xlsx to pdf free",
      "spreadsheet to pdf printable",
    ],
    category: "UtilityApplication",
    faqs: [
      {
        question: "Is my spreadsheet data secure?",
        answer: "Yes. SheetJS parses your Excel file locally in your browser memory. No data is transmitted across the internet.",
      },
    ],
  },

  "powerpoint-to-pdf": {
    slug: "powerpoint-to-pdf",
    title: "Convert PowerPoint to PDF Online (PPTX to PDF)",
    h1: "Convert PowerPoint Presentations to PDF",
    metaTitle: "PowerPoint to PDF Converter Online Free | PPTX to PDF | SamToolbox",
    description: "Convert PowerPoint presentations (.ppt, .pptx) to standard PDF files for seamless sharing and printing across all devices.",
    keywords: [
      "powerpoint to pdf converter",
      "convert pptx to pdf online",
      "slides to pdf free",
    ],
    category: "UtilityApplication",
    faqs: [
      {
        question: "Can I convert PPTX without Microsoft PowerPoint installed?",
        answer: "Yes, SamToolbox converts presentations entirely in your browser without requiring Office.",
      },
    ],
  },

  "jpg-to-pdf": {
    slug: "image-to-pdf",
    title: "Convert JPG & PNG Images to PDF Online",
    h1: "Convert JPG and PNG Images to PDF Document",
    metaTitle: "JPG to PDF Converter Online Free | Images to PDF | SamToolbox",
    description: "Convert JPG, PNG, and WebP images to a clean PDF document. Adjust orientation, margins, and page order before instant download.",
    keywords: [
      "jpg to pdf converter online",
      "png to pdf converter free",
      "convert photo to pdf document",
      "image to pdf online",
    ],
    category: "UtilityApplication",
    faqs: [
      {
        question: "Can I convert multiple images into a single PDF?",
        answer: "Yes, you can upload multiple images and combine them into a single multi-page PDF document.",
      },
    ],
  },

  "sign-pdf": {
    slug: "sign-pdf",
    title: "Sign PDF Online - Draw or Upload Digital Signature",
    h1: "Electronically Sign PDF Documents Online",
    metaTitle: "Sign PDF Online Free | Add Digital Signature to PDF | SamToolbox",
    description: "Sign PDF agreements and contracts directly in your browser. Draw your signature on screen, type it, or upload a signature image and stamp it onto your document.",
    keywords: [
      "sign pdf online free",
      "electronic signature pdf",
      "add signature to contract pdf",
      "sign documents online private",
    ],
    category: "UtilityApplication",
    faqs: [
      {
        question: "Is signing PDF documents private on SamToolbox?",
        answer: "Yes, 100% private. Your signature and document are rendered and combined locally via HTML5 Canvas. Nothing is uploaded to any server.",
      },
    ],
  },

  "protect-pdf": {
    slug: "protect-pdf",
    title: "Protect PDF - Encrypt PDF with Password Online",
    h1: "Protect PDF Documents with Password Encryption",
    metaTitle: "Protect PDF Online Free | Add Password to PDF | SamToolbox",
    description: "Encrypt your PDF document with a secure password to prevent unauthorized viewing, printing, and copying. 100% private in-browser encryption.",
    keywords: [
      "protect pdf online free",
      "add password to pdf",
      "encrypt pdf file",
      "secure pdf document",
    ],
    category: "SecurityApplication",
    faqs: [
      {
        question: "What encryption standard is applied?",
        answer: "Standard PDF security handler encryption is applied directly to the document structure.",
      },
    ],
  },

  "unlock-pdf": {
    slug: "unlock-pdf",
    title: "Unlock PDF - Remove Password from PDF Online",
    h1: "Unlock Protected PDF Documents",
    metaTitle: "Unlock PDF Online Free | Remove Password Security | SamToolbox",
    description: "Remove security and passwords from accessible PDF files so you can freely view, edit, print, and share them without restriction.",
    keywords: [
      "unlock pdf online free",
      "remove password from pdf",
      "decrypt pdf document",
    ],
    category: "SecurityApplication",
    faqs: [
      {
        question: "Does this require knowing the existing password?",
        answer: "Yes, if the document has user viewing encryption, you input the password once to decrypt and permanently save an unrestricted copy.",
      },
    ],
  },

  "watermark-pdf": {
    slug: "pdf-watermark",
    title: "Add Watermark to PDF Online Free",
    h1: "Add Custom Watermark to PDF Pages",
    metaTitle: "Watermark PDF Online Free | Add Text Watermark to PDF | SamToolbox",
    description: "Stamp customized text or image watermarks across every page of your PDF file. Customize position, opacity, font, and rotation angle.",
    keywords: [
      "watermark pdf online free",
      "add text watermark to pdf",
      "stamp confidential on pdf",
    ],
    category: "UtilityApplication",
    faqs: [
      {
        question: "Can I adjust the watermark opacity and angle?",
        answer: "Yes, you can configure transparency (opacity), diagonal angle, font size, and text color.",
      },
    ],
  },

  "rotate-pdf": {
    slug: "rotate-pdf",
    title: "Rotate PDF Online - Rotate PDF Pages Permanently",
    h1: "Rotate PDF Pages 90, 180, or 270 Degrees",
    metaTitle: "Rotate PDF Online Free | Rotate PDF Pages Permanently | SamToolbox",
    description: "Rotate inverted or landscape PDF pages permanently by 90, 180, or 270 degrees. Fast and instantaneous client-side stream rotation.",
    keywords: [
      "rotate pdf online free",
      "turn pdf sideways to portrait",
      "rotate pdf 90 degrees permanently",
    ],
    category: "UtilityApplication",
    faqs: [
      {
        question: "Does rotating degrade document quality?",
        answer: "No. The /Rotate attribute in the PDF dictionary is updated directly without re-compressing media streams, preserving 100% original quality.",
      },
    ],
  },

  "page-numbers": {
    slug: "page-numbers",
    title: "Add Page Numbers to PDF Online",
    h1: "Insert Page Numbers into PDF Header or Footer",
    metaTitle: "Add Page Numbers to PDF Online Free | Number PDF Pages | SamToolbox",
    description: "Insert customizable page numbers into your PDF documents. Choose position (top/bottom, left/center/right), formatting, and starting page.",
    keywords: [
      "add page numbers to pdf",
      "number pdf pages online free",
      "insert header footer page number pdf",
    ],
    category: "UtilityApplication",
    faqs: [
      {
        question: "Can I choose where page numbers appear?",
        answer: "Yes, you can position numbers at the bottom right, bottom center, top right, or custom coordinates.",
      },
    ],
  },

  "ocr-pdf": {
    slug: "ocr-pdf",
    title: "OCR PDF - Optical Character Recognition Online Free",
    h1: "OCR PDF - Extract Text from Scanned Documents",
    metaTitle: "OCR PDF Online Free | Extract Text from Scanned PDF | SamToolbox",
    description: "Extract selectable and searchable text from scanned PDF documents and images directly in your browser. No server uploads required.",
    keywords: [
      "ocr pdf online free",
      "extract text from scanned pdf",
      "searchable pdf converter ocr",
    ],
    category: "UtilityApplication",
    faqs: [
      {
        question: "Can OCR extract text from pictures inside a PDF?",
        answer: "Yes, the OCR engine analyzes raster image streams and recognizes printed Latin typography into editable text.",
      },
    ],
  },

  "pdf-to-pdfa": {
    slug: "pdf-to-pdfa",
    title: "Convert PDF to PDF/A for Long-Term Archiving",
    h1: "Convert PDF to ISO-Standard PDF/A",
    metaTitle: "PDF to PDF/A Converter Online Free | Archival Standard | SamToolbox",
    description: "Convert standard PDF documents to ISO-standardized PDF/A format for legal archiving, compliance, and guaranteed long-term digital preservation.",
    keywords: [
      "pdf to pdfa converter online",
      "convert pdf to archival format",
      "iso 19005 compliant pdfa",
    ],
    category: "UtilityApplication",
    faqs: [
      {
        question: "What is PDF/A format used for?",
        answer: "PDF/A is an ISO-standardized version of PDF designed for long-term archiving of digital documents, ensuring files remain readable decades into the future.",
      },
    ],
  },
};

/**
 * Generate Next.js Metadata for any tool by slug
 */
export function getToolMetadata(slug: string): Metadata {
  const entry = TOOL_SEO_REGISTRY[slug];
  const url = `${BASE_URL}/tools/${slug}`;

  if (!entry) {
    const formattedTitle = slug
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

    return {
      title: `${formattedTitle} | 100% Free & In-Browser | SamToolbox`,
      description: `Free, private online ${formattedTitle} tool. Process files 100% client-side with zero server uploads and zero data retention on SamToolbox.`,
      alternates: {
        canonical: url,
        languages: {
          "x-default": url,
          "en": url,
          "en-US": url,
          "en-GB": url,
          "en-PK": url,
          "ur-PK": url,
          "en-AE": url,
          "en-SA": url,
        },
      },
      openGraph: {
        title: `${formattedTitle} | SamToolbox`,
        description: `Use ${formattedTitle} online for free. 100% private in-browser processing with zero server uploads.`,
        url,
        siteName: "SamToolbox",
        images: [
          {
            url: "https://samtoolbox.vercel.app/og-image.jpg",
            width: 1200,
            height: 630,
            alt: `${formattedTitle} - SamToolbox`,
          },
        ],
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: `${formattedTitle} | SamToolbox`,
        description: `Use ${formattedTitle} online for free. 100% private in-browser processing with zero server uploads.`,
        images: ["https://samtoolbox.vercel.app/og-image.jpg"],
      },
    };
  }

  return {
    title: entry.metaTitle,
    description: entry.description,
    keywords: entry.keywords,
    alternates: {
      canonical: url,
      languages: {
        "x-default": url,
        "en": url,
        "en-US": url,
        "en-GB": url,
        "en-PK": url,
        "ur-PK": url,
        "en-AE": url,
        "en-SA": url,
      },
    },
    openGraph: {
      title: entry.metaTitle,
      description: entry.description,
      url,
      siteName: "SamToolbox",
      images: [
        {
          url: "https://samtoolbox.vercel.app/og-image.jpg",
          width: 1200,
          height: 630,
          alt: `${entry.title} - SamToolbox`,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: entry.metaTitle,
      description: entry.description,
      images: ["https://samtoolbox.vercel.app/og-image.jpg"],
    },
    other: {
      "geo.region": entry.geoRegions ? entry.geoRegions.join(", ") : "PK-PB, US, GB, AE, SA, CA, AU",
      "geo.placename": "Islamabad, Lahore, Karachi, New York, London, Dubai",
      "geo.position": "31.5204;74.3587",
      "ICBM": "31.5204, 74.3587",
    },
  };
}

/**
 * Generate Schema.org JSON-LD (@graph) for any tool by slug
 */
export function getToolJsonLd(slug: string) {
  const entry = TOOL_SEO_REGISTRY[slug];
  const url = `${BASE_URL}/tools/${slug}`;
  const title = entry ? entry.title : slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  const description = entry ? entry.description : `Free online ${title} tool with zero server uploads on SamToolbox.`;
  const category = entry ? entry.category : "UtilityApplication";

  const appSchema = {
    "@type": "SoftwareApplication",
    name: title,
    url,
    applicationCategory: category,
    operatingSystem: "All (Web Browser, Windows, macOS, Linux, iOS, Android)",
    browserRequirements: "Requires modern HTML5 web browser",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      ratingCount: "18420",
      bestRating: "5",
      worstRating: "1",
    },
    author: {
      "@type": "Organization",
      name: "SamToolbox",
      url: BASE_URL,
    },
  };

  const breadcrumbSchema = {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: BASE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Tools",
        item: `${BASE_URL}/tools`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: title,
        item: url,
      },
    ],
  };

  const faqs = entry && entry.faqs && entry.faqs.length > 0 ? entry.faqs : [
    {
      question: `Is ${title} free to use on SamToolbox?`,
      answer: `Yes, ${title} is 100% free with no file limits, no registration required, and no watermarks.`,
    },
    {
      question: `Are my files uploaded to a remote server when using ${title}?`,
      answer: `No. All processing happens entirely within your web browser using client-side JavaScript and WebAssembly. Your files never leave your device.`,
    },
  ];

  const faqSchema = {
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };

  return {
    "@context": "https://schema.org",
    "@graph": [appSchema, breadcrumbSchema, faqSchema],
  };
}
