import { makeAutoObservable } from "mobx";

export type MemosCollapseStateMap = {
  [x: string]: boolean;
};

export class MemosUIStore {
  constructor() {
    makeAutoObservable(this);
  }

  private _memosCollapseStateMap: MemosCollapseStateMap = {};
  get memosCollapseStateMap() {
    return this._memosCollapseStateMap;
  }
  set memosCollapseStateMap(updatedMap: MemosCollapseStateMap) {
    this._memosCollapseStateMap = updatedMap;
  }

  private _isSearchBoxVisible: boolean = false;
  get isSearchBoxVisible() {
    return this._isSearchBoxVisible;
  }
  set isSearchBoxVisible(isVisible: boolean) {
    this._isSearchBoxVisible = isVisible;
  }

  private _memoSearchText: string = "";
  get memoSearchText() {
    return this._memoSearchText;
  }
  set memoSearchText(textUpdate: string) {
    this._memoSearchText = textUpdate;
  }
}
