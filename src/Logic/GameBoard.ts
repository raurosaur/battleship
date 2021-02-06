import {Coordinates} from './Ship';

export interface GameBoardClass {
    gameboard: Array<object>[10];
    missedAttacks: any[];
    receiveAttack ({x, y} : Coordinates): void; 
    hasSunkAll () : boolean;
}

export {};