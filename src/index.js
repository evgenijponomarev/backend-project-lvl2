import union from 'lodash/union.js';
import parse from './parser.js';
import formatDiff from './formatter.js';

function getObjectFieldDiff(obj1, obj2, key) {
  const issetIn1 = Object.prototype.hasOwnProperty.call(obj1, key);
  const issetIn2 = Object.prototype.hasOwnProperty.call(obj2, key);
  const result = {};

  if (issetIn1) result.currentValue = obj1[key];
  if (issetIn2) result.newValue = obj2[key];

  if (issetIn1 && !issetIn2) result.status = 'deleted';
  else if (!issetIn1 && issetIn2) result.status = 'added';
  else if (obj1[key] === obj2[key]) result.status = 'unchanged';
  else result.status = 'changed';

  return result;
}

function getObjectsDiff(obj1, obj2, format) {
  const obj1Keys = Object.keys(obj1);
  const obj2Keys = Object.keys(obj2);
  const allKeys = union(obj1Keys, obj2Keys);

  const diff = allKeys.reduce((acc, key) => ({
    ...acc,
    [key]: getObjectFieldDiff(obj1, obj2, key),
  }), {});

  return formatDiff(diff, format);
}

function getFilesDiff(filepath1, filepath2, format) {
  const obj1 = parse(filepath1);
  const obj2 = parse(filepath2);

  return getObjectsDiff(obj1, obj2, format);
}

export default getFilesDiff;
