import React from 'react';
import { Board } from './Board/Board';
import { GameControls } from './GameControls/GameControls';
import { Menu } from './GameControls/Menu';
import { GameRoom } from './Multiplayer/GameRoom';
import { PlayerList } from './Multiplayer/PlayerList';
import { useGameState } from '../hooks/useGameState';
import { SolutionBoard } from './Board/SolutionBoard';

export const Game = () => {
  const gameState = useGameState();

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <Menu />
      
      <div className="container mx-auto max-w-7xl">
        {gameState.state.mode === 'single' ? (
          <div className="flex flex-col items-center space-y-8 w-full">
            <div className="w-full max-w-2xl"> {/* Added width constraint */}
              <Board mode="main" />
            </div>
            
            <div className="w-full max-w-2xl"> {/* Added width constraint */}
              <GameControls />
            </div>
            
            <div className="w-full max-w-xl"> {/* Smaller width for solution board */}
              <SolutionBoard />
            </div>
          </div>
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