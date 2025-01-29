// src/context/GameContext.tsx
import React, { createContext, useContext, useReducer, useCallback } from 'react';
import { 
  Tile,
  Position,
  createInitialGameState,
  moveTile,
  checkWin,
  solveAllButLast,
  INITIAL_GAME_STATE
} from '../services/gameLogic';
import { useMultiplayer } from './MultiplayerContext';

// Types
export type GameMode = 'single' | 'multi';

interface GameState {
  mode: GameMode;
  board: Tile[][];
  solution: Tile[][];
  emptyPosition: Position;
  isWon: boolean;
}

type GameAction =
  | { type: 'SET_MODE'; payload: GameMode }
  | { type: 'MOVE_TILE'; payload: Position }
  | { type: 'RESET_GAME' }
  | { type: 'SET_BOARD'; payload: { board: Tile[][]; emptyPosition: Position } }
  | { type: 'SOLVE_ALL_BUT_LAST' }
  | { type: 'SET_WON' };

interface GameContextType {
  state: GameState;
  setMode: (mode: GameMode) => void;
  handleTileClick: (position: Position) => void;
  resetGame: () => void;
  setBoard: (board: Tile[][], emptyPosition: Position) => void;
  handleSolveAllButLast: () => void;
}

// Initial state
const initialState: GameState = {
  mode: 'single',
  board: INITIAL_GAME_STATE.board,
  solution: INITIAL_GAME_STATE.solution,
  emptyPosition: INITIAL_GAME_STATE.emptyPosition,
  isWon: false
};

// Reducer
function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'SET_MODE':
      return {
        ...createInitialGameState(),
        mode: action.payload,
        isWon: false
      };

    case 'MOVE_TILE': {
      const result = moveTile(state.board, action.payload, state.emptyPosition);
      const isWon = checkWin(result.board, state.solution);
      
      return {
        ...state,
        board: result.board,
        emptyPosition: result.emptyPosition,
        isWon
      };
    }

    case 'RESET_GAME': {
      const newState = createInitialGameState();
      return {
        ...state,
        board: newState.board,
        solution: newState.solution,
        emptyPosition: newState.emptyPosition,
        isWon: false
      };
    }

    case 'SET_BOARD':
      return {
        ...state,
        board: action.payload.board,
        emptyPosition: action.payload.emptyPosition,
        isWon: false
      };

    case 'SOLVE_ALL_BUT_LAST': {
      const result = solveAllButLast(state.solution);
      return {
        ...state,
        board: result.board,
        emptyPosition: result.emptyPosition
      };
    }

    case 'SET_WON':
      return {
        ...state,
        isWon: true
      };

    default:
      return state;
  }
}

// Context
const GameContext = createContext<GameContextType | null>(null);

// Provider
export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const multiplayer = useMultiplayer();

  // Callbacks
  const setMode = useCallback((mode: GameMode) => {
    dispatch({ type: 'SET_MODE', payload: mode });
  }, []);

  const handleTileClick = useCallback((position: Position) => {
    dispatch({ type: 'MOVE_TILE', payload: position });
    
    // If in multiplayer mode, notify opponent of move
    if (state.mode === 'multi' && multiplayer.currentRoom) {
      const result = moveTile(state.board, position, state.emptyPosition);
      multiplayer.handleMove(result.board);

      // Check if the move resulted in a win
      if (checkWin(result.board, state.solution)) {
        multiplayer.handleWin();
      }
    }
  }, [state.mode, state.board, state.emptyPosition, state.solution, multiplayer]);

  const resetGame = useCallback(() => {
    dispatch({ type: 'RESET_GAME' });
  }, []);

  const setBoard = useCallback((board: Tile[][], emptyPosition: Position) => {
    dispatch({ 
      type: 'SET_BOARD', 
      payload: { board, emptyPosition } 
    });
  }, []);

  const handleSolveAllButLast = useCallback(() => {
    dispatch({ type: 'SOLVE_ALL_BUT_LAST' });
  }, []);

  const value: GameContextType = {
    state,
    setMode,
    handleTileClick,
    resetGame,
    setBoard,
    handleSolveAllButLast
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};

// Hook
export const useGameState = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGameState must be used within a GameProvider');
  }
  return context;
};

// Custom hook for handling game win state
export const useGameWin = () => {
  const { state, resetGame } = useGameState();
  const multiplayer = useMultiplayer();

  const handleGameWin = useCallback(() => {
    if (state.mode === 'multi') {
      multiplayer.handleWin();
    }
  }, [state.mode, multiplayer]);

  return {
    isWon: state.isWon,
    handleGameWin,
    resetGame
  };
};