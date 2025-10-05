// Using OpenRouteService API as an example
// You'll need to sign up for an API key at https://openrouteservice.org/

const API_KEY = 'your_openrouteservice_api_key'; // Replace with your actual API key
const BASE_URL = 'https://api.openrouteservice.org/v2';

// Mock data for testing without API key

const MOCK_DESTINATIONS = [
  // Major Metros and Financial Hubs
  { name: "Mumbai", address: "Mumbai, Maharashtra, India", coordinates: [72.8775, 19.0761] },
  { name: "Delhi", address: "Delhi, NCT, India", coordinates: [77.2300, 28.6100] },
  { name: "Bengaluru", address: "Bengaluru, Karnataka, India", coordinates: [77.5946, 12.9716] },
  { name: "Chennai", address: "Chennai, Tamil Nadu, India", coordinates: [80.2707, 13.0827] },
  { name: "Kolkata", address: "Kolkata, West Bengal, India", coordinates: [88.3639, 22.5726] },
  { name: "Hyderabad", address: "Hyderabad, Telangana, India", coordinates: [78.4747, 17.3850] },

  // Large Cities and State Capitals
  { name: "Pune", address: "Pune, Maharashtra, India", coordinates: [73.8567, 18.5204] },
  { name: "Ahmedabad", address: "Ahmedabad, Gujarat, India", coordinates: [72.5714, 23.0225] },
  { name: "Jaipur", address: "Jaipur, Rajasthan, India", coordinates: [75.8235, 26.9124] },
  { name: "Surat", address: "Surat, Gujarat, India", coordinates: [72.8331, 21.1702] },
  { name: "Lucknow", address: "Lucknow, Uttar Pradesh, India", coordinates: [80.9462, 26.8467] },
  { name: "Kanpur", address: "Kanpur, Uttar Pradesh, India", coordinates: [80.3319, 26.4499] },
  { name: "Nagpur", address: "Nagpur, Maharashtra, India", coordinates: [79.0806, 21.1497] },
  { name: "Indore", address: "Indore, Madhya Pradesh, India", coordinates: [75.8577, 22.7196] },
  { name: "Bhopal", address: "Bhopal, Madhya Pradesh, India", coordinates: [77.4126, 23.2599] },
  { name: "Patna", address: "Patna, Bihar, India", coordinates: [85.1376, 25.5940] },
  { name: "Thane", address: "Thane, Maharashtra, India", coordinates: [72.9722, 19.1972] },
  { name: "Ludhiana", address: "Ludhiana, Punjab, India", coordinates: [75.8500, 30.9100] },
  { name: "Agra", address: "Agra, Uttar Pradesh, India", coordinates: [78.0000, 27.1800] },
  { name: "Nashik", address: "Nashik, Maharashtra, India", coordinates: [73.7898, 19.9975] },
  { name: "Vadodara", address: "Vadodara, Gujarat, India", coordinates: [73.2000, 22.3000] },

  // Important Regional Cities and Cultural Centers
  { name: "Varanasi", address: "Varanasi, Uttar Pradesh, India", coordinates: [83.0128, 25.3189] },
  { name: "Srinagar", address: "Srinagar, Jammu & Kashmir, India", coordinates: [74.7973, 34.0837] },
  { name: "Ranchi", address: "Ranchi, Jharkhand, India", coordinates: [85.3300, 23.3600] },
  { name: "Amritsar", address: "Amritsar, Punjab, India", coordinates: [74.8648, 31.6330] },
  { name: "Guwahati", address: "Guwahati, Assam, India", coordinates: [91.7485, 26.1445] },
  { name: "Bhubaneswar", address: "Bhubaneswar, Odisha, India", coordinates: [85.8245, 20.2961] },
  { name: "Goa (Panaji)", address: "Panaji, Goa, India", coordinates: [73.8267, 15.4989] },
  { name: "Trivandrum", address: "Thiruvananthapuram, Kerala, India", coordinates: [76.9366, 8.5241] },
  { name: "Madurai", address: "Madurai, Tamil Nadu, India", coordinates: [78.1198, 9.9252] }
];

// Helper function to calculate distance between two points (in km)
function calculateDistance(coord1, coord2) {
  const R = 6371; // Earth's radius in km
  const dLat = (coord2[1] - coord1[1]) * Math.PI / 180;
  const dLon = (coord2[0] - coord1[0]) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(coord1[1] * Math.PI / 180) * Math.cos(coord2[1] * Math.PI / 180) * Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

// Helper function to generate mock route coordinates between two points
function generateRouteCoordinates(start, end, numPoints = 10) {
  const coords = [];
  for (let i = 0; i <= numPoints; i++) {
    const fraction = i / numPoints;
    const lat = start[1] + fraction * (end[1] - start[1]);
    const lng = start[0] + fraction * (end[0] - start[0]);
    coords.push([lat, lng]);
  }
  return coords;
}

export async function getRouteDetails(destinations) {
  if (destinations.length < 2) {
    throw new Error('At least two destinations are required to calculate a route');
  }
  
  try {
    // If API key is not set or is the default value, use mock data
    if (!API_KEY || API_KEY === 'your_openrouteservice_api_key') {
      console.log('Using mock route data (no API key provided)');
      
      // Calculate mock route details
      let totalDistance = 0;
      let totalDuration = 0;
      let allCoordinates = [];
      
      for (let i = 0; i < destinations.length - 1; i++) {
        const start = destinations[i].coordinates;
        const end = destinations[i + 1].coordinates;
        
        // Calculate direct distance
        const distance = calculateDistance(start, end);
        totalDistance += distance;
        
        // Estimate duration (assuming 60 km/h average speed)
        const duration = distance / 60 * 60; // Convert to minutes
        totalDuration += duration;
        
        // Generate route coordinates
        const routeCoords = generateRouteCoordinates(start, end);
        allCoordinates = [...allCoordinates, ...routeCoords];
      }
      
      return {
        distance: totalDistance,
        duration: totalDuration,
        coordinates: allCoordinates
      };
    }
    
    // Real API call if API key is provided
    const coordinates = destinations.map(dest => dest.coordinates);
    
    const response = await fetch(`${BASE_URL}/directions/driving-car`, {
      method: 'POST',
      headers: {
        'Authorization': API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        coordinates: coordinates,
        format: 'geojson'
      })
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch route details');
    }
    
    const data = await response.json();
    
    // Extract route details
    const route = data.features[0];
    const distance = route.properties.summary.distance / 1000; // Convert to km
    const duration = route.properties.summary.duration / 60; // Convert to minutes
    const routeCoordinates = route.geometry.coordinates.map(coord => [coord[1], coord[0]]);
    
    return {
      distance,
      duration,
      coordinates: routeCoordinates
    };
  } catch (error) {
    console.error('Error fetching route details:', error);
    throw error;
  }
}

export async function searchLocation(query) {
  try {
    // If API key is not set or is the default value, use mock data
    if (!API_KEY || API_KEY === 'your_openrouteservice_api_key') {
      console.log('Using mock search data (no API key provided)');
      
      // Filter mock destinations based on query
      const results = MOCK_DESTINATIONS.filter(location => 
        location.name.toLowerCase().includes(query.toLowerCase()) ||
        location.address.toLowerCase().includes(query.toLowerCase())
      );
      
      return results;
    }
    
    // Real API call if API key is provided
    const response = await fetch(`${BASE_URL}/geocode/search?text=${encodeURIComponent(query)}`, {
      headers: {
        'Authorization': API_KEY
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to search location');
    }
    
    const data = await response.json();
    
    return data.features.map(feature => ({
      name: feature.properties.name,
      address: feature.properties.label,
      coordinates: [feature.geometry.coordinates[0], feature.geometry.coordinates[1]]
    }));
  } catch (error) {
    console.error('Error searching location:', error);
    throw error;
  }
}