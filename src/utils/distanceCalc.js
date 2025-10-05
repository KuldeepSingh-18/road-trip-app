export function calculateTripStats(destinations, routeDetails) {
    if (!routeDetails || destinations.length < 2) {
      return {
        totalDistance: 0,
        totalDuration: 0,
        averageSpeed: 0
      };
    }
    
    const { distance, duration } = routeDetails;
    
    // Calculate average speed (km/h)
    const averageSpeed = duration > 0 ? (distance / (duration / 60)) : 0;
    
    return {
      totalDistance: Math.round(distance * 10) / 10, // Round to 1 decimal place
      totalDuration: Math.round(duration),
      averageSpeed: Math.round(averageSpeed)
    };
  }
  
  export function formatDuration(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = Math.round(minutes % 60);
    
    if (hours === 0) {
      return `${mins} min`;
    } else if (mins === 0) {
      return `${hours} hr`;
    } else {
      return `${hours} hr ${mins} min`;
    }
  }
  
  export function formatDistance(kilometers) {
    return `${Math.round(kilometers * 10) / 10} km`;
  }
  
  export function estimateFuelCost(distance, fuelEfficiency, fuelPrice) {
    // fuelEfficiency in L/100km, distance in km, fuelPrice in currency/L
    const fuelNeeded = (distance / 100) * fuelEfficiency;
    const cost = fuelNeeded * fuelPrice;
    return Math.round(cost * 100) / 100;
  }
  