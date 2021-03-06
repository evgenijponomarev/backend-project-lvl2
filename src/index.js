import union from 'lodash/union.js';
import getFileContent from './get-file-content.js';

function formatDiffToStylish(diff) {
  const entries = Object.entries(diff);

  const result = entries.map(([key, value]) => {
    const resultLine = {
      unchanged: `    ${key}: ${value.newValue}`,
      added: `  + ${key}: ${value.newValue}`,
      deleted: `  - ${key}: ${value.currentValue}`,
      changed: [
        `  - ${key}: ${value.currentValue}`,
        `  + ${key}: ${value.newValue}`,
      ].join('\n'),
    };

    return resultLine[value.status];
  }).join('\n');

  return `{\n${result}\n}`;
}

function formatDiff(diff, format) {
  switch (format) {
    case 'stylish':
      return formatDiffToStylish(diff);

    default:
      return diff;
  }
}

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

function getJsonDiff(json1, json2, format) {
  const obj1 = JSON.parse(json1);
  const obj2 = JSON.parse(json2);

  return getObjectsDiff(obj1, obj2, format);
}

function getFilesDiff(filepath1, filepath2, format) {
  const file1Content = getFileContent(filepath1);
  const file2Content = getFileContent(filepath2);

  return getJsonDiff(file1Content, file2Content, format);
}

export {
  getFilesDiff,
  getJsonDiff,
  getObjectsDiff,
};
