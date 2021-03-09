import path from 'path';
import jsYaml from 'js-yaml';
import getFileContent from './get-file-content.js';

export default function parseDataFromFile(filepath) {
  const ext = path.extname(filepath);
  const content = getFileContent(filepath);

  if (ext === '.json') return JSON.parse(content);
  if (ext === '.yml') return jsYaml.load(content);
  return null;
}
