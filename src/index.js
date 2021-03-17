import _ from 'lodash';

const { uniq, sortBy, isObject } = _;

const getObjectSchema = (obj) => {
  const entries = Object.entries(obj);

  return entries.reduce((acc, [key, value]) => [
    ...acc,
    {
      key,
      value: isObject(value) ? getObjectSchema(value) : value,
    },
  ], []);
};

const getDiffSchema = (obj1, obj2) => {
  const obj1Keys = Object.keys(obj1);
  const obj2Keys = Object.keys(obj2);
  const allKeys = sortBy(uniq([...obj1Keys, ...obj2Keys]));

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
};

export default getDiffSchema;
