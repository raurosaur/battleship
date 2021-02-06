import React, { useState } from 'react';
import { GameBoard } from './Components/GameBoard';

const App: React.FC = () => {
  const [choose, setChoose] = useState(true);

  return (
    <div className="App flex-center">
      {choose ? (
        /*Place Ships*/
        <div className = 'flex-center'>
          <GameBoard name = 'Place your Battle Ships' clickable = {false}/>
        </div>) 
        : (
        <div className='flex-center'>
            <GameBoard name='Player' clickable={true} />
            <GameBoard name='Computer' clickable={true} />
        </div>)}
        <button onClick = {()=> setChoose(!choose)}>Let's Go</button>
    </div>
  );
}

export default App;
