const fs = require('fs');
const path = require('path');

const seoContent = fs.readFileSync(path.join(__dirname, '../src/lib/toolSeoData.ts'), 'utf8');
const toolsDir = path.join(__dirname, '../src/app/tools');
const dirs = fs.readdirSync(toolsDir).filter(d => fs.existsSync(path.join(toolsDir, d, 'page.tsx'))).sort();

console.log(`Found ${dirs.length} tool directories.`);

// Map slugs to category, color, icon, and badge
function categorize(slug) {
  // PDF tools
  if (slug.includes('pdf') || slug === 'remove-pages' || slug === 'organize-pdf' || slug === 'page-numbers' || slug === 'rotate-pdf') {
    if (slug.includes('merge') || slug.includes('split') || slug.includes('remove') || slug.includes('organize') || slug.includes('rotate') || slug.includes('numbers')) {
      return { category: 'organize', categoryLabel: 'Organize PDF', color: 'red', icon: 'Layers', badge: slug === 'pdf-merge' ? 'Popular' : undefined };
    }
    if (slug.includes('compress') || slug.includes('repair') || slug.includes('ocr')) {
      return { category: 'optimize', categoryLabel: 'Optimize PDF', color: 'emerald', icon: 'Minimize2', badge: slug === 'pdf-compress' ? 'Essential' : undefined };
    }
    if (slug.includes('to-pdf')) {
      return { category: 'convert-to-pdf', categoryLabel: 'Convert to PDF', color: 'amber', icon: 'FileText' };
    }
    if (slug.startsWith('pdf-to-')) {
      return { category: 'convert-from-pdf', categoryLabel: 'Convert from PDF', color: 'blue', icon: 'FileSpreadsheet' };
    }
    if (slug.includes('protect') || slug.includes('unlock') || slug.includes('sign') || slug.includes('watermark') || slug.includes('redact')) {
      return { category: 'security', categoryLabel: 'PDF Security', color: 'purple', icon: 'Lock' };
    }
    return { category: 'edit', categoryLabel: 'Edit PDF', color: 'red', icon: 'PenTool' };
  }

  // Developer tools
  if (['json-formatter', 'base64-encoder', 'url-encoder', 'jwt-decoder', 'hash-generator', 'diff-checker', 'regex-tester', 'markdown-to-html', 'css-minifier', 'html-minifier', 'csv-to-json', 'cron-generator', 'slug-generator', 'barcode-generator', 'qr-generator', 'robots-txt-builder', 'seo-meta-generator', 'lorem-ipsum-generator'].includes(slug)) {
    return { category: 'developer', categoryLabel: 'Developer Tools', color: 'blue', icon: 'Code', badge: ['json-formatter', 'base64-encoder', 'qr-generator'].includes(slug) ? 'Dev' : undefined };
  }

  // Calculators & Finance
  if (['salary-tax-calculator', 'zakat-calculator', 'compound-interest', 'loan-calculator', 'percentage-calculator', 'bmi-calculator', 'age-calculator', 'merit-calculator', 'gpa-calculator', 'invoice-generator'].includes(slug)) {
    return { category: 'calculators', categoryLabel: 'Calculators & Finance', color: 'emerald', icon: 'Calculator', badge: ['salary-tax-calculator', 'zakat-calculator'].includes(slug) ? 'Trending' : undefined };
  }

  // Converters & Utilities
  if (['currency-converter', 'unit-converter', 'time-zone-converter', 'marla-converter', 'aspect-ratio-calculator', 'color-picker', 'font-generator', 'svg-to-png', 'case-converter', 'word-counter', 'password-generator', 'password-strength', 'morse-code-translator', 'image-compress', 'image-converter', 'image-resize'].includes(slug)) {
    return { category: 'converters', categoryLabel: 'Converters & Utilities', color: 'teal', icon: 'RotateCw', badge: ['currency-converter', 'word-counter', 'marla-converter'].includes(slug) ? 'Utility' : undefined };
  }

  // Academic & Regional
  return { category: 'academic', categoryLabel: 'Academic & Regional', color: 'purple', icon: 'GraduationCap' };
}

const allTools = [];

for (const slug of dirs) {
  // Extract title
  const titleRegex = new RegExp(`"${slug}":\\s*\\{[^}]*?"title":\\s*"([^"]+)"`);
  const descRegex = new RegExp(`"${slug}":\\s*\\{[^}]*?"description":\\s*"([^"]+)"`);
  
  const titleMatch = seoContent.match(titleRegex);
  const descMatch = seoContent.match(descRegex);

  const title = titleMatch ? titleMatch[1] : slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  const description = descMatch ? descMatch[1] : `Free online ${title} tool. 100% private in-browser client-side execution with zero server uploads.`;
  
  const meta = categorize(slug);

  allTools.push({
    id: slug,
    title,
    description,
    category: meta.category,
    categoryLabel: meta.categoryLabel,
    href: `/tools/${slug}`,
    badge: meta.badge,
    color: meta.color,
    icon: meta.icon
  });
}

console.log(`Generated metadata for all ${allTools.length} tools.`);

const fileContent = `export interface ToolItem {
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

export const ALL_TOOLS: ToolItem[] = ${JSON.stringify(allTools, null, 2)};
`;

fs.writeFileSync(path.join(__dirname, '../src/lib/allToolsList.ts'), fileContent, 'utf8');
console.log('✅ Successfully wrote all 84 tools to src/lib/allToolsList.ts');
