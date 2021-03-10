#! /usr/bin/env node

import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import cli from '../src/cli.js';
import getFilesDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const program = cli.init();
const args = cli.getArguments(program);

if (!args.length || args.length !== 2) {
  console.error('Error: unexpected count of arguments\n');
  cli.printHelp(program);
}

const [filepath1, filepath2] = args;
const fullpath1 = path.join(__dirname, '..', filepath1);
const fullpath2 = path.join(__dirname, '..', filepath2);
const diff = getFilesDiff(fullpath1, fullpath2, 'stylish');

console.log(diff);
