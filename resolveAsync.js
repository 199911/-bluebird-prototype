const Promise = require('bluebird');

const resolveAsync = (value) => {
  return Promise.resolve(value);
}

module.exports = resolveAsync;
