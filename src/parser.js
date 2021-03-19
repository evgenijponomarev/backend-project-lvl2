import jsYaml from 'js-yaml';

const parsers = {
  json: JSON.parse,
  yml: jsYaml.load,
};

const allowedFormats = Object.keys(parsers);

export default (data, format) => {
  const parser = parsers[format];

  if (!parser) throw new Error(`Unexpected format of data. Expected ${allowedFormats.join(' or ')}, recieved ${format}`);

  return parser(data);
};
