import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import { describe, test, expect } from '@jest/globals';
import getFilesDiff from '../src/index';

import diffTree from '../__fixtures__/diff-tree';
import diffStylish from '../__fixtures__/diff-stylish';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe('Compare json', () => {
  const filepath1 = path.join(__dirname, '..', '__fixtures__/file1.json');
  const filepath2 = path.join(__dirname, '..', '__fixtures__/file2.json');

  test('Plain object format', () => {
    const diff = getFilesDiff(filepath1, filepath2, 'schema');
    expect(diff).toEqual(diffTree);
  });

  test('Stylish format', () => {
    const diff = getFilesDiff(filepath1, filepath2);
    expect(diff).toEqual(diffStylish);
  });
});

describe('Compare yaml', () => {
  const filepath1 = path.join(__dirname, '..', '__fixtures__/file1.yml');
  const filepath2 = path.join(__dirname, '..', '__fixtures__/file2.yml');

  test('Plain object format', () => {
    const diff = getFilesDiff(filepath1, filepath2, 'schema');
    expect(diff).toEqual(diffTree);
  });

  test('Stylish format', () => {
    const diff = getFilesDiff(filepath1, filepath2);
    expect(diff).toEqual(diffStylish);
  });
});
