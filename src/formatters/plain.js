import _ from 'lodash';

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
      const { nodeName } = node;
      const { status } = node;
      const { value } = node;
      if (status !== 'nested') {
        if (status === 'unchanged') {
          return [];
        }
        if (status === 'added') {
          return `Property '${path}${nodeName}' was added with value: ${normailizeValue(value)}`;
        } if (status === 'deleted') {
          return `Property '${path}${nodeName}' was removed`;
        } if (status === 'changed') {
          const { oldValue } = node;
          return `Property '${path}${nodeName}' was updated. From ${normailizeValue(oldValue)} to ${normailizeValue(value)}`;
        }
      }
      const children = node.children.slice();
      const newPath = `${path}${nodeName}.`;
      return iter(children, newPath);
    });
    return lines.join('\n');
  };
  return iter(tree, '');
};
export default plain;
