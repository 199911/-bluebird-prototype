const Promise = require('bluebird');

const waitAsync = (time) => {
  return new Promise((resolve, reject) => {
    console.log(`start: ${time}`);
    setTimeout(() => {
      console.log(`start: ${end}`);
      resolve(time);
    }, time);
  });
}

module.exports = waitAsync;
