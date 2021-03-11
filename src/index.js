import uniq from 'lodash/uniq.js';
import isObject from 'lodash/isObject.js';
import isArray from 'lodash/isArray.js';
import parse from './parser.js';
import formatDiff from './formatters.js';

function getObjectSchema(obj) {
  return Object.entries(obj).reduce((acc, [key, value]) => [
    ...acc,
    {
      key,
      value: isObject(value) ? getObjectSchema(value) : value,
    },
  ], []);
}

function getDiffSchema(schema1, schema2) {
  const schema1Keys = schema1.map(({ key }) => key);
  const schema2Keys = schema2.map(({ key }) => key);
  const allKeys = uniq([...schema1Keys, ...schema2Keys]).sort();

  return allKeys.flatMap((key) => {
    const schema1Field = schema1.find((field) => field.key === key);
    const schema2Field = schema2.find((field) => field.key === key);

    if (!schema1Field) {
      return {
        process: 'add',
        ...schema2Field,
      };
    }

    if (!schema2Field) {
      return {
        process: 'del',
        ...schema1Field,
      };
    }

    if (schema1Field.value === schema2Field.value) {
      return schema1Field;
    }

    if (isArray(schema1Field.value) && isArray(schema2Field.value)) {
      return {
        ...schema1Field,
        value: getDiffSchema(schema1Field.value, schema2Field.value),
      };
    }

    return [
      {
        process: 'del',
        ...schema1Field,
      },
      {
        process: 'add',
        ...schema2Field,
      },
    ];
  });
}

function getObjectsDiff(obj1, obj2, format) {
  const schema1 = getObjectSchema(obj1);
  const schema2 = getObjectSchema(obj2);
  const diffSchema = getDiffSchema(schema1, schema2);

  return formatDiff(diffSchema, format);
}

function getFilesDiff(filepath1, filepath2, format) {
  const obj1 = parse(filepath1);
  const obj2 = parse(filepath2);

  return getObjectsDiff(obj1, obj2, format);
}

export default getFilesDiff;
