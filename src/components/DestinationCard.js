import React from 'react';
import { useTripManager } from '../hooks/useTripManager';

export default function DestinationCard({ destination, index, total, onMoveUp, onMoveDown }) {
  const { removeDestination } = useTripManager();
  
  return (
    <div className="destination-card">
      <div className="destination-number">{index + 1}</div>
      <div className="destination-info">
        <h3>{destination.name}</h3>
        <p>{destination.address}</p>
      </div>
      <div className="destination-actions">
        {index > 0 && (
          <button 
            className="btn-move-up" 
            title="Move up"
            onClick={onMoveUp}
          >
            ↑
          </button>
        )}
        {index < total - 1 && (
          <button 
            className="btn-move-down" 
            title="Move down"
            onClick={onMoveDown}
          >
            ↓
          </button>
        )}
        <button 
          className="btn-remove" 
          title="Remove destination"
          onClick={() => removeDestination(destination.id)}
        >
          ✕
        </button>
      </div>
    </div>
  );
}