var asyncAdd = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (typeof a === 'number' && typeof b === 'number') {
                resolve(a + b);
            }
            reject('Arguments must be numbers');
        }, 1500);
    });
};

// var somePromise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve('Hey. It worked!');
//         // reject('Unable to do the thing');
//     }, 1500);
// });

// somePromise
//     .then((message) => {
//         console.log('Success:', message);
//     })
//     .catch((error) => {
//         console.log('Error:', error);
//     });

asyncAdd(2, '4')
    .then((result) => {
        console.log('Result:', result);
        return asyncAdd(result, 33);
    })
    .then((result) => {
        console.log('Result:', result);
    })
    .catch((error) => {
        console.log('Error:', error);
    });