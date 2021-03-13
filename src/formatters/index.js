import formatToStylish from './stylish.js';
import formatToPlain from './plain.js';

const formatters = {
  schema: (diffSchema) => diffSchema,
  stylish: formatToStylish,
  plain: formatToPlain,
};

function formatDiff(diffSchema, formatType = 'stylish') {
  const formatter = formatters[formatType];

  if (!formatter) throw new Error('Unexpected format');

  return formatter(diffSchema);
}

export default formatDiff;
