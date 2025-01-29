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
        w-full h-full rounded-lg transition-all duration-200
        flex items-center justify-center
        ${isEmpty ? 'bg-gray-200' : ''}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90 cursor-pointer'}
        min-h-[50px]
      `}
      style={{ 
        backgroundColor: isEmpty ? undefined : color,
        aspectRatio: '1/1'
      }}
      onClick={!isEmpty && !disabled ? onClick : undefined}
      disabled={disabled || isEmpty}
    />
  );
};