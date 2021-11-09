import dayjs from "dayjs";
import { makeAutoObservable } from "mobx";
import { Memo, UrgencyColor } from "src/client-types";

export type MemosUrgencyLevelMap = {
  [x: string]: UrgencyColor | undefined;
};

export type MemosCollapseStateMap = {
  [x: string]: boolean;
};

export type EditMemoProfile = {
  title: boolean;
  content: boolean;
  creationDate: boolean;
  dueDate: boolean;
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

  private _memoUrgencyLevelMap: MemosUrgencyLevelMap = {};
  get memoUrgencyLevelMap() {
    return this._memoUrgencyLevelMap;
  }
  set memoUrgencyLevelMap(updatedMap: MemosUrgencyLevelMap) {
    this._memoUrgencyLevelMap = updatedMap;
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

  private _editMemoProfile: EditMemoProfile = {
    content: false,
    creationDate: false,
    dueDate: false,
    title: false,
  };
  get editMemoProfile() {
    return this._editMemoProfile;
  }
  set editMemoProfile(editUpdate: EditMemoProfile) {
    this._editMemoProfile = editUpdate;
  }

  public getMemoUrgencyLevel = (memo: Memo) => {
    const timeDiff = memo.dueDate - memo.creationDate;
    const deltaX = timeDiff / 3;

    enum UrgencyRange {
      low = memo.creationDate + deltaX,
      medium = memo.creationDate + deltaX * 2,
      high = memo.creationDate + deltaX * 3,
    }

    const now = dayjs().valueOf();

    if (now <= UrgencyRange.low) {
      return UrgencyColor.Low;
    }
    if (now > UrgencyRange.low && now <= UrgencyRange.medium) {
      return UrgencyColor.Medium;
    }
    if (now > UrgencyRange.medium) {
      return UrgencyColor.High;
    }
  };
}
