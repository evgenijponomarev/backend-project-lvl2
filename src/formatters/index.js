import formatToStylish from './stylish.js';

const formatters = {
  schema: (diffSchema) => diffSchema,
  stylish: formatToStylish,
};

function formatDiff(diffSchema, formatType = 'stylish') {
  const formatter = formatters[formatType];

  if (!formatter) throw new Error('Unexpected format');

  return formatter(diffSchema);
}

export default formatDiff;
