import jsYaml from 'js-yaml';

const parsers = {
  json: JSON.parse,
  yml: jsYaml.load,
};

export default (data, format) => {
  const parser = parsers[format];

  if (!parser) throw new Error(`Unexpected format of file. Expected json or yml, recieved ${format}`);

  return parser(data);
};
