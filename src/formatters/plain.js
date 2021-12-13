import _ from 'lodash';
import {
  getName, getStatus, getValue, getOldValue, getChildren,
} from './myFunctions.js';

const normailizeValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  } if (_.isString(value)) {
    return `'${value}'`;
  }
  return `${value}`;
};

const plain = (tree) => {
  const iter = (nodes, path) => {
    const lines = nodes.flatMap((node) => {
      const name = getName(node);
      const status = getStatus(node);
      const value = getValue(node);
      if (!_.has(node, 'children')) {
        if (status === 'unchanged') {
          return [];
        }
        if (status === 'added') {
          return `Property '${path}${name}' was added with value: ${normailizeValue(value)}`;
        } if (status === 'deleted') {
          return `Property '${path}${name}' was removed`;
        } if (status === 'changed') {
          const oldValue = getOldValue(node);
          return `Property '${path}${name}' was updated. From ${normailizeValue(oldValue)} to ${normailizeValue(value)}`;
        }
      }
      const children = getChildren(node);
      const newPath = `${path}${name}.`;
      return iter(children, newPath);
    });
    return lines.join('\n');
  };
  return iter(tree, '');
};
export default plain;
