const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const publicDir = path.join(__dirname, "..", "public");

async function generateAssets() {
  // 1. Logo SVG (512x512) - Square brand avatar
  const logoSvg = `
  <svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0f172a" />
        <stop offset="100%" stop-color="#020617" />
      </linearGradient>
      <linearGradient id="crimsonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#f87171" />
        <stop offset="50%" stop-color="#e5322d" />
        <stop offset="100%" stop-color="#991b1b" />
      </linearGradient>
      <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="15" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
    <!-- Background -->
    <rect width="512" height="512" rx="128" fill="url(#bgGrad)" />
    <rect width="510" height="510" x="1" y="1" rx="127" fill="none" stroke="#334155" stroke-width="2" />
    
    <!-- Central Crimson Emblem -->
    <g transform="translate(136, 116)" filter="url(#glow)">
      <rect width="240" height="240" rx="60" fill="url(#crimsonGrad)" />
      <!-- Letter S -->
      <text x="120" y="170" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="900" font-size="140" fill="#ffffff" text-anchor="middle" letter-spacing="-4">S</text>
    </g>
    
    <!-- Brand Name Underneath -->
    <text x="256" y="420" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="900" font-size="46" text-anchor="middle" fill="#ffffff" letter-spacing="-1">
      Sam<tspan fill="#e5322d">Toolbox</tspan>
    </text>
    <text x="256" y="456" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="700" font-size="16" text-anchor="middle" fill="#94a3b8" letter-spacing="3">
      SOVEREIGN UTILITY SUITE
    </text>
  </svg>`;

  // 2. Favicon SVG (192x192) - Crisp icon only
  const faviconSvg = `
  <svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="crimsonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#ef4444" />
        <stop offset="50%" stop-color="#e5322d" />
        <stop offset="100%" stop-color="#b91c1c" />
      </linearGradient>
    </defs>
    <rect width="512" height="512" rx="120" fill="url(#crimsonGrad)" />
    <text x="256" y="365" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="900" font-size="320" fill="#ffffff" text-anchor="middle" letter-spacing="-8">S</text>
  </svg>`;

  // 3. OpenGraph 1200x630 Marketing Banner
  const ogSvg = `
  <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="ogBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0f172a" />
        <stop offset="100%" stop-color="#020617" />
      </linearGradient>
      <linearGradient id="crimson" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#f87171" />
        <stop offset="50%" stop-color="#e5322d" />
        <stop offset="100%" stop-color="#991b1b" />
      </linearGradient>
      <filter id="ogGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="30" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
    <!-- Background -->
    <rect width="1200" height="630" fill="url(#ogBg)" />
    
    <!-- Accent radial circle -->
    <circle cx="1050" cy="150" r="300" fill="#e5322d" opacity="0.12" filter="url(#ogGlow)" />
    <circle cx="150" cy="500" r="250" fill="#e5322d" opacity="0.06" filter="url(#ogGlow)" />

    <!-- Top Brand Header -->
    <g transform="translate(80, 70)">
      <rect width="64" height="64" rx="18" fill="url(#crimson)" />
      <text x="32" y="47" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="900" font-size="40" fill="#ffffff" text-anchor="middle" letter-spacing="-1">S</text>
      
      <text x="84" y="40" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="900" font-size="34" fill="#ffffff" letter-spacing="-1">
        Sam<tspan fill="#ef4444">Toolbox</tspan>
      </text>
      <text x="84" y="58" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="700" font-size="13" fill="#94a3b8" letter-spacing="2">
        PRIVATE CLIENT-SIDE SUITE
      </text>
    </g>

    <!-- Top Right Badge -->
    <g transform="translate(780, 75)">
      <rect width="340" height="50" rx="25" fill="#1e293b" stroke="#334155" stroke-width="1.5" />
      <circle cx="30" cy="25" r="6" fill="#10b981" />
      <text x="48" y="31" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="700" font-size="15" fill="#f8fafc">
        100% In-Browser • Zero Server Uploads
      </text>
    </g>

    <!-- Main Value Headline -->
    <text x="80" y="240" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="900" font-size="56" fill="#ffffff" letter-spacing="-2">
      Every tool you need to work with
    </text>
    <text x="80" y="305" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="900" font-size="56" fill="#ef4444" letter-spacing="-2">
      PDFs &amp; Calculations <tspan fill="#ffffff">in one place.</tspan>
    </text>

    <!-- Subheadline -->
    <text x="80" y="365" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="500" font-size="22" fill="#94a3b8">
      Merge, Split, Compress, Convert, Sign &amp; Protect. Plus FBR Salary Tax, Aggregate Merit,
    </text>
    <text x="80" y="398" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="500" font-size="22" fill="#94a3b8">
      Marla Converter &amp; Zakat Calculators with 100% client-side privacy.
    </text>

    <!-- Feature Pills -->
    <g transform="translate(80, 480)">
      <!-- Pill 1 -->
      <rect width="180" height="50" rx="14" fill="#1e293b" stroke="#334155" stroke-width="1" />
      <text x="90" y="31" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="700" font-size="16" fill="#f1f5f9" text-anchor="middle">55+ Free Tools</text>

      <!-- Pill 2 -->
      <g transform="translate(195, 0)">
        <rect width="195" height="50" rx="14" fill="#1e293b" stroke="#334155" stroke-width="1" />
        <text x="97" y="31" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="700" font-size="16" fill="#f1f5f9" text-anchor="middle">Merge &amp; Compress</text>
      </g>

      <!-- Pill 3 -->
      <g transform="translate(405, 0)">
        <rect width="180" height="50" rx="14" fill="#1e293b" stroke="#334155" stroke-width="1" />
        <text x="90" y="31" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="700" font-size="16" fill="#f1f5f9" text-anchor="middle">Word &amp; Excel PDF</text>
      </g>

      <!-- Pill 4 -->
      <g transform="translate(600, 0)">
        <rect width="195" height="50" rx="14" fill="#1e293b" stroke="#334155" stroke-width="1" />
        <text x="97" y="31" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="700" font-size="16" fill="#f1f5f9" text-anchor="middle">FBR Tax 2024-26</text>
      </g>

      <!-- Pill 5 -->
      <g transform="translate(810, 0)">
        <rect width="230" height="50" rx="14" fill="rgba(229, 50, 45, 0.15)" stroke="rgba(229, 50, 45, 0.4)" stroke-width="1" />
        <text x="115" y="31" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="700" font-size="16" fill="#fca5a5" text-anchor="middle">Zero Server Uploads</text>
      </g>
    </g>
  </svg>`;

  console.log("Generating public/logo.jpg...");
  await sharp(Buffer.from(logoSvg))
    .jpeg({ quality: 95 })
    .toFile(path.join(publicDir, "logo.jpg"));

  console.log("Generating public/logo.png...");
  await sharp(Buffer.from(logoSvg))
    .png()
    .toFile(path.join(publicDir, "logo.png"));

  console.log("Generating public/favicon.png...");
  await sharp(Buffer.from(faviconSvg))
    .resize(192, 192)
    .png()
    .toFile(path.join(publicDir, "favicon.png"));

  console.log("Generating public/og-image.jpg...");
  await sharp(Buffer.from(ogSvg))
    .jpeg({ quality: 92 })
    .toFile(path.join(publicDir, "og-image.jpg"));

  console.log("Generating public/og-image.png...");
  await sharp(Buffer.from(ogSvg))
    .png()
    .toFile(path.join(publicDir, "og-image.png"));

  console.log("All marketing image assets generated successfully!");
}

generateAssets().catch(console.error);
