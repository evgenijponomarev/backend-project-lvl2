import formatToStylish from './stylish.js';
import formatToPlain from './plain.js';

const formatters = {
  stylish: formatToStylish,
  plain: formatToPlain,
  json: JSON.stringify,
};

function formatDiff(diffSchema, formatType = 'stylish') {
  const formatter = formatters[formatType];

  if (!formatter) throw new Error('Unexpected format');

  return formatter(diffSchema);
}

export default formatDiff;
