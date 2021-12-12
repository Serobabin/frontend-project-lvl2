import yaml from 'js-yaml';

const parse = (data, extname) => {
  if (extname === '.yaml' || extname === '.yml') {
    return yaml.load(data);
  }
  return JSON.parse(data);
};

export default parse;
