import { action } from "mobx";
import { MemosDataMap, memoStore } from "src/stores";

export const updateMemosDataMap = action((memosDataMapUpdate: MemosDataMap) => {
  memoStore.dataStoreInstance.memosMap = memosDataMapUpdate;
});
