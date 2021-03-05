import { describe, test, expect } from '@jest/globals';

import {
  getObjectsDiff,
  getJsonDiff,
  getFilesDiff,
} from '../src/index';

import {
  obj1,
  obj2,
  obj3,
  obj4,
  obj5,
  obj6,
} from '../__fixtures__/sample-objects';

const expectation1 = {
  field1: {
    status: 'unchanged',
    currentValue: 'value1',
    newValue: 'value1',
  },
  field2: {
    status: 'changed',
    currentValue: 'value2',
    newValue: 'value2 changed',
  },
  field3: {
    status: 'deleted',
    currentValue: 'value3',
  },
  field4: {
    status: 'added',
    newValue: 'value4',
  },
};

const expectation2 = {
  field1: {
    status: 'changed',
    currentValue: undefined,
    newValue: 'value1',
  },
  field2: {
    status: 'changed',
    currentValue: 'value2',
    newValue: undefined,
  },
  field3: {
    status: 'deleted',
    currentValue: undefined,
  },
  field4: {
    status: 'added',
    currentValue: undefined,
  },
};

const expectation3 = {
  toString: {
    status: 'deleted',
    currentValue: 'not function',
  },
  field1: {
    status: 'added',
    newValue: 'value1',
  },
};

const stylishFormattedExpectation = `{
    field1: value1
  - field2: value2
  + field2: value2 changed
  - field3: value3
  + field4: value4
}`;

describe('Compare objects', () => {
  test('Flat', () => {
    const diff = getObjectsDiff(obj1, obj2);

    expect(diff).toEqual(expectation1);
  });

  test('Undefined value in field', () => {
    const diff = getObjectsDiff(obj3, obj4);

    expect(diff).toEqual(expectation2);
  });

  test('prototype field override', () => {
    const diff = getObjectsDiff(obj5, obj6);

    expect(diff).toEqual(expectation3);
  });
});

describe('Compare json', () => {
  test('Flat', () => {
    const json1 = JSON.stringify(obj1);
    const json2 = JSON.stringify(obj2);

    const diff = getJsonDiff(json1, json2);

    expect(diff).toEqual(expectation1);
  });
});

describe('Compare json files', () => {
  test('Flat', () => {
    const filepath1 = '__fixtures__/sample1.json';
    const filepath2 = '__fixtures__/sample2.json';

    const diff = getFilesDiff(filepath1, filepath2);

    expect(diff).toEqual(expectation1);
  });
});

describe('Compare files with format result', () => {
  test('Flat', () => {
    const filepath1 = '__fixtures__/sample1.json';
    const filepath2 = '__fixtures__/sample2.json';

    const diff = getFilesDiff(filepath1, filepath2, 'stylish');

    expect(diff).toEqual(stylishFormattedExpectation);
  });
});