readme =>
# Road Trip Planner App

![Road Trip App]

A full-stack MERN (MongoDB, Express, React, Node.js) application for planning and managing road trips.  
This app allows users to create custom trip itineraries, visualize routes on a map, discover points of interest, and securely save their trip details.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Available Frontend Scripts](#available-frontend-scripts)
- [Deployment](#deployment)
- [Learn More (Create React App)](#learn-more-create-react-app)
- [License](#license)

## Features

*   **User Authentication**: Secure user registration and login functionality.
*   **Trip Management**: Create, view, update, and delete personalized road trip plans.
*   **Interactive Maps**: Visualize your trip with map integration to see routes and waypoints.
*   **Points of Interest (POI)**: Discover and add local attractions, restaurants, and other locations to your itinerary.
*   **Review System**: Add, view, and delete reviews for each trip.
*   **Persistent Storage**: Save trip and review data using a MongoDB database.
*   **Responsive Design**: Adapted frontend design using Tailwind CSS.
*   **Dummy Data for Testing**: Sample trips display when API is not connected.

## Technologies Used

### Backend
*   **Node.js**: JavaScript runtime environment.
*   **Express.js**: Web framework for Node.js.
*   **MongoDB**: NoSQL database for storing trip and review data.
*   **Mongoose**: MongoDB object data modeling (ODM) for Node.js.
*   **bcryptjs**: For password hashing and security.
*   **jsonwebtoken**: For user authentication.

### Frontend
*   **React**: UI library.
*   **React Router**: For routing.
*   **Axios**: API requests.
*   **Tailwind CSS**: Utility-first CSS framework for styling and responsiveness.

## Project Structure

road-trip-app/  
│  
├── backend/
│   ├── config/ 
│   ├── controllers/ 
│   ├── middleware/ 
│   ├── models/ 
│   ├── routes/ 
│   ├── .env 
│   ├── index.js
│   ├── package-lock.json
│   └── package.json
│  
├── docs/
│   ├── postman/
│    └── road-trip-postman-collection.json
│
├── frontend/ # React.js client  
│   ├── node_modules/  
│   ├── public/  
│   ├── src/  
│   │   ├── components/  
│   │   │   ├── Home/  
│   │   │   │   └── Home.js  
│   │   │   ├── UserProfile/  
│   │   │   │   └── UserProfile.js  
│   │   │   ├── RoadTripDetails/  
│   │   │   │   └── RoadTripDetails.js  
│   │   │   └── RoadTripsList/  
│   │   │       └── RoadTripsList.js  
│   │   ├── services/  
│   │   │   └── api.js  
│   │   ├── App.css  
│   │   ├── App.js  
│   │   ├── index.js  
│   │   ├── index.css  
│   │   ├── postcss.config.js  
│   │   └── tailwind.config.js  
│   ├── .gitignore  
│  
├── .gitignore  
└── README.md  

## Getting Started

1.  **Clone the repository**:
    ```sh
    git clone https://github.com/KuldeepSingh-18/road-trip-app.git
    cd road-trip-app
    ```

2.  **Set up Backend**:
    ```sh
    cd backend
    npm install
    ```

    Create a `.env` file:
    ```env
    MONGO_URI=mongodb://127.0.0.1:27017/roadtripdb
    PORT=5000
    JWT_SECRET=your_jwt_secret_key
    ```

    Run backend:
    ```sh
    node index.js
    ```

3.  **Set up Frontend**:
    Open a new terminal:
    ```sh
    cd frontend
    npm install
    npm start
    ```

    Runs at: `http://localhost:3000`

## Available Frontend Scripts

- `npm start` → Development mode  
- `npm run build` → Production build  
- `npm test` → Run tests  
- `npm run eject` → Eject config (advanced)

## Deployment

Follow the [official guide](https://create-react-app.dev/docs/deployment)

## License

MIT License  
