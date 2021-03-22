import _ from 'lodash';

const { isArray, isObject } = _;

const indent = ' ';
const indentSize = 4;
const removedSign = '- ';
const addedSign = '+ ';

const stringify = (node, depth) => {
  if (!isObject(node)) return node;

  const lines = Object.entries(node)
    .map(([entryKey, entryValue]) => {
      const value = stringify(entryValue, depth + 1);

      return `${indent.repeat(indentSize * depth)}${entryKey}: ${value}`;
    });

  return [
    '{',
    ...lines,
    `${indent.repeat(indentSize * depth - indentSize)}}`,
  ].join('\n');
};

const formatToStylish = (diffSchema) => {
  const iter = (schema, depth) => {
    const currentIndentLength = indentSize * depth;
    const indentForUnchanged = indent.repeat(currentIndentLength);
    const indentForRemoved = removedSign.padStart(currentIndentLength);
    const indentForAdded = addedSign.padStart(currentIndentLength);

    if (!isArray(schema)) return schema;

    const bracketIndent = indent.repeat(currentIndentLength - indentSize);

    const lines = schema.flatMap((node) => {
      if (node.type === 'changed') {
        const value1 = stringify(node.value1, depth + 1);
        const value2 = stringify(node.value2, depth + 1);

        return [
          `${indentForRemoved}${node.key}: ${value1}`,
          `${indentForAdded}${node.key}: ${value2}`,
        ];
      }

      if (node.type === 'added') {
        const value = stringify(node.value2, depth + 1);

        return `${indentForAdded}${node.key}: ${value}`;
      }

      if (node.type === 'removed') {
        const value = stringify(node.value1, depth + 1);

        return `${indentForRemoved}${node.key}: ${value}`;
      }

      if (node.type === 'nested') {
        const value = iter(node.value, depth + 1);

        return `${indentForUnchanged}${node.key}: ${value}`;
      }

      const value = stringify(node.value1);

      return `${indentForUnchanged}${node.key}: ${value}`;
    });

    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };

  return iter(diffSchema, 1);
};

export default formatToStylish;
