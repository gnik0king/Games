document.addEventListener('DOMContentLoaded', (event) => {
    var board,
        game = new Chess();

    function onDragStart(source, piece, position, orientation) {
        // Do not pick up pieces if the game is over
        // Only pick up pieces for the side to move
        if (game.in_checkmate() === true || game.in_draw() === true ||
            piece.search(/^b/) !== -1) {
            return false;
        }
    }

    function onDrop(source, target) {
        // See if the move is legal
        var move = game.move({
            from: source,
            to: target,
            promotion: 'q' // NOTE: always promote to a queen for simplicity
        });

        // Illegal move
        if (move === null) return 'snapback';

        updateStatus();
    }

    function onSnapEnd() {
        board.position(game.fen());
    }

    function updateStatus() {
        var status = '';

        var moveColor = 'White';
        if (game.turn() === 'b') {
            moveColor = 'Black';
        }

        // Checkmate?
        if (game.in_checkmate() === true) {
            status = 'Game over, ' + moveColor + ' is in checkmate.';
        }

        // Draw?
        else if (game.in_draw() === true) {
            status = 'Game over, drawn position';
        }

        // Game still on
        else {
            status = moveColor + ' to move';

            // Check?
            if (game.in_check() === true) {
                status += ', ' + moveColor + ' is in check';
            }
        }

        document.getElementById('status').innerHTML = status;
    }

    board = Chessboard('board', {
        draggable: true,
        position: 'start',
        onDragStart: onDragStart,
        onDrop: onDrop,
        onSnapEnd: onSnapEnd
    });

    updateStatus();
});
