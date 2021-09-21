import yaml from 'js-yaml';

const parse = (data, format) => {
  if (format === '.yaml' || format === '.yml') {
    return yaml.load(data);
  }
  return JSON.parse(data);
};

export default parse;
