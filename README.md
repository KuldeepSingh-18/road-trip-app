# Road Trip Planner

A web application for planning and visualizing road trips with multiple destinations.

## Features

- **Search and add destinations** to your trip itinerary
- **Interactive map visualization** of your planned route
- **Trip statistics** including distance, duration, and fuel cost estimates
- **Reorder destinations** to optimize your journey
- **Save trips** to local storage for later use
- **Export trip plans** as PDF documents


## Technical Overview

### Core Functionality

- Built with React and React Router for navigation
- Uses Leaflet for interactive maps
- Calculates routes between destinations using OpenRouteService API
- Persists trip data in localStorage


### Key Components

- **Home**: Search for and manage destinations
- **MapView**: Visualize your trip on an interactive map
- **TripSummary**: View detailed trip statistics and export options


### Services

- **mapService.js**: Handles location search and route calculations
- **storageService.js**: Manages saving and loading trips from localStorage
- **useTripManager.js**: Custom hook for trip state management


## Getting Started

1. Clone the repository
2. Install dependencies with `npm install`
3. Get an API key from [OpenRouteService](https://openrouteservice.org/)
4. Add your API key to `mapService.js`
5. Run the application with `npm start`

## Notes

- The application includes fallback mock data if no API key is provided
- For production use, a valid OpenRouteService API key is recommended