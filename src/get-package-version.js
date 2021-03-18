import path, { dirname } from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default () => {
  const configPath = path.join(__dirname, '..', 'package.json');
  const configContent = fs.readFileSync(configPath, 'utf-8');
  const { version } = JSON.parse(configContent);

  return version;
};
