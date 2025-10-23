import { api } from './api';

export interface Player {
  id?: string;
  firstName: string;
  lastName: string;
  email?: string;
  dateOfBirth?: Date;
  teamId?: string;
  team?: {
    id: string;
    name: string;
  };
  sportId?: string;
  sport?: {
    id: string;
    name: string;
  };
  position?: string;
  jerseyNumber?: string;
  nationality?: string;
  height?: number;
  weight?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface PlayerQueryParams {
  page?: number;
  limit?: number;
  teamId?: string;
  sportId?: string;
  search?: string;
  position?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export class ServicePlayer {
  private static baseUrl = '/players';

  static async getAll(params?: PlayerQueryParams): Promise<Player[]> {
    try {
      const queryParams = {
        page: params?.page || 1,
        limit: params?.limit || 10,
        ...(params?.teamId && { teamId: params.teamId }),
        ...(params?.sportId && { sportId: params.sportId }),
        ...(params?.search && { search: params.search }),
        ...(params?.position && { position: params.position }),
        ...(params?.sortBy && { sortBy: params.sortBy }),
        ...(params?.sortOrder && { sortOrder: params.sortOrder }),
      };

      return await api.get(this.baseUrl, { params: queryParams });
    } catch (error) {
      console.error('Error fetching players:', error);
      throw error;
    }
  }

  static async getById(id: string): Promise<Player> {
    try {
      return await api.get(`${this.baseUrl}/${id}`);
    } catch (error) {
      console.error(`Error fetching player with id ${id}:`, error);
      throw error;
    }
  }

  static async create(playerData: Omit<Player, 'id'>): Promise<Player> {
    try {
      return await api.post(this.baseUrl, playerData);
    } catch (error) {
      console.error('Error creating player:', error);
      throw error;
    }
  }

  static async update(id: string, playerData: Partial<Player>): Promise<Player> {
    try {
      return await api.patch(`${this.baseUrl}/${id}`, playerData);
    } catch (error) {
      console.error(`Error updating player with id ${id}:`, error);
      throw error;
    }
  }

  static async delete(id: string): Promise<void> {
    try {
      await api.delete(`${this.baseUrl}/${id}`);
    } catch (error) {
      console.error(`Error deleting player with id ${id}:`, error);
      throw error;
    }
  }

  // Additional utility methods
  static async getPlayersByTeam(teamId: string): Promise<Player[]> {
    try {
      return await this.getAll({ teamId });
    } catch (error) {
      console.error(`Error fetching players for team ${teamId}:`, error);
      throw error;
    }
  }

  static async getPlayersBySport(sportId: string): Promise<Player[]> {
    try {
      return await this.getAll({ sportId });
    } catch (error) {
      console.error(`Error fetching players for sport ${sportId}:`, error);
      throw error;
    }
  }
}
