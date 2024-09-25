const mongoose = require('mongoose');

let dbUri = 'mongodb://localhost/Loc8r';

if(process.env.NODE_ENV === 'production') {
    dbUri = process.env.MONGODB_URI;
}
mongoose.connect(dbUri);

/** Monitor Connection Events **/

mongoose.connection.on('connected', () => {
    console.log(`MongoDB Connected to ${dbUri}`);
});

mongoose.connection.on('error', (err) => {
    console.log('MongoDB Connection Error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('MongoDB Disconnected:', dbUri);
});

/** Handle DB shutdown **/

const gracefulShutdown = (msg, callback) => {
    mongoose.connection.close( () => {
        console.log(`Mongoose disconnected throguh ${msg}`);
    });
    callback();
};

/** Listen to Node processes for termination or restart signals **/

process.once('SIGUSR2', () => {
    gracefulShutdown('nodemon restart', () => {
        process.kill(process.pid, 'SIGUSR2');
    });
});

process.once('SIGINT', () => {
    gracefulShutdown('Application Termination', () => {
        process.exit(0);
    });
});

process.once('SIGTERM', () => {
    gracefulShutdown('Heroku app shutdown', () => {
        process.exit(0);
    });
});







