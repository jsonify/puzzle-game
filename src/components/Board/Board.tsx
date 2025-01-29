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

  // Different width classes based on mode
  const containerWidth = mode === 'solution' ? 'max-w-md' : 'max-w-2xl';

  return (
    <div className={`w-full ${containerWidth} mx-auto`}>
      <div className="bg-white rounded-xl p-4 shadow-md">
        {/* Explicit grid container */}
        <div className="grid grid-cols-5 gap-2 w-full">
          {board.map((row, rowIndex) => 
            row.map((tile, colIndex) => (
              <div 
                key={`${rowIndex}-${colIndex}`} 
                className="aspect-square w-full" // Force square aspect ratio
              >
                <TileComponent
                  color={tile.color}
                  isEmpty={tile.isEmpty}
                  onClick={() => handleClick({ row: rowIndex, col: colIndex })}
                  disabled={!canInteract || (mode === 'main' && !tile.isEmpty && 
                    !canMoveTile({ row: rowIndex, col: colIndex }, state.emptyPosition))}
                />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

// Helper function
const canMoveTile = (position: Position, emptyPosition: Position): boolean => {
  return (position.row === emptyPosition.row || position.col === emptyPosition.col) &&
         !(position.row === emptyPosition.row && position.col === emptyPosition.col);
};