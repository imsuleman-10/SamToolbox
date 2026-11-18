/**
 * Google Indexing API - Instant URL Submission Script
 * Sends real-time indexing ping requests directly to Googlebot via Google Indexing API.
 * 
 * Requirements:
 * 1. Create a Service Account in Google Cloud Console (APIs & Services -> Credentials).
 * 2. Enable "Web Search Indexing API" in Google Cloud Console.
 * 3. Add the service account email (e.g. your-bot@project.iam.gserviceaccount.com) as an "Owner" in Google Search Console.
 * 4. Save the downloaded private key JSON file as `service_account.json` in the root of SamToolbox.
 * 5. Run: npm run index-google
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const crypto = require('crypto');

const KEY_FILE = path.join(__dirname, '../service_account.json');
const HOST = 'samtoolbox.vercel.app';
const BASE_URL = `https://${HOST}`;

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

// 2. Discover all tool slugs
const toolsDir = path.join(__dirname, '../src/app/tools');
const toolEntries = fs.readdirSync(toolsDir, { withFileTypes: true });
const toolSlugs = toolEntries
  .filter(d => d.isDirectory())
  .filter(d => fs.existsSync(path.join(toolsDir, d.name, 'page.tsx')))
  .map(d => d.name);

const toolUrls = toolSlugs.map(slug => `${BASE_URL}/tools/${slug}`);
const allUrls = Array.from(new Set([...staticPages, ...toolUrls]));

if (!fs.existsSync(KEY_FILE)) {
  console.log(`\n======================================================`);
  console.log(`⚠️  GOOGLE INDEXING API - CONFIGURATION REQUIRED`);
  console.log(`======================================================`);
  console.log(`File "service_account.json" was not found in SamToolbox root.\n`);
  console.log(`To enable 1-Click Instant Google Indexing for all ${allUrls.length} URLs:`);
  console.log(`1. Go to Google Cloud Console (https://console.cloud.google.com/)`);
  console.log(`2. Enable "Web Search Indexing API"`);
  console.log(`3. Create a Service Account and download its JSON key`);
  console.log(`4. Place the file as: C:\\Users\\Suleman\\Desktop\\SamToolbox\\service_account.json`);
  console.log(`5. Add that service account email as "Owner" in Google Search Console`);
  console.log(`6. Run "npm run index-google" again!\n`);
  process.exit(0);
}

const keyData = JSON.parse(fs.readFileSync(KEY_FILE, 'utf8'));

function createJWT(serviceAccount) {
  const header = {
    alg: 'RS256',
    typ: 'JWT',
  };

  const now = Math.floor(Date.now() / 1000);
  const payload = {
    iss: serviceAccount.client_email,
    scope: 'https://www.googleapis.com/auth/indexing',
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now,
  };

  const b64Header = Buffer.from(JSON.stringify(header)).toString('base64url');
  const b64Payload = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signatureInput = `${b64Header}.${b64Payload}`;

  const signer = crypto.createSign('RSA-SHA256');
  signer.update(signatureInput);
  const signature = signer.sign(serviceAccount.private_key, 'base64url');

  return `${signatureInput}.${signature}`;
}

function getAccessToken(jwt) {
  return new Promise((resolve, reject) => {
    const postData = `grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=${jwt}`;
    const req = https.request({
      hostname: 'oauth2.googleapis.com',
      port: 443,
      path: '/token',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData),
      },
    }, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          if (parsed.access_token) resolve(parsed.access_token);
          else reject(new Error(parsed.error_description || data));
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

function publishUrl(token, targetUrl) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify({
      url: targetUrl,
      type: 'URL_UPDATED',
    });

    const req = https.request({
      hostname: 'indexing.googleapis.com',
      port: 443,
      path: '/v3/urlNotifications:publish',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload),
      },
    }, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        resolve({ status: res.statusCode, data });
      });
    });

    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

async function main() {
  console.log(`\n======================================================`);
  console.log(`🚀 GOOGLE REAL-TIME INDEXING API DISPATCHER`);
  console.log(`======================================================`);
  console.log(`🔐 Authenticating Service Account: ${keyData.client_email}`);

  try {
    const jwt = createJWT(keyData);
    const token = await getAccessToken(jwt);
    console.log(`✅ Access Token successfully acquired!`);
    console.log(`📡 Pushing ${allUrls.length} URLs directly into Googlebot's Crawl Priority Queue...\n`);

    let count = 0;
    for (const url of allUrls) {
      count++;
      try {
        const res = await publishUrl(token, url);
        if (res.status === 200) {
          console.log(`[${count}/${allUrls.length}] ✅ Pushed: ${url}`);
        } else {
          console.log(`[${count}/${allUrls.length}] ⚠️  (${res.status}) ${url}`);
        }
      } catch (err) {
        console.error(`[${count}/${allUrls.length}] ❌ Error: ${err.message}`);
      }
      // Gentle throttle to respect Google API quotas
      await new Promise(r => setTimeout(r, 200));
    }

    console.log(`\n🎉 All ${allUrls.length} URLs sent to Googlebot! Expect crawl requests within hours.`);
  } catch (err) {
    console.error(`❌ Authentication failed:`, err.message);
  }
}

main();