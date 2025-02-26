#!/usr/bin/env node

/**
 * Application initializing
 */
import app from './app';
import debugUtil from 'debug';
import http from 'http';
//import https from 'https';

/** Debug name ini */
const debug = debugUtil('server:server');

/** Getting port */
const port = process.env.PORT || 3000;
app.set('port', port);

/** Get key and certificate for https */
//const key = fs.readFileSync('./data/private/server.key');
//const cert = fs.readFileSync('./data/private/server.cert');

/** Create HTTP server */
const server = http.createServer(app);
//const server = https.createServer({ key, cert }, app);

/** Listen on provided port, on all network interfaces */
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/** Event listener for HTTP server "error" event */
function onError(error: NodeJS.ErrnoException) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/** Event listener for HTTP server "listening" event */
function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr?.port || 'empty';
    debug('Listening on ' + bind);
}
