import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import components
import Home from './components/Home/Home';
import UserProfile from './components/UserProfile/UserProfile';
import RoadTripsList from './components/RoadTripsList/RoadTripsList';
import RoadTripDetails from './components/RoadTripDetails/RoadTripDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/trips" element={<RoadTripsList />} />
        <Route path="/trips/:id" element={<RoadTripDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
