import _ from 'lodash';

const getValue = (node) => node.value;

const getOldValue = (node) => node.oldValue;

const getStatus = (node) => node.status;

const getChildren = (node) => node.children.slice();

const getName = (node) => node.nodeName;

const getOperations = (node) => {
  const status = getStatus(node);
  if (status === 'deleted') {
    return { firstOperation: '- ' };
  } if (status === 'added') {
    return { firstOperation: '+ ' };
  } if (status === 'unchanged') {
    return { firstOperation: '  ' };
  }
  return { firstOperation: '- ', secondOperation: '+ ' };
};

const stringify = (value, indent, spacesCount) => {
  const iter = (currentValue, depth) => {
    if (typeof currentValue !== 'object' || currentValue === null) {
      return String(currentValue);
    }
    const indentSize = depth;
    const currentIndent = indent.repeat(indentSize);
    const bracketIndent = indent.repeat(indentSize - 4);
    const lines = Object
      .entries(currentValue)
      .map(([key, val]) => `${currentIndent}${key}: ${iter(val, depth + 4)}`);
    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };
  return iter(value, spacesCount + 6);
};

const stylish = (tree) => {
  const iter = (nodes, indentSize) => {
    const indent = ' ';
    const currentIndent = indent.repeat(indentSize);
    const lines = nodes.map((node) => {
      const name = getName(node);
      const status = getStatus(node);
      const value = getValue(node);
      const operations = getOperations(node);
      const { firstOperation } = operations;
      if (!_.has(node, 'children')) {
        if (status !== 'changed') {
          return `${currentIndent}${firstOperation}${name}: ${stringify(value, indent, indentSize)}`;
        }
        const { secondOperation } = operations;
        const oldValue = getOldValue(node);
        return `${currentIndent}${firstOperation}${name}: ${stringify(value, indent, indentSize)}\n${currentIndent}${secondOperation}${name}: ${stringify(oldValue, indent, indentSize)}`;
      }
      const children = getChildren(node);
      return `${currentIndent}${firstOperation}${name}: ${iter(children, indentSize + 4)}`;
    });
    const bracketIndent = indent.repeat(indentSize - 2);
    return ['{', ...lines, `${bracketIndent}}`].join('\n');
  };
  return iter(tree, 2);
};
export default stylish;
