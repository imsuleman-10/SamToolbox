const fs = require("fs");
const path = require("path");

const toolsDir = path.join(__dirname, "..", "src", "app", "tools");

// Find all directories under src/app/tools
const toolFolders = fs
  .readdirSync(toolsDir, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name);

console.log(`Found ${toolFolders.length} tool folders to generate layout.tsx for.`);

let createdCount = 0;
let updatedCount = 0;

for (const slug of toolFolders) {
  const layoutPath = path.join(toolsDir, slug, "layout.tsx");

  const layoutContent = `import type { Metadata } from "next";
import { getToolMetadata, getToolJsonLd } from "@/lib/toolSeoData";
import ToolSsrSection from "@/components/ToolSsrSection";

const TOOL_SLUG = "${slug}";

export const metadata: Metadata = getToolMetadata(TOOL_SLUG);

export default function ToolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = getToolJsonLd(TOOL_SLUG);

  return (
    <>
      {/* 100% Server-Side Rendered JSON-LD Schema.org Graph */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      {/* Interactive Tool Workspace */}
      {children}

      {/* 100% Server-Side Rendered (SSR) SEO / AEO / GEO / LLMO Section */}
      <ToolSsrSection slug={TOOL_SLUG} />
    </>
  );
}
`;

  fs.writeFileSync(layoutPath, layoutContent, "utf8");
  updatedCount++;
}

console.log(`Done! Created: ${createdCount}, Updated: ${updatedCount}, Total: ${toolFolders.length}`);
