import * as fs from 'fs';
import path from 'path';
import parse from './parsers.js';
import buildTree from './buildTree.js';
import format from './formatters/index.js';

const makeData = (filepath) => {
  const fileContent = fs.readFileSync(filepath, 'utf-8');
  const dataFormat = path.extname(filepath).slice(1);
  return parse(fileContent, dataFormat);
};

export const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = makeData(filepath1);
  const data2 = makeData(filepath2);
  const tree = buildTree(data1, data2);
  return format(tree, formatName);
};
export default genDiff;
