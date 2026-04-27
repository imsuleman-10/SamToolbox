/**
 * SEO Structured Data (JSON-LD) generators
 * Used for rich snippets and better search engine understanding
 */

export const generateOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "SamToolbox",
  url: "https://samtoolbox.vercel.app",
  logo: "https://samtoolbox.vercel.app/logo.jpg",
  description: "Premium industrial-grade browser tools for document conversion, compression, and creation",
  sameAs: [
    "https://github.com/imsuleman-10/SamToolbox",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "Customer Support",
    url: "https://samtoolbox.vercel.app/contact",
  },
});

export const generateWebsiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  url: "https://samtoolbox.vercel.app",
  name: "SamToolbox",
  description: "Premium industrial-grade browser tools",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://samtoolbox.vercel.app/tools?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
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
  applicationCategory: "Utility",
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

export const generateFAQSchema = (faqs: Array<{ question: string; answer: string }>) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
});
