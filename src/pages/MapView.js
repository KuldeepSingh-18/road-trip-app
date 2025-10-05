import React, { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useTripManager } from '../hooks/useTripManager';
import TripSummary from '../components/TripSummary';

// Fix Leaflet marker icon issue
import L from 'leaflet';
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

export default function MapView() {
  const navigate = useNavigate();
  const { 
    destinations, 
    routeCoordinates,
    updateRoute,
    loadSavedTrip
  } = useTripManager();
  
  // Use useCallback to prevent function recreation on every render
  const loadTrip = useCallback(() => {
    loadSavedTrip();
  }, [loadSavedTrip]);
  
  const initRoute = useCallback(() => {
    if (destinations.length > 1) {
      updateRoute(destinations);
    }
  }, [destinations, updateRoute]);
  
  // Separate the effects to avoid dependency cycles
  useEffect(() => {
    loadTrip();
  }, [loadTrip]);
  
  useEffect(() => {
    initRoute();
  }, [initRoute]);
  
  // Calculate map bounds
  const getBounds = () => {
    if (destinations.length === 0) {
      return [[0, 0], [0, 0]]; // Default center
    }
    
    if (destinations.length === 1) {
      const [lng, lat] = destinations[0].coordinates;
      return [[lat, lng], [lat, lng]];
    }
    
    // Find min/max coordinates to set bounds
    const lats = destinations.map(d => d.coordinates[1]);
    const lngs = destinations.map(d => d.coordinates[0]);
    
    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);
    const minLng = Math.min(...lngs);
    const maxLng = Math.max(...lngs);
    
    // Add some padding
    const padding = 0.1;
    return [
      [minLat - padding, minLng - padding],
      [maxLat + padding, maxLng + padding]
    ];
  };
  
  // Get center point for initial map view
  const getCenter = () => {
    if (destinations.length === 0) {
      return [40, -95]; // Default center (US)
    }
    
    const [lng, lat] = destinations[0].coordinates;
    return [lat, lng];
  };
  
  const goToSummary = () => {
    navigate('/summary');
  };
  
  const goToHome = () => {
    navigate('/');
  };
  
  return (
    <div className="map-view-page">
      <div className="map-header">
        <button onClick={goToHome} className="back-button">← Back to Trip</button>
        <h1>Trip Map</h1>
        <button onClick={goToSummary} className="summary-button">View Summary →</button>
      </div>
      
      <div className="map-container">
        {destinations.length > 0 ? (
          <MapContainer
            center={getCenter()}
            bounds={getBounds()}
            zoom={6}
            style={{ height: '70vh', width: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            
            {destinations.map((destination, index) => (
              <Marker 
                key={destination.id} 
                position={[destination.coordinates[1], destination.coordinates[0]]}
              >
                <Popup>
                  <strong>{index + 1}. {destination.name}</strong>
                  <p>{destination.address}</p>
                </Popup>
              </Marker>
            ))}
            
            {routeCoordinates.length > 0 && (
              <Polyline
                positions={routeCoordinates}
                color="blue"
                weight={4}
                opacity={0.7}
              />
            )}
          </MapContainer>
        ) : (
          <div className="no-destinations">
            <p>Add destinations to see them on the map.</p>
            <button onClick={goToHome} className="btn-add-destinations">Add Destinations</button>
          </div>
        )}
      </div>
      
      <TripSummary />
    </div>
  );
}