const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const originalsDir = path.join(
  __dirname,
  "../assets/images/originals"
);

const fullDir = path.join(
  __dirname,
  "../assets/images/full"
);

const thumbsDir = path.join(
  __dirname,
  "../assets/images/thumbs"
);

fs.mkdirSync(fullDir, { recursive: true });
fs.mkdirSync(thumbsDir, { recursive: true });

const allowedExtensions = [
  ".jpg",
  ".jpeg",
  ".png",
  ".webp"
];

async function optimizeImages() {
  const files = fs
    .readdirSync(originalsDir)
    .filter((file) =>
      allowedExtensions.includes(
        path.extname(file).toLowerCase()
      )
    );

  console.log(`Encontradas ${files.length} imágenes.`);

  for (const file of files) {
    const inputPath = path.join(originalsDir, file);

    const baseName = path.parse(file).name;

    const fullOutput = path.join(
      fullDir,
      `${baseName}.webp`
    );

    const thumbOutput = path.join(
      thumbsDir,
      `${baseName}.webp`
    );

    await sharp(inputPath)
      .rotate()
      .resize({
        width: 1600,
        withoutEnlargement: true
      })
      .webp({
        quality: 82
      })
      .toFile(fullOutput);

    await sharp(inputPath)
      .rotate()
      .resize({
        width: 500,
        withoutEnlargement: true
      })
      .webp({
        quality: 75
      })
      .toFile(thumbOutput);

    console.log(`✓ ${file}`);
  }

  console.log("Optimización terminada.");
}

optimizeImages().catch((error) => {
  console.error("Error optimizando imágenes:");
  console.error(error);
  process.exit(1);
});
