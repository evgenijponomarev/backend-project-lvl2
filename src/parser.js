import jsYaml from 'js-yaml';
import formats from './formats.js';

const parsers = {
  [formats.input.json]: JSON.parse,
  [formats.input.yml]: jsYaml.load,
};

export default (data, format) => {
  const parser = parsers[format];

  return parser(data);
};
