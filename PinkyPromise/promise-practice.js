// run `node index.js` in the terminal

/*
 * A utility function that simulates a network call
 */
const establishConnection = (status, cb) => {
  if (cb && status && status === 'good') {
    // establishConnection was called using a cb function
    cb({
      connection: 'established',
      code: 200,
    });
  } else if (status && status === 'good') {
    // establishConnection was called using async/await
    return {
      connection: 'established',
      code: 200,
    };
  } else {
    throw new Error('ERR::CONN');
  }
};

/*
 * executorFn is where the code for the task that needs to run asynchronously
 * should go
 * executorFn expects a resolve and a reject function for it to use internally
 * this resolve and reject function comes from the Promise class itself
 */

const executorFn = (resolve, reject) => {
  // do some asychronous thing
  try {
    establishConnection('good', (valueReturnedFromEstablishConnection) => {
      console.log('CB:');
      resolve(valueReturnedFromEstablishConnection);
    });
  } catch (e) {
    reject('An error occurred when establishing connection');
  }
};

let PromiseInstance = new Promise(executorFn);

PromiseInstance.then((value) => console.log(value)).catch((err) =>
  console.log(err)
);

// async/await version
const getConnection = async (status) => {
  try {
    let connection_status = await establishConnection(status);
    console.log('ASYNC/AWAIT');
    console.log(connection_status);
  } catch (e) {
    console.log(e);
  }
};

getConnection('good');
