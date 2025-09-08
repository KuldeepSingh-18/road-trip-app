import axios from 'axios';

// Base URL of backend API
const baseUrl = 'http://localhost:5000/api';

// Create an axios instance
const api = axios.create({
  baseURL: baseUrl,
});

// Add JWT Token to headers (if exists)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');  // Or your way of storing token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Trip APIs
export const getAllTrips = () => api.get('/trips');
export const getTripById = (tripId) => api.get(`/trips/${tripId}`);
export const createTrip = (tripData) => api.post('/trips', tripData);
export const updateTrip = (tripId, tripData) => api.put(`/trips/${tripId}`, tripData);
export const deleteTrip = (tripId) => api.delete(`/trips/${tripId}`);

// User APIs
export const registerUser = (userData) => api.post('/users/register', userData);
export const loginUser = (userData) => api.post('/users/login', userData);
export const getUserProfile = () => api.get('/users/profile');

// Review APIs
export const createReview = (tripId, reviewData) => api.post(`/reviews/${tripId}`, reviewData);
export const getReviewsForTrip = (tripId) => api.get(`/reviews/${tripId}`);
export const deleteReview = (reviewId) => api.delete(`/reviews/${reviewId}`);
