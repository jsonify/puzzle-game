// src/components/Game.tsx
import React from 'react';
import { Board } from './Board/Board';
import { GameControls } from './GameControls/GameControls';
import { Menu } from './GameControls/Menu';
import { GameRoom } from './Multiplayer/GameRoom';
import { PlayerList } from './Multiplayer/PlayerList';
import { useGameState } from '../hooks/useGameState';
import { SolutionBoard } from './Board/SolutionBoard';

export const Game: React.FC = () => {
  const gameState = useGameState();

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <Menu />
      
      <div className="max-w-7xl mx-auto space-y-8">
        {gameState.state.mode === 'single' ? (
          <>
            <div className="flex flex-col items-center">
              <Board mode="main" />
              <GameControls />
              <SolutionBoard />
            </div>
          </>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:flex-1">
              <GameRoom />
            </div>
            <div className="lg:w-80">
              <PlayerList />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};