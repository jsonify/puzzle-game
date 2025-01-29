// src/components/GameControls/Menu.tsx
import React, { useState } from 'react';
import { Button } from './Button';
import { useGameState } from '../../context/GameContext';
import { Menu as MenuIcon, X } from 'lucide-react';

export const Menu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { state, setMode, resetGame, handleSolveAllButLast } = useGameState();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleModeSelect = (mode: 'single' | 'multi') => {
    setMode(mode);
    setIsOpen(false);
  };

  const handleReset = () => {
    resetGame();
    setIsOpen(false);
  };

  return (
    <>
      {/* Menu Toggle Button */}
      <button
        onClick={toggleMenu}
        className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition-colors duration-200"
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
      >
        {isOpen ? <X size={24} /> : <MenuIcon size={24} />}
      </button>

      {/* Side Menu */}
      <div className={`
        fixed top-0 left-0 h-full w-64 bg-white shadow-xl z-40
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 space-y-4">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Game Controls</h3>
          
          <div className="space-y-3">
            <Button
              variant="primary"
              onClick={() => handleModeSelect('single')}
              fullWidth
              disabled={state.mode === 'single'}
            >
              Single Player
            </Button>
            
            <Button
              variant="primary"
              onClick={() => handleModeSelect('multi')}
              fullWidth
              disabled={state.mode === 'multi'}
            >
              Multiplayer
            </Button>
          </div>

          <div className="pt-4 border-t border-gray-200 space-y-3">
            <Button
              variant="secondary"
              onClick={handleReset}
              fullWidth
            >
              Reset Game
            </Button>
            
            {state.mode === 'single' && (
              <Button
                variant="secondary"
                onClick={handleSolveAllButLast}
                fullWidth
              >
                Solve All But Last
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={toggleMenu}
          aria-hidden="true"
        />
      )}
    </>
  );
};