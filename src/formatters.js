import isArray from 'lodash/isArray.js';

function formatDiffToStylish(diffSchema, indentCount = 0) {
  if (!isArray(diffSchema)) return diffSchema;

  const processSign = {
    add: '+',
    del: '-',
  };
  const indent = '  ';

  const line = diffSchema.map(({ key, value, process }) => {
    const sign = processSign[process] ?? '';
    const prefix = `${sign}${indent.slice(sign.length)}`;
    const formattedValue = formatDiffToStylish(value, indentCount + 2);

    return `${indent.repeat(indentCount + 1)}${prefix}${key}: ${formattedValue}`;
  }).join('\n');

  return `{\n${line}\n${indent.repeat(indentCount)}}`;
}

const formatters = {
  stylish: formatDiffToStylish,
  schema: (diffSchema) => diffSchema,
};

function formatDiff(diffSchema, format = 'stylish') {
  return formatters[format](diffSchema);
}

export default formatDiff;
