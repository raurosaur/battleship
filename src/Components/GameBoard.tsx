import React from 'react';

type GameBoardProps = {
    name : string;
    clickable: boolean;
}
const BLOCK_LENGTH = 16;

export const GameBoard: React.FC<GameBoardProps> = ({name, clickable}) => {
    const choosePosition = (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
        if(e.currentTarget.children.length > 0 || !clickable)
            return;
        const circle = document.createElement('div');
        circle.classList.add('target');
        e.currentTarget.appendChild(circle);
    }

    const board = Array(BLOCK_LENGTH**2).fill(<div className='squares flex-center' onClick = {(choosePosition)}></div>);

    return (
        <div className = 'GameBoard flex-center'>
            <h2>{name}</h2>
            <div className = 'grids'>{board.map(el => el)}</div>
        </div>
    );
}