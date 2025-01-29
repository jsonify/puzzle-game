import React from 'react';
import { AppProviders } from './providers/AppProviders';
import { Game } from './components/Game';

export const App: React.FC = () => {
  return (
    <AppProviders>
      <Game />
    </AppProviders>
  );
};
