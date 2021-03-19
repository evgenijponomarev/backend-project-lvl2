import path from 'path';
import fs from 'fs';
import parse from './src/parser.js';
import formatDiff from './src/formatters/index.js';
import getDiffSchema from './src/index.js';
import formats from './src/formats.js';

const allowedInputFormats = Object.keys(formats.input);
const allowedOutputFormats = Object.keys(formats.output);
const defaultOutputFormat = formats.output.stylish;

export default (filepath1, filepath2, format = defaultOutputFormat) => {
  const ext1 = path.extname(filepath1).slice(1);
  const ext2 = path.extname(filepath2).slice(1);

  [ext1, ext2].forEach((ext) => {
    if (!allowedInputFormats.includes(ext)) {
      throw new Error(`Unexpected format of file. Expected ${allowedInputFormats.join(' or ')}, recieved ${ext}`);
    }
  });

  if (!allowedOutputFormats.includes(format)) {
    throw new Error(`Unexpected output format. Expected ${allowedOutputFormats.join(' or ')}, recieved ${format}`);
  }

  const file1Data = fs.readFileSync(filepath1, 'utf-8');
  const file2Data = fs.readFileSync(filepath2, 'utf-8');
  const obj1 = parse(file1Data, ext1);
  const obj2 = parse(file2Data, ext2);
  const diffSchema = getDiffSchema(obj1, obj2);

  return formatDiff(diffSchema, format);
};
