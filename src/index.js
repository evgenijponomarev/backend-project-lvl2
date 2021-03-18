import _ from 'lodash';

const { uniq, sortBy, isObject } = _;

const getDiffSchema = (obj1, obj2) => {
  const obj1Keys = Object.keys(obj1);
  const obj2Keys = Object.keys(obj2);
  const allKeys = sortBy(uniq([...obj1Keys, ...obj2Keys]));

  return allKeys.map((key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];

    if (isObject(value1) && isObject(value2)) {
      return {
        key,
        value: getDiffSchema(value1, value2),
      };
    }

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
        value: isObject(value2) ? getDiffSchema(value2, value2) : value2,
      };
    }

    if (!obj2Keys.includes(key)) {
      return {
        status: 'removed',
        key,
        value: isObject(value1) ? getDiffSchema(value1, value1) : value1,
      };
    }

    return {
      status: 'changed',
      key,
      value: {
        old: isObject(value1) ? getDiffSchema(value1, value1) : value1,
        new: isObject(value2) ? getDiffSchema(value2, value2) : value2,
      },
    };
  });
};

export default getDiffSchema;
