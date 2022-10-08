//you tell me what you need to do.. if there's something you need to do and you don't want to block the stack.. the fact that the promise object is returned is what unblocks the stack. you can call some function or do some work that may take some time and keep the stack executing to the next context
//here's an object, you can plan what you want to do using this object now and I promise to get the data you're asking for and do the stuff you need to do with it. and if anything goes wrong, you can plan for that too and i'll let you know

const PinkyPromise = function (workFromClient) {
  this.state = 'PENDING';
  this.answer = null;
  this.reason = null;
  this.successHandlers = [];
  this.errorHandlers = [];

  execute(workFromClient, this);
};

PinkyPromise.prototype.then = function (onFulfilled, onRejected) {
  if (this.state === 'FULFILLED') {
    onFulfilled(this.answer);
  } else if(this.state === 'PENDING') {
    this.successHandlers.push(onFulfilled);
  }
  else {
    this.errorHandlers.push(onRejected);
  }
};

function resolve(answer, promise) {
  promise.state = 'FULFILLED';
  promise.answer = answer;
  if(promise.successHandlers.length > 0) {
    promise.successHandlers.forEach((fn) => {
      fn(promise.answer);
    })
  }
}

function reject(reason, promise) {
  promise.state = 'REJECTED';
  promise.reason = reason;
}

function caller(workToDo, resolveCallback, rejectCallback) {
  try {
    workToDo(resolveCallback, rejectCallback);
  } catch(e) {
    rejectCallback(e);
  }
}

function execute(workFromClient, promise) {
  try {
    caller(workFromClient,
      (answer) => {
        resolve(answer, promise) ;
      },
      (reason) => {
        reject(reason, promise);
      })
  } catch (e) {
    reject(e);
  }
}

module.exports = PinkyPromise;



// tryCallTwo(fn/*workFromClient*/, function (value) {
//   if (done) return;
//   done = true;
//   resolve(promise, value);
// }, function (reason) {
//   if (done) return;
//   done = true;
//   reject(promise, reason);
// });


// workFromClient has finished.. instead of passing the resolve function directly into workFromClient, 
// (which you can't pass in the promise this way).. you wrap the resolve function in a function, pass that function as a callback to a caller function with the workFromClient,
// and use the caller function to run the workFromClient with the resolve callback and reject callback
// function (value) {
//   if (done) return;
//   done = true;
//   resolve(promise, value);
// }


// function (reason) {
//   if (done) return;
//   done = true;
//   reject(promise, reason);
// }