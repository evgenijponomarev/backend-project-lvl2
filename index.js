import parse from './src/parser.js';
import formatDiff from './src/formatters/index.js';
import getDiffSchema from './src/index.js';

function genDiff(filepath1, filepath2, format) {
  const obj1 = parse(filepath1);
  const obj2 = parse(filepath2);
  const diffSchema = getDiffSchema(obj1, obj2);

  return formatDiff(diffSchema, format);
}

export default genDiff;
