import React from 'react';
import Board from './components/Board';
import Header from './components/Header';

const App = () => {
  const [key, setKey] = React.useState(0); // To force re-render the board

  const resetGame = () => {
    setKey(prevKey => prevKey + 1);
  };

  return (
    <div>
      <Header moves={0} resetGame={resetGame} />
      <Board key={key} rows={10} cols={10} mines={10} />
    </div>
  );
};

export default App;
