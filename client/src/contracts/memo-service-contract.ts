import { MemosDataMap } from "src/stores";

export interface IMemoService {
  getMemosFromApiByInitiatorUUID(): Promise<MemosDataMap | null>;
}
