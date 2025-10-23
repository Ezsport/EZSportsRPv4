import axios, { AxiosRequestConfig } from 'axios';

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to add authentication token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const handleApiError = (error: any) => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      console.error('API Error Response:', error.response.data);
      throw new Error(error.response.data.message || 'An error occurred');
    } else if (error.request) {
      console.error('No response received:', error.request);
      throw new Error('No response from server');
    } else {
      console.error('Error setting up request:', error.message);
      throw new Error('Error setting up request');
    }
  } else {
    console.error('Unexpected error:', error);
    throw error;
  }
};

export const api = {
  get: async (endpoint: string, config?: AxiosRequestConfig) => {
    try {
      const response = await axiosInstance.get(endpoint, config);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },
  
  post: async (endpoint: string, data?: any, config?: AxiosRequestConfig) => {
    try {
      const response = await axiosInstance.post(endpoint, data, config);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },
  
  patch: async (endpoint: string, data?: any, config?: AxiosRequestConfig) => {
    try {
      const response = await axiosInstance.patch(endpoint, data, config);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },
  
  delete: async (endpoint: string, config?: AxiosRequestConfig) => {
    try {
      const response = await axiosInstance.delete(endpoint, config);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  }
};

export { axiosInstance };
