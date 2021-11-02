import { makeAutoObservable } from "mobx";

export class MemosUIStore {
  constructor() {
    makeAutoObservable(this);
  }

  private _memoSearchText: string = "";
  get memoSearchText() {
    return this._memoSearchText;
  }
  set memoSearchText(textUpdate: string) {
    this._memoSearchText = textUpdate;
  }
}
