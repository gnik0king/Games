const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 3000;

let players = {};

io.on('connection', (socket) => {
    console.log('A user connected: ' + socket.id);

    // Create a new player and add to the players object
    players[socket.id] = {
        x: Math.floor(Math.random() * 500),
        y: Math.floor(Math.random() * 500),
        size: 10,
        id: socket.id,
    };

    // Send the players object to the new player
    socket.emit('currentPlayers', players);

    // Update all other players of the new player
    socket.broadcast.emit('newPlayer', players[socket.id]);

    // Listen for player movement
    socket.on('playerMovement', (movementData) => {
        if (players[socket.id]) {
            players[socket.id].x += movementData.x;
            players[socket.id].y += movementData.y;

            // Emit the movement data to all players
            io.emit('playerMoved', players[socket.id]);
        }
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('User disconnected: ' + socket.id);
        delete players[socket.id];
        io.emit('playerDisconnected', socket.id);
    });
});

app.use(express.static('public'));

server.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});
