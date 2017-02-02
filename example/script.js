'use strict';
const stepsLogger = require( `../` );

const trace = stepsLogger(console /* Reporter */, 'AUTH-FLOW' /* Flow title */, 15 /* Automatic flush timeout */);
/** Create a fake user */
const user = { name: 'Joe', email: 'Joe@yo.com', age: 99 };
/** Create a fake error */
const error = new Error( 'User does not exist on the database' );
trace.info('Starting auth flow', user.email);
trace.warn('Something failed, trying alternative...');
/**Simulate an asyncrhonous call... */
setTimeout(( err ) => {

    trace.error( 'The flow failed totally', err.message )
    trace.flush();
}, error, 10 * 1000 );
/* Console output...
AUTH-FLOW:
 { title: 'Starting auth flow', details: 'yo@yo.com' }
 { title: 'Something failed, trying alternative...' }
 { title: 'The flow failed totally', details: 'User does not exists' }

*/
