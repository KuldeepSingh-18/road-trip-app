import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TripProvider } from './contexts/TripContext';
import Home from './pages/Home';
import MapView from './pages/MapView';
import TripSummaryPage from './pages/TripSummaryPage';
import NotFound from './pages/NotFound';
import './styles/App.css';


function App() {
  return (
    <TripProvider>
      <BrowserRouter>
        <div className="app-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/map" element={<MapView />} />
            <Route path="/summary" element={<TripSummaryPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TripProvider>
  );
}

export default App;