import React from 'react';

const Tile = ({ value, onClick, onContextMenu }) => {
  let content;
  if (value.isRevealed) {
    content = value.isMine ? '💣' : value.neighboringMines || '';
  } else if (value.isFlagged) {
    content = '🚩';
  }

  return (
    <div
      className="tile"
      onClick={onClick}
      onContextMenu={onContextMenu}
      style={{
        width: '30px',
        height: '30px',
        display: 'inline-block',
        border: '1px solid black',
        textAlign: 'center',
        lineHeight: '30px',
        background: value.isRevealed ? '#ddd' : '#aaa',
      }}
    >
      {content}
    </div>
  );
};

export default Tile;
