import axios from 'axios';
import { components } from '@/types/api-types';

// Define the base URL for the API
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

// Create an axios instance with base configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Authentication service
export const AuthService = {
  // User registration
  async register(registerData: {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    role: components['schemas']['SysUserRole'];
  }) {
    try {
      const response = await api.post('/sys/auth/register', registerData);
      
      // Store token and user info
      if (response.data.access_token) {
        localStorage.setItem('token', response.data.access_token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      
      return response.data;
    } catch (error) {
      console.error('Registration error', error);
      throw error;
    }
  },

  // User login
  async login(email: string, password: string) {
    try {
      const response = await api.post('/sys/auth/login', { email, password });
      
      // Store token and user info
      if (response.data.access_token) {
        localStorage.setItem('token', response.data.access_token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      
      return response.data;
    } catch (error) {
      console.error('Login error', error);
      throw error;
    }
  },

  // Enhanced logout method
  logout() {
    try {
      // Optional: Call backend logout endpoint to invalidate token
      const token = localStorage.getItem('token');
      if (token) {
        // Attempt to invalidate token on the server (if your backend supports this)
        api.post('/sys/auth/logout', {}, {
          headers: { 'Authorization': `Bearer ${token}` }
        }).catch(error => {
          console.warn('Backend logout failed:', error);
        });
      }

      // Clear local storage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      // Clear axios default headers
      delete api.defaults.headers.common['Authorization'];

      // Optional: Clear any other application state
      // You might want to add more cleanup logic here depending on your app's state management
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  },

  // Check if user is authenticated
  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token; // Returns true if token exists
  },

  // Get current user
  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  // Method to check if token is expired
  isTokenExpired(): boolean {
    const token = localStorage.getItem('token');
    if (!token) return true;

    try {
      // Decode JWT to check expiration
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace('-', '+').replace('_', '/');
      const payload = JSON.parse(window.atob(base64));
      
      // Check if token is expired
      return payload.exp * 1000 < Date.now();
    } catch (error) {
      console.error('Token validation error:', error);
      return true;
    }
  },

  // Refresh token method (if your backend supports it)
  async refreshToken() {
    try {
      const response = await api.post('/sys/auth/refresh-token', {
        token: localStorage.getItem('token')
      });

      if (response.data.access_token) {
        localStorage.setItem('token', response.data.access_token);
        return response.data.access_token;
      }

      // If refresh fails, logout
      this.logout();
      return null;
    } catch (error) {
      console.error('Token refresh error:', error);
      this.logout();
      return null;
    }
  }
};

// Setup interceptors when the service is imported
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If token is expired and we haven't tried to refresh yet
    if (
      error.response?.status === 401 && 
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        // Attempt to refresh token
        const newToken = await AuthService.refreshToken();
        
        if (newToken) {
          // Retry the original request with new token
          originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        // If refresh fails, logout
        AuthService.logout();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
