import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const getFormatterType = (formatName) => formatName.format;

const format = (tree, formatName) => {
  const formatterType = getFormatterType(formatName);
  if (formatterType === 'stylish') {
    return stylish(tree);
  } if (formatterType === 'plain') {
    return plain(tree);
  }
  return json(tree);
};
export default format;
