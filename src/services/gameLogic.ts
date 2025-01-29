// src/services/gameLogic.ts

export interface Tile {
  color: string;
  isEmpty: boolean;
}

export interface Position {
  row: number;
  col: number;
}

export interface GameState {
  board: Tile[][];
  emptyPosition: Position;
  solution: Tile[][];
}

const COLORS = [
  '#FF6B6B', // Red
  '#4ECDC4', // Teal
  '#45B7D1', // Blue
  '#96CEB4', // Green
  '#FFEEAD', // Yellow
  '#D4A5A5'  // Pink
];

const GRID_SIZE = 5;
const EMPTY_POSITION: Position = { row: 4, col: 4 };

export const createColorPattern = (): Tile[] => {
  const tiles: Tile[] = [];
  
  // Create 4 tiles of each color (except last color which gets 3 + empty)
  for (let colorIndex = 0; colorIndex < COLORS.length - 1; colorIndex++) {
    for (let i = 0; i < 4; i++) {
      tiles.push({ color: COLORS[colorIndex], isEmpty: false });
    }
  }
  
  // Add 4 tiles of the last color
  for (let i = 0; i < 4; i++) {
    tiles.push({ color: COLORS[COLORS.length - 1], isEmpty: false });
  }
  
  // Add empty tile
  tiles.push({ color: '#e5e7eb', isEmpty: true });
  
  return tiles;
};

export const shuffleTiles = (tiles: Tile[]): Tile[] => {
  const shuffled = [...tiles];
  for (let i = shuffled.length - 2; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const createBoard = (tiles: Tile[]): Tile[][] => {
  const board: Tile[][] = [];
  for (let i = 0; i < GRID_SIZE; i++) {
    board.push(tiles.slice(i * GRID_SIZE, (i + 1) * GRID_SIZE));
  }
  return board;
};

export const createInitialGameState = (): GameState => {
  const tiles = createColorPattern();
  const shuffledMainTiles = shuffleTiles(tiles);
  const shuffledSolutionTiles = shuffleTiles(tiles);

  return {
    board: createBoard(shuffledMainTiles),
    solution: createBoard(shuffledSolutionTiles),
    emptyPosition: findEmptyPosition(createBoard(shuffledMainTiles))
  };
};

export const findEmptyPosition = (board: Tile[][]): Position => {
  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
      if (board[row][col].isEmpty) {
        return { row, col };
      }
    }
  }
  return EMPTY_POSITION; // fallback
};

export const canMoveTile = (position: Position, emptyPosition: Position): boolean => {
  return (position.row === emptyPosition.row || position.col === emptyPosition.col) &&
         !(position.row === emptyPosition.row && position.col === emptyPosition.col);
};

export const moveTile = (board: Tile[][], fromPosition: Position, emptyPosition: Position): GameState => {
  if (!canMoveTile(fromPosition, emptyPosition)) {
    return { board, emptyPosition, solution: [] }; // Return unchanged state
  }

  const newBoard = board.map(row => [...row]);

  if (fromPosition.row === emptyPosition.row) {
    // Move horizontally
    const direction = fromPosition.col < emptyPosition.col ? 1 : -1;
    for (let c = emptyPosition.col; c !== fromPosition.col; c -= direction) {
      newBoard[fromPosition.row][c] = newBoard[fromPosition.row][c - direction];
    }
  } else {
    // Move vertically
    const direction = fromPosition.row < emptyPosition.row ? 1 : -1;
    for (let r = emptyPosition.row; r !== fromPosition.row; r -= direction) {
      newBoard[r][fromPosition.col] = newBoard[r - direction][fromPosition.col];
    }
  }

  // Place empty tile in the clicked position
  newBoard[fromPosition.row][fromPosition.col] = { color: '#e5e7eb', isEmpty: true };

  return {
    board: newBoard,
    emptyPosition: fromPosition,
    solution: board // Preserve existing solution
  };
};

export const checkWin = (board: Tile[][], solution: Tile[][]): boolean => {
  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
      if (board[row][col].color !== solution[row][col].color) {
        return false;
      }
    }
  }
  return true;
};

export const solveAllButLast = (solution: Tile[][]): GameState => {
  const newBoard = solution.map(row => row.map(tile => ({ ...tile })));
  
  // Move empty tile to the last position
  newBoard[EMPTY_POSITION.row][EMPTY_POSITION.col] = { color: '#e5e7eb', isEmpty: true };
  
  // Swap the last two non-empty tiles
  const lastRow = GRID_SIZE - 1;
  const secondLastCol = GRID_SIZE - 2;
  const thirdLastCol = GRID_SIZE - 3;
  
  [newBoard[lastRow][thirdLastCol], newBoard[lastRow][secondLastCol]] = 
  [newBoard[lastRow][secondLastCol], newBoard[lastRow][thirdLastCol]];
  
  return {
    board: newBoard,
    emptyPosition: EMPTY_POSITION,
    solution
  };
};

export const INITIAL_GAME_STATE = createInitialGameState();