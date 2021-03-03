import fs from 'fs';
import { Command } from 'commander/esm.mjs';

export default class Cli {
  static getAppVersion() {
    const { version } = JSON.parse(fs.readFileSync('package.json', 'utf8'));

    return version;
  }

  constructor() {
    const version = this.constructor.getAppVersion();

    this.program = new Command();

    this.setVersion(version);
    this.setArguments();
  }

  setVersion(version) {
    this.program.version(version, '-V, --version');
  }

  setArguments() {
    this.program
      .arguments('<filepath1> <filepath2>')
      .description('Compares two configuration files and shows a difference.');
  }

  init() {
    this.program.parse();
  }
};
