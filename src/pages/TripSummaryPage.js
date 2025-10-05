import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TripSummary from '../components/TripSummary';
import { useTripManager } from '../hooks/useTripManager';
import { exportTripPlanAsPDF } from '../utils/pdfExport';

export default function TripSummaryPage() {
  const navigate = useNavigate();
  const { destinations, totalDistance, totalDuration } = useTripManager();
  
  // 🇮🇳 Change default price to INR (~95/L)
  const [fuelEfficiency, setFuelEfficiency] = useState(8); // L/100km
  const [fuelPrice, setFuelPrice] = useState(90.0); // ₹ per liter
  
  const handleExport = () => {
    const tripData = {
      destinations,
      stats: {
        totalDistance,
        totalDuration,
        fuelEfficiency,
        fuelPrice
      }
    };
    exportTripPlanAsPDF(tripData);
  };
  
  const goToMap = () => {
    navigate('/map');
  };
  
  const goToHome = () => {
    navigate('/');
  };
  
  const handleFuelEfficiencyChange = (e) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value > 0) {
      setFuelEfficiency(value);
    }
  };
  
  const handleFuelPriceChange = (e) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value > 0) {
      setFuelPrice(value);
    }
  };
  
  // 🇮🇳 Define the currency symbol
  const CURRENCY_SYMBOL = '₹';
  
  return (
    <div className="trip-summary-page">
      <div className="summary-header">
        <button onClick={goToMap} className="back-button">← Back to Map</button>
        <h1>Trip Summary</h1>
      </div>
      
      <div className="trip-overview">
        <h2>Your Road Trip</h2>
        
        {destinations.length > 0 ? (
          <>
            <div className="destinations-overview">
              <h3>Destinations</h3>
              <ol className="destinations-list">
                {destinations.map((dest) => (
                  <li key={dest.id}>
                    <strong>{dest.name}</strong>
                    <span>{dest.address}</span>
                  </li>
                ))}
              </ol>
            </div>
            
            <div className="fuel-calculator">
              <h3>Fuel Cost Estimator</h3>
              <div className="fuel-inputs">
                <div className="input-group">
                  <label htmlFor="fuel-efficiency">Fuel Efficiency (L/100km):</label>
                  <input
                    id="fuel-efficiency"
                    type="number"
                    min="1"
                    max="30"
                    step="0.1"
                    value={fuelEfficiency}
                    onChange={handleFuelEfficiencyChange}
                  />
                </div>
                <div className="input-group">
                  {/* 🇮🇳 Change label to use Rupee symbol */}
                  <label htmlFor="fuel-price">Fuel Price ({CURRENCY_SYMBOL}/L):</label> 
                  <input
                    id="fuel-price"
                    type="number"
                    min="0.1"
                    max="200"
                    step="0.1"
                    value={fuelPrice}
                    onChange={handleFuelPriceChange}
                  />
                </div>
              </div>
              
              {/* 💡 Change 3: Pass the currencySymbol to the TripSummary component */}
              <TripSummary 
                fuelEfficiency={fuelEfficiency} 
                fuelPrice={fuelPrice} 
                currencySymbol={CURRENCY_SYMBOL} 
              />
            </div>
            
            <div className="summary-actions">
              <button className="btn-export" onClick={handleExport}>
                Export as PDF
              </button>
              <button onClick={goToHome} className="btn-edit-trip">
                Edit Trip
              </button>
            </div>
          </>
        ) : (
          <div className="no-trip-data">
            <p>No trip data available. Please add destinations to your trip.</p>
            <button onClick={goToHome} className="btn-start-planning">Start Planning</button>
          </div>
        )}
      </div>
    </div>
  );
}