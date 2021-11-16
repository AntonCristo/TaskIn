import { Uuid } from "src/client-types";
import { MemosDataMap } from "src/stores";

export interface IMemoService {
  getMemosFromApiByInitiatorUUID(userUUID: Uuid): Promise<MemosDataMap | null>;
}
