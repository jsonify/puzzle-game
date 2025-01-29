// src/components/Board/Board.tsx
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

  // Different scale classes based on mode
  const containerScale = mode === 'solution' 
    ? 'w-full max-w-sm' 
    : 'w-full max-w-2xl';

  return (
    <div className={`${containerScale} mx-auto`}>
      <div className="bg-white rounded-xl p-4 shadow-md">
        <div className="relative w-full pb-[100%]">
          <div className="absolute inset-0">
            <div className="grid grid-cols-5 grid-rows-5 gap-2 w-full h-full">
              {board.flat().map((tile, index) => {
                const rowIndex = Math.floor(index / 5);
                const colIndex = index % 5;
                return (
                  <div key={`${rowIndex}-${colIndex}`} className="relative">
                    <TileComponent
                      color={tile.color}
                      isEmpty={tile.isEmpty}
                      onClick={() => handleClick({ row: rowIndex, col: colIndex })}
                      disabled={!canInteract || (mode === 'main' && !tile.isEmpty && 
                        !canMoveTile({ row: rowIndex, col: colIndex }, state.emptyPosition))}
                    />
                  </div>
                );
              })}
            </div>
          </div>
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
