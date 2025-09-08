import React from 'react';
import { useParams } from 'react-router-dom';

const RoadTripDetails = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>Road Trip Details</h1>
      <p>Details for trip ID: {id}</p>
    </div>
  );
};

export default RoadTripDetails;
