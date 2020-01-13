const http = require('http');
const config = require('./config');

let app = require('./app');

let server = http.createServer(app);

const onError = (error) => {
    if (error.syscall !== 'listen') {
        throw error;
    }

    let bind = typeof port === 'string' ?
        'Pipe ' + port :
        'Port ' + port;

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

const onListening = () => {
    let addr = server.address();
    console.log('Listening on localhost:' + addr.port);
}

// run

let port = ~~(config.port || '3000');
app.set('port', port);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);