import _ from 'lodash';

const { isArray, isObject } = _;

const indent = ' ';
const indentSize = 2;

const stringify = (node, lineIndentSize, bracketIndentSize) => {
  if (!isObject(node)) return node;

  const lines = Object.entries(node)
    .map(([entryKey, entryValue]) => {
      const nestedIndentSize = lineIndentSize + indentSize * 2;
      const nestedBracketSize = bracketIndentSize + indentSize * 2;
      const value = stringify(entryValue, nestedIndentSize, nestedBracketSize);

      return `${indent.repeat(lineIndentSize)}${entryKey}: ${value}`;
    });

  return [
    '{',
    ...lines,
    `${indent.repeat(bracketIndentSize)}}`,
  ].join('\n');
};

const formatToStylish = (diffSchema) => {
  const iter = (schema, depth) => {
    const currentIndentSize = indentSize * depth;
    const currentIndent = indent.repeat(currentIndentSize);

    if (!isArray(schema)) return schema;

    const bracketIndent = indent.repeat(currentIndentSize - indentSize);

    const lines = schema.flatMap((node) => {
      const nestedIndendSize = currentIndentSize + indentSize * 3;
      const nestedBracketSize = currentIndentSize + indentSize;

      if (node.type === 'changed') {
        return [
          [node.value1, '-'],
          [node.value2, '+'],
        ].map(([nodeValue, sign]) => {
          const value = stringify(
            nodeValue,
            nestedIndendSize,
            nestedBracketSize,
          );

          return `${currentIndent}${sign} ${node.key}: ${value}`;
        });
      }

      if (node.type === 'added') {
        const value = stringify(
          node.value2,
          nestedIndendSize,
          nestedBracketSize,
        );

        return `${currentIndent}+ ${node.key}: ${value}`;
      }

      if (node.type === 'removed') {
        const value = stringify(
          node.value1,
          nestedIndendSize,
          nestedBracketSize,
        );

        return `${currentIndent}- ${node.key}: ${value}`;
      }

      if (node.type === 'nested') {
        const value = iter(node.value, depth + indentSize);

        return `${currentIndent}  ${node.key}: ${value}`;
      }

      const value = stringify(node.value1);

      return `${currentIndent}  ${node.key}: ${value}`;
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
