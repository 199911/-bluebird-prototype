const Promise = require('bluebird');

const rejectAsync = value => Promise.reject(value);

const resolveAsync = value => Promise.resolve(value);

const waitAsync = time => new Promise((resolve) => {
  setTimeout(() => {
    resolve(time);
  }, time);
});

module.exports = { rejectAsync, resolveAsync, waitAsync };
