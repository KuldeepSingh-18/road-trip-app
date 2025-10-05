import React from 'react';
import { useTripManager } from '../hooks/useTripManager';
import { formatDistance, formatDuration, estimateFuelCost } from '../utils/distanceCalc';

export default function TripSummary({ 
  fuelEfficiency = 15, 
  fuelPrice = 90 ,
 
  currencySymbol = '₹' 
}) {
  const { totalDistance, totalDuration } = useTripManager();
  
  // totalDistance and totalDuration are correctly used below
  // NOTE: You should also update fuelPrice default to a realistic Rupee value (e.g., 95.0) 
  // in the TripSummaryPage.js component, as we did in the previous step.
  const fuelCost = estimateFuelCost(totalDistance, fuelEfficiency, fuelPrice);
  
  return (
    <div className="trip-summary">
      <h2>Trip Summary</h2>
      
      <div className="summary-stats">
        <div className="stat">
          <span className="stat-label">Total Distance</span>
          <span className="stat-value">{formatDistance(totalDistance)}</span> 
        </div>
        
        <div className="stat">
          <span className="stat-label">Driving Time</span>
          <span className="stat-value">{formatDuration(totalDuration)}</span>
        </div>
        
        <div className="stat">
          <span className="stat-label">Estimated Fuel Cost</span>
          {/* This correctly uses the currencySymbol prop, which now defaults to '₹' */}
          <span className="stat-value">{currencySymbol}{fuelCost}</span>
        </div>
      </div>
    </div>
  );
}