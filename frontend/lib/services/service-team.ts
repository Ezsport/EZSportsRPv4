import { api } from './api';

export interface Team {
  id?: string;
  name: string;
  clubId: string;
  sportId: string;
  club?: {
    id: string;
    name: string;
  };
  sport?: {
    id: string;
    name: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TeamQueryParams {
  page?: number;
  limit?: number;
  clubId?: string;
  sportId?: string;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export default class ServiceTeam {
  private static baseUrl = '/admin/teams';

  static async getAll(clubId?: string, sportId?: string): Promise<Team[]> {
    try {
      return await api.get(this.baseUrl, { params: { clubId, sportId } });
    } catch (error) {
      console.error('Error fetching teams:', error);
      throw error;
    }
  }

  static async getByClubAndSport(clubId?: string, sportId?: string): Promise<Team[]> {
    try {
      return await api.get(`${this.baseUrl}`, { params: { clubId, sportId } });
    } catch (error) {
      console.error(`Error fetching teams for club ${clubId} and sport ${sportId}:`, error);
      throw error;
    }
  }

  static async getById(id: string): Promise<Team> {
    try {
      return await api.get(`${this.baseUrl}/${id}`);
    } catch (error) {
      console.error(`Error fetching team with id ${id}:`, error);
      throw error;
    }
  }

  static async create(teamData: Omit<Team, 'id'>): Promise<Team> {
    try {
      return await api.post(this.baseUrl, teamData);
    } catch (error) {
      console.error('Error creating team:', error);
      throw error;
    }
  }

  static async update(id: string, teamData: Partial<Team>): Promise<Team> {
    try {
      return await api.patch(`${this.baseUrl}/${id}`, teamData);
    } catch (error) {
      console.error(`Error updating team with id ${id}:`, error);
      throw error;
    }
  }

  static async delete(id: string): Promise<void> {
    try {
      await api.delete(`${this.baseUrl}/${id}`);
    } catch (error) {
      console.error(`Error deleting team with id ${id}:`, error);
      throw error;
    }
  }

  // Additional utility methods can be added here
  static async getTeamsByClub(clubId: string): Promise<Team[]> {
    try {
      return await this.getAll({ clubId });
    } catch (error) {
      console.error(`Error fetching teams for club ${clubId}:`, error);
      throw error;
    }
  }

  static async getTeamsBySport(sportId: string): Promise<Team[]> {
    try {
      return await this.getAll({ sportId });
    } catch (error) {
      console.error(`Error fetching teams for sport ${sportId}:`, error);
      throw error;
    }
  }
}
