import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import { describe, test, expect } from '@jest/globals';
import genDiff from '../src/index';

import diffJson from '../__fixtures__/diff-json';
import diffStylish from '../__fixtures__/diff-stylish';
import diffPlain from '../__fixtures__/diff-plain';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe('Compare json', () => {
  const filepath1 = path.join(__dirname, '..', '__fixtures__', 'file1.json');
  const filepath2 = path.join(__dirname, '..', '__fixtures__', 'file2.json');

  test('Stylish format', () => {
    const diff = genDiff(filepath1, filepath2, 'stylish');
    expect(diff).toEqual(diffStylish);
  });

  test('Plain format', () => {
    const diff = genDiff(filepath1, filepath2, 'plain');
    expect(diff).toEqual(diffPlain);
  });

  test('Json format', () => {
    const diff = genDiff(filepath1, filepath2, 'json');
    expect(diff).toEqual(diffJson);
  });
});

describe('Compare yaml', () => {
  const filepath1 = path.join(__dirname, '..', '__fixtures__', 'file1.yml');
  const filepath2 = path.join(__dirname, '..', '__fixtures__', 'file2.yml');

  test('Stylish format', () => {
    const diff = genDiff(filepath1, filepath2, 'stylish');
    expect(diff).toEqual(diffStylish);
  });

  test('Plain format', () => {
    const diff = genDiff(filepath1, filepath2, 'plain');
    expect(diff).toEqual(diffPlain);
  });

  test('Json format', () => {
    const diff = genDiff(filepath1, filepath2, 'json');
    expect(diff).toEqual(diffJson);
  });
});
