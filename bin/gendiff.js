#! /usr/bin/env node

import cli from '../src/cli.js';
import getFilesDiff from '../src/index.js';

const program = cli.init();
const [filepath1, filepath2] = cli.getProgramArguments(program);
const diff = getFilesDiff(filepath1, filepath2, 'stylish');

console.log(diff);
