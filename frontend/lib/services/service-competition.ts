import { TypeReorder } from "@/types/types";
import { api } from "@/lib/services/api";
import { components } from "@/types/api-types";

class ServiceCompetition {
  async getCompetitions(): Promise<components["schemas"]["BaseCompetitionDto"][]> {
    const response = await api.get("/admin/competitions");
    return response.data;
  }

  async getCompetition(id: number): Promise<components["schemas"]["BaseCompetitionDto"]> {
    const response = await api.get(`/admin/competitions/${id}`);
    return response.data;
  }

  async createCompetition(data: Partial<components["schemas"]["BaseCompetitionDto"]>): Promise<components["schemas"]["BaseCompetitionDto"]> {
    const response = await api.post("/admin/competitions", data);
    return response.data;
  }

  async updateCompetition(id: number, data: Partial<components["schemas"]["BaseCompetitionDto"]>): Promise<components["schemas"]["BaseCompetitionDto"]> {
    const response = await api.patch(`/admin/competitions/${id}`, data);
    return response.data;
  }

  async deleteCompetition(id: number): Promise<void> {
    await api.delete(`/admin/competitions/${id}`);
  }

  async deleteCompetitions(ids: number[]): Promise<void> {
    await api.post("/admin/competitions/delete-many", { ids });
  }

  async reorderCompetitions(orders: TypeReorder[]): Promise<void> {
    await api.post("/admin/competitions/reorder", orders);
  }
}

export default new ServiceCompetition();
