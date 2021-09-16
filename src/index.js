import * as fs from 'fs';
import _ from 'lodash';

const genDiff = (filepath1, filepath2) => {
  const object1 = JSON.parse(fs.readFileSync(filepath1, "utf8"));
  const object2 = JSON.parse(fs.readFileSync(filepath2, "utf8"));
  const keys = _.union(_.keys(object1), _.keys(object2));
  const sortedKeys = _.sortBy(keys, (key) => key);
  const result = sortedKeys.reduce((acc, key) => {
    if (_.has(object1, key) && _.has(object2, key)) {
      if (object1[key] === object2[key]) {
          return acc.concat([`    ${key}: ${object2[key]}`]);
      } else {
      return acc.concat([`  - ${key}: ${object1[key]}`]).concat([`  + ${key}: ${object2[key]}`]);
      }
  } 
  return (_.has(object1, key)) ? acc.concat([`  - ${key}: ${object1[key]}`]) : acc.concat([`  + ${key}: ${object2[key]}`]);
  }, []);
  return `{\n${result.join('\n')}\n}`;
};

export default genDiff;
