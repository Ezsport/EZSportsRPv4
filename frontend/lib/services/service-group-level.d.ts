import { TypeReorder } from "@/types/types";
import { components } from "@/types/api-types";

declare class ServiceGroupLevel {
  getGroupLevels(): Promise<components["schemas"]["BaseGroupLevelDto"][]>;
  getGroupLevel(id: number): Promise<components["schemas"]["BaseGroupLevelDto"]>;
  createGroupLevel(data: Partial<components["schemas"]["BaseGroupLevelDto"]>): Promise<components["schemas"]["BaseGroupLevelDto"]>;
  updateGroupLevel(id: number, data: Partial<components["schemas"]["BaseGroupLevelDto"]>): Promise<components["schemas"]["BaseGroupLevelDto"]>;
  deleteGroupLevel(id: number): Promise<void>;
  deleteGroupLevels(ids: number[]): Promise<void>;
  reorderGroupLevels(orders: TypeReorder[]): Promise<void>;
}

declare const _default: ServiceGroupLevel;
export default _default;
