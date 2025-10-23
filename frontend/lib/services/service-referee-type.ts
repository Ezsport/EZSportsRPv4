import { fetchData, createData, updateData, deleteData } from './api';

export interface RefereeType {
  id?: string;
  name: string;
  description?: string;
  sportId?: string;
  sport?: {
    id: string;
    name: string;
  };
  level?: string;
  responsibilities?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface RefereeTypeQueryParams {
  page?: number;
  limit?: number;
  sportId?: string;
  search?: string;
  level?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export class ServiceRefereeType {
  private static baseUrl = '/referee-types';

  static async getAll(params?: RefereeTypeQueryParams): Promise<RefereeType[]> {
    try {
      const queryParams = {
        page: params?.page || 1,
        limit: params?.limit || 10,
        ...(params?.sportId && { sportId: params.sportId }),
        ...(params?.search && { search: params.search }),
        ...(params?.level && { level: params.level }),
        ...(params?.sortBy && { sortBy: params.sortBy }),
        ...(params?.sortOrder && { sortOrder: params.sortOrder }),
      };

      return await fetchData(this.baseUrl, queryParams);
    } catch (error) {
      console.error('Error fetching referee types:', error);
      throw error;
    }
  }

  static async getById(id: string): Promise<RefereeType> {
    try {
      return await fetchData(`${this.baseUrl}/${id}`);
    } catch (error) {
      console.error(`Error fetching referee type with id ${id}:`, error);
      throw error;
    }
  }

  static async create(refereeTypeData: Omit<RefereeType, 'id'>): Promise<RefereeType> {
    try {
      return await createData(this.baseUrl, refereeTypeData);
    } catch (error) {
      console.error('Error creating referee type:', error);
      throw error;
    }
  }

  static async update(id: string, refereeTypeData: Partial<RefereeType>): Promise<RefereeType> {
    try {
      return await updateData(`${this.baseUrl}/${id}`, refereeTypeData);
    } catch (error) {
      console.error(`Error updating referee type with id ${id}:`, error);
      throw error;
    }
  }

  static async delete(id: string): Promise<void> {
    try {
      await deleteData(`${this.baseUrl}/${id}`);
    } catch (error) {
      console.error(`Error deleting referee type with id ${id}:`, error);
      throw error;
    }
  }

  // Additional utility methods
  static async getRefereeTypesBySport(sportId: string): Promise<RefereeType[]> {
    try {
      return await this.getAll({ sportId });
    } catch (error) {
      console.error(`Error fetching referee types for sport ${sportId}:`, error);
      throw error;
    }
  }
}
