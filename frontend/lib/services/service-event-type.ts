import { fetchData, createData, updateData, deleteData } from './api';

export interface EventType {
  id?: string;
  name: string;
  description?: string;
  category?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface EventTypeQueryParams {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export class ServiceEventType {
  private static baseUrl = '/event-types';

  static async getAll(params?: EventTypeQueryParams): Promise<EventType[]> {
    try {
      const queryParams = {
        page: params?.page || 1,
        limit: params?.limit || 10,
        ...(params?.category && { category: params.category }),
        ...(params?.search && { search: params.search }),
        ...(params?.sortBy && { sortBy: params.sortBy }),
        ...(params?.sortOrder && { sortOrder: params.sortOrder }),
      };

      return await fetchData(this.baseUrl, queryParams);
    } catch (error) {
      console.error('Error fetching event types:', error);
      throw error;
    }
  }

  static async getById(id: string): Promise<EventType> {
    try {
      return await fetchData(`${this.baseUrl}/${id}`);
    } catch (error) {
      console.error(`Error fetching event type with id ${id}:`, error);
      throw error;
    }
  }

  static async create(eventTypeData: Omit<EventType, 'id'>): Promise<EventType> {
    try {
      return await createData(this.baseUrl, eventTypeData);
    } catch (error) {
      console.error('Error creating event type:', error);
      throw error;
    }
  }

  static async update(id: string, eventTypeData: Partial<EventType>): Promise<EventType> {
    try {
      return await updateData(`${this.baseUrl}/${id}`, eventTypeData);
    } catch (error) {
      console.error(`Error updating event type with id ${id}:`, error);
      throw error;
    }
  }

  static async delete(id: string): Promise<void> {
    try {
      await deleteData(`${this.baseUrl}/${id}`);
    } catch (error) {
      console.error(`Error deleting event type with id ${id}:`, error);
      throw error;
    }
  }
}
