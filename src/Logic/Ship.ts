export interface Coordinates{
    x: number;
    y: number;
}

export interface ShipParams{
    length: number;
    location: {start: Coordinates,end: Coordinates};
    sunk: boolean;
}

export interface ShipFunc extends ShipParams{
    ship: boolean[];
    hit (pos: number) : void;
    isSunk () : boolean;
}

export const Ship = ({length, location, sunk}: ShipParams) :ShipFunc => ({
    ship: new Array<boolean>(length).fill(false),
    length,
    location,
    sunk,
    hit(pos){
        this.ship[pos] = true;
    },
    isSunk(){
        return this.ship.every(el => !el);
    }
});