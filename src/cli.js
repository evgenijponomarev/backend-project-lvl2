import { Command } from 'commander/esm.mjs';

import getFileContent from './get-file-content.js';

function getVersionFromPackageJson() {
  const packageJsonContent = getFileContent('package.json');
  const { version } = JSON.parse(packageJsonContent);

  return version;
}

function init(args) {
  const version = getVersionFromPackageJson();
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

function getProgramArguments(program) {
  return program.args;
}

export default {
  init,
  getProgramArguments,
};
