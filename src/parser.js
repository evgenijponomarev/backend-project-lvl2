import path from 'path';
import fs from 'fs';
import jsYaml from 'js-yaml';

const parsers = {
  json: JSON.parse,
  yml: jsYaml.load,
};

export default function parseFile(filepath) {
  const ext = path.extname(filepath).slice(1);
  const parser = parsers[ext];

  if (!parser) throw new Error('Unexpected format of file. Expected json or yml.');

  const content = fs.readFileSync(filepath, 'utf-8');

  return parser(content);
}
