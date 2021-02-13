//Ship Object Interface
interface ShipObjectInterface{
    name:string | undefined;
    length:number | undefined;
}

//Board Interface
interface BoardInterface {
  insertShipVertical(name: string, x: number, y: number, length: number): void;
  insertShipHorizontal(name: string,x: number, y: number, length: number): void;
  hit(x: number, y: number): boolean;
  isGameOver(): boolean;
}

//Ship Object Factory Function
export const ShipObject = function(name: string, length: number) :ShipObjectInterface{
    return ({name, length});
};

export type boardElement = {
  name: string;
  hasShip: boolean | undefined;
  wasHit: boolean | undefined;
};

function getNewBoardElement():boardElement{
  return {name: '', hasShip: false, wasHit: false};
}

//Board Class
export class Board implements BoardInterface {
  //Array of BoardArray Type which stores whether a ship is there or not
  readonly BoardArray: boardElement[][];
  //Length of Array
  readonly boardSize: number;

  constructor(size: number, board?: Board) {
    if(!!board)
      this.BoardArray = board.BoardArray;
    else{
      this.BoardArray = [];
      for (let i = 0; i < size; ++i) {
        const innerArray : boardElement[] = [];
        for (let j = 0; j < size; ++j){
          innerArray.push(getNewBoardElement());
        }
        this.BoardArray.push(innerArray);
      }
    }
    this.boardSize = size;
  }

  //Check Availability
  private checkAvailability(isVert : boolean, x: number, y: number, len: number ) : boolean{
    let i = x, j = y;  
    for (let pointer = 0; pointer < len; pointer++) {
        if(this.BoardArray[i][j].hasShip) return false
        if(isVert)j = (j + 1) % this.boardSize;
        else i = (i + 1) % this.boardSize;
    }
    return true;
  }
  
  //Inserts Ship Horizontally
  insertShipHorizontal(name: string, x: number, y: number, length: number): boolean {
    if(!this.checkAvailability(false, x,y,length)) return false;
    let j = y;
    for (let pointer = 0; pointer < length; pointer++) {
      this.BoardArray[x][j].name = name;
      this.BoardArray[x][j].hasShip = true;
      j = (j + 1) % this.boardSize;
    }
    return true;
  }

  //Inserts Ship Vertically
  insertShipVertical(name: string, x: number, y: number, length: number): boolean {
    if(!this.checkAvailability(true, x,y,length)) return false;
      let i = x;
      for (let pointer = 0; pointer < length; pointer++) {
        this.BoardArray[i][y].name = name;
        this.BoardArray[i][y].hasShip = true;
        i = (i + 1) % this.boardSize;
      }
      return true;
  }

  //Hits a specific square and return true if square had a ship
  hit(x: number, y: number): boolean {
    this.BoardArray[x][y].wasHit = true;
    return !!this.BoardArray[x][y].hasShip;
  }

  //Checks Whether game was over
  isGameOver(): boolean {
    return this.BoardArray.every((loc) => loc.every((el) => (el.hasShip) ? el.wasHit : true));
  }

  //toString()
  toString(): string {
    let str = '';
    this.BoardArray.forEach(val => {
        str += val.map(el => el.hasShip ? '\x1b[32mtrue   ' : '\x1b[37mfalse  ') + '\n';
    });
    return str;
  }

  //print
  print():void{
    console.log(this.toString());
  }
}

//Ships
export const ships = [
    ShipObject('Carrier', 5),
    ShipObject('Battleship', 4),
    ShipObject('Destroyer', 3),
    ShipObject('Submarine', 3),
    ShipObject('Patrol Boat', 2)
];
