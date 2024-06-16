import React from 'react';

const Header = ({ moves, resetGame }) => {
  return (
    <div>
      <h1>Minesweeper</h1>
      <p>Moves: {moves}</p>
      <button onClick={resetGame}>Reset</button>
    </div>
  );
};

export default Header;
