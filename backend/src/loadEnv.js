const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

const envPath = path.join(__dirname, '..', '.env');

if (fs.existsSync(envPath) && fs.statSync(envPath).size === 0) {
  console.warn(
    'Warning: backend/.env is empty on disk. Unsaved editor content will not apply — save the file, then retry.',
  );
}

// Path is fixed to this package so `node migrations/run.js` always finds .env.
// override: true lets real values in .env replace empty placeholders already in process.env.
dotenv.config({ path: envPath, override: true });
