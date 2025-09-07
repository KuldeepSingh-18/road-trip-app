# Road Trip Planner App

![Road Trip App]

A full-stack MERN (MongoDB, Express, React, Node.js) application for planning and managing road trips. This app allows users to create custom trip itineraries, visualize routes on a map, discover points of interest, and securely save their trip details.

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
*   **Responsive Design**: A user-friendly interface that works on both desktop and mobile devices.

## Technologies Used

### Backend
*   **Node.js**: JavaScript runtime environment.
*   **Express.js**: Web framework for Node.js.
*   **MongoDB**: NoSQL database for storing trip and review data.
*   **Mongoose**: MongoDB object data modeling (ODM) for Node.js.
*   **bcryptjs**: For password hashing and security.
*   **jsonwebtoken**: For user authentication.

### Frontend
*   **React**: A JavaScript library for building user interfaces.
*   **React Router**: For client-side routing.
*   **Axios**: For making API requests from the browser.
*   **Mapping API**: Google Maps API or Mapbox for displaying interactive maps.

## Project Structure

road-trip-app/
│
├── backend/ # Express.js server and API
│   ├── config/             # Database connection settings
│   ├── controllers/        # API endpoint logic (optional)
│   ├── middleware/         # Auth middleware
│   ├── models/             # Mongoose schemas (User, Trip, Review)
│   ├── routes/             # API route definitions
│   ├── .env                # Environment variables
│   └── index.js            # Server entry point
│
├── frontend/ # React.js client
│   ├── public/              # Static assets
│   ├── src/                 # React source code
│   └── package.json         # Frontend package config
│
├── .gitignore               # Git ignore rules
└── README.md                # Project documentation

## Getting Started

Follow these steps to set up and run the application locally.

1.  **Clone the repository**:
    ```sh
    git clone https://github.com/KuldeepSingh-18/road-trip-app.git
    cd road-trip-app
    ```

2.  **Set up the Backend**:
    ```sh
    cd backend
    npm install
    ```
    Create a `.env` file in the `backend/` directory with your database connection details and JWT secret:
    ```env
    MONGO_URI=mongodb://127.0.0.1:27017/roadtripdb
    PORT=5000
    JWT_SECRET=your_jwt_secret_key
    ```

    Start the backend server:
    ```sh
    node index.js
    ```
    The server will run on:  
    `http://localhost:5000`

3.  **Set up the Frontend**:
    Open a new terminal window and navigate to the frontend directory:
    ```sh
    cd frontend
    npm install
    npm start
    ```
    The frontend will run on:  
    `http://localhost:3000`

## Available Frontend Scripts

### `npm start`

Runs the app in development mode:  
Open [http://localhost:3000](http://localhost:3000)

### `npm test`

Launches the test runner in interactive watch mode.

### `npm run build`

Builds the app for production into the `build/` folder.

### `npm run eject`

Eject the configuration (irreversible).

## Deployment

Follow official [React deployment guide](https://create-react-app.dev/docs/deployment) and configure the backend for production separately.

## Learn More

* [Create React App Documentation](https://facebook.github.io/create-react-app/docs/getting-started)
* [React Documentation](https://reactjs.org/)

## License

MIT License
