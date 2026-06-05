const multer = require('multer');
const path = require('path');
const fs = require('fs');

const UPLOAD_DIR = process.env.UPLOAD_DIR || 'uploads';

// Ensure upload subdirectories exist
['videos', 'pdfs', 'images', 'assignments'].forEach(dir => {
  const fullPath = path.join(process.cwd(), UPLOAD_DIR, dir);
  if (!fs.existsSync(fullPath)) fs.mkdirSync(fullPath, { recursive: true });
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let subDir = 'images';
    if (file.mimetype.startsWith('video/')) subDir = 'videos';
    else if (file.mimetype === 'application/pdf') subDir = 'pdfs';
    cb(null, path.join(process.cwd(), UPLOAD_DIR, subDir));
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const baseName = path.basename(file.originalname, ext)
      .toLowerCase().replace(/[^a-z0-9]/g, '-').slice(0, 40);
    cb(null, `${Date.now()}-${baseName}${ext}`);
  }
});

const fileFilter = (req, file, cb) => {
  const allowed = [
    'image/jpeg', 'image/png', 'image/webp',
    'video/mp4', 'video/webm', 'video/ogg',
    'application/pdf'
  ];
  if (allowed.includes(file.mimetype)) cb(null, true);
  else cb(new Error(`File type not allowed: ${file.mimetype}`), false);
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: parseInt(process.env.MAX_FILE_SIZE) || 100 * 1024 * 1024 }
});

module.exports = upload;
