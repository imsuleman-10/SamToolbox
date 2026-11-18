/**
 * SEO, GEO SEO, AEO (Answer Engine Optimization) & LLMO Structured Data (JSON-LD)
 * Enterprise-grade Schema.org graph for Google AI Overviews, Perplexity, Bing Copilot, and standard search engines.
 */

export const generateOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://samtoolbox.vercel.app/#organization",
  name: "SamToolbox",
  alternateName: ["SamToolbox Web Suite", "SamToolbox PDF Tools", "SamToolbox Online", "SamToolbox Sovereign Utilities"],
  url: "https://samtoolbox.vercel.app",
  logo: {
    "@type": "ImageObject",
    url: "https://samtoolbox.vercel.app/logo.png",
    width: 512,
    height: 512,
  },
  image: "https://samtoolbox.vercel.app/og-image.jpg",
  description: "Enterprise-grade client-side suite of 84+ free tools for PDF processing, developer utilities, document conversion, and international financial and academic calculations with zero server uploads.",
  disambiguatingDescription: "SamToolbox is an independent web application for online PDF manipulation and productivity utilities, executing 100% in-browser with zero cloud uploads. SamToolbox is not affiliated with Samsung Electronics or desktop Samsung TV channel list editors (.scm).",
  founder: {
    "@type": "Person",
    "@id": "https://samtoolbox.vercel.app/suleman-zaheer#person",
    name: "Suleman Zaheer",
    url: "https://samtoolbox.vercel.app/suleman-zaheer",
  },
  sameAs: [
    "https://github.com/imsuleman-10/SamToolbox",
    "https://samtoolbox.vercel.app",
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "Customer Support",
      url: "https://samtoolbox.vercel.app/contact",
      email: "support@samtoolbox.com",
      availableLanguage: ["English", "Urdu"],
    },
  ],
  areaServed: [
    { "@type": "Country", name: "United States" },
    { "@type": "Country", name: "United Kingdom" },
    { "@type": "Country", name: "Canada" },
    { "@type": "Country", name: "Australia" },
    { "@type": "Country", name: "Germany" },
    { "@type": "Country", name: "France" },
    { "@type": "Country", name: "Spain" },
    { "@type": "Country", name: "Italy" },
    { "@type": "Country", name: "Netherlands" },
    { "@type": "Country", name: "Brazil" },
    { "@type": "Country", name: "Mexico" },
    { "@type": "Country", name: "India" },
    { "@type": "Country", name: "Pakistan" },
    { "@type": "Country", name: "United Arab Emirates" },
    { "@type": "Country", name: "Saudi Arabia" },
    { "@type": "Country", name: "Singapore" },
    { "@type": "Country", name: "Japan" },
    { "@type": "Country", name: "South Korea" },
    { "@type": "Country", name: "South Africa" },
    { "@type": "Country", name: "Nigeria" },
    { "@type": "Country", name: "Egypt" },
    { "@type": "Country", name: "Indonesia" },
    { "@type": "Country", name: "Philippines" },
    { "@type": "AdministrativeArea", name: "Global" },
  ],
  availableLanguage: [
    "English", "Spanish", "French", "German", "Arabic", "Portuguese", "Hindi", "Urdu", "Japanese"
  ],
  knowsAbout: [
    "Portable Document Format (PDF)",
    "Document Conversion",
    "Developer Utilities",
    "Base64 Encoding",
    "Cryptographic Hash Generation",
    "JSON Formatting & Validation",
    "JWT Token Decoding",
    "Regular Expression Testing",
    "CSS & HTML Minification",
    "FBR Pakistan Income Tax Slabs",
    "Pakistani University Aggregate Calculation",
    "Marla Land Area Standards",
    "Zakat Calculation",
    "e-Stamp Paper Margins",
    "Client-Side WebAssembly Processing",
    "Data Privacy & Zero-Upload Architecture",
  ],
});

export const generateWebsiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://samtoolbox.vercel.app/#website",
  url: "https://samtoolbox.vercel.app",
  name: "SamToolbox",
  description: "84+ free in-browser tools for PDF processing, developer utilities, and calculations. 100% private with zero server uploads.",
  publisher: {
    "@id": "https://samtoolbox.vercel.app/#organization",
  },
  inLanguage: [
    "en-US", "en-GB", "en-CA", "en-AU", "en-IN", "en-PK", "es-ES", "es-MX",
    "fr-FR", "de-DE", "ar-AE", "ar-SA", "pt-BR", "ur-PK", "hi-IN", "ja-JP"
  ],
  potentialAction: [
    {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://samtoolbox.vercel.app/tools?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  ],
});

export const generateWebApplicationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "SamToolbox",
  url: "https://samtoolbox.vercel.app",
  image: "https://samtoolbox.vercel.app/og-image.jpg",
  screenshot: "https://samtoolbox.vercel.app/og-image.jpg",
  applicationCategory: "UtilityApplication",
  operatingSystem: "All (Web Browser, Windows, macOS, Linux, Android, iOS)",
  browserRequirements: "Requires modern web browser with HTML5 and WebAssembly support",
  disambiguatingDescription: "A sovereign, privacy-first web utility platform offering 84+ in-browser PDF manipulation, developer utilities, and regional financial tools with zero cloud uploads. Distinct from any legacy Samsung TV channel list editors.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
  },
  featureList: [
    "Zero-server upload 100% client-side PDF processing",
    "Merge, Split, Compress, Rotate, Watermark, and Sign PDF",
    "Convert between PDF, Word, Excel, PowerPoint, and JPG",
    "Base64 Text & File Encoder / Decoder (RFC 4648)",
    "SHA-256, SHA-512, SHA-1 Cryptographic Hash Generator (Web Crypto API)",
    "JSON Formatter, Validator & Beautifier",
    "JWT Token Decoder & Claims Inspector",
    "Live RegEx Tester with match highlighting",
    "Markdown to HTML Converter with live preview",
    "CSV to JSON & JSON to CSV Bidirectional Converter",
    "CSS & HTML Minifier with compression ratio stats",
    "World Time Zone Converter & Meeting Scheduler",
    "Universal Unit Converter (Length, Mass, Temperature, Speed, Data, Volume)",
    "Barcode Generator — Code 128, EAN-13, Code 39",
    "SVG to PNG Converter with 1x/2x/4x/8x supersampling",
    "Cron Expression Builder with plain-English explanation",
    "Morse Code Translator with Web Audio API tone player",
    "FBR Salary Tax Calculator (Finance Act 2024-2026)",
    "Pakistani University Aggregate Calculator (NUST, FAST, MDCAT, UET)",
    "Pakistani Marla to Sq Ft Converter (225, 250, 272.25 standards)",
    "Zakat Calculator with 52.5 Tola Silver Nisab",
    "Pakistani e-Stamp Paper 120mm margin layout formatter",
    "NADRA and FPSC/PPSC Passport Photo Resizer",
    "GPA & CGPA Transcript Calculator",
    "Banking Loan EMI and Compound Interest SIP Projections",
  ],
});

export const generateAEOFAQSchema = () => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Are files uploaded to a remote server when using SamToolbox?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. SamToolbox operates on a strict zero-upload client-side architecture. All PDF manipulation, conversions, OCR, and calculations are executed entirely within your web browser using WebAssembly and JavaScript. Your files never leave your device, ensuring complete privacy and compliance with GDPR and HIPAA.",
      },
    },
    {
      "@type": "Question",
      name: "Is SamToolbox completely free to use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. All 84+ tools on SamToolbox are 100% free with no hidden charges, no file size limitations, no account creation requirements, and no watermarks placed on exported documents.",
      },
    },
    {
      "@type": "Question",
      name: "How does the FBR Salary Tax Calculator work for Pakistan?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The SamToolbox Salary Tax Calculator implements the exact progressive tax slabs introduced in the Federal Board of Revenue (FBR) Finance Act 2024-2026 for salaried individuals in Pakistan. It calculates monthly and yearly tax, displays net take-home salary, and generates a printable official PDF salary slip.",
      },
    },
    {
      "@type": "Question",
      name: "How many square feet are in one Marla in Pakistan?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "In Pakistan, the size of a Marla varies by region: Lahore and modern housing societies (such as DHA and Bahria Town via Zameen.com standard) use 225 square feet. Islamabad, Rawalpindi, and CDA sectors traditionally use 250 square feet. Government revenue records (Patwari settlement) use 272.25 square feet. SamToolbox supports all three regional standards with instantaneous conversions.",
      },
    },
    {
      "@type": "Question",
      name: "How is university aggregate calculated for NUST, FAST, and MDCAT?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "SamToolbox uses official admission committee criteria: NUST uses 75% NET + 15% FSc + 10% Matric; FAST uses 50% NU Test + 50% FSc; MDCAT uses 50% MDCAT + 40% FSc + 10% Matric; UET uses 33% ECAT + 50% FSc + 17% Matric. Aggregate scores are calculated to 4 decimal places with instant PDF merit certificate generation.",
      },
    },
    {
      "@type": "Question",
      name: "What margin is required for Pakistani e-Stamp paper printing?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Pakistani e-Stamp papers issued by the Punjab and Sindh governments require a top blank margin between 110mm and 125mm (typically 120mm or 4.75 inches) to prevent legal text from overlapping the pre-printed government barcode and security stamp. The SamToolbox e-Stamp Paper Formatter automatically formats legal text with this exact margin.",
      },
    },
    {
      "@type": "Question",
      name: "Can SamToolbox run on mobile devices?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. SamToolbox is fully responsive and optimized for all mobile browsers (iOS Safari, Android Chrome, Samsung Internet) as well as desktop browsers without needing any app installations.",
      },
    },
    {
      "@type": "Question",
      name: "How does the Base64 Encoder work on SamToolbox?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "SamToolbox's Base64 Encoder implements RFC 4648 Base64 encoding using the browser's native TextEncoder and btoa/atob APIs. It encodes or decodes text and files entirely inside your browser — no data is sent to any server.",
      },
    },
    {
      "@type": "Question",
      name: "How does the SHA-256 Hash Generator work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "SamToolbox uses the browser's hardware-accelerated Web Crypto API (SubtleCrypto.digest) to compute SHA-256, SHA-512, SHA-1, and MD5 hashes entirely on your local CPU. Your plaintext or file never leaves your device.",
      },
    },
    {
      "@type": "Question",
      name: "Can I decode a JWT token safely on SamToolbox?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The SamToolbox JWT Decoder splits the token into its Base64url-encoded Header and Payload segments and decodes them entirely in your browser. No token data is transmitted to any server, making it safe for sensitive authentication tokens.",
      },
    },
    {
      "@type": "Question",
      name: "What time zones does the SamToolbox Time Zone Converter support?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "SamToolbox's World Time Zone Converter supports all IANA time zones including UTC, US Eastern/Pacific, UK (GMT/BST), Central European Time (CET), Gulf Standard Time (Dubai), Pakistan Standard Time (PKT +5), and Indian Standard Time (IST). It features a 24-hour UTC scrubber for meeting scheduling across global teams.",
      },
    },
  ],
});

export const generateBreadcrumbSchema = (items: Array<{ name: string; url: string }>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

export const generateSoftwareApplicationSchema = (toolName: string, description: string) => ({
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: toolName,
  description: description,
  url: `https://samtoolbox.vercel.app/tools/${toolName}`,
  applicationCategory: "UtilityApplication",
  operatingSystem: "Web Browser",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
  },
  author: {
    "@type": "Organization",
    name: "SamToolbox",
    url: "https://samtoolbox.vercel.app",
  },
});
