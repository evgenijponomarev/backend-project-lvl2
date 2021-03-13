import isArray from 'lodash/isArray.js';
import compact from 'lodash/compact.js';

function formatValue(value) {
  if (typeof value === 'string') return `'${value}'`;

  if (isArray(value)) return '[complex value]';

  return value;
}

function formatToPlain(diffSchema, keys = []) {
  const diff = diffSchema.map(({ key, value, status }) => {
    const newKeys = [...keys, key];
    const keyPath = newKeys.join('.');

    if (status === 'removed') {
      return `Property '${keyPath}' was removed`;
    }

    if (status === 'added') {
      return `Property '${keyPath}' was added with value: ${formatValue(value)}`;
    }

    if (status === 'changed') {
      return `Property '${keyPath}' was updated. From ${formatValue(value.old)} to ${formatValue(value.new)}`;
    }

    if (isArray(value)) {
      return formatToPlain(value, newKeys);
    }

    return '';
  });

  return compact(diff).join('\n');
}

export default formatToPlain;
