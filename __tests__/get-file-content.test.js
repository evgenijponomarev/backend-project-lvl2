import getFileContent from '../src/get-file-content.js';

test('Returns correct data', function() {
  const expectation = `First string.
  Second string.
`;

  const fileContent = getFileContent('__fixtures__/simple-text.txt');

  expect(fileContent).toEqual(expectation);
});
