// src/services/socket.ts
import { io, Socket } from 'socket.io-client';
import { Tile } from './gameLogic';

// Event payload types
export interface GameStatePayload {
  roomId: string;
  board: Tile[][];
  solution: Tile[][];
  players: string[];
  startTime: number;
}

export interface ChallengePayload {
  challengerId: string;
  challengerName: string;
  roomId: string;
}

export interface MovePayload {
  roomId: string;
  board: Tile[][];
}

export interface GameOverPayload {
  winnerId: string;
  endTime: number;
  startTime: number;
}

export interface PlayerData {
  username: string;
  status: 'available' | 'in-game';
}

export type PlayerList = [string, PlayerData][];

// Socket event handlers type
export interface SocketHandlers {
  onPlayerList?: (players: PlayerList) => void;
  onChallengeReceived?: (data: ChallengePayload) => void;
  onChallengeDeclined?: (challengerId: string) => void;
  onWaiting?: () => void;
  onGameStart?: (gameState: GameStatePayload) => void;
  onOpponentMove?: (data: { playerId: string; board: Tile[][] }) => void;
  onGameOver?: (data: GameOverPayload) => void;
  onPlayerDisconnected?: () => void;
}

class SocketService {
  private socket: Socket | null = null;
  private handlers: SocketHandlers = {};

  // Initialize socket connection
  connect() {
    if (this.socket) return;

    this.socket = io();
    this.setupEventListeners();
  }

  // Disconnect socket
  disconnect() {
    if (!this.socket) return;

    this.socket.disconnect();
    this.socket = null;
  }

  // Set up event handlers
  setupEventListeners() {
    if (!this.socket) return;

    this.socket.on('playerList', (players: PlayerList) => {
      this.handlers.onPlayerList?.(players);
    });

    this.socket.on('challengeReceived', (data: ChallengePayload) => {
      this.handlers.onChallengeReceived?.(data);
    });

    this.socket.on('challengeDeclined', (challengerId: string) => {
      this.handlers.onChallengeDeclined?.(challengerId);
    });

    this.socket.on('waiting', () => {
      this.handlers.onWaiting?.();
    });

    this.socket.on('gameStart', (gameState: GameStatePayload) => {
      this.handlers.onGameStart?.(gameState);
    });

    this.socket.on('opponentMove', (data: { playerId: string; board: Tile[][] }) => {
      this.handlers.onOpponentMove?.(data);
    });

    this.socket.on('gameOver', (data: GameOverPayload) => {
      this.handlers.onGameOver?.(data);
    });

    this.socket.on('playerDisconnected', () => {
      this.handlers.onPlayerDisconnected?.();
    });
  }

  // Register event handlers
  setHandlers(handlers: SocketHandlers) {
    this.handlers = { ...this.handlers, ...handlers };
  }

  // Emit events
  setUsername(username: string) {
    this.socket?.emit('setUsername', username);
  }

  findGame() {
    this.socket?.emit('findGame');
  }

  challengePlayer(challengedPlayerId: string) {
    this.socket?.emit('challengePlayer', challengedPlayerId);
  }

  acceptChallenge(challengerId: string, roomId: string) {
    this.socket?.emit('acceptChallenge', { challengerId, roomId });
  }

  declineChallenge(challengerId: string) {
    this.socket?.emit('declineChallenge', challengerId);
  }

  moveMade(data: MovePayload) {
    this.socket?.emit('moveMade', data);
  }

  gameWon(roomId: string) {
    this.socket?.emit('gameWon', roomId);
  }

  // Utility methods
  getId(): string | undefined {
    return this.socket?.id;
  }

  isConnected(): boolean {
    return this.socket?.connected ?? false;
  }
}

// Create and export singleton instance
export const socketService = new SocketService();

// React hook for using socket
import { useEffect } from 'react';

export const useSocket = (handlers: SocketHandlers) => {
  useEffect(() => {
    socketService.connect();
    socketService.setHandlers(handlers);

    return () => {
      socketService.disconnect();
    };
  }, []);

  return socketService;
};