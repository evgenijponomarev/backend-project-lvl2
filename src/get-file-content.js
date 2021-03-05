import path, { dirname } from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default function getFileContent(filepath) {
  const fullPath = path.join(__dirname, '..', filepath);

  return fs.readFileSync(fullPath, 'utf-8');
}
