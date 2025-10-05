const TRIP_STORAGE_KEY = 'road_trip_planner_data';

export function saveTrip(destinations) {
  try {
    localStorage.setItem(TRIP_STORAGE_KEY, JSON.stringify(destinations));
    return true;
  } catch (error) {
    console.error('Error saving trip to localStorage:', error);
    return false;
  }
}

export function loadTrip() {
  try {
    const tripData = localStorage.getItem(TRIP_STORAGE_KEY);
    return tripData ? JSON.parse(tripData) : [];
  } catch (error) {
    console.error('Error loading trip from localStorage:', error);
    return [];
  }
}

export function clearTrip() {
  try {
    localStorage.removeItem(TRIP_STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing trip from localStorage:', error);
    return false;
  }
}
