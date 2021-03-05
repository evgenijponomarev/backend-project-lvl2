import { test, expect } from '@jest/globals';

import getFileContent from '../src/get-file-content.js';

test('Returns correct data', () => {
  const expectation = `First string.
  Second string.
`;

  const fileContent = getFileContent('__fixtures__/simple-text.txt');

  expect(fileContent).toEqual(expectation);
});
