import _ from 'lodash';

const { uniq, sortBy, isObject } = _;

const getDiffSchema = (obj1, obj2) => {
  if (!isObject(obj1) && obj1 === obj2) return obj1;

  const obj1Keys = Object.keys(obj1);
  const obj2Keys = Object.keys(obj2);
  const allKeys = sortBy(uniq([...obj1Keys, ...obj2Keys]));

  return allKeys.map((key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];

    if (!obj1Keys.includes(key)) {
      return {
        type: 'added',
        key,
        value: getDiffSchema(value2, value2),
      };
    }

    if (!obj2Keys.includes(key)) {
      return {
        type: 'removed',
        key,
        value: getDiffSchema(value1, value1),
      };
    }

    if (isObject(value1) && isObject(value2)) {
      return {
        type: 'nested',
        key,
        value: getDiffSchema(value1, value2),
      };
    }

    if (value1 !== value2) {
      return {
        type: 'changed',
        key,
        value: {
          old: getDiffSchema(value1, value1),
          new: getDiffSchema(value2, value2),
        },
      };
    }

    return {
      type: 'unchanged',
      key,
      value: value1,
    };
  });
};

export default getDiffSchema;
