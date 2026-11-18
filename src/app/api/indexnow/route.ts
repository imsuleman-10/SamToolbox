import { NextResponse } from "next/server";
import { BASE_URL } from "@/lib/toolSeoData";
import { readdirSync, existsSync } from "fs";
import path from "path";

const HOST = "samtoolbox.vercel.app";
const KEY = "c8f1a239b0e74e689d2153bf0e7a1924";
const KEY_LOCATION = `${BASE_URL}/${KEY}.txt`;

export async function GET() {
  try {
    const staticPages = [
      `${BASE_URL}/`,
      `${BASE_URL}/about`,
      `${BASE_URL}/contact`,
      `${BASE_URL}/privacy`,
      `${BASE_URL}/terms`,
      `${BASE_URL}/tools`,
      `${BASE_URL}/suleman-zaheer`,
    ];

    let toolUrls: string[] = [];
    try {
      const toolsDir = path.join(process.cwd(), "src/app/tools");
      const toolEntries = readdirSync(toolsDir, { withFileTypes: true });
      const toolSlugs = toolEntries
        .filter((d) => d.isDirectory())
        .filter((d) => existsSync(path.join(toolsDir, d.name, "page.tsx")))
        .map((d) => d.name);

      toolUrls = toolSlugs.map((slug) => `${BASE_URL}/tools/${slug}`);
    } catch {
      toolUrls = [];
    }

    const allUrls = Array.from(new Set([...staticPages, ...toolUrls]));

    const payload = {
      host: HOST,
      key: KEY,
      keyLocation: KEY_LOCATION,
      urlList: allUrls,
    };

    // Submit to IndexNow (Central & Bing) and Ping Sitemaps
    const results = await Promise.allSettled([
      fetch("https://api.indexnow.org/indexnow", {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify(payload),
      }),
      fetch("https://www.bing.com/indexnow", {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify(payload),
      }),
      fetch(`https://www.google.com/ping?sitemap=${encodeURIComponent(`${BASE_URL}/sitemap.xml`)}`),
      fetch(`https://www.bing.com/ping?sitemap=${encodeURIComponent(`${BASE_URL}/sitemap.xml`)}`),
    ]);

    return NextResponse.json({
      success: true,
      submittedUrls: allUrls.length,
      sampleUrls: allUrls.slice(0, 5),
      results: results.map((r, i) => ({
        target: ["IndexNow Central", "Microsoft Bing IndexNow", "Google Sitemap Ping", "Bing Sitemap Ping"][i],
        status: r.status,
      })),
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
