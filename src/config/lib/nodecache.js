const NodeCache = require('node-cache');
const cache = new NodeCache();

const getValue = key => {
  return process.env[key] || cache.get(key);
};

const setValue = (key, value) => {
  cache.set(key, value);
};

const getAllKeys = () => {
  return cache.keys();
};

exports.getValue = getValue;
exports.setValue = setValue;
exports.getAllKeys = getAllKeys;
