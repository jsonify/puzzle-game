// src/context/MultiplayerContext.tsx
import React, { createContext, useContext, useState, useCallback } from 'react';
import { socketService, useSocket, PlayerList, GameStatePayload } from '../services/socket';
import { Tile } from '../services/gameLogic';

interface MultiplayerContextType {
  isConnected: boolean;
  currentRoom: string | null;
  username: string | null;
  players: PlayerList;
  opponent: { id: string; username: string } | null;
  isGameActive: boolean;
  gameState: GameStatePayload | null;
  opponentBoard: Tile[][] | null;
  setUsername: (username: string) => void;
  findGame: () => void;
  challengePlayer: (playerId: string) => void;
  acceptChallenge: (challengerId: string, roomId: string) => void;
  declineChallenge: (challengerId: string) => void;
  handleMove: (board: Tile[][]) => void;
  handleWin: () => void;
}

const MultiplayerContext = createContext<MultiplayerContextType | null>(null);

export const MultiplayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRoom, setCurrentRoom] = useState<string | null>(null);
  const [username, setUsernameState] = useState<string | null>(null);
  const [players, setPlayers] = useState<PlayerList>([]);
  const [opponent, setOpponent] = useState<{ id: string; username: string } | null>(null);
  const [isGameActive, setIsGameActive] = useState(false);
  const [gameState, setGameState] = useState<GameStatePayload | null>(null);
  const [opponentBoard, setOpponentBoard] = useState<Tile[][] | null>(null);

  // Socket event handlers
  const handlers = {
    onPlayerList: (playerList: PlayerList) => {
      setPlayers(playerList);
    },

    onChallengeReceived: ({ challengerId, challengerName, roomId }) => {
      // Handle challenge modal through UI components
      console.log('Challenge received', { challengerId, challengerName, roomId });
    },

    onWaiting: () => {
      setIsGameActive(false);
    },

    onGameStart: (newGameState: GameStatePayload) => {
      setCurrentRoom(newGameState.roomId);
      setGameState(newGameState);
      setIsGameActive(true);

      // Set opponent
      const opponentId = newGameState.players.find(id => id !== socketService.getId());
      if (opponentId) {
        const opponentData = players.find(([id]) => id === opponentId);
        if (opponentData) {
          setOpponent({ id: opponentData[0], username: opponentData[1].username });
        }
      }
    },

    onOpponentMove: ({ board }) => {
      setOpponentBoard(board);
    },

    onGameOver: (data) => {
      setIsGameActive(false);
      setCurrentRoom(null);
      setGameState(null);
      setOpponentBoard(null);
      // Game over modal can be handled by UI components
    },

    onPlayerDisconnected: () => {
      setIsGameActive(false);
      setCurrentRoom(null);
      setGameState(null);
      setOpponentBoard(null);
      setOpponent(null);
    }
  };

  // Initialize socket connection
  useSocket(handlers);

  // Action handlers
  const setUsername = useCallback((name: string) => {
    setUsernameState(name);
    socketService.setUsername(name);
  }, []);

  const findGame = useCallback(() => {
    socketService.findGame();
  }, []);

  const challengePlayer = useCallback((playerId: string) => {
    socketService.challengePlayer(playerId);
  }, []);

  const acceptChallenge = useCallback((challengerId: string, roomId: string) => {
    socketService.acceptChallenge(challengerId, roomId);
  }, []);

  const declineChallenge = useCallback((challengerId: string) => {
    socketService.declineChallenge(challengerId);
  }, []);

  const handleMove = useCallback((board: Tile[][]) => {
    if (currentRoom) {
      socketService.moveMade({ roomId: currentRoom, board });
    }
  }, [currentRoom]);

  const handleWin = useCallback(() => {
    if (currentRoom) {
      socketService.gameWon(currentRoom);
    }
  }, [currentRoom]);

  const value: MultiplayerContextType = {
    isConnected: socketService.isConnected(),
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

  return (
    <MultiplayerContext.Provider value={value}>
      {children}
    </MultiplayerContext.Provider>
  );
};

export const useMultiplayer = () => {
  const context = useContext(MultiplayerContext);
  if (!context) {
    throw new Error('useMultiplayer must be used within a MultiplayerProvider');
  }
  return context;
};