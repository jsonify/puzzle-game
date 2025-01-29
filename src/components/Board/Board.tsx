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

  return (
    <div className="grid grid-cols-5 gap-2 bg-white p-6 rounded-xl w-full max-w-lg aspect-square">
      {board.map((row, rowIndex) => (
        row.map((tile, colIndex) => (
          <TileComponent
            key={`${rowIndex}-${colIndex}`}
            color={tile.color}
            isEmpty={tile.isEmpty}
            onClick={canInteract ? () => handleClick({ row: rowIndex, col: colIndex }) : undefined}
            disabled={mode === 'main' && !tile.isEmpty && !canMoveTile({ row: rowIndex, col: colIndex }, state.emptyPosition)}
          />
        ))
      ))}
    </div>
  );
};

// Helper function moved from gameLogic.ts
const canMoveTile = (position: Position, emptyPosition: Position): boolean => {
  return (position.row === emptyPosition.row || position.col === emptyPosition.col) &&
         !(position.row === emptyPosition.row && position.col === emptyPosition.col);
};