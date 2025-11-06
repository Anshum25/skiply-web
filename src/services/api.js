import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000/api';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Location API Services
export const locationAPI = {
  // Get all cities (grouped by alphabet)
  getAllCities: async () => {
    try {
      const response = await apiClient.get('/location/cities');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get popular cities
  getPopularCities: async () => {
    try {
      const response = await apiClient.get('/location/cities/popular');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Search cities by query
  searchCities: async (query) => {
    try {
      const response = await apiClient.get('/location/cities/search', {
        params: { query }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get current location from coordinates
  getCurrentLocation: async (latitude, longitude) => {
    try {
      const response = await apiClient.get('/location/current', {
        params: { latitude, longitude }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

// Health check
export const checkHealth = async () => {
  try {
    const response = await apiClient.get('/health');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default apiClient;
