import union from 'lodash/union';
import getFileContent from './get-file-content.js';

function getFilesDiff(filepath1, filepath2) {
  const file1Content = getFileContent(filepath1);
  const file2Content = getFileContent(filepath2);

  return getJsonDiff(file1Content, file2Content);
}

function getJsonDiff(json1 = '', json2 = '') {
  const obj1 = JSON.parse(json1);
  const obj2 = JSON.parse(json2);

  return getObjectsDiff(obj1, obj2);
}

function getObjectsDiff(obj1 = {}, obj2 = {}) {
  const obj1Keys = Object.keys(obj1);
  const obj2Keys = Object.keys(obj2);
  const allKeys = union(obj1Keys, obj2Keys);

  return allKeys.reduce((acc, key) => ({
    ...acc,
    [key]: getObjectKeyDiff(obj1, obj2, key),
  }), {});
}

function getObjectKeyDiff(obj1, obj2, key) {
  const issetIn1 = obj1.hasOwnProperty(key);
  const issetIn2 = obj2.hasOwnProperty(key);
  const result = {};

  if (issetIn1) result.currentValue = obj1[key];
  if (issetIn2) result.newValue = obj2[key];

  if (issetIn1 && !issetIn2) result.status = 'deleted';
  else if (!issetIn1 && issetIn2) result.status = 'added';
  else if (obj1[key] === obj2[key]) result.status = 'unchanged';
  else result.status = 'changed';

  return result;
}

export {
  getFilesDiff,
  getJsonDiff,
  getObjectsDiff,
};
