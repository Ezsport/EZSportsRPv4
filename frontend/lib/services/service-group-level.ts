import { TypeReorder } from "@/types/types";
import { api } from "@/lib/services/api";
import { components } from "@/types/api-types";

class ServiceGroupLevel {
  async getGroupLevels(): Promise<components["schemas"]["BaseGroupLevelDto"][]> {
    const response = await api.get("/admin/group-levels");
    return response.data;
  }

  async getGroupLevel(id: number): Promise<components["schemas"]["BaseGroupLevelDto"]> {
    const response = await api.get(`/admin/group-levels/${id}`);
    return response.data;
  }

  async createGroupLevel(data: Partial<components["schemas"]["BaseGroupLevelDto"]>): Promise<components["schemas"]["BaseGroupLevelDto"]> {
    const response = await api.post("/admin/group-levels", data);
    return response.data;
  }

  async updateGroupLevel(id: number, data: Partial<components["schemas"]["BaseGroupLevelDto"]>): Promise<components["schemas"]["BaseGroupLevelDto"]> {
    const response = await api.patch(`/admin/group-levels/${id}`, data);
    return response.data;
  }

  async deleteGroupLevel(id: number): Promise<void> {
    await api.delete(`/admin/group-levels/${id}`);
  }

  async deleteGroupLevels(ids: number[]): Promise<void> {
    await api.post("/admin/group-levels/delete-many", { ids });
  }

  async reorderGroupLevels(orders: TypeReorder[]): Promise<void> {
    await api.post("/admin/group-levels/reorder", orders);
  }
}

export default new ServiceGroupLevel();
