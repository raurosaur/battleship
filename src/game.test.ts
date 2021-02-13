import { boardElement, Board } from "./Logic/Game";

/*  
  ShipObject('Carrier', 5),
  ShipObject('Battleship', 4),
  ShipObject('Destroyer', 3),
  ShipObject('Submarine', 3),
  ShipObject('Patrol Boat', 2)
*/

function checkHorizontal(board: boardElement[][], x: number, y: number, len: number): boolean{
  for(let i = y; i < y + len; ++i)
  if(!board[x][i].hasShip) return false;
  return true;
}

function checkVertical(board: boardElement[][], x: number, y: number, len: number): boolean{
  for(let i = x; i < x + len; ++i) 
  if(!board[i][y].hasShip) 
  return false;
  return true;
}

const player = new Board(6);

test('Inserting Ship Horizontal', () => {
  const testBoard = new Board(6);
  testBoard.insertShipHorizontal('Destroyer',3, 0, 5);
  testBoard.insertShipHorizontal('Battleship', 5, 0, 4);
  testBoard.insertShipHorizontal('Patrol Boat', 1, 3, 2);
  
  const {BoardArray} = testBoard;
  expect(checkHorizontal(BoardArray, 3, 0, 5)).toBe(true);
  expect(checkHorizontal(BoardArray, 5, 0, 4)).toBe(true);
  expect(checkHorizontal(BoardArray, 1, 3, 2)).toBe(true);
});

test("Inserting Ship Vertical", () => {
  const testBoard = new Board(6);
  testBoard.insertShipVertical('Destroyer', 0, 1, 3);
  testBoard.insertShipVertical('Submarine', 3, 5, 3);
  const { BoardArray } = testBoard;
  expect(checkVertical(BoardArray, 0, 1, 3)).toBe(true);
  expect(checkVertical(BoardArray, 3, 5, 3)).toBe(true);
});

beforeAll(() => {
  player.insertShipHorizontal("Destroyer", 3, 0, 5);
  player.insertShipHorizontal("Battleship", 5, 0, 4);
  player.insertShipHorizontal("Patrol Boat", 1, 3, 2);
  player.insertShipVertical("Destroyer", 0, 1, 3);
  player.insertShipVertical("Submarine", 3, 5, 3);
});

test('Game Over', () => {
  //Destroyer
  expect(player.hit(0,1)).toBe(true);
  expect(player.hit(0,0)).toBe(false);
  player.hit(1,1);
  player.hit(2,1);
  //Carrier
  for(let i = 0; i < 5; i++)
    player.hit(3,i);
  expect(player.isGameOver()).toBe(false);
  //Battleship
  for(let i = 0; i < 4; i++)
    player.hit(5,i);
  expect(player.isGameOver()).toBe(false);
  //Submarine
  for(let i = 0; i < 3; i++)
  player.hit(3+i,5);
  expect(player.isGameOver()).toBe(false);
  //Patrol Boat
  player.hit(1,3);
  player.hit(1,4);
  expect(player.isGameOver()).toBe(true);
});