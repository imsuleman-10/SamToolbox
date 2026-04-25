import type { Metadata } from "next";

export const toolsMetadata = {
  "cv-maker": {
    title: "CV Maker - Create Professional Resumes Online | SamToolbox",
    description: "Create stunning, professional CVs and resumes instantly. Free online CV maker with modern templates, no downloads needed. 100% private, all data stays on your device.",
    keywords: "CV maker, resume builder, professional CV, free resume maker, online resume builder",
  },
  "qr-generator": {
    title: "QR Code Generator - Create Custom QR Codes | SamToolbox",
    description: "Generate QR codes instantly. Create custom QR codes for URLs, text, contact info, WiFi and more. Free, fast, and completely private.",
    keywords: "QR code generator, QR code maker, create QR codes, free QR generator, custom QR codes",
  },
  "image-converter": {
    title: "Image Converter - Convert Images Online | SamToolbox",
    description: "Convert images between different formats instantly. Support for JPG, PNG, WebP, GIF and more. Fast, free, and privacy-first conversion.",
    keywords: "image converter, convert images, JPG to PNG, image format converter, online image converter",
  },
  "image-compress": {
    title: "Image Compressor - Compress Images Online | SamToolbox",
    description: "Compress images without losing quality. Reduce file size for web and email. Fast online compression tool, completely private and free.",
    keywords: "image compressor, compress images, reduce image size, image optimization, free image compressor",
  },
  "image-resize": {
    title: "Image Resizer - Resize Images Online | SamToolbox",
    description: "Resize images to any dimensions instantly. Perfect for social media, web, and print. Batch resize multiple images for free.",
    keywords: "image resizer, resize images, image scaling, online image resizer, batch resize",
  },
  "image-to-pdf": {
    title: "Image to PDF - Convert Images to PDF Online | SamToolbox",
    description: "Convert images to PDF instantly. Support for JPG, PNG, WebP and more. Create professional PDFs from your images, completely free and private.",
    keywords: "image to PDF, convert images to PDF, JPG to PDF, PNG to PDF, online converter",
  },
  "pdf-merge": {
    title: "PDF Merger - Merge PDFs Online | SamToolbox",
    description: "Merge multiple PDF files into one instantly. Reorder pages, organize documents, completely free and private. No file size limits.",
    keywords: "PDF merger, merge PDFs, combine PDFs, PDF combiner, online PDF merger",
  },
  "pdf-split": {
    title: "PDF Splitter - Split PDFs Online | SamToolbox",
    description: "Split PDF files instantly. Extract pages, divide documents. Free, fast, and completely private PDF splitting tool.",
    keywords: "PDF splitter, split PDF, extract PDF pages, divide PDF, online PDF splitter",
  },
  "pdf-compress": {
    title: "PDF Compressor - Compress PDFs Online | SamToolbox",
    description: "Compress PDF files without losing quality. Reduce file size for easier sharing and storage. Fast, free, and private compression.",
    keywords: "PDF compressor, compress PDF, reduce PDF size, PDF optimization, free PDF compressor",
  },
  "pdf-reader": {
    title: "PDF Reader - View PDFs Online | SamToolbox",
    description: "Read and view PDF files online instantly. No installation needed. Fast PDF viewer with zoom, search, and download features.",
    keywords: "PDF reader, view PDF, online PDF viewer, PDF viewer free, read PDF online",
  },
  "word-counter": {
    title: "Word Counter - Count Words Online | SamToolbox",
    description: "Count words, characters, sentences, and paragraphs instantly. Free online word counter for writers, students, and professionals.",
    keywords: "word counter, character counter, text analyzer, online word counter, free word counter",
  },
  "case-converter": {
    title: "Case Converter - Convert Text Case Online | SamToolbox",
    description: "Convert text between different cases: uppercase, lowercase, title case, camelCase, snake_case and more. Free online tool.",
    keywords: "case converter, text case converter, uppercase to lowercase, text converter, online case converter",
  },
  "font-generator": {
    title: "Font Generator - Create Fancy Text Fonts | SamToolbox",
    description: "Generate fancy fonts and text styles. Create unique text for social media, gaming, and creative projects. Free font generator.",
    keywords: "font generator, fancy text, text styles, font maker, creative fonts, social media fonts",
  },
  "word-reader": {
    title: "Word Reader - View Word Documents Online | SamToolbox",
    description: "Read and view Word documents (.docx, .doc) online instantly. No installation needed. Fast document viewer for all users.",
    keywords: "Word reader, view Word documents, online document viewer, docx viewer, free Word reader",
  },
  "excel-reader": {
    title: "Excel Reader - View Excel Files Online | SamToolbox",
    description: "View and read Excel spreadsheets (.xlsx, .xls) online instantly. Fast spreadsheet viewer, completely free and private.",
    keywords: "Excel reader, view Excel files, online spreadsheet viewer, xlsx viewer, free Excel reader",
  },
  "ppt-reader": {
    title: "PPT Reader - View PowerPoint Presentations | SamToolbox",
    description: "View and read PowerPoint presentations (.pptx, .ppt) online instantly. Fast presentation viewer, completely free and private.",
    keywords: "PPT reader, PowerPoint viewer, view presentations, online presentation viewer, free PPT reader",
  },
};

export function getToolMetadata(toolName: string): Partial<Metadata> {
  const metadata = toolsMetadata[toolName as keyof typeof toolsMetadata];

  if (!metadata) {
    return {
      title: "Tool | SamToolbox",
      description: "Professional online tool for document and media conversion.",
    };
  }

  return {
    title: metadata.title,
    description: metadata.description,
    keywords: metadata.keywords,
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      url: `https://samtoolbox.com/tools/${toolName}`,
      type: "website",
      locale: "en_US",
      images: [
        {
          url: "https://samtoolbox.com/logo.jpg",
          width: 1200,
          height: 630,
          alt: metadata.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: metadata.title,
      description: metadata.description,
      images: ["https://samtoolbox.com/logo.jpg"],
    },
  };
}
