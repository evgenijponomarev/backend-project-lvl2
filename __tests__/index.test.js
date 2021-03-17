import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import { describe, test, expect } from '@jest/globals';
import genDiff from '../index';

import diffJson from '../__fixtures__/diff-json';
import diffStylish from '../__fixtures__/diff-stylish';
import diffPlain from '../__fixtures__/diff-plain';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe.each(['json', 'yml'])('Compare %p', (ext) => {
  const filepath1 = path.join(__dirname, '..', '__fixtures__', `file1.${ext}`);
  const filepath2 = path.join(__dirname, '..', '__fixtures__', `file2.${ext}`);

  test.each([
    ['stylish', diffStylish],
    ['plain', diffPlain],
    ['json', diffJson],
  ])('%p format', (format, expectation) => {
    const diff = genDiff(filepath1, filepath2, format);
    expect(diff).toEqual(expectation);
  });
});
