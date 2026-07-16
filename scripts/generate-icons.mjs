// Regenerate raster app-icon assets from the vector sources.
//
// Sources (committed at the repo root / public/):
//   - safariserve-icon-ios.svg      → the styled "app icon": rounded-rect
//     gradient body + glow. Used for the favicon, PWA install icons, and the
//     iOS Home Screen icon (opaque presentation).
//   - src/assets/safariserve-icon.svg → the optimized transparent mark. Used on
//     its own where a transparent background is ideal (in-app logo, and the
//     maskable safe-zone composition below).
//
// Outputs (public/):
//   - apple-touch-icon.png   180×180  opaque   (iOS Home Screen)
//   - icon-192x192.png       192×192  alpha    (PWA, purpose "any")
//   - icon-512x512.png       512×512  alpha    (PWA, purpose "any")
//   - icon-512-maskable.png  512×512  opaque   (PWA, purpose "maskable")
//
// Run with: npm run generate:icons
import sharp from "sharp";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const pub = join(root, "public");

const iosSvg = readFileSync(join(root, "safariserve-icon-ios.svg"));
const markSvg = readFileSync(join(root, "src", "assets", "safariserve-icon.svg"));

// Supersample the vector before downscaling for crisp edges at small sizes.
const density = 384;

// Deepest gradient stop of the icon body — used to fill the transparent
// corners so opaque targets (iOS, maskable) have no black-alpha artifacts.
const DEEP = "#050c0d";

// Full-bleed gradient background matching the icon body (for the maskable icon).
const bgSquare = (size) => Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
     <defs>
       <linearGradient id="g" x1="0" y1="0" x2="0" y2="${size}" gradientUnits="userSpaceOnUse">
         <stop offset="0" stop-color="#113034"/>
         <stop offset="0.55" stop-color="#09181b"/>
         <stop offset="1" stop-color="${DEEP}"/>
       </linearGradient>
     </defs>
     <rect width="${size}" height="${size}" fill="url(#g)"/>
   </svg>`,
);

const renderIos = (size) =>
  sharp(iosSvg, { density }).resize(size, size, { fit: "contain" }).png();

async function main() {
  // PWA "any" — keep the styled rounded-rect with transparent corners.
  await renderIos(192).toFile(join(pub, "icon-192x192.png"));
  await renderIos(512).toFile(join(pub, "icon-512x512.png"));

  // iOS Home Screen — opaque (iOS applies its own squircle mask).
  await renderIos(180)
    .flatten({ background: DEEP })
    .toFile(join(pub, "apple-touch-icon.png"));

  // Maskable — full-bleed background + mark scaled into the ~80% safe zone.
  const maskSize = 512;
  // Round to an even integer so the mark centers on exact integer padding
  // (72px per side) rather than a fractional 71.5px, avoiding sub-pixel blur.
  const markSize = Math.round((maskSize * 0.72) / 2) * 2;
  const markPng = await sharp(markSvg, { density })
    .resize(markSize, markSize, { fit: "contain" })
    .png()
    .toBuffer();
  await sharp(bgSquare(maskSize))
    .composite([{ input: markPng, gravity: "center" }])
    .png()
    .toFile(join(pub, "icon-512-maskable.png"));

  console.log("Generated: apple-touch-icon.png, icon-192x192.png, icon-512x512.png, icon-512-maskable.png");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
