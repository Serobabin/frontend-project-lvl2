import { fileURLToPath } from 'url';
import { expect, test } from '@jest/globals';
import * as fs from 'fs';
import path from 'path';
// eslint-disable-next-line import/named
import { genDiff } from '../src/index.js';
import parse from '../src/parsers';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filepath) => fs.readFileSync(filepath, 'utf-8');
const getFormat = (filepath) => path.extname(filepath);
const filepath1 = getFixturePath('file1.json');
const filepath2 = getFixturePath('file2.json');
const filepath3 = getFixturePath('file1.yaml');
const filepath4 = getFixturePath('file2.yml');

test('testing genDiff', () => {
  const string = '{\n  - follow: false\n    host: hexlet.io\n  - proxy: 123.234.53.22\n  - timeout: 50\n  + timeout: 20\n  + verbose: true\n}';
  expect(genDiff(filepath1, filepath2)).toEqual(string);
});
test('testing parse', () => {
  const object = {
    host: 'hexlet.io',
    timeout: 50,
    proxy: '123.234.53.22',
    follow: false,
  };
  const data1 = readFile(filepath1);
  const format1 = getFormat(filepath1);
  expect(parse(data1, format1)).toEqual(object);
  const data2 = readFile(filepath3);
  const format2 = getFormat(filepath3);
  expect(parse(data2, format2)).toEqual(object);
  const data3 = readFile(filepath4);
  const format3 = getFormat(filepath4);
  expect(parse(data3, format3)).toEqual(object);
});
