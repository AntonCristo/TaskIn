import { makeAutoObservable } from "mobx";
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
}

export const memoStore = new MemoStore(
  new MemosUIStore(),
  new MemosDataStore()
);
