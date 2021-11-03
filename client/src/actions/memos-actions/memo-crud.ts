import { action } from "mobx";
import { MemosDataMap, memoStore } from "../../stores";

export const updateMemosDataMap = action((memosDataMapUpdate: MemosDataMap) => {
  memoStore.dataStoreInstance.memosMap = memosDataMapUpdate;
});
