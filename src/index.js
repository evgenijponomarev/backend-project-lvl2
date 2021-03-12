import uniq from 'lodash/uniq.js';
import isObject from 'lodash/isObject.js';
import parse from './parser.js';
import formatDiff from './formatters/index.js';

function getObjectSchema(obj) {
  return Object.entries(obj).reduce((acc, [key, value]) => [
    ...acc,
    {
      key,
      value: isObject(value) ? getObjectSchema(value) : value,
    },
  ], []);
}

function getDiffSchema(obj1, obj2) {
  const obj1Keys = Object.keys(obj1);
  const obj2Keys = Object.keys(obj2);
  const allKeys = uniq([...obj1Keys, ...obj2Keys]).sort();

  return allKeys.map((key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];

    if (value1 === value2) {
      return {
        key,
        value: value1,
      };
    }

    if (!obj1Keys.includes(key)) {
      return {
        status: 'added',
        key,
        value: isObject(value2) ? getObjectSchema(value2) : value2,
      };
    }

    if (!obj2Keys.includes(key)) {
      return {
        status: 'removed',
        key,
        value: isObject(value1) ? getObjectSchema(value1) : value1,
      };
    }

    if (isObject(value1) && isObject(value2)) {
      return {
        key,
        value: getDiffSchema(value1, value2),
      };
    }

    return {
      status: 'changed',
      key,
      value: {
        old: isObject(value1) ? getObjectSchema(value1) : value1,
        new: isObject(value2) ? getObjectSchema(value2) : value2,
      },
    };
  });
}

function getFilesDiff(filepath1, filepath2, format) {
  const obj1 = parse(filepath1);
  const obj2 = parse(filepath2);
  const diffSchema = getDiffSchema(obj1, obj2);

  return formatDiff(diffSchema, format);
}

export default getFilesDiff;
