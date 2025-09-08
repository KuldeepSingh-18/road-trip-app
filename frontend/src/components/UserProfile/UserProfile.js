import React, { useEffect, useState } from 'react';
import { getTripById } from '../../services/api';
import { useParams } from 'react-router-dom';

function RoadTripDetails() {
  const { id } = useParams();
  const [trip, setTrip] = useState(null);

  useEffect(() => {
    getTripById(id)
      .then((res) => setTrip(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  return (
    <div>
      <h2>Trip Details</h2>
      {trip ? (
        <div>
          <p><strong>Title:</strong> {trip.title}</p>
          <p><strong>From:</strong> {trip.startLocation}</p>
          <p><strong>To:</strong> {trip.endLocation}</p>
        </div>
      ) : (
        <p>Loading trip details...</p>
      )}
    </div>
  );
}

export default RoadTripDetails;
