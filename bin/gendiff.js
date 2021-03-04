#! /usr/bin/env node

import Cli from '../src/cli.js';

const cli = new Cli();

cli.init(process.argv);
