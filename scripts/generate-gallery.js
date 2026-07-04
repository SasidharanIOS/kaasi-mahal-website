import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const publicDir = path.join(projectRoot, "public");
const outputFile = path.join(projectRoot, "src", "data", "generatedGallery.js");

const imageExtensions = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif"]);
const blockedNames = new Set(["favicon.ico", "logo.svg", "logo.png", "vite.svg", "og-image.png"]);

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(fullPath);
    const ext = path.extname(entry.name).toLowerCase();
    if (!imageExtensions.has(ext)) return [];
    if (blockedNames.has(entry.name.toLowerCase())) return [];
    const relative = path.relative(publicDir, fullPath).split(path.sep).join("/");
    return [`/${relative}`];
  });
}

const galleryDir = path.join(publicDir, "gallery");
let images = walk(galleryDir);

if (!images.length) {
  images = walk(publicDir).filter((item) => !item.includes("/generated/"));
}

const uniqueImages = [...new Set(images)].sort((a, b) => a.localeCompare(b));

const content = `export const galleryImages = ${JSON.stringify(uniqueImages, null, 2)};\n`;
fs.mkdirSync(path.dirname(outputFile), { recursive: true });
fs.writeFileSync(outputFile, content);
console.log(`Gallery synced: ${uniqueImages.length} image(s)`);
