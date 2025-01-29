// src/components/GameControls/GameControls.tsx
import React from 'react';
import { Button } from './Button';
import { useGameState } from '../../context/GameContext';
import { useMultiplayer } from '../../context/MultiplayerContext';

export const GameControls: React.FC = () => {
  const { state, resetGame, handleSolveAllButLast } = useGameState();
  const { findGame } = useMultiplayer();

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="flex gap-4 mb-6">
        {state.mode === 'single' ? (
          <>
            <Button
              variant="primary"
              onClick={resetGame}
              fullWidth
            >
              Randomize
            </Button>
            <Button
              variant="secondary"
              onClick={handleSolveAllButLast}
              fullWidth
            >
              Solve All But Last
            </Button>
          </>
        ) : (
          <Button
            variant="primary"
            onClick={findGame}
            fullWidth
            disabled={state.isWon}
          >
            Find Game
          </Button>
        )}
      </div>
    </div>
  );
};