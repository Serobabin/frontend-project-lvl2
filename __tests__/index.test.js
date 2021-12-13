import { fileURLToPath } from 'url';
import * as fs from 'fs';
import path from 'path';
import { test } from '@jest/globals';
import { genDiff } from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filepath) => fs.readFileSync(filepath, 'utf-8');
const filepath1 = getFixturePath('file1.json');
const filepath2 = getFixturePath('file2.json');
const filepath3 = getFixturePath('file1.yaml');
const filepath4 = getFixturePath('file2.yml');

test('testing genDiff', () => {
  const stylish = readFile(getFixturePath('stylish'));
  const plain = readFile(getFixturePath('plain'));
  const json = readFile(getFixturePath('json'));
  expect(genDiff(filepath1, filepath2)).toEqual(stylish);
  expect(genDiff(filepath3, filepath4)).toEqual(stylish);
  expect(genDiff(filepath1, filepath2, { format: 'plain' })).toEqual(plain);
  expect(genDiff(filepath3, filepath4, { format: 'plain' })).toEqual(plain);
  expect(genDiff(filepath1, filepath2, { format: 'json' })).toEqual(json);
  expect(genDiff(filepath3, filepath4, { format: 'json' })).toEqual(json);
});
