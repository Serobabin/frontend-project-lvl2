import _ from 'lodash';

const getNodeName = (key) => key;

const getNodeValue = (object, key) => object[key];

const getNodeStatus = (key, object1, object2) => {
  const val1 = getNodeValue(object1, key);
  const val2 = getNodeValue(object2, key);
  if (!_.has(object1, key)) {
    return 'added';
  } if (!_.has(object2, key)) {
    return 'deleted';
  } if (_.isObject(val1) && _.isObject(val2) && (!_.isArray(val1) && !_.isArray(val2))) {
    return 'unchanged';
  } if (val1 !== val2) {
    return 'changed';
  }
  return 'unchanged';
};

const buildTree = (object1, object2) => {
  const iter = (obj1, obj2) => {
    const keys = _.union(_.keys(obj1), _.keys(obj2));
    const sortedKeys = _.sortBy(keys, (key) => key);
    return sortedKeys.map((key) => {
      const nodeName = getNodeName(key);
      const status = getNodeStatus(key, obj1, obj2);
      const val1 = getNodeValue(obj1, key);
      const val2 = getNodeValue(obj2, key);
      if ((_.isObject(val1) && _.isObject(val2)) && (!_.isArray(val1) && !_.isArray(val2))) {
        return {
          nodeName, status, children: iter(val1, val2),
        };
      } if (status !== 'changed' && status !== 'added') {
        return { nodeName, status, value: val1 };
      } if (status === 'added') {
        return { nodeName, status, value: val2 };
      }
      return {
        nodeName, status, oldValue: val1, value: val2,
      };
    });
  };
  return iter(object1, object2);
};
export default buildTree;
