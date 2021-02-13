import React, { useState } from "react";
import { Board } from "../Logic/Game";

const SelectBoard: React.FC<{update: (player :Board) => void}> = ({update}) => {
  //Coordinate Locations for Grid on Screen
  let x = 0,
    y = 0;
  //Success in placing Ship
  let success = true;
  //Total Number of Grids => Can be Changed
  const NUM_GRIDS = 10;
  //Squares for Screen : JSX Elements
  const Squares = Array(NUM_GRIDS ** 2);
  //Orientation of Ships
  let [isHorizontal, setIsHorizontal] = useState(true);
  //Counter
  const [counter, setCounter] = useState(0);
  //Loop to set values of Squares
  for (let i = 0; i < NUM_GRIDS ** 2; ++i) {
    Squares[i] = (
      <div
        className="squares flex-center"
        id={`${x}-${y}`} //Set Coordinates as ID
        onDragOver={dragDefault}
        onDragEnter={dragDefault}
        onDrop={onDrop}
        onDragLeave={dragDefault}
      ></div>
    );
    y = (y + 1) % NUM_GRIDS;
    if (y === 0) x++;
  }
  //Size Value of Ship Selected
  let size = 0;

  //New Board
  const [player, setPlayer] = useState(new Board(NUM_GRIDS));

  //Drag Default => Stops Propagation and Prevents Defaults
  function dragDefault(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
  }

  //Changes Orientation of Ships on screen
  function changeOrientation() {
    const ships = Array.from(
      document.querySelectorAll(".ship")
    ) as HTMLElement[];
    const wrapper = document.getElementsByClassName("ships")[0] as HTMLElement;
    wrapper.style.flexDirection = isHorizontal ? "row" : "column";
    ships.forEach((el) => {
      const computedStyle = window.getComputedStyle(el);
      const height = computedStyle.width,
        width = computedStyle.height;
      el.style.height = height;
      el.style.width = width;
    });
    setIsHorizontal(!isHorizontal);
  }

  //Starts Drag Function
  function dragStart(e: React.DragEvent<HTMLDivElement>) {
    e.dataTransfer.setData("text/plain", e.currentTarget.id);
    e.currentTarget.style.backgroundColor = "yellow";
    size = +e.currentTarget.className[e.currentTarget.className.length - 1];
  }

  //Name Object
  const names = [
    { size: 5, name: "Carrier", selected: false },
    { size: 4, name: "Battleship", selected: false },
    { size: 3, name: "Destroyer", selected: false },
    { size: 3, name: "Submarine", selected: false },
    { size: 2, name: "Patrol Boat", selected: false },
  ];

  //Get Name Function
  function getName(): string {
    return names.filter((el) => !el.selected && el.size === size)[0].name;
  }

  //On Drag Event Handler
  function onDrop(e: React.DragEvent<HTMLDivElement>) {
    const { id } = e.currentTarget;
    let [x, y] = id.split("-").map((el) => +el);
    const newPlayer = new Board(NUM_GRIDS, player);

    //Set on Board
    success = 
    isHorizontal
      ? newPlayer.insertShipHorizontal(getName(), x, y, size)
      : newPlayer.insertShipVertical(getName(), x, y, size);

    if(!success)return;

    setPlayer(newPlayer);
    
    for (let i = 0; i < size; ++i) {
      //Set on Screen
      document.getElementById(`${x}-${y}`)!.style.background = "salmon";
      if (!isHorizontal) x = (x + 1) % NUM_GRIDS;
      else y = (y + 1) % NUM_GRIDS;
    }

    setCounter(counter + 1);
    dragDefault(e);
  }
  
  //End Drag Event Handler
  function dragEnd(e: React.DragEvent<HTMLDivElement>) {
    if(counter === 5)
     update(player);
    if(success)e.currentTarget.style.display = "none";
    else e.currentTarget.style.background = "pink";
  }
  
  //JSX Return Element
  return (
    <div>
      <div className="GameBoard flex-center">
        <h2>Place your Battle Ships</h2>
        <div className="grids">{Squares.map((el) => el)}</div>
      </div>
      <div className="ship-wrapper">
        <h2>Drag n' Drop your Ships</h2>
        <button onClick={changeOrientation}>Change Orientation</button>
        <div className="ships">
          <div
            className="ship ship-5"
            onDragStart={dragStart}
            onDrop={onDrop}
            onDragEnd={dragEnd}
            draggable={true}
          ></div>
          <div
            className="ship ship-4"
            onDragStart={dragStart}
            onDrop={onDrop}
            onDragEnd={dragEnd}
            draggable={true}
          ></div>
          <div
            className="ship ship-3"
            onDragStart={dragStart}
            onDrop={onDrop}
            onDragEnd={dragEnd}
            draggable={true}
          ></div>
          <div
            className="ship ship-3"
            onDragStart={dragStart}
            onDrop={onDrop}
            onDragEnd={dragEnd}
            draggable={true}
          ></div>
          <div
            className="ship ship-2"
            onDragStart={dragStart}
            onDrop={onDrop}
            onDragEnd={dragEnd}
            draggable={true}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default SelectBoard;
