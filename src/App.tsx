import React from "react";
import { GameBoard } from "./Components/GameBoard";
import SelectBoard from "./Components/SelectBoard";
import { Board } from "./Logic/Game";

export function getRandomIndex(len: number) {
  return Math.round(Math.random() * (len - 1));
}

const NUM_BOARD = 10;

interface props {}

interface state {
  choose: boolean;
  player: Board;
  computer: Board;
  hasWon: boolean;
  winner: 'You' | 'Computer' | undefined;
}

class App extends React.Component<props, state> {
  state = {
    choose: true,
    player: new Board(NUM_BOARD),
    computer: new Board(NUM_BOARD),
    hasWon: false,
    winner: undefined
  };

  updatePlayerBoard = (val: Board) => {
    this.setState({ player: val });
  };

  generateRandomGame = () => {
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
  };

  hit = (didHit: boolean, el: HTMLElement): void => {
    const color = didHit ? "#f00" : "#fff";
    const circle = document.createElement("div");
    circle.classList.add("target");
    circle.style.background = color;
    el.appendChild(circle);
  };

  computerPlay = () => {
    if (this.state.hasWon) return;
    document.querySelector("h2.computer")?.classList.add("green");
    document.querySelector("h2.player")?.classList.remove("green");
    const { player } = this.state;
    let x = 0,
      y = 0;
    while (player.BoardArray[x][y].wasHit) {
      x = getRandomIndex(NUM_BOARD);
      y = getRandomIndex(NUM_BOARD);
    }
    const newBoard = new Board(NUM_BOARD, player);
    const didHit = newBoard.hit(x, y);
    const el = document.getElementById(`player-${x}-${y}`) as HTMLElement;
    this.hit(didHit, el);
    this.setState({ player: newBoard });
    this.setState({ hasWon: newBoard.isGameOver() });
    if(this.state.hasWon) this.setState({winner: 'Computer'});
  };
  
  handlePlay = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (this.state.hasWon) return;
    document.querySelector("h2.player")?.classList.add("green");
    document.querySelector("h2.computer")?.classList.remove("green");
    const id = e.currentTarget.id;
    const [, x, y] = id.split("-");
    const newBoard = new Board(NUM_BOARD, this.state.computer);
    if (newBoard.BoardArray[x][y].wasHit) return;
    const didHit = newBoard.hit(+x, +y);
    this.hit(didHit, e.currentTarget);
    this.setState({ computer: newBoard });
    this.setState({ hasWon: newBoard.isGameOver() });
    if(this.state.hasWon) this.setState({winner: 'You'});
    setTimeout(this.computerPlay, 500);
  };

  render = () => {
    const { choose, hasWon, player, winner } = this.state;

    if (!choose) {
      const playerBoard = document.querySelector('.grids') as HTMLDivElement;
      if(playerBoard)
      for (let i = 0; i < NUM_BOARD; i++) {
        for (let j = 0; j < NUM_BOARD; j++) {
          if (player.BoardArray[i][j].hasShip){
            const square = playerBoard.querySelector(`#player-${i}-${j}`) as HTMLDivElement;
            if(square)square.style.background = "salmon";
          }
        }
      }
    }

    if(hasWon){
      document.querySelector('.winner')?.classList.add('show-winner');
    }
    return (
      <div className="App flex-center">
        <div className="winner flex-center"> {winner} Won! </div>
        {choose ? (
          <SelectBoard update={this.updatePlayerBoard} />
        ) : (
          <div className="flex-center">
            <GameBoard name="Player" clickable={false} />
            <GameBoard
              name="Computer"
              clickable={true}
              clickHandler={this.handlePlay}
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
  };
}
export default App;
