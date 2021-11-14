import { makeAutoObservable } from "mobx";
import { UrgencyColor } from "src/client-types";
import { MemosDataStore } from "./memo-data-store";
import { MemosUIStore } from "./memos-ui-store";

class MemoStore {
  constructor(
    memoUIStoreInstance: MemosUIStore,
    memoDataStoreInstance: MemosDataStore
  ) {
    this._uiStoreInstance = memoUIStoreInstance;
    this._dataStoreInstance = memoDataStoreInstance;
    makeAutoObservable(this);
  }

  private _uiStoreInstance: MemosUIStore;
  get uiStoreInstance() {
    return this._uiStoreInstance;
  }

  private _dataStoreInstance: MemosDataStore;
  get dataStoreInstance() {
    return this._dataStoreInstance;
  }

  public getUrgencyLevelCounter = (urgencyLevel: UrgencyColor) => {
    let count = 0;
    Object.keys(this.uiStoreInstance.memoUrgencyLevelMap).forEach(
      (memoUUID) => {
        if (
          this.uiStoreInstance.memoUrgencyLevelMap[memoUUID] === urgencyLevel &&
          !this.dataStoreInstance.memosMap[memoUUID].isDeleted
        )
          count++;
      }
    );

    return count;
  };
}

export const memoStore = new MemoStore(
  new MemosUIStore(),
  new MemosDataStore()
);
