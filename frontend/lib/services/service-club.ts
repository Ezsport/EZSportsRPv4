import { components } from '@/types/api-types';
import { api } from './api';

export interface Club {
  id?: string;
  name: string;
  description?: string;
  location?: string;
  sportIds?: string[];
  sports?: {
    id: string;
    name: string;
  }[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ClubQueryParams {
  page?: number;
  limit?: number;
  sportId?: string;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export default class ServiceClub {
  private static baseUrl = '/admin/clubs';

  static async getAll(): Promise<components["schemas"]["OrgClubDto"][]> {
    try {
        return await api.get(this.baseUrl);
    } catch (error) {
      console.error('Error fetching clubs:', error);
      throw error;
    }
  }

  static async getById(id: string): Promise<components["schemas"]["OrgClubDto"]> {
    try {
      return await api.get(`${this.baseUrl}/${id}`);
    } catch (error) {
      console.error(`Error fetching club with id ${id}:`, error);
      throw error;
    }
  }

  static async create(clubData: Omit<components["schemas"]["OrgClubDto"], 'id'>): Promise<components["schemas"]["OrgClubDto"]> {
    try {
      return await api.post(this.baseUrl, clubData);
    } catch (error) {
      console.error('Error creating club:', error);
      throw error;
    }
  }

  static async update(id: string, clubData: Partial<components["schemas"]["OrgClubDto"]>): Promise<components["schemas"]["OrgClubDto"]> {
    try {
      return await api.patch(`${this.baseUrl}/${id}`, clubData);
    } catch (error) {
      console.error(`Error updating club with id ${id}:`, error);
      throw error;
    }
  }

  static async delete(id: string): Promise<void> {
    try {
      await api.delete(`${this.baseUrl}/${id}`);
    } catch (error) {
      console.error(`Error deleting club with id ${id}:`, error);
      throw error;
    }
  }
}
