import yaml from 'js-yaml';

const parse = (data, dataFormat) => {
  switch (dataFormat) {
    case 'json':
      return JSON.parse(data);
    case 'yaml':
      return yaml.load(data);
    case 'yml':
      return yaml.load(data);
    default:
      throw new Error(`Unknown format: '${dataFormat}'!`);
  }
};
export default parse;
