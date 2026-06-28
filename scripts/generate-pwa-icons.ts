/**
 * Generate PWA icons from a single SVG source.
 * Outputs:
 *  - icon-192.png (regular)
 *  - icon-512.png (regular)
 *  - icon-192-maskable.png (with padding for maskable)
 *  - icon-512-maskable.png
 *  - apple-touch-icon.png (180x180)
 *  - favicon-32.png, favicon-16.png
 *  - og-image.png (1200x630 for social sharing)
 */

import sharp from "sharp";
import { mkdir } from "fs/promises";
import path from "path";

const OUT = path.join(process.cwd(), "public", "icons");

// Brand mark: shield + tooth, on pink gradient background
const buildShieldSvg = (size: number, padding = 0) => {
  const inner = size - padding * 2;
  const scale = inner / 96; // viewBox is 96x96
  const offset = padding;
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="${size}" y2="${size}" gradientUnits="userSpaceOnUse">
      <stop stop-color="#9D174D"/>
      <stop offset="0.5" stop-color="#DB2777"/>
      <stop offset="1" stop-color="#EC4899"/>
    </linearGradient>
    <linearGradient id="tooth" x1="0" y1="0" x2="${inner}" y2="${inner}" gradientUnits="userSpaceOnUse">
      <stop stop-color="#FFFFFF"/>
      <stop offset="1" stop-color="#FCE7F3"/>
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" fill="url(#bg)"/>
  <g transform="translate(${offset} ${offset}) scale(${scale})">
    <!-- Shield -->
    <path d="M48 4l36 12v28c0 24-16 40-36 48C28 84 12 68 12 44V16L48 4z" fill="#FFFFFF" opacity="0.95"/>
    <!-- Tooth -->
    <path d="M48 24c-7 0-10 2.8-15 2.8-4 0-8 2-8 9.2 0 8 2.8 12 5 18.8 1.6 5.2 2.8 14.8 7.2 14.8 4 0 4.4-7 6-12 1.2-3.6 2.2-5.6 7-5.6s5.8 2 7 5.6c1.6 5 2 12 6 12 4.4 0 5.6-9.6 7.2-14.8C67 48 69.8 44 69.8 36c0-7.2-4-9.2-8-9.2-5 0-8-2.8-15-2.8z" fill="url(#tooth)"/>
    <!-- Sparkle -->
    <path d="M68 28l1.6 4 4 1.6-4 1.6-1.6 4-1.6-4-4-1.6 4-1.6z" fill="#FBBF24"/>
  </g>
</svg>`;
};

// Maskable: same shield but with more padding (safe zone)
const buildMaskableSvg = (size: number) => buildShieldSvg(size, size * 0.18);

// OG image: 1200x630 with logo + brand text
const buildOgSvg = () => {
  return `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1200" y2="630" gradientUnits="userSpaceOnUse">
      <stop stop-color="#9D174D"/>
      <stop offset="0.5" stop-color="#DB2777"/>
      <stop offset="1" stop-color="#EC4899"/>
    </linearGradient>
    <linearGradient id="tooth" x1="0" y1="0" x2="1" y2="1">
      <stop stop-color="#FFFFFF"/>
      <stop offset="1" stop-color="#FCE7F3"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <!-- Decorative circles -->
  <circle cx="200" cy="100" r="180" fill="#FFFFFF" opacity="0.08"/>
  <circle cx="1050" cy="530" r="220" fill="#FFFFFF" opacity="0.08"/>
  <!-- Shield + tooth mark -->
  <g transform="translate(160 215)">
    <path d="M100 8l75 25v58c0 50-33 83-75 100C58 174 25 141 25 91V33L100 8z" fill="#FFFFFF" opacity="0.95"/>
    <path d="M100 50c-15 0-21 6-31 6-8 0-17 4-17 19 0 17 6 25 10 39 3 11 6 31 15 31 8 0 9-15 13-25 3-8 5-12 15-12s12 4 15 12c4 10 4 25 13 25 9 0 11-20 15-31 4-14 10-22 10-39 0-15-9-19-17-19-10 0-16-6-31-6z" fill="url(#tooth)"/>
  </g>
  <!-- Text -->
  <text x="380" y="290" font-family="Poppins, Arial, sans-serif" font-size="96" font-weight="800" fill="#FFFFFF">OMDC</text>
  <text x="380" y="345" font-family="Arial, sans-serif" font-size="22" font-weight="600" letter-spacing="6" fill="#FCE7F3">OKTRI MANESSA DENTAL CLINIC</text>
  <text x="380" y="430" font-family="Arial, sans-serif" font-size="38" font-style="italic" fill="#FBCFE8">Your Smile, Our Passion</text>
  <text x="380" y="490" font-family="Arial, sans-serif" font-size="20" fill="#FCE7F3" opacity="0.85">Booking • Rekam Medis • Pembayaran • 4 Platform Terintegrasi</text>
</svg>`;
};

async function main() {
  await mkdir(OUT, { recursive: true });

  const tasks: { name: string; svg: string; w: number; h: number }[] = [
    { name: "icon-192.png", svg: buildShieldSvg(192), w: 192, h: 192 },
    { name: "icon-512.png", svg: buildShieldSvg(512), w: 512, h: 512 },
    { name: "icon-192-maskable.png", svg: buildMaskableSvg(192), w: 192, h: 192 },
    { name: "icon-512-maskable.png", svg: buildMaskableSvg(512), w: 512, h: 512 },
    { name: "apple-touch-icon.png", svg: buildShieldSvg(180), w: 180, h: 180 },
    { name: "favicon-32.png", svg: buildShieldSvg(32), w: 32, h: 32 },
    { name: "favicon-16.png", svg: buildShieldSvg(16), w: 16, h: 16 },
    { name: "og-image.png", svg: buildOgSvg(), w: 1200, h: 630 },
  ];

  for (const t of tasks) {
    const target = path.join(OUT, t.name);
    await sharp(Buffer.from(t.svg)).png().toFile(target);
    console.log(`✓ ${t.name} (${t.w}x${t.h})`);
  }

  console.log("\n✅ All PWA icons generated in /public/icons/");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
