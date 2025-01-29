import React from 'react';
import { Button } from '../GameControls/Button';

interface ChallengeModalProps {
  challengerName: string;
  onAccept: () => void;
  onDecline: () => void;
}

export const ChallengeModal: React.FC<ChallengeModalProps> = ({
  challengerName,
  onAccept,
  onDecline,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-6 max-w-sm w-full shadow-xl">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Challenge Received!</h2>
        
        <p className="text-gray-600 mb-6">
          {challengerName} wants to play a game with you!
        </p>
        
        <div className="flex gap-3">
          <Button
            variant="primary"
            onClick={onAccept}
            fullWidth
          >
            Accept
          </Button>
          
          <Button
            variant="secondary"
            onClick={onDecline}
            fullWidth
          >
            Decline
          </Button>
        </div>
      </div>
    </div>
  );
};

// Optional: Create a container component to manage challenge state
export const ChallengeModalContainer: React.FC = () => {
  const { 
    currentChallenge,
    acceptChallenge,
    declineChallenge 
  } = useMultiplayer();

  if (!currentChallenge) return null;

  const handleAccept = () => {
    acceptChallenge(
      currentChallenge.challengerId,
      currentChallenge.roomId
    );
  };

  const handleDecline = () => {
    declineChallenge(currentChallenge.challengerId);
  };

  return (
    <ChallengeModal
      challengerName={currentChallenge.challengerName}
      onAccept={handleAccept}
      onDecline={handleDecline}
    />
  );
};