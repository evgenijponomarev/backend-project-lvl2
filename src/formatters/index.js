import formatToStylish from './stylish.js';
import formatToPlain from './plain.js';
import formats from '../formats.js';

const formatters = {
  [formats.output.stylish]: formatToStylish,
  [formats.output.plain]: formatToPlain,
  [formats.output.json]: JSON.stringify,
};

export default (diffSchema, formatType) => {
  const formatter = formatters[formatType];

  return formatter(diffSchema);
};
