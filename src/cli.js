import fs from 'fs';
import { Command } from 'commander/esm.mjs';

export default class Cli {
  static getAppVersion() {
    const { version } = JSON.parse(fs.readFileSync('package.json', 'utf8'));

    return version;
  }

  constructor() {
    const version = this.constructor.getAppVersion();

    const program = new Command();

    program.version(version, '-v, --version');

    program.parse();
  }
};
