import * as fs from 'fs';
import path from 'path';
import parse from './parsers.js';
import buildTree from './buildTree.js';
import format from './formatters/index.js';

const makeObject = (filepath) => {
  const data = fs.readFileSync(filepath, 'utf-8');
  const extname = path.extname(filepath);
  const object = parse(data, extname);
  return object;
};

export const genDiff = (filepath1, filepath2, formatName = { format: 'stylish' }) => {
  const object1 = makeObject(filepath1);
  const object2 = makeObject(filepath2);
  const tree = buildTree(object1, object2);
  return format(tree, formatName);
};
export default genDiff;
