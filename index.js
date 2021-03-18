import path from 'path';
import fs from 'fs';
import parse from './src/parser.js';
import formatDiff from './src/formatters/index.js';
import getDiffSchema from './src/index.js';

export default (filepath1, filepath2, format) => {
  const ext1 = path.extname(filepath1).slice(1);
  const ext2 = path.extname(filepath2).slice(1);
  const file1Data = fs.readFileSync(filepath1, 'utf-8');
  const file2Data = fs.readFileSync(filepath2, 'utf-8');
  const obj1 = parse(file1Data, ext1);
  const obj2 = parse(file2Data, ext2);
  const diffSchema = getDiffSchema(obj1, obj2);

  return formatDiff(diffSchema, format);
};
