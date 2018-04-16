const Promise = require('bluebird');

const getResolvePromise = () => Promise.resolve('resolved');
const getRejectPromise = () => Promise.reject(new Error('rejected'));

module.exports = { getResolvePromise, getRejectPromise };
