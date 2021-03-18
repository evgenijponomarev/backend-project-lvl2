import _ from 'lodash';

const { isArray, compact } = _;

const formatValue = (value) => {
  if (typeof value === 'string') return `'${value}'`;

  if (isArray(value)) return '[complex value]';

  return value;
};

const formatToPlain = (diffSchema, keys = []) => {
  const diff = diffSchema.map(({ key, value, type }) => {
    const newKeys = [...keys, key];
    const keyPath = newKeys.join('.');

    if (type === 'removed') {
      return `Property '${keyPath}' was removed`;
    }

    if (type === 'added') {
      return `Property '${keyPath}' was added with value: ${formatValue(value)}`;
    }

    if (type === 'changed') {
      return `Property '${keyPath}' was updated. From ${formatValue(value.old)} to ${formatValue(value.new)}`;
    }

    if (isArray(value)) {
      return formatToPlain(value, newKeys);
    }

    return '';
  });

  return compact(diff).join('\n');
};

export default formatToPlain;
