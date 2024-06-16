import React, { useState } from 'react';
import Tile from './Tile';

const createBoard = (rows, cols, mines) => {
  let board = [];
  for (let r = 0; r < rows; r++) {
    let row = [];
    for (let c = 0; c < cols; c++) {
      row.push({
        isMine: false,
        isRevealed: false,
        isFlagged: false,
        neighboringMines: 0,
      });
    }
    board.push(row);
  }

  // Place mines
  for (let i = 0; i < mines; i++) {
    let row, col;
    do {
      row = Math.floor(Math.random() * rows);
      col = Math.floor(Math.random() * cols);
    } while (board[row][col].isMine);
    board[row][col].isMine = true;
  }

  // Calculate neighboring mines
  const directions = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1],         [0, 1],
    [1, -1], [1, 0], [1, 1]
  ];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (board[r][c].isMine) continue;

      let count = 0;
      directions.forEach(([dx, dy]) => {
        const nr = r + dx, nc = c + dy;
        if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && board[nr][nc].isMine) {
          count++;
        }
      });
      board[r][c].neighboringMines = count;
    }
  }

  return board;
};

const Board = ({ rows, cols, mines }) => {
  const [board, setBoard] = useState(createBoard(rows, cols, mines));
  const [gameOver, setGameOver] = useState(false);
  const [moves, setMoves] = useState(0);

  const handleClick = (r, c) => {
    if (gameOver) return;
    if (board[r][c].isRevealed || board[r][c].isFlagged) return;

    const newBoard = [...board];
    revealTile(newBoard, r, c);
    setBoard(newBoard);
    setMoves(moves + 1);

    if (newBoard[r][c].isMine) {
      setGameOver(true);
      alert('Game Over!');
    }
  };

  const handleRightClick = (r, c, e) => {
    e.preventDefault();
    if (gameOver) return;

    const newBoard = [...board];
    newBoard[r][c].isFlagged = !newBoard[r][c].isFlagged;
    setBoard(newBoard);
  };

  const revealTile = (board, r, c) => {
    if (board[r][c].isRevealed) return;
    board[r][c].isRevealed = true;

    if (board[r][c].neighboringMines === 0 && !board[r][c].isMine) {
      const directions = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1],         [0, 1],
        [1, -1], [1, 0], [1, 1]
      ];

      directions.forEach(([dx, dy]) => {
        const nr = r + dx, nc = c + dy;
        if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
          revealTile(board, nr, nc);
        }
      });
    }
  };

  return (
    <div>
      <div>
        {board.map((row, rIdx) => (
          <div key={rIdx} style={{ display: 'flex' }}>
            {row.map((tile, cIdx) => (
              <Tile
                key={cIdx}
                value={tile}
                onClick={() => handleClick(rIdx, cIdx)}
                onContextMenu={(e) => handleRightClick(rIdx, cIdx, e)}
              />
            ))}
          </div>
        ))}
      </div>
      <div>
        <p>Moves: {moves}</p>
        <button onClick={() => { setBoard(createBoard(rows, cols, mines)); setGameOver(false); setMoves(0); }}>Reset</button>
      </div>
    </div>
  );
};

export default Board;
