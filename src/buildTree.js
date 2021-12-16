import _ from 'lodash';

const getNodeName = (key) => key;

const getNodeValue = (object, key) => object[key];

const buildTree = (data1, data2) => {
  const iter = (obj1, obj2) => {
    const keys = _.union(_.keys(obj1), _.keys(obj2));
    const sortedKeys = _.sortBy(keys, (key) => key);
    return sortedKeys.map((key) => {
      const nodeName = getNodeName(key);
      const val1 = getNodeValue(obj1, key);
      const val2 = getNodeValue(obj2, key);
      if ((_.isObject(val1) && _.isObject(val2)) && (!_.isArray(val1) && !_.isArray(val2))) {
        return {
          nodeName, status: 'nested', children: iter(val1, val2),
        };
      } if (!_.has(obj1, key)) {
        return { nodeName, status: 'added', value: val2 };
      } if (!_.has(obj2, key)) {
        return { nodeName, status: 'deleted', value: val1 };
      } if (val1 !== val2) {
        return {
          nodeName, status: 'changed', oldValue: val1, value: val2,
        };
      }
      return { nodeName, status: 'unchanged', value: val1 };
    });
  };
  return iter(data1, data2);
};
export default buildTree;
