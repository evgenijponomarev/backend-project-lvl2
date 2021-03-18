import _ from 'lodash';

const { isArray } = _;

const typeSign = {
  added: '+',
  removed: '-',
  none: '',
};

const indent = '  ';

const getStylishLine = (indentCount, key, value, type = 'none') => {
  const sign = typeSign[type];
  const prefix = `${sign}${indent.slice(sign.length)}`;

  return `${indent.repeat(indentCount)}${prefix}${key}: ${value}`;
};

const formatToStylish = (diffSchema, indentCount = 0) => {
  const formatValue = (v) => (isArray(v) ? formatToStylish(v, indentCount + 2) : v);

  const diff = diffSchema.flatMap(({ key, value, type }) => (
    type === 'changed'
      ? [
        getStylishLine(indentCount + 1, key, formatValue(value.old), 'removed'),
        getStylishLine(indentCount + 1, key, formatValue(value.new), 'added'),
      ]
      : getStylishLine(indentCount + 1, key, formatValue(value), type)
  ));

  return [
    '{',
    diff.join('\n'),
    `${indent.repeat(indentCount)}}`,
  ].join('\n');
};

export default formatToStylish;
