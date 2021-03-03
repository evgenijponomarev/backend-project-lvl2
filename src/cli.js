import fs from 'fs';

import { Command } from 'commander/esm.mjs';

export default class Cli {
  static getPackageVersion() {
    const { version } = JSON.parse(fs.readFileSync('package.json', 'utf8'));

    return version;
  }

  constructor() {
    const version = this.constructor.getPackageVersion();

    this.program = new Command();

    this.setVersion(version);
    this.setHelpCommand();
    this.setDescription();
    this.setArguments();
    this.setOptions();
  }

  setVersion(version) {
    this.program.version(version, '-V, --version');
  }

  setHelpCommand() {
    this.program.helpOption('-h, --help', 'output usage information');
  }

  setArguments() {
    this.program.arguments('<filepath1> <filepath2>');
  }

  setDescription() {
    this.program.description('Compares two configuration files and shows a difference.');
  }

  setOptions() {
    this.program.option('-f, --format', 'output format');
  }

  init() {
    this.program.parse();
  }
};
