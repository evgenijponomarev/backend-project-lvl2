import _ from 'lodash';

const { isObject, compact } = _;

const stringify = (value) => {
  if (typeof value === 'string') return `'${value}'`;

  if (isObject(value)) return '[complex value]';

  return value;
};

const formatToPlain = (diffSchema, keys = []) => {
  const diff = diffSchema.map(({
    key,
    type,
    value1,
    value2,
    value,
  }) => {
    const newKeys = [...keys, key];
    const keyPath = newKeys.join('.');

    if (type === 'removed') {
      return `Property '${keyPath}' was removed`;
    }

    if (type === 'added') {
      return `Property '${keyPath}' was added with value: ${stringify(value2)}`;
    }

    if (type === 'changed') {
      return `Property '${keyPath}' was updated. From ${stringify(value1)} to ${stringify(value2)}`;
    }

    if (type === 'nested') {
      return formatToPlain(value, newKeys);
    }

    return '';
  });

  return compact(diff).join('\n');
};

export default formatToPlain;
