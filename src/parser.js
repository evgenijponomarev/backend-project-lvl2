import path from 'path';
import fs from 'fs';
import jsYaml from 'js-yaml';

export default function parse(filepath) {
  const ext = path.extname(filepath);
  const content = fs.readFileSync(filepath, 'utf-8');

  if (ext === '.json') return JSON.parse(content);

  if (ext === '.yml') return jsYaml.load(content);

  throw new Error('Unexpected format of file. Expect json or yml.');
}
