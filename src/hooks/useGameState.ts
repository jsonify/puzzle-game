// src/hooks/useGameState.ts
import { useContext } from 'react';
import { GameContext } from '../context/GameContext';
import type { GameMode, Position } from '../types';

export const useGameState = () => {
  const context = useContext(GameContext);
  
  if (!context) {
    throw new Error('useGameState must be used within a GameProvider');
  }

  const { state, setMode, handleTileClick, resetGame, setBoard, handleSolveAllButLast } = context;

  return {
    board: state.board,
    solution: state.solution,
    emptyPosition: state.emptyPosition,
    isWon: state.isWon,
    mode: state.mode,
    setMode,
    handleTileClick,
    resetGame,
    setBoard,
    handleSolveAllButLast
  };
};
