import { fetchData, createData, updateData, deleteData } from './api';

export interface League {
  id?: string;
  name: string;
  description?: string;
  sportId?: string;
  sport?: {
    id: string;
    name: string;
  };
  region?: string;
  level?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface LeagueQueryParams {
  page?: number;
  limit?: number;
  sportId?: string;
  search?: string;
  region?: string;
  level?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export class ServiceLeague {
  private static baseUrl = '/leagues';

  static async getAll(params?: LeagueQueryParams): Promise<League[]> {
    try {
      const queryParams = {
        page: params?.page || 1,
        limit: params?.limit || 10,
        ...(params?.sportId && { sportId: params.sportId }),
        ...(params?.search && { search: params.search }),
        ...(params?.region && { region: params.region }),
        ...(params?.level && { level: params.level }),
        ...(params?.sortBy && { sortBy: params.sortBy }),
        ...(params?.sortOrder && { sortOrder: params.sortOrder }),
      };

      return await fetchData(this.baseUrl, queryParams);
    } catch (error) {
      console.error('Error fetching leagues:', error);
      throw error;
    }
  }

  static async getById(id: string): Promise<League> {
    try {
      return await fetchData(`${this.baseUrl}/${id}`);
    } catch (error) {
      console.error(`Error fetching league with id ${id}:`, error);
      throw error;
    }
  }

  static async create(leagueData: Omit<League, 'id'>): Promise<League> {
    try {
      return await createData(this.baseUrl, leagueData);
    } catch (error) {
      console.error('Error creating league:', error);
      throw error;
    }
  }

  static async update(id: string, leagueData: Partial<League>): Promise<League> {
    try {
      return await updateData(`${this.baseUrl}/${id}`, leagueData);
    } catch (error) {
      console.error(`Error updating league with id ${id}:`, error);
      throw error;
    }
  }

  static async delete(id: string): Promise<void> {
    try {
      await deleteData(`${this.baseUrl}/${id}`);
    } catch (error) {
      console.error(`Error deleting league with id ${id}:`, error);
      throw error;
    }
  }

  // Additional utility methods
  static async getLeaguesBySport(sportId: string): Promise<League[]> {
    try {
      return await this.getAll({ sportId });
    } catch (error) {
      console.error(`Error fetching leagues for sport ${sportId}:`, error);
      throw error;
    }
  }
}
