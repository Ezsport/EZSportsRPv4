import { TypeReorder } from "@/types/types";
import { api } from "./api";
import { components } from "@/types/api-types";

export type PlayerPosition = components["schemas"]["SportPlayerPositionDto"]; 

const ServicePlayerPosition = {
  async getAll(sportId?: string): Promise<PlayerPosition[]> {
    try {
      console.log('Fetching player positions with params:', sportId);
      const response = await api.get("/admin/player-positions", { 
        params: sportId ? { sportId: sportId } : undefined 
      });
      console.log('Player positions response:', response.data);
      
      // Ensure response.data is an array
      if (!Array.isArray(response.data)) {
        console.error('Unexpected response format:', response.data);
        return [];
      }
      
      return response.data;
    } catch (error) {
      console.error("Error fetching player positions:", error);
      throw error;
    }
  },

  async create(playerPosition: Partial<PlayerPosition>): Promise<PlayerPosition> {
    try {
      const response = await api.post("/admin/player-positions", playerPosition);
      return response.data;
    } catch (error) {
      console.error("Error creating player position:", error);
      throw error;
    }
  },

  async update(id: string, playerPosition: Partial<PlayerPosition>): Promise<PlayerPosition> {
    try {
      const response = await api.patch(`/admin/player-positions/${id}`, playerPosition);
      return response.data;
    } catch (error) {
      console.error("Error updating player position:", error);
      throw error;
    }
  },

  async delete(id: string): Promise<void> {
    try {
      await api.delete(`/admin/player-positions/${id}`);
    } catch (error) {
      console.error("Error deleting player position:", error);
      throw error;
    }
  },

  async deleteMany(ids: string[]): Promise<void> {
    try {
      await api.delete(`/admin/player-positions/bulk`, { data: ids });
    } catch (error) {
      console.error("Error deleting player positions:", error);
      throw error;
    }
  },

  async reorder(orders: TypeReorder[]): Promise<void> {
    try {
      await api.post(`/admin/player-positions/reorder`, orders);
    } catch (error) {
      console.error("Error reordering player positions:", error);
      throw error;
    }
  }
};

export { ServicePlayerPosition };