/**
 * Download doctor & testimonial photos to /public folder.
 * Uses URLs from image search results (already saved as JSON).
 */
import fs from "fs";
import path from "path";
import https from "https";

const PROJECT_ROOT = path.resolve(import.meta.dir, "..");
const DOCTORS_DIR = path.join(PROJECT_ROOT, "public", "doctors");
const TESTIMONIALS_DIR = path.join(PROJECT_ROOT, "public", "testimonials");

// Mapping: which JSON file → output filename → which result index to use
const MAPPING: { json: string; out: string; index: number }[] = [
  // Doctors (4)
  { json: "scripts/dentist-female.json", out: "doctor-1.jpg", index: 0 }, // dr. Oktri (female)
  { json: "scripts/dentist-female.json", out: "doctor-2.jpg", index: 1 }, // dr. Adelia (female)
  { json: "scripts/dentist-male.json", out: "doctor-3.jpg", index: 0 }, // dr. Reza (male)
  { json: "scripts/dentist-female.json", out: "doctor-4.jpg", index: 2 }, // dr. Salsabila (female)
  // Testimonials (6)
  { json: "scripts/testimonial-1.json", out: "testimonial-1.jpg", index: 0 },
  { json: "scripts/testimonial-2.json", out: "testimonial-2.jpg", index: 0 },
  { json: "scripts/testimonial-3.json", out: "testimonial-3.jpg", index: 0 },
  { json: "scripts/testimonial-4.json", out: "testimonial-4.jpg", index: 0 },
  { json: "scripts/testimonial-1.json", out: "testimonial-5.jpg", index: 1 },
  { json: "scripts/testimonial-2.json", out: "testimonial-6.jpg", index: 1 },
];

function download(url: string, outPath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(outPath);
    https
      .get(url, (res) => {
        if (res.statusCode === 301 || res.statusCode === 302) {
          // Follow redirect
          download(res.headers.location!, outPath).then(resolve).catch(reject);
          return;
        }
        if (res.statusCode !== 200) {
          reject(new Error(`HTTP ${res.statusCode} for ${url}`));
          return;
        }
        res.pipe(file);
        file.on("finish", () => {
          file.close();
          resolve();
        });
      })
      .on("error", (err) => {
        fs.unlink(outPath, () => {});
        reject(err);
      });
  });
}

async function main() {
  fs.mkdirSync(DOCTORS_DIR, { recursive: true });
  fs.mkdirSync(TESTIMONIALS_DIR, { recursive: true });

  for (const item of MAPPING) {
    const jsonPath = path.join(PROJECT_ROOT, item.json);
    if (!fs.existsSync(jsonPath)) {
      console.warn(`⚠️  Skip ${item.out}: ${item.json} not found`);
      continue;
    }
    const data = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
    const results = data.results ?? [];
    if (results.length <= item.index) {
      console.warn(`⚠️  Skip ${item.out}: only ${results.length} results`);
      continue;
    }
    const url = results[item.index].original_url;
    const outDir = item.out.startsWith("doctor") ? DOCTORS_DIR : TESTIMONIALS_DIR;
    const outPath = path.join(outDir, item.out);

    try {
      await download(url, outPath);
      const stats = fs.statSync(outPath);
      console.log(`✓ ${item.out} (${(stats.size / 1024).toFixed(1)} KB) ← ${url.substring(0, 60)}...`);
    } catch (err) {
      console.error(`✗ ${item.out}: ${err instanceof Error ? err.message : "unknown"}`);
    }
  }

  console.log("\n✅ All photos downloaded");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
