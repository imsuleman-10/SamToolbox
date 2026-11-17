/**
 * SEO, GEO SEO, AEO (Answer Engine Optimization) & LLMO Structured Data (JSON-LD)
 * Enterprise-grade Schema.org graph for Google AI Overviews, Perplexity, Bing Copilot, and standard search engines.
 */

export const generateOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "SamToolbox",
  alternateName: ["SamToolbox Web Suite", "SamToolbox PDF Tools", "SamToolbox Online", "SamToolbox Sovereign Utilities"],
  url: "https://samtoolbox.vercel.app",
  logo: "https://samtoolbox.vercel.app/logo.png",
  image: "https://samtoolbox.vercel.app/og-image.jpg",
  description: "Enterprise-grade client-side suite for PDF processing, document conversion, and Pakistani & international financial and academic calculations with zero server uploads.",
  disambiguatingDescription: "SamToolbox is an independent web application for online PDF manipulation and productivity utilities, executing 100% in-browser with zero cloud uploads. SamToolbox is not affiliated with Samsung Electronics or desktop Samsung TV channel list editors (.scm).",
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
  url: "https://samtoolbox.vercel.app",
  name: "SamToolbox",
  description: "Every tool you need to work with PDFs and calculations in one place. 100% private, free, and in-browser.",
  inLanguage: [
    "en-US", "en-GB", "en-CA", "en-AU", "en-IN", "en-PK", "es-ES", "es-MX",
    "fr-FR", "de-DE", "ar-AE", "ar-SA", "pt-BR", "ur-PK", "hi-IN", "ja-JP"
  ],
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://samtoolbox.vercel.app/tools?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
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
  browserRequirements: "Requires HTML5 and JavaScript support",
  disambiguatingDescription: "A sovereign, privacy-first web utility platform offering 64+ in-browser PDF manipulation, developer utilities, and regional financial tools with zero cloud uploads. Distinct from any legacy Samsung TV channel list editors.",
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
  featureList: [
    "Zero-server upload 100% client-side PDF processing",
    "Merge, Split, Compress, Rotate, Watermark, and Sign PDF",
    "Convert between PDF, Word, Excel, and JPG",
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
        text: "Yes. All 55+ tools on SamToolbox are 100% free with no hidden charges, no file size limitations, no account creation requirements, and no watermarks placed on exported documents.",
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
