// src/components/Multiplayer/PlayerList.tsx
import React from 'react';
import { Button } from '../GameControls/Button';
import { useMultiplayer } from '../../context/MultiplayerContext';
import { Users } from 'lucide-react';

interface PlayerItemProps {
  id: string;
  username: string;
  status: 'available' | 'in-game';
  onChallenge: (id: string) => void;
}

const PlayerItem: React.FC<PlayerItemProps> = ({ id, username, status, onChallenge }) => (
  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
    <div className="flex items-center gap-2">
      <div className={`w-2 h-2 rounded-full ${
        status === 'available' ? 'bg-green-500' : 'bg-gray-400'
      }`} />
      <span className="font-medium text-gray-700">{username}</span>
    </div>
    <Button
      variant="secondary"
      size="sm"
      onClick={() => onChallenge(id)}
      disabled={status === 'in-game'}
    >
      Challenge
    </Button>
  </div>
);

export const PlayerList: React.FC = () => {
  const { players, challengePlayer, username: currentUsername } = useMultiplayer();
  const availablePlayers = players.filter(([id]) => id !== currentUsername);

  if (availablePlayers.length === 0) {
    return (
      <div className="w-full bg-white rounded-xl p-6 shadow-sm">
        <div className="flex flex-col items-center text-gray-500 py-8">
          <Users size={48} className="mb-4 opacity-50" />
          <p className="text-center">No other players available</p>
          <p className="text-sm">Wait for players to join or invite friends!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Available Players</h3>
      <div className="space-y-2">
        {availablePlayers.map(([id, data]) => (
          <PlayerItem
            key={id}
            id={id}
            username={data.username}
            status={data.status}
            onChallenge={challengePlayer}
          />
        ))}
      </div>
    </div>
  );
};