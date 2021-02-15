/* eslint-disable no-loop-func */
import React, { FC } from "react";

export interface GBProps {
  name: string;
  clickable: boolean;
  clickHandler?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => any;
}

const BLOCK_LENGTH = 10;

export const GameBoard: FC<GBProps> = ({ name, clickable, clickHandler}) => {
  const dispBoard = Array(BLOCK_LENGTH ** 2);
  let x = 0,
    y = 0;
  for (let i = 0; i < BLOCK_LENGTH ** 2; ++i) {
    dispBoard[i] = (
      <div
        className="squares flex-center"
        id={`${name.toLowerCase()}-${x}-${y}`} //Set Coordinates as ID
        key={`${name.toLowerCase()}-${x}-${y}`}
        onClick={(e) => {
          if (!clickable) return;
          if (clickHandler) clickHandler(e);
        }}
      ></div>
    );
    y = (y + 1) % BLOCK_LENGTH;
    if (y === 0) x++;
  }
  return (
    <div className="GameBoard flex-center">
      <h2
        className={`${name.toLowerCase()} ${name === "Player" ? "green" : ""}`}
      >
        {name}
      </h2>
      <div className="grids">{dispBoard}</div>
    </div>
  );
};
