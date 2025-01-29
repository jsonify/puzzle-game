#!/bin/bash

# Create main src directory
mkdir -p src/{components/{Board,GameControls,Multiplayer},hooks,context,services}

# Create component files
cat > src/components/Board/Board.tsx << 'EOL'
import React from 'react';
import { Tile } from './Tile';
import { useGameState } from '../../hooks/useGameState';

interface BoardProps {
  mode: 'main' | 'opponent' | 'solution';
}

export const Board: React.FC<BoardProps> = ({ mode }) => {
  const { board, handleTileClick } = useGameState();
  
  return (
    <div className="grid grid-cols-5 gap-2">
      {/* Board implementation */}
    </div>
  );
};
EOL

cat > src/components/Board/Tile.tsx << 'EOL'
import React from 'react';

interface TileProps {
  color: string;
  isEmpty: boolean;
  onClick?: () => void;
}

export const Tile: React.FC<TileProps> = ({ color, isEmpty, onClick }) => {
  return (
    <button
      className={`w-full aspect-square rounded-lg ${isEmpty ? 'bg-gray-200' : ''}`}
      style={{ backgroundColor: isEmpty ? undefined : color }}
      onClick={onClick}
    />
  );
};
EOL

cat > src/components/Board/SolutionBoard.tsx << 'EOL'
import React from 'react';
import { Board } from './Board';

export const SolutionBoard: React.FC = () => {
  return (
    <div className="w-1/2">
      <h2 className="text-xl font-bold mb-4">Solution</h2>
      <Board mode="solution" />
    </div>
  );
};
EOL

cat > src/components/GameControls/Button.tsx << 'EOL'
import React from 'react';

interface ButtonProps {
  variant?: 'primary' | 'secondary';
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary',
  onClick,
  disabled,
  children 
}) => {
  return (
    <button
      className={`px-4 py-2 rounded-lg ${
        variant === 'primary' ? 'bg-blue-500 text-white' : 'bg-gray-200'
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
EOL

cat > src/components/GameControls/Menu.tsx << 'EOL'
import React from 'react';
import { useGameState } from '../../hooks/useGameState';

export const Menu: React.FC = () => {
  const { gameMode, setGameMode } = useGameState();

  return (
    <nav className="fixed top-0 left-0 p-4">
      {/* Menu implementation */}
    </nav>
  );
};
EOL

cat > src/components/Multiplayer/PlayerList.tsx << 'EOL'
import React from 'react';
import { useMultiplayer } from '../../hooks/useMultiplayer';

export const PlayerList: React.FC = () => {
  const { players, challengePlayer } = useMultiplayer();

  return (
    <div className="w-64 bg-white rounded-lg p-4">
      {/* Player list implementation */}
    </div>
  );
};
EOL

cat > src/components/Multiplayer/GameRoom.tsx << 'EOL'
import React from 'react';
import { Board } from '../Board/Board';
import { useMultiplayer } from '../../hooks/useMultiplayer';

export const GameRoom: React.FC = () => {
  const { gameState, opponent } = useMultiplayer();

  return (
    <div className="flex gap-8">
      {/* Game room implementation */}
    </div>
  );
};
EOL

# Create hooks
cat > src/hooks/useGameState.ts << 'EOL'
import { useState, useContext } from 'react';
import { GameContext } from '../context/GameContext';

export const useGameState = () => {
  const context = useContext(GameContext);
  
  if (!context) {
    throw new Error('useGameState must be used within a GameProvider');
  }

  return {
    // Game state and methods
  };
};
EOL

cat > src/hooks/usePuzzleLogic.ts << 'EOL'
import { useState } from 'react';
import { createBoard, isSolved } from '../services/gameLogic';

export const usePuzzleLogic = () => {
  const [board, setBoard] = useState(() => createBoard());

  return {
    board,
    moveTile: () => {},
    checkWin: () => {},
    resetBoard: () => {},
  };
};
EOL

cat > src/hooks/useMultiplayer.ts << 'EOL'
import { useContext, useEffect } from 'react';
import { MultiplayerContext } from '../context/MultiplayerContext';
import { socket } from '../services/socket';

export const useMultiplayer = () => {
  const context = useContext(MultiplayerContext);

  if (!context) {
    throw new Error('useMultiplayer must be used within a MultiplayerProvider');
  }

  return {
    // Multiplayer state and methods
  };
};
EOL

# Create context files
cat > src/context/GameContext.tsx << 'EOL'
import React, { createContext, useReducer } from 'react';

interface GameState {
  mode: 'single' | 'multi';
  board: Array<Array<{ color: string; isEmpty: boolean }>>;
  // Other game state
}

export const GameContext = createContext<GameState | null>(null);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <GameContext.Provider value={null}>
      {children}
    </GameContext.Provider>
  );
};
EOL

cat > src/context/MultiplayerContext.tsx << 'EOL'
import React, { createContext } from 'react';

interface MultiplayerState {
  room: string | null;
  players: Array<{ id: string; username: string }>;
  // Other multiplayer state
}

export const MultiplayerContext = createContext<MultiplayerState | null>(null);

export const MultiplayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <MultiplayerContext.Provider value={null}>
      {children}
    </MultiplayerContext.Provider>
  );
};
EOL

# Create service files
cat > src/services/socket.ts << 'EOL'
import { io } from 'socket.io-client';

export const socket = io();

export const initializeSocket = () => {
  // Socket event handlers
};
EOL

cat > src/services/gameLogic.ts << 'EOL'
interface Tile {
  color: string;
  isEmpty: boolean;
}

export const createBoard = (): Array<Array<Tile>> => {
  // Board creation logic
  return [];
};

export const isSolved = (board: Array<Array<Tile>>): boolean => {
  // Win condition check
  return false;
};
EOL

# Create main App file
cat > src/App.tsx << 'EOL'
import React from 'react';
import { GameProvider } from './context/GameContext';
import { MultiplayerProvider } from './context/MultiplayerContext';
import { Board } from './components/Board/Board';
import { Menu } from './components/GameControls/Menu';

export const App: React.FC = () => {
  return (
    <GameProvider>
      <MultiplayerProvider>
        <div className="min-h-screen bg-gray-100">
          <Menu />
          {/* Main app layout */}
        </div>
      </MultiplayerProvider>
    </GameProvider>
  );
};
EOL

# Make the script executable
chmod +x setup.sh

echo "Project structure has been created successfully!"