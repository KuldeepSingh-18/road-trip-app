import { useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useTripContext } from '../contexts/TripContext';
import { getRouteDetails } from '../services/mapService';
import { saveTrip, loadTrip } from '../services/storageService';
// Either remove this import if not used or use it somewhere
// import { calculateTripStats } from '../utils/distanceCalc';

export function useTripManager() {
  const { state, dispatch } = useTripContext();
  
  const updateRoute = useCallback(async (destinations) => {
    if (destinations.length < 2) return;
    
    try {
      const routeDetails = await getRouteDetails(destinations);
      
      dispatch({ 
        type: 'UPDATE_TRIP_STATS', 
        payload: { 
          distance: routeDetails.distance, 
          duration: routeDetails.duration 
        } 
      });
      
      dispatch({ 
        type: 'SET_ROUTE_COORDINATES', 
        payload: routeDetails.coordinates 
      });
    } catch (error) {
      console.error('Failed to update route:', error);
    }
  }, [dispatch]);
  
  const addDestination = useCallback(async (destination) => {
    const newDestination = {
      id: uuidv4(),
      name: destination.name,
      coordinates: destination.coordinates,
      address: destination.address
    };
    
    dispatch({ type: 'ADD_DESTINATION', payload: newDestination });
    
    // If we have at least 2 destinations, calculate the route
    if (state.destinations.length > 0) {
      updateRoute([...state.destinations, newDestination]);
    }
    
    // Save to local storage
    saveTrip([...state.destinations, newDestination]);
    
    return newDestination;
  }, [state.destinations, dispatch, updateRoute]);
  
  const removeDestination = useCallback((id) => {
    dispatch({ type: 'REMOVE_DESTINATION', payload: id });
    const updatedDestinations = state.destinations.filter(dest => dest.id !== id);
    
    if (updatedDestinations.length > 1) {
      updateRoute(updatedDestinations);
    } else {
      dispatch({ type: 'UPDATE_TRIP_STATS', payload: { distance: 0, duration: 0 } });
      dispatch({ type: 'SET_ROUTE_COORDINATES', payload: [] });
    }
    
    saveTrip(updatedDestinations);
  }, [state.destinations, dispatch, updateRoute]);
  
  const reorderDestinations = useCallback((newOrder) => {
    dispatch({ type: 'REORDER_DESTINATIONS', payload: newOrder });
    
    if (newOrder.length > 1) {
      updateRoute(newOrder);
    }
    
    saveTrip(newOrder);
  }, [dispatch, updateRoute]);
  
  const loadSavedTrip = useCallback(() => {
    const savedTrip = loadTrip();
    if (savedTrip && savedTrip.length > 0) {
      dispatch({ type: 'REORDER_DESTINATIONS', payload: savedTrip });
      
      if (savedTrip.length > 1) {
        updateRoute(savedTrip);
      }
    }
  }, [dispatch, updateRoute]);
  
  const resetTrip = useCallback(() => {
    dispatch({ type: 'RESET_TRIP' });
    saveTrip([]);
  }, [dispatch]);
  
  return {
    destinations: state.destinations,
    selectedDestination: state.selectedDestination,
    totalDistance: state.totalDistance,
    totalDuration: state.totalDuration,
    routeCoordinates: state.routeCoordinates,
    addDestination,
    removeDestination,
    reorderDestinations,
    updateRoute,
    loadSavedTrip,
    resetTrip
  };
}
