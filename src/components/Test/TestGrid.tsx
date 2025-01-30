import React from 'react';

const TestGrid = () => {
  const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD'
  ];

  const tiles = Array.from({ length: 25 }, (_, i) => ({
    color: colors[Math.floor(i / 5)],
    isEmpty: i === 24
  }));

  return (
    <div className="p-4" style={{ width: '500px' }}>
      <h2 className="text-2xl font-bold mb-4">Test 5x5 Grid</h2>
      
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: '8px',
          backgroundColor: 'white',
          padding: '16px',
          borderRadius: '8px'
        }}
      >
        {tiles.map((tile, index) => (
          <div 
            key={index}
            style={{
              paddingBottom: '100%',
              position: 'relative'
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: tile.isEmpty ? '#e5e7eb' : tile.color,
                borderRadius: '8px'
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestGrid;