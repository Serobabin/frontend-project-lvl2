import stylish from './formatters/stylish.js';

const getFormatterType = (type) => type.format;
const format = (tree, type) => {
  const formatterType = getFormatterType(type);
  if (formatterType === 'stylish') {
    return stylish(tree);
  }
  return stylish(tree);
};
export default format;
