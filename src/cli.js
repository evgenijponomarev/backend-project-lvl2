import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { Command } from 'commander/esm.mjs';
import parse from './parser.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function getPackageVersion(configPath) {
  const { version } = parse(configPath);

  return version;
}

function init(args) {
  const configPath = path.join(__dirname, '..', 'package.json');
  const version = getPackageVersion(configPath);
  const program = new Command();

  program
    .version(version, '-V, --version')
    .helpOption('-h, --help', 'output usage information')
    .description('Compares two configuration files and shows a difference.')
    .arguments('<filepath1> <filepath2>')
    .option('-f, --format', 'output format')
    .parse(args);

  return program;
}

function getArguments(program) {
  return program.args;
}

function printHelp(program) {
  program.help();
}

export default {
  init,
  getArguments,
  printHelp,
};
