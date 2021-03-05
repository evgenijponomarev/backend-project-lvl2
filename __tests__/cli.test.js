import cli from '../src/cli.js';
import { Command } from 'commander/esm.mjs';

let processArgs;

beforeAll(function() {
  processArgs = process.argv.slice(0, 2);
});

test('Init returns instance of programmator', function() {
  const program = cli.init(processArgs);

  expect(program).toBeInstanceOf(Command);
});

test('GetArguments returns passed arguments', function() {
  const args = ['arg1', 'arg2'];
  const program = cli.init([...processArgs, ...args]);
  const returnedArgs = cli.getProgramArguments(program);

  expect(returnedArgs).toHaveLength(2);
  expect(returnedArgs).toEqual(expect.arrayContaining(args));
});
