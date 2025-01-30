// src/components/Game.tsx
// import React from 'react';
// import TestGrid from './Test/TestGrid';

// export const Game: React.FC = () => {
//   return (
//     <div className="min-h-screen bg-gray-100 flex justify-center items-center">
//       <TestGrid />
//     </div>
//   );
// };




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
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <Menu />
      
      <div className="flex flex-col items-center gap-5 p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Sliding Puzzle Race
        </h1>

        {gameState.state.mode === 'single' ? (
          <div className="flex flex-col items-center gap-8">
            {/* Main Board */}
            <div className="w-[500px] h-[500px]">
              <Board mode="main" />
            </div>

            {/* Controls */}
            <GameControls />

            {/* Solution Board */}
            <div className="w-[250px] h-[250px]">
              <SolutionBoard />
            </div>
          </div>
        ) : (
          <div className="flex gap-8">
            <div className="flex-1">
              <GameRoom />
            </div>
            <div className="w-80">
              <PlayerList />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
