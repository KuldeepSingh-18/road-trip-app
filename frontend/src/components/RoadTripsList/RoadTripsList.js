import React, { useEffect, useState } from 'react';
import { getAllTrips } from '../../services/api';

function RoadTripsList() {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    getAllTrips()
      .then((res) => setTrips(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2>All Road Trips</h2>
      <ul>
        {trips.map((trip) => (
          <li key={trip._id}>{trip.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default RoadTripsList;
