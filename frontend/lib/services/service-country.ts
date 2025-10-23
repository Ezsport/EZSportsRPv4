import { TypeCountry } from '@/types/types';
import axios from 'axios';

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/admin/countries`;

export const ServiceCountry = {
  getCountries: async (active?: boolean): Promise<TypeCountry[]> => {
    try {
      const response = await axios.get(API_URL, {
        params: { active }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching countries:', error);
      throw error;
    }
  },

  getCountry: async (id: number): Promise<TypeCountry> => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching country with id ${id}:`, error);
      throw error;
    }
  },

  createCountry: async (countryData: TypeCountry): Promise<TypeCountry> => {
    try {
      const response = await axios.post(API_URL, countryData);
      return response.data;
    } catch (error) {
      console.error('Error creating country:', error);
      throw error;
    }
  },

  updateCountry: async (id: number, countryData: TypeCountry): Promise<TypeCountry> => {
    try {
      const response = await axios.patch(`${API_URL}/${id}`, countryData);
      return response.data;
    } catch (error) {
      console.error(`Error updating country with id ${id}:`, error);
      throw error;
    }
  },

  deleteCountry: async (id: number): Promise<void> => {
    try {
      await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
      console.error(`Error deleting country with id ${id}:`, error);
      throw error;
    }
  },

  deleteCountries: async (ids: number[]): Promise<void> => {
    try {
      await axios.delete(`${API_URL}/bulk`, { data: ids });
    } catch (error) {
      console.error(`Error deleting multiple countries:`, error);
      throw error;
    }
  },

  reorderCountries: async (orders: { [key: number]: number }[]): Promise<void> => {
    try {
      await axios.post(`${API_URL}/reorder`, orders);
    } catch (error) {
      console.error(`Error reordering countries:`, error);
      throw error;
    }
  }
};
