// src/components/Board/Tile.tsx
import React from 'react';

interface TileProps {
  color: string;
  isEmpty: boolean;
  onClick?: () => void;
  disabled?: boolean;
}

export const Tile: React.FC<TileProps> = ({ color, isEmpty, onClick, disabled }) => {
  return (
    <button
      className={`
        w-full aspect-square rounded-lg transition-opacity duration-200
        ${isEmpty ? 'bg-gray-200 cursor-default' : 'hover:opacity-90'}
        ${disabled ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'}
      `}
      style={{ backgroundColor: isEmpty ? undefined : color }}
      onClick={!isEmpty && !disabled ? onClick : undefined}
      disabled={disabled || isEmpty}
      aria-label={isEmpty ? 'Empty tile' : 'Puzzle tile'}
    />
  );
};
