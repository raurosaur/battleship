import React, { useState } from "react";
import { GameBoard } from "./Components/GameBoard";
import SelectBoard from "./Components/SelectBoard";
import { Board } from "./Logic/Game";

const NUM_BOARD = 10; 

const App: React.FC = () => {
  const [choose, setChoose] = useState(true);
  const [player, setPlayer] = useState<Board>();
  const [computer, setComputer] = useState<Board>();

  const updatePlayerBoard = (board: Board) => {
    setPlayer(board);
  };

  function getRandomIndex(len: number){
    return Math.round(Math.random() * (len - 1))
  }
  function generateRandomGame() {
    const ships = [
      { size: 5, name: "Carrier", selected: false },
      { size: 4, name: "Battleship", selected: false },
      { size: 3, name: "Destroyer", selected: false },
      { size: 3, name: "Submarine", selected: false },
      { size: 2, name: "Patrol Boat", selected: false },
    ];
    const orientation = [true, false];
    const board = new Board(NUM_BOARD);
    let indx = 0;

    while(!ships.every(ship => ship.selected)){
      const x = getRandomIndex(NUM_BOARD);
      const y = getRandomIndex(NUM_BOARD);
      const isVert = orientation[getRandomIndex(2)];
      
      const verdict = isVert
        ? board.insertShipVertical(ships[indx].name, x, y, ships[indx].size)
        : board.insertShipHorizontal(ships[indx].name, x, y, ships[indx].size);
      if(verdict) ships[indx++].selected = true;
    }
    setComputer(board);
  }
  return (
    <div className="App flex-center">
      {choose ? (
        <SelectBoard update={updatePlayerBoard} />
      ) : (
        <div className="flex-center">
          <GameBoard name="Player" clickable={true} />
          <GameBoard name="Computer" clickable={false} />
        </div>
      )}
      <button
        onClick={() => {
          setChoose(!choose);
          generateRandomGame();
        }}
      >
        {choose ? "Let's Go" : "Restart"}
      </button>
    </div>
  );
};

export default App;
