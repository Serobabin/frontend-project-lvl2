import stylish from './stylish.js';
import plain from './plain.js';

const getFormatterType = (formatName) => formatName.format;

const format = (tree, formatName) => {
  const formatterType = getFormatterType(formatName);
  if (formatterType === 'stylish') {
    return stylish(tree);
  }
  return plain(tree);
};
export default format;
