const Promise = require('bluebird');

const getResolvePromise = value => Promise.resolve(value);
const getRejectPromise = value => Promise.reject(value);

module.exports = { getResolvePromise, getRejectPromise };
