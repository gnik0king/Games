const socket = io();
const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');

let players = {};

socket.on('currentPlayers', (currentPlayers) => {
    players = currentPlayers;
});

socket.on('newPlayer', (newPlayer) => {
    players[newPlayer.id] = newPlayer;
});

socket.on('playerMoved', (movedPlayer) => {
    players[movedPlayer.id] = movedPlayer;
});

socket.on('playerDisconnected', (playerId) => {
    delete players[playerId];
});

function drawPlayer(player) {
    context.beginPath();
    context.arc(player.x, player.y, player.size, 0, 2 * Math.PI);
    context.fillStyle = 'blue';
    context.fill();
    context.stroke();
}

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    for (let id in players) {
        drawPlayer(players[id]);
    }

    requestAnimationFrame(draw);
}

function handleInput(event) {
    let movement = { x: 0, y: 0 };
    switch (event.key) {
        case 'ArrowUp':
            movement.y = -5;
            break;
        case 'ArrowDown':
            movement.y = 5;
            break;
        case 'ArrowLeft':
            movement.x = -5;
            break;
        case 'ArrowRight':
            movement.x = 5;
            break;
    }
    socket.emit('playerMovement', movement);
}

document.addEventListener('keydown', handleInput);
draw();
