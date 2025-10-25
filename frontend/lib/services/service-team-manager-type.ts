import { api } from './api';

export interface TeamManagerType {
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

export interface TeamManagerTypeQueryParams {
  page?: number;
  limit?: number;
  sportId?: string;
  search?: string;
  level?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export class ServiceTeamManagerType {
  private static baseUrl = '/manager-types';

  static async getAll(params?: TeamManagerTypeQueryParams): Promise<TeamManagerType[]> {
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
      console.error('Error fetching team manager types:', error);
      throw error;
    }
  }

  static async getById(id: string): Promise<TeamManagerType> {
    try {
      return await api.get(`${this.baseUrl}/${id}`);
    } catch (error) {
      console.error(`Error fetching team manager type with id ${id}:`, error);
      throw error;
    }
  }

  static async create(teamManagerTypeData: Omit<TeamManagerType, 'id'>): Promise<TeamManagerType> {
    try {
      return await api.post(this.baseUrl, teamManagerTypeData);
    } catch (error) {
      console.error('Error creating team manager type:', error);
      throw error;
    }
  }

  static async update(id: string, teamManagerTypeData: Partial<TeamManagerType>): Promise<TeamManagerType> {
    try {
      return await api.patch(`${this.baseUrl}/${id}`, teamManagerTypeData);
    } catch (error) {
      console.error(`Error updating team manager type with id ${id}:`, error);
      throw error;
    }
  }

  static async delete(id: string): Promise<void> {
    try {
      await api.delete(`${this.baseUrl}/${id}`);
    } catch (error) {
      console.error(`Error deleting team manager type with id ${id}:`, error);
      throw error;
    }
  }

  // Additional utility methods
  static async getBySportId(sportId: string | null | undefined): Promise<TeamManagerType[]> {
    try {
      return await api.get(`${this.baseUrl}/sport/${sportId}`);
    } catch (error) {
      console.error(`Error fetching team manager types for sport ${sportId}:`, error);
      throw error;
    }
  }
}
