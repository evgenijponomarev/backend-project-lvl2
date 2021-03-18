#! /usr/bin/env node

import { Command } from 'commander/esm.mjs';
import getPackageVersion from '../src/get-package-version.js';
import genDiff from '../index.js';

const version = getPackageVersion();
const program = new Command();
const mainAction = (filepath1, filepath2, { format }) => {
  try {
    const diff = genDiff(filepath1, filepath2, format);

    console.log(diff);
  } catch (e) {
    console.log('Error:', e.message);
  }
};

program
  .version(version, '-V, --version')
  .helpOption('-h, --help', 'output usage information')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <outputFormat>', 'output format', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action(mainAction)
  .parse();
