import React from "react";
import { Board } from "../Logic/Game";

export type GameBoardProps = {
  name: string;
  clickable: boolean;
  board: Board;
  computer: Board;
  setBoard: (val: Board) => void;
  isPlayerTurn?: boolean;
  setIsPlayerTurn: (val: boolean) => void;
};

const BLOCK_LENGTH = 10;

export function GameBoard({
  name,
  clickable,
  board,
  computer,
  setBoard,
  isPlayerTurn,
  setIsPlayerTurn,
}: GameBoardProps) {

  function choosePosition(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if(name === 'Player' && !isPlayerTurn) return;

    setIsPlayerTurn(!isPlayerTurn);
    if(!clickable) return;
    const id = e.currentTarget.id;
    const [, x, y] = id.split("-");
    if (board?.BoardArray[+x][+y].wasHit) return;
    bomb(board?.hit(+x, +y), e);
    setBoard(board);
  }
  
  function bomb(didHit: boolean | undefined, e: React.MouseEvent<HTMLDivElement, MouseEvent>){
    const color = (didHit) ? '#f00':'#fff';
    const circle = document.createElement("div");
    circle.classList.add("target");
    circle.style.background = color;
    e.currentTarget.appendChild(circle);
  }

  const dispBoard = Array(BLOCK_LENGTH ** 2);
  let x = 0,
    y = 0;
  for (let i = 0; i < BLOCK_LENGTH ** 2; ++i) {
    dispBoard[i] = (
      <div
        className="squares flex-center"
        id={`${name.toLowerCase()}-${x}-${y}`} //Set Coordinates as ID
        key={`${name.toLowerCase()}-${x}-${y}`}
        onClick={choosePosition}
      ></div>
    );
    y = (y + 1) % BLOCK_LENGTH;
    if (y === 0) x++;
  }

  return (
    <div className="GameBoard flex-center">
      <h2 className={name.toLowerCase()}>{name}</h2>
      <div className="grids">{dispBoard}</div>
    </div>
  );
}
