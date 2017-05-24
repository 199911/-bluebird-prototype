const Promise = require('bluebird');
const resolveAsync = require('./resolveAsync');
const rejectAsync = require('./rejectAsync');
const waitAsync = require('./waitAsync');


// .then() error handler
// Why not using .catch()?
// rejectAsync('Some string to be thrown')
//   .then(
//     (data) => {
//       console.log(`fulfilled: ${data}`);
//     },
//     (err) => {
//       console.log(`error: ${err}`);
//     }
//   );
// Output: error: Some string to be thrown

// Promise.map(['OK', 'FAIL'], (data) => {
//   if (data == 'OK') {
//     return resolveAsync(data);
//   } else {
//     return rejectAsync(data);
//   }
// })
//   .then((data) => {
//     console.log(`fulfilled: ${data}`);
//   })
//   .catch((err) => {
//     console.log(`Error: ${err}`);
//   })
// Output: Error: FAIL

Promise.map(['OK', 'FAIL'], (data) => {
  if (data == 'OK') {
    return resolveAsync(data);
  } else {
    return rejectAsync(data).catch((err) => {
      console.log(`Caught: ${err}`);
      return err;
    });
  }
})
  .then((data) => {
    console.log(`fulfilled: ${data}`);
  })
  .catch((err) => {
    console.log(`Error: ${err}`);
  })
