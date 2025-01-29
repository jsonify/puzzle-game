import React from 'react';
import { Tile as TileComponent } from './Tile';
import { Position, Tile } from '../../services/gameLogic';
import { useGameState } from '../../context/GameContext';

interface BoardProps {
  mode: 'main' | 'opponent' | 'solution';
  board?: Tile[][];
}

export const Board: React.FC<BoardProps> = ({ mode, board: propBoard }) => {
  const { state, handleTileClick } = useGameState();
  const board = propBoard || state.board;
  
  const canInteract = mode === 'main' && !state.isWon;

  const handleClick = (position: Position) => {
    if (!canInteract) return;
    handleTileClick(position);
  };

  return (
    <div className="w-full bg-white rounded-xl p-4 shadow-md">
      <div className="grid grid-cols-5 gap-2 aspect-square">
        {board.map((row, rowIndex) => 
          row.map((tile, colIndex) => (
            <div 
              key={`${rowIndex}-${colIndex}`} 
              className="w-full aspect-square"
            >
              <TileComponent
                color={tile.color}
                isEmpty={tile.isEmpty}
                onClick={() => handleClick({ row: rowIndex, col: colIndex })}
                disabled={mode === 'main' && !tile.isEmpty && !canMoveTile({ row: rowIndex, col: colIndex }, state.emptyPosition)}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// Helper function
const canMoveTile = (position: Position, emptyPosition: Position): boolean => {
  return (position.row === emptyPosition.row || position.col === emptyPosition.col) &&
         !(position.row === emptyPosition.row && position.col === emptyPosition.col);
};