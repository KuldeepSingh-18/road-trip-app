import { createContext, useReducer, useContext } from 'react';

const TripContext = createContext();

const initialState = {
  destinations: [],
  selectedDestination: null,
  totalDistance: 0,
  totalDuration: 0,
  routeCoordinates: []
};

function tripReducer(state, action) {
  switch (action.type) {
    case 'ADD_DESTINATION':
      return {
        ...state,
        destinations: [...state.destinations, action.payload]
      };
    case 'REMOVE_DESTINATION':
      return {
        ...state,
        destinations: state.destinations.filter(dest => dest.id !== action.payload)
      };
    case 'REORDER_DESTINATIONS':
      return {
        ...state,
        destinations: action.payload
      };
    case 'SET_SELECTED_DESTINATION':
      return {
        ...state,
        selectedDestination: action.payload
      };
    case 'UPDATE_TRIP_STATS':
      return {
        ...state,
        totalDistance: action.payload.distance,
        totalDuration: action.payload.duration
      };
    case 'SET_ROUTE_COORDINATES':
      return {
        ...state,
        routeCoordinates: action.payload
      };
    case 'RESET_TRIP':
      return initialState;
    default:
      return state;
  }
}

export function TripProvider({ children }) {
  const [state, dispatch] = useReducer(tripReducer, initialState);

  return (
    <TripContext.Provider value={{ state, dispatch }}>
      {children}
    </TripContext.Provider>
  );
}

export function useTripContext() {
  return useContext(TripContext);
}
