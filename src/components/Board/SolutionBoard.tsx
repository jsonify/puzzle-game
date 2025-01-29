// src/components/Board/SolutionBoard.tsx
import React from 'react';
import { Board } from './Board';
import { useGameState } from '../../context/GameContext';

export const SolutionBoard: React.FC = () => {
  const { state } = useGameState();
  
  return (
    <div className="flex flex-col items-center mt-8 w-full">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Solution</h2>
      <div className="w-1/2 max-w-md">
        <Board 
          mode="solution" 
          board={state.solution}
        />
      </div>
    </div>
  );
};