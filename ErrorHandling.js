/**
 * A custom MyError class
 * @class
 */
// class MyError extends Error {
//     /**
//      * Constructs the MyError class
//      * @param {String} message an error message
//      * @constructor
//      */
//     constructor(message) {
//         super(message);
//         // properly capture stack trace in Node.js
//         Error.captureStackTrace(this, this.constructor);
//         this.name = this.constructor.name;
//         this.message = message;
//     }
// }

// // test it
// throw new MyError('test error handling');
// //MyError: test



//Handling Errors in EventEmitter(s)
const EventEmitter = require('events');

class Emitter extends EventEmitter {}

const emitter = new Emitter();
const logger = console;

/**
 * Add Error listener
 */
emitter.on('error', (err) => {
    logger.error('Unexpected error on emitter', err);
});

