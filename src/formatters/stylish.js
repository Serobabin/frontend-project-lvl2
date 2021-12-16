const getOperations = (node) => {
  const { status } = node;
  if (status === 'deleted') {
    return { firstOperation: '- ' };
  } if (status === 'added') {
    return { firstOperation: '+ ' };
  } if (status === 'unchanged' || status === 'nested') {
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
      const { nodeName } = node;
      const { status } = node;
      const { value } = node;
      const operations = getOperations(node);
      const { firstOperation } = operations;
      if (status !== 'nested') {
        if (status !== 'changed') {
          return `${currentIndent}${firstOperation}${nodeName}: ${stringify(value, indent, indentSize)}`;
        }
        const { secondOperation } = operations;
        const { oldValue } = node;
        return `${currentIndent}${firstOperation}${nodeName}: ${stringify(oldValue, indent, indentSize)}\n${currentIndent}${secondOperation}${nodeName}: ${stringify(value, indent, indentSize)}`;
      }
      const children = node.children.slice();
      return `${currentIndent}${firstOperation}${nodeName}: ${iter(children, indentSize + 4)}`;
    });
    const bracketIndent = indent.repeat(indentSize - 2);
    return ['{', ...lines, `${bracketIndent}}`].join('\n');
  };
  return iter(tree, 2);
};
export default stylish;
