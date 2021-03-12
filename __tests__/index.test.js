import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import { describe, test, expect } from '@jest/globals';
import getFilesDiff from '../src/index';

import diffSchema from '../__fixtures__/diff-schema';
import diffStylish from '../__fixtures__/diff-stylish';
import diffPlain from '../__fixtures__/diff-plain';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe('Compare json', () => {
  const filepath1 = path.join(__dirname, '..', '__fixtures__/file1.json');
  const filepath2 = path.join(__dirname, '..', '__fixtures__/file2.json');

  test('Plain object format', () => {
    const diff = getFilesDiff(filepath1, filepath2, 'schema');
    expect(diff).toEqual(diffSchema);
  });

  test('Stylish format', () => {
    const diff = getFilesDiff(filepath1, filepath2);
    expect(diff).toEqual(diffStylish);
  });

  test.skip('Plain format', () => {
    const diff = getFilesDiff(filepath1, filepath2, 'plain');
    expect(diff).toEqual(diffPlain);
  });
});

describe('Compare yaml', () => {
  const filepath1 = path.join(__dirname, '..', '__fixtures__/file1.yml');
  const filepath2 = path.join(__dirname, '..', '__fixtures__/file2.yml');

  test('Plain object format', () => {
    const diff = getFilesDiff(filepath1, filepath2, 'schema');
    expect(diff).toEqual(diffSchema);
  });

  test('Stylish format', () => {
    const diff = getFilesDiff(filepath1, filepath2);
    expect(diff).toEqual(diffStylish);
  });

  test.skip('Plain format', () => {
    const diff = getFilesDiff(filepath1, filepath2, 'plain');
    expect(diff).toEqual(diffPlain);
  });
});
