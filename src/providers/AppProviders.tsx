// src/providers/AppProviders.tsx
import React from 'react';
import { MultiplayerProvider } from '../context/MultiplayerContext';
import { GameProvider } from '../context/GameContext';

interface AppProvidersProps {
  children: React.ReactNode;
}

export const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <MultiplayerProvider>
      <GameProvider>
        {children}
      </GameProvider>
    </MultiplayerProvider>
  );
};