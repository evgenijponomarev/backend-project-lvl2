import { Command } from 'commander/esm.mjs';

export default {
  init() {
    const program = new Command();

    program.version('1.0.0', '-v, --version');

    program.parse();
  }
};
