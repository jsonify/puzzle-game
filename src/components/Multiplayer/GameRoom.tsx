// src/components/Multiplayer/GameRoom.tsx
import React from 'react';
import { Board } from '../Board/Board';
import { useMultiplayer } from '../../context/MultiplayerContext';
import { User } from 'lucide-react';

interface PlayerBoardProps {
  title: string;
  board: any;
  isMain?: boolean;
  username?: string;
}

const PlayerBoard: React.FC<PlayerBoardProps> = ({ title, board, isMain = false, username }) => (
  <div className="flex-1 min-w-0">
    <div className="flex items-center gap-2 mb-4">
      <User size={20} className="text-gray-500" />
      <h2 className="text-xl font-bold text-gray-800">{title}</h2>
      {username && <span className="text-sm text-gray-500">({username})</span>}
    </div>
    <Board 
      mode={isMain ? 'main' : 'opponent'} 
      board={board}
    />
  </div>
);

export const GameRoom: React.FC = () => {
  const { 
    isGameActive,
    gameState,
    opponentBoard,
    opponent,
    username: currentUsername
  } = useMultiplayer();

  if (!isGameActive || !gameState) {
    return (
      <div className="flex justify-center items-center h-64 bg-white rounded-xl p-6">
        <div className="text-center text-gray-500">
          <p className="font-semibold mb-2">Waiting for game to start...</p>
          <p className="text-sm">Challenge a player or wait for an invitation</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8 w-full">
      {/* Main player's board */}
      <PlayerBoard
        title="Your Board"
        board={gameState.board}
        isMain={true}
        username={currentUsername || undefined}
      />

      {/* Opponent's board */}
      <PlayerBoard
        title="Opponent's Board"
        board={opponentBoard || gameState.board}
        username={opponent?.username}
      />
    </div>
  );
};