// src/types.ts
export interface Position {
    row: number;
    col: number;
  }
  
  export interface Tile {
    color: string;
    isEmpty: boolean;
  }
  
  export type GameMode = 'single' | 'multi';