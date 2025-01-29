// src/hooks/usePuzzleLogic.ts
import { useState, useCallback } from 'react';
import { 
  createInitialGameState,
  moveTile,
  checkWin,
  solveAllButLast,
  type GameState,
  type Position,
  type Tile
} from '../services/gameLogic';

export const usePuzzleLogic = () => {
  const [gameState, setGameState] = useState<GameState>(() => createInitialGameState());

  const handleMoveTile = useCallback((position: Position) => {
    const result = moveTile(gameState.board, position, gameState.emptyPosition);
    const isWon = checkWin(result.board, gameState.solution);
    
    setGameState(prev => ({
      ...prev,
      board: result.board,
      emptyPosition: result.emptyPosition,
      isWon
    }));

    return result;
  }, [gameState.board, gameState.emptyPosition, gameState.solution]);

  const handleReset = useCallback(() => {
    setGameState(createInitialGameState());
  }, []);

  const handleSolveAllButLast = useCallback(() => {
    const result = solveAllButLast(gameState.solution);
    setGameState(prev => ({
      ...prev,
      board: result.board,
      emptyPosition: result.emptyPosition
    }));
  }, [gameState.solution]);

  const setBoard = useCallback((board: Tile[][], emptyPosition: Position) => {
    setGameState(prev => ({
      ...prev,
      board,
      emptyPosition,
      isWon: false
    }));
  }, []);

  return {
    board: gameState.board,
    solution: gameState.solution,
    emptyPosition: gameState.emptyPosition,
    isWon: gameState.isWon,
    moveTile: handleMoveTile,
    resetGame: handleReset,
    setBoard,
    handleSolveAllButLast
  };
};

