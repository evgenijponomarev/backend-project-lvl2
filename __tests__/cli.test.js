import Cli from '../src/cli.js';

test('Constructor', function() {
  const cli = new Cli();

  expect(cli).toBeInstanceOf(Cli);
});

test('getArguments', function() {
  const cli = new Cli();

  cli.init([...process.argv, 'arg1', 'arg2']);

  const args = cli.getArguments();

  expect(args).toHaveLength(2);
  expect(args).toContain('arg1');
  expect(args).toContain('arg2');
});
