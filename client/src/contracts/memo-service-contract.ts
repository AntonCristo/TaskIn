import { MemosDataMap } from "../stores";

export interface IMemoService {
  getMemosFromApiByInitiatorUUID(): Promise<MemosDataMap | null>;
}
