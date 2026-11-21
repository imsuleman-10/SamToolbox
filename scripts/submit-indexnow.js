/**
 * IndexNow Instant Search Engine Indexing Script
 * Submits all 97 SamToolbox URLs directly to IndexNow (Bing, Copilot, ChatGPT Search, Yandex, Seznam)
 * Protocol: https://www.indexnow.org/documentation
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const HOST = 'samtoolbox.vercel.app';
const BASE_URL = `https://${HOST}`;
const KEY = 'c8f1a239b0e74e689d2153bf0e7a1924';
const KEY_LOCATION = `${BASE_URL}/${KEY}.txt`;

// 1. Static Pages
const staticPages = [
  `${BASE_URL}/`,
  `${BASE_URL}/about`,
  `${BASE_URL}/contact`,
  `${BASE_URL}/privacy`,
  `${BASE_URL}/terms`,
  `${BASE_URL}/tools`,
  `${BASE_URL}/suleman-zaheer`,
];

// 2. Discover all tool slugs from TOOL_SEO_REGISTRY in src/lib/toolSeoData.ts
const seoDataPath = path.join(__dirname, '../src/lib/toolSeoData.ts');
let toolSlugs = [];
if (fs.existsSync(seoDataPath)) {
  const seoContent = fs.readFileSync(seoDataPath, 'utf-8');
  const matches = [...seoContent.matchAll(/"([a-z0-9-]+)":\s*\{/g)];
  toolSlugs = Array.from(new Set(matches.map(m => m[1]))).filter(s => s !== 'base_url');
}

// Also include directory slugs
const toolsDir = path.join(__dirname, '../src/app/tools');
if (fs.existsSync(toolsDir)) {
  const toolEntries = fs.readdirSync(toolsDir, { withFileTypes: true });
  toolEntries
    .filter(d => d.isDirectory() && !d.name.startsWith('['))
    .forEach(d => toolSlugs.push(d.name));
}
toolSlugs = Array.from(new Set(toolSlugs));


const toolUrls = toolSlugs.map(slug => `${BASE_URL}/tools/${slug}`);
const allUrls = Array.from(new Set([...staticPages, ...toolUrls]));

console.log(`\n======================================================`);
console.log(`🚀 SAMTOOLBOX INDEXNOW INSTANT INDEXING SUBMISSION`);
console.log(`======================================================`);
console.log(`🌐 Host: ${HOST}`);
console.log(`🔑 Key: ${KEY}`);
console.log(`📄 Total URLs to index: ${allUrls.length}`);
console.log(`------------------------------------------------------`);

const payload = JSON.stringify({
  host: HOST,
  key: KEY,
  keyLocation: KEY_LOCATION,
  urlList: allUrls,
});

function postToIndexNow(endpointHost, endpointPath) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: endpointHost,
      port: 443,
      path: endpointPath,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Content-Length': Buffer.byteLength(payload),
      },
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        resolve({ statusCode: res.statusCode, data });
      });
    });

    req.on('error', (e) => {
      reject(e);
    });

    req.write(payload);
    req.end();
  });
}

async function run() {
  const endpoints = [
    { name: 'IndexNow Central API (api.indexnow.org)', host: 'api.indexnow.org', path: '/indexnow' },
    { name: 'Microsoft Bing (www.bing.com)', host: 'www.bing.com', path: '/indexnow' },
  ];

  for (const ep of endpoints) {
    console.log(`📡 Submitting to ${ep.name}...`);
    try {
      const res = await postToIndexNow(ep.host, ep.path);
      if (res.statusCode === 200 || res.statusCode === 202) {
        console.log(`   ✅ Success (${res.statusCode}): Search engines accepted ${allUrls.length} URLs into priority crawl queue!`);
      } else {
        console.log(`   ℹ️ Response (${res.statusCode}): ${res.data || 'Submitted'}`);
      }
    } catch (err) {
      console.error(`   ❌ Failed: ${err.message}`);
    }
  }

  console.log(`\n🎉 IndexNow submission completed! Search engines (Bing, Copilot, ChatGPT Search) are now crawling.`);
}

run();
