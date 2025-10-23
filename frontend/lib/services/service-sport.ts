import { TypeReorder, TypeSport } from "@/types/types";
import { api } from "./api";

const ServiceSport = {
  async getSports(): Promise<TypeSport[]> {
    try {
      const response = await api.get("/sports");
      return response;
    } catch (error) {
      console.error("Error fetching sports:", error);
      throw error;
    }
  },

  async createSport(sport: Partial<TypeSport>): Promise<TypeSport> {
    try {
      const response = await api.post("/admin/sports", sport);
      return response.data;
    } catch (error) {
      console.error("Error creating sport:", error);
      throw error;
    }
  },

  async updateSport(id: string | number, sport: Partial<TypeSport>): Promise<TypeSport> {
    try {
      const response = await api.patch(`/admin/sports/${id}`, sport);
      return response.data;
    } catch (error) {
      console.error("Error updating sport:", error);
      throw error;
    }
  },

  async deleteSport(id: string | number): Promise<void> {
    try {
      await api.delete(`/admin/sports/${id}`);
    } catch (error) {
      console.error("Error deleting sport:", error);
      throw error;
    }
  },

  async deleteSports(ids: number[]): Promise<void> {
    try {
      await api.delete(`/admin/sports/bulk`, { data: ids });
    } catch (error) {
      console.error("Error deleting sports:", error);
      throw error;
    }
  },

  async reorderSports(orders: TypeReorder[]): Promise<void> {
    try {
      await api.post(`/admin/sports/reorder`, orders);
    } catch (error) {
      console.error("Error reordering sports:", error);
      throw error;
    }
  }
};

export default ServiceSport;