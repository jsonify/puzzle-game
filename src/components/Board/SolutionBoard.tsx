// src/components/Board/SolutionBoard.tsx
import React from 'react';
import { Board } from './Board';
import { useGameState } from '../../context/GameContext';

export const SolutionBoard: React.FC = () => {
  const { state } = useGameState();
  
  return (
    <div className="w-full h-full">
      <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">Solution</h2>
      <Board 
        mode="solution" 
        board={state.solution}
      />
    </div>
  );
};
