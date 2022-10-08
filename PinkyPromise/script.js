const PinkyPromise = require('./PinkyPromise');

const firstPromise = new PinkyPromise((resolve, reject) => {
    setTimeout(() => resolve('first promise MFFFF'), 1000);
});

firstPromise.then((result) => {
  console.log(result);
});