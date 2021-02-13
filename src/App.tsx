import React, { useState } from "react";
import { GameBoard } from "./Components/GameBoard";
import SelectBoard from "./Components/SelectBoard";
import { Board } from "./Logic/Game";

export function getRandomIndex(len: number) {
  return Math.round(Math.random() * (len - 1));
}

const NUM_BOARD = 10;

interface props{
}

interface state{
    choose: boolean;
    player: Board;
    computer: Board;
    isPlayerTurn: boolean;
}

class App extends React.Component<props, state> {
  state = {
    choose: true,
    player: new Board(NUM_BOARD),
    computer: new Board(NUM_BOARD),
    isPlayerTurn: true,
  };

  constructor(props: props){
    super(props);
    this.updatePlayerBoard = this.updatePlayerBoard.bind(this);
    this.setIsPlayerTurn = this.setIsPlayerTurn.bind(this);
    this.setComputer = this.setComputer.bind(this);
  }

  updatePlayerBoard(val: Board) {
    this.setState({ player: val });
  }

  componentDidMount(){
    document.querySelector("h2.player")?.classList.add("green");
  }
  generateRandomGame() {
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

    while (!ships.every((ship) => ship.selected)) {
      const x = getRandomIndex(NUM_BOARD);
      const y = getRandomIndex(NUM_BOARD);
      const isVert = orientation[getRandomIndex(2)];

      const verdict = isVert
        ? board.insertShipVertical(ships[indx].name, x, y, ships[indx].size)
        : board.insertShipHorizontal(ships[indx].name, x, y, ships[indx].size);
      if (verdict) ships[indx++].selected = true;
    }

    this.setState({ computer: board });
  }

  setIsPlayerTurn(val: boolean) {
    this.setState({ isPlayerTurn: val });
  }

  setComputer(val: Board) {
    this.setState({ computer: val });
  }

  render() {
    const { choose, player, isPlayerTurn, computer } = this.state;

    function getComputerHit(){
      let x = 0, y =  0;
       while(!player.BoardArray[x][y].wasHit){
         x = getRandomIndex(NUM_BOARD);
         y = getRandomIndex(NUM_BOARD);
        }
        const didHit = player.hit(x,y);
        const el = document.getElementById(`player-${x}-${y}`);
        const color = didHit ? "#f00" : "#fff";
        const circle = document.createElement("div");
        circle.classList.add("target");
        circle.style.background = color;
        el!.appendChild(circle);
     }

    if (isPlayerTurn) {
      document.querySelector("h2.player")?.classList.add("green");
      document.querySelector("h2.computer")?.classList.remove("green");
    } else {
      document.querySelector("h2.computer")?.classList.add("green");
      document.querySelector("h2.player")?.classList.remove("green");
      setTimeout(getComputerHit, 500);
    }
    return (
      <div className="App flex-center">
        {choose ? (
          <SelectBoard update={this.updatePlayerBoard} />
        ) : (
          <div className="flex-center">
            <GameBoard
              name="Player"
              clickable={false}
              computer = {computer}
              board={player}
              setBoard={this.updatePlayerBoard}
              isPlayerTurn={isPlayerTurn}
              setIsPlayerTurn={this.setIsPlayerTurn}
              />
            <GameBoard
              name="Computer"
              clickable={true}
              board={computer}
              computer = {computer}
              setBoard={this.setComputer}
              isPlayerTurn={isPlayerTurn}
              setIsPlayerTurn={this.setIsPlayerTurn}
            />
          </div>
        )}
        <button
          onClick={() => {
            this.setState({ choose: !choose });
            this.generateRandomGame();
          }}
        >
          {choose ? "Let's Go" : "Restart"}
        </button>
      </div>
    );
  }
}
export default App;
