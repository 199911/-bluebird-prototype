const Promise = require('bluebird');

const rejectAsync = (value) => {
  return Promise.reject(value);
}

module.exports = rejectAsync;
