#! /usr/bin/env node

import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { Command } from 'commander/esm.mjs';
import parseFile from '../src/parser.js';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const configPath = path.join(__dirname, '..', 'package.json');
const { version } = parseFile(configPath);
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
