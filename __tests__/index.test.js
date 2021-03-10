import { describe, test, expect } from '@jest/globals';
import getFilesDiff from '../src/index';

import diffTree from '../__fixtures__/diff-tree';
import diffStylish from '../__fixtures__/diff-stylish';

describe('Compare json', () => {
  const filepath1 = '__fixtures__/sample1.json';
  const filepath2 = '__fixtures__/sample2.json';

  test('Plain object format', () => {
    const diff = getFilesDiff(filepath1, filepath2);
    expect(diff).toEqual(diffTree);
  });

  test('Stylish format', () => {
    const diff = getFilesDiff(filepath1, filepath2, 'stylish');
    expect(diff).toEqual(diffStylish);
  });
});

describe('Compare yaml', () => {
  const filepath1 = '__fixtures__/sample1.yml';
  const filepath2 = '__fixtures__/sample2.yml';

  test('Plain object format', () => {
    const diff = getFilesDiff(filepath1, filepath2);
    expect(diff).toEqual(diffTree);
  });

  test('Stylish format', () => {
    const diff = getFilesDiff(filepath1, filepath2, 'stylish');
    expect(diff).toEqual(diffStylish);
  });
});
