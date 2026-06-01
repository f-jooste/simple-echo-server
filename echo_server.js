import * as net from "net";

function newConn(socket) {
    console.log('new connection', socket.remoteAddress, socket.remotePort);

    socket.on('end', () => {// FIN received. The connection will be closed automatically.
        console.log("EOF.");
    });

    socket.on('data', (data) => {
    console.log('data', data); // Log the received data
    socket.write(data); // Send the received data back to the client

    if (data.includes('q')) {
        console.log('Closing');
        socket.end();
    }
});
}

let server = net.createServer();
server.on('error', (err) => {throw err; });
server.on('connection', newConn);
server.listen({host: '127.0.0.1', port: 1234});