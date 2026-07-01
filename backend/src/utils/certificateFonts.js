const fs = require('fs');
const path = require('path');
const { StandardFonts } = require('pdf-lib');

const fontsDir = path.join(__dirname, '..', '..', 'assets', 'fonts');

/**
 * Drop .ttf or .otf files here (same fonts as your Illustrator certificate).
 * Expected filenames — rename your files to match, or tell us the exact names:
 *
 *   name-script.ttf   → student name (cursive/script)
 *   body-regular.ttf  → course line, serial number
 *   body-bold.ttf     → date
 */
const FONT_FILES = {
  script: 'name-script.ttf',
  regular: 'body-regular.ttf',
  bold: 'body-bold.ttf',
};

const readFontBytes = filename => {
  const filepath = path.join(fontsDir, filename);
  if (!fs.existsSync(filepath)) return null;
  return fs.readFileSync(filepath);
};

const embedCustomOrStandard = async (pdfDoc, filename, standard) => {
  const bytes = readFontBytes(filename);
  if (bytes) {
    try {
      return await pdfDoc.embedFont(bytes, { subset: true });
    } catch {
      console.warn(`Certificate font could not load: ${filename}, using fallback.`);
    }
  }
  return pdfDoc.embedFont(standard);
};

const loadCertificateFonts = async pdfDoc => {
  const [script, regular, bold] = await Promise.all([
    embedCustomOrStandard(pdfDoc, FONT_FILES.script, StandardFonts.HelveticaOblique),
    embedCustomOrStandard(pdfDoc, FONT_FILES.regular, StandardFonts.Helvetica),
    embedCustomOrStandard(pdfDoc, FONT_FILES.bold, StandardFonts.HelveticaBold),
  ]);
  return { script, regular, bold };
};

const listAvailableFonts = () => {
  if (!fs.existsSync(fontsDir)) return [];
  return fs.readdirSync(fontsDir).filter(f => /\.(ttf|otf)$/i.test(f));
};

module.exports = { loadCertificateFonts, listAvailableFonts, FONT_FILES, fontsDir };
