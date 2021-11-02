import { makeAutoObservable } from "mobx";
import { MemosUIStore } from "./memos-ui-store";

class MemoStore {
  constructor(memoUIStoreInstance: MemosUIStore) {
    this._uiStoreInstance = memoUIStoreInstance;
    makeAutoObservable(this);
  }

  private _uiStoreInstance: MemosUIStore;
  get uiStoreInstance() {
    return this._uiStoreInstance;
  }
}

export const memoStore = new MemoStore(new MemosUIStore());
