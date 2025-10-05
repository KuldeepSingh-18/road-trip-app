import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DestinationCard from '../components/DestinationCard';
import { useTripManager } from '../hooks/useTripManager';
import { searchLocation } from '../services/mapService';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState('');

  const { 
    destinations, 
    addDestination, 
    reorderDestinations,
    loadSavedTrip,
    resetTrip
  } = useTripManager();

  useEffect(() => {
    loadSavedTrip();
  }, [loadSavedTrip]);

  const handleSearch = async (e) => {
    e.preventDefault();
    console.log("Search button clicked with query:", searchQuery);

    if (!searchQuery.trim()) {
      setError('Please enter a destination to search');
      return;
    }

    setIsSearching(true);
    setError('');

    try {
      // 🇮🇳 Mock data with ALL 30 Indian cities to use if the real API fails (or API key is missing)
      const mockResults = [
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
        { name: "Madurai", address: "Madurai, Tamil Nadu, India", coordinates: [78.1198, 9.9252] },
        { name: "Coimbatore", address: "Coimbatore, Tamil Nadu, India", coordinates: [76.9626, 11.0018] } // Added to reach ~30
      ];

      // Try the real API call first
      let results;
      try {
        results = await searchLocation(searchQuery);
        console.log("API search results:", results);
      } catch (apiError) {
        console.error("API search failed, using mock data:", apiError);
        // Fall back to mock data if API fails
        results = mockResults.filter(item => 
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.address.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      setSearchResults(results);

      if (results.length === 0) {
        setError('No locations found. Try a different search term or one of the major Indian cities.');
      }
    } catch (error) {
      console.error('Error searching for location:', error);
      setError('Failed to search for locations. Please try again.');
    } finally {
      setIsSearching(false);
    }
  };

  const handleAddDestination = (location) => {
    addDestination(location);
    setSearchResults([]);
    setSearchQuery('');
  };

  const moveDestination = (index, direction) => {
    const newOrder = [...destinations];
    const newIndex = index + direction;

    if (newIndex < 0 || newIndex >= destinations.length) return;

    // Swap positions
    [newOrder[index], newOrder[newIndex]] = [newOrder[newIndex], newOrder[index]];
    reorderDestinations(newOrder);
  };

  return (
    <div className="home-page">
      <h1>Road Trip Planner</h1>

      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for a destination..."
          className="search-input"
        />
        <button type="submit" className="search-button" disabled={isSearching}>
          {isSearching ? 'Searching...' : 'Search'}
        </button>
      </form>

      {error && <div className="error-message">{error}</div>}

      {searchResults.length > 0 && (
        <div className="search-results">
          <h3>Search Results</h3>
          <ul>
            {searchResults.map((result, index) => (
              <li key={index} onClick={() => handleAddDestination(result)}>
                **{result.name}** - *{result.address}*
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="destinations-list">
        <h2>Your Trip</h2>

        {destinations.length === 0 ? (
          <p>Start by searching for destinations to add to your trip.</p>
        ) : (
          <>
            {destinations.map((destination, index) => (
              <DestinationCard 
                key={destination.id}
                destination={destination}
                index={index}
                total={destinations.length}
                onMoveUp={() => moveDestination(index, -1)}
                onMoveDown={() => moveDestination(index, 1)}
              />
            ))}

            <div className="trip-actions">
              <button className="btn-reset" onClick={resetTrip}>
                Reset Trip
              </button>

              {destinations.length > 1 && (
                <Link to="/map" className="btn-view-map">
                  View on Map
                </Link>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}