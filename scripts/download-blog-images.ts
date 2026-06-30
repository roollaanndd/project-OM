/**
 * Download blog images to /public/blog
 */
import fs from "fs";
import path from "path";
import https from "https";

const PROJECT_ROOT = path.resolve(import.meta.dir, "..");
const BLOG_DIR = path.join(PROJECT_ROOT, "public", "blog");

const MAPPING: { json: string; out: string }[] = [
  { json: "scripts/blog-1.json", out: "scaling-tips.jpg" },
  { json: "scripts/blog-2.json", out: "behel-guide.jpg" },
  { json: "scripts/blog-3.json", out: "whitening-guide.jpg" },
  { json: "scripts/blog-4.json", out: "kids-dental.jpg" },
  { json: "scripts/blog-5.json", out: "implant-guide.jpg" },
  { json: "scripts/blog-6.json", out: "oral-hygiene.jpg" },
];

function download(url: string, outPath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(outPath);
    https
      .get(url, (res) => {
        if (res.statusCode === 301 || res.statusCode === 302) {
          download(res.headers.location!, outPath).then(resolve).catch(reject);
          return;
        }
        if (res.statusCode !== 200) {
          reject(new Error(`HTTP ${res.statusCode}`));
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
  fs.mkdirSync(BLOG_DIR, { recursive: true });

  for (const item of MAPPING) {
    const jsonPath = path.join(PROJECT_ROOT, item.json);
    if (!fs.existsSync(jsonPath)) {
      console.warn(`⚠️  Skip ${item.out}: ${item.json} not found`);
      continue;
    }
    const data = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
    const results = data.results ?? [];
    if (results.length === 0) continue;
    const url = results[0].original_url;
    const outPath = path.join(BLOG_DIR, item.out);
    try {
      await download(url, outPath);
      const stats = fs.statSync(outPath);
      console.log(`✓ ${item.out} (${(stats.size / 1024).toFixed(1)} KB)`);
    } catch (err) {
      console.error(`✗ ${item.out}: ${err instanceof Error ? err.message : "unknown"}`);
    }
  }
  console.log("\n✅ All blog images downloaded");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
