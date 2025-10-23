import { api } from './api';

export interface CoachType {
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

export interface CoachTypeQueryParams {
  page?: number;
  limit?: number;
  sportId?: string;
  search?: string;
  level?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export class ServiceCoachType {
  private static baseUrl = '/coach-types';

  static async getAll(params?: CoachTypeQueryParams): Promise<CoachType[]> {
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

      return await api.get(this.baseUrl, { params: queryParams });
    } catch (error) {
      console.error('Error fetching coach types:', error);
      throw error;
    }
  }

  static async getById(id: string): Promise<CoachType> {
    try {
      return await api.get(`${this.baseUrl}/${id}`);
    } catch (error) {
      console.error(`Error fetching coach type with id ${id}:`, error);
      throw error;
    }
  }

  static async getBySportId(sportId: string | null | undefined): Promise<CoachType[]> {
    try {
      return await api.get(`${this.baseUrl}/sport/${sportId}`);
    } catch (error) {
      console.error(`Error fetching coach types for sport ${sportId}:`, error);
      throw error;
    }
  }

  static async create(coachTypeData: Omit<CoachType, 'id'>): Promise<CoachType> {
    try {
      return await api.post(this.baseUrl, coachTypeData);
    } catch (error) {
      console.error('Error creating coach type:', error);
      throw error;
    }
  }

  static async update(id: string, coachTypeData: Partial<CoachType>): Promise<CoachType> {
    try {
      return await api.patch(`${this.baseUrl}/${id}`, coachTypeData);
    } catch (error) {
      console.error(`Error updating coach type with id ${id}:`, error);
      throw error;
    }
  }

  static async delete(id: string): Promise<void> {
    try {
      await api.delete(`${this.baseUrl}/${id}`);
    } catch (error) {
      console.error(`Error deleting coach type with id ${id}:`, error);
      throw error;
    }
  }

  // Additional utility methods
  static async getCoachTypesBySport(sportId: string): Promise<CoachType[]> {
    try {
      return await this.getAll({ sportId });
    } catch (error) {
      console.error(`Error fetching coach types for sport ${sportId}:`, error);
      throw error;
    }
  }
}
