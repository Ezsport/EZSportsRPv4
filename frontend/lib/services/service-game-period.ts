import { fetchData, createData, updateData, deleteData } from './api';

export interface GamePeriod {
  id?: string;
  name: string;
  description?: string;
  duration?: number; // in minutes
  sportId?: string;
  sport?: {
    id: string;
    name: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

export interface GamePeriodQueryParams {
  page?: number;
  limit?: number;
  sportId?: string;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export class ServiceGamePeriod {
  private static baseUrl = '/game-periods';

  static async getAll(params?: GamePeriodQueryParams): Promise<GamePeriod[]> {
    try {
      const queryParams = {
        page: params?.page || 1,
        limit: params?.limit || 10,
        ...(params?.sportId && { sportId: params.sportId }),
        ...(params?.search && { search: params.search }),
        ...(params?.sortBy && { sortBy: params.sortBy }),
        ...(params?.sortOrder && { sortOrder: params.sortOrder }),
      };

      return await fetchData(this.baseUrl, queryParams);
    } catch (error) {
      console.error('Error fetching game periods:', error);
      throw error;
    }
  }

  static async getById(id: string): Promise<GamePeriod> {
    try {
      return await fetchData(`${this.baseUrl}/${id}`);
    } catch (error) {
      console.error(`Error fetching game period with id ${id}:`, error);
      throw error;
    }
  }

  static async create(gamePeriodData: Omit<GamePeriod, 'id'>): Promise<GamePeriod> {
    try {
      return await createData(this.baseUrl, gamePeriodData);
    } catch (error) {
      console.error('Error creating game period:', error);
      throw error;
    }
  }

  static async update(id: string, gamePeriodData: Partial<GamePeriod>): Promise<GamePeriod> {
    try {
      return await updateData(`${this.baseUrl}/${id}`, gamePeriodData);
    } catch (error) {
      console.error(`Error updating game period with id ${id}:`, error);
      throw error;
    }
  }

  static async delete(id: string): Promise<void> {
    try {
      await deleteData(`${this.baseUrl}/${id}`);
    } catch (error) {
      console.error(`Error deleting game period with id ${id}:`, error);
      throw error;
    }
  }

  // Additional utility methods
  static async getGamePeriodsBySport(sportId: string): Promise<GamePeriod[]> {
    try {
      return await this.getAll({ sportId });
    } catch (error) {
      console.error(`Error fetching game periods for sport ${sportId}:`, error);
      throw error;
    }
  }
}
