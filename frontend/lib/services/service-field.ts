import { TypeField } from '@/types/types';
import axios from 'axios';

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/admin/fields`;

export const ServiceField = {
  getFields: async (
    active?: boolean, 
    sportId?: number | number[], 
    countryId?: number
  ): Promise<TypeField[]> => {
    try {
      const response = await axios.get(API_URL, {
        params: { 
          active, 
          sportId, 
          countryId 
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching fields:', error);
      throw error;
    }
  },

  getField: async (id: number): Promise<TypeField> => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching field with id ${id}:`, error);
      throw error;
    }
  },

  createField: async (fieldData: Omit<TypeField, 'id'>): Promise<TypeField> => {
    try {
      const response = await axios.post(API_URL, fieldData);
      return response.data;
    } catch (error) {
      console.error('Error creating field:', error);
      throw error;
    }
  },

  updateField: async (id: number, fieldData: Partial<TypeField>): Promise<TypeField> => {
    try {
      const response = await axios.patch(`${API_URL}/${id}`, fieldData);
      return response.data;
    } catch (error) {
      console.error(`Error updating field with id ${id}:`, error);
      throw error;
    }
  },

  deleteField: async (id: number): Promise<void> => {
    try {
      await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
      console.error(`Error deleting field with id ${id}:`, error);
      throw error;
    }
  },

  deleteFields: async (ids: number[]): Promise<void> => {
    try {
      await axios.delete(`${API_URL}/bulk`, { data: ids });
    } catch (error) {
      console.error(`Error deleting multiple fields:`, error);
      throw error;
    }
  },

  reorderFields: async (orders: { [key: number]: number }[]): Promise<void> => {
    try {
      await axios.post(`${API_URL}/reorder`, orders);
    } catch (error) {
      console.error(`Error reordering fields:`, error);
      throw error;
    }
  },

  getFieldsByCountry: async (countryId: number): Promise<TypeField[]> => {
    try {
      const response = await axios.get(`${API_URL}/country/${countryId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching fields for country ${countryId}:`, error);
      throw error;
    }
  }
};
