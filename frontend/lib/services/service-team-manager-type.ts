import { fetchData, createData, updateData, deleteData } from './api';

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
  private static baseUrl = '/team-manager-types';

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

      return await fetchData(this.baseUrl, queryParams);
    } catch (error) {
      console.error('Error fetching team manager types:', error);
      throw error;
    }
  }

  static async getById(id: string): Promise<TeamManagerType> {
    try {
      return await fetchData(`${this.baseUrl}/${id}`);
    } catch (error) {
      console.error(`Error fetching team manager type with id ${id}:`, error);
      throw error;
    }
  }

  static async create(teamManagerTypeData: Omit<TeamManagerType, 'id'>): Promise<TeamManagerType> {
    try {
      return await createData(this.baseUrl, teamManagerTypeData);
    } catch (error) {
      console.error('Error creating team manager type:', error);
      throw error;
    }
  }

  static async update(id: string, teamManagerTypeData: Partial<TeamManagerType>): Promise<TeamManagerType> {
    try {
      return await updateData(`${this.baseUrl}/${id}`, teamManagerTypeData);
    } catch (error) {
      console.error(`Error updating team manager type with id ${id}:`, error);
      throw error;
    }
  }

  static async delete(id: string): Promise<void> {
    try {
      await deleteData(`${this.baseUrl}/${id}`);
    } catch (error) {
      console.error(`Error deleting team manager type with id ${id}:`, error);
      throw error;
    }
  }

  // Additional utility methods
  static async getTeamManagerTypesBySport(sportId: string): Promise<TeamManagerType[]> {
    try {
      return await this.getAll({ sportId });
    } catch (error) {
      console.error(`Error fetching team manager types for sport ${sportId}:`, error);
      throw error;
    }
  }
}
