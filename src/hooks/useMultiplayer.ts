// src/hooks/useMultiplayer.ts
import { useContext, useEffect } from 'react';
import { MultiplayerContext } from '../context/MultiplayerContext';
import type { Tile } from '../types';

export const useMultiplayer = () => {
  const context = useContext(MultiplayerContext);

  if (!context) {
    throw new Error('useMultiplayer must be used within a MultiplayerProvider');
  }

  const {
    isConnected,
    currentRoom,
    username,
    players,
    opponent,
    isGameActive,
    gameState,
    opponentBoard,
    setUsername,
    findGame,
    challengePlayer,
    acceptChallenge,
    declineChallenge,
    handleMove,
    handleWin
  } = context;

  return {
    isConnected,
    currentRoom,
    username,
    players,
    opponent,
    isGameActive,
    gameState,
    opponentBoard,
    setUsername,
    findGame,
    challengePlayer,
    acceptChallenge,
    declineChallenge,
    handleMove,
    handleWin
  };
};

