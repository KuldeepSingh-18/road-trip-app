import React, { useState, useEffect } from 'react';
import { getAllTrips } from '../../services/api';

function Home() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const dummyTrips = [
      { _id: '1', title: 'Test Trip', startLocation: 'Location A', endLocation: 'Location B' },
      { _id: '2', title: 'Sample Trip', startLocation: 'Location X', endLocation: 'Location Y' }
    ];
  
    console.log('Setting dummy trips:', dummyTrips);
    
    setTrips(dummyTrips);
    setLoading(false);
  }, []);
  
  
  console.log('Trips:', trips);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">Available Road Trips</h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading trips...</p>
      ) : trips.length === 0 ? (
        <p className="text-center text-red-500">No trips found.</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          { trips.map((trip) => (
            <li key={trip._id} className="bg-white border rounded-lg shadow hover:shadow-lg transition-shadow p-5">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{trip.title}</h2>
              <p className="text-gray-600">
                <span className="font-medium">From:</span> {trip.startLocation} → <span className="font-medium">To:</span> {trip.endLocation}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Home;
