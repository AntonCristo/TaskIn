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

export type SortingOption =
  | "TITLE"
  | "CREATION_DATE"
  | "DUE_DATE"
  | "URGENCY_LEVEL"
  | null;

export type MemosSortingProfile = {
  sort: SortingOption;
  sortDirection: "UP" | "DOWN";
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

  private _sortingProfile: MemosSortingProfile = {
    sort: null,
    sortDirection: "DOWN",
  };
  get sortingProfile() {
    return this._sortingProfile;
  }
  set sortingProfile(sortUpdate: MemosSortingProfile) {
    this._sortingProfile = sortUpdate;
  }

  private _sortMemosByTitle = (memos: Memo[]) => {
    switch (this._sortingProfile.sortDirection) {
      case "DOWN":
        return memos.sort((memo1, memo2) =>
          memo1.title > memo2.title ? -1 : 1
        );
      case "UP":
        return memos.sort((memo1, memo2) =>
          memo1.title > memo2.title ? 1 : -1
        );
      default:
        throw Error(
          "[getSortedMemos]:: default case should never happen, check everything!!!"
        );
    }
  };

  private _sortMemosByCreationDate = (memos: Memo[]) => {
    switch (this._sortingProfile.sortDirection) {
      case "DOWN":
        return memos.sort((memo1, memo2) =>
          memo1.creationDate > memo2.creationDate ? -1 : 1
        );
      case "UP":
        return memos.sort((memo1, memo2) =>
          memo1.creationDate > memo2.creationDate ? 1 : -1
        );
      default:
        throw Error(
          "[getSortedMemos]:: default case should never happen, check everything!!!"
        );
    }
  };

  private _sortMemosByDueDate = (memos: Memo[]) => {
    switch (this._sortingProfile.sortDirection) {
      case "DOWN":
        return memos.sort((memo1, memo2) =>
          memo1.dueDate > memo2.dueDate ? -1 : 1
        );
      case "UP":
        return memos.sort((memo1, memo2) =>
          memo1.dueDate > memo2.dueDate ? 1 : -1
        );
      default:
        throw Error(
          "[getSortedMemos]:: default case should never happen, check everything!!!"
        );
    }
  };

  private _sortMemosByUrgencyLevel = (memos: Memo[]) => {
    switch (this._sortingProfile.sortDirection) {
      case "DOWN":
        return memos.sort((memo1, memo2) =>
          this._memoUrgencyLevelMap[memo1.uuid]! >
          this._memoUrgencyLevelMap[memo2.uuid]!
            ? -1
            : 1
        );
      case "UP":
        return memos.sort((memo1, memo2) =>
          this._memoUrgencyLevelMap[memo1.uuid]! >
          this._memoUrgencyLevelMap[memo2.uuid]!
            ? 1
            : -1
        );
      default:
        throw Error(
          "[getSortedMemos]:: default case should never happen, check everything!!!"
        );
    }
  };

  public getSortedMemos = (memos: Memo[]) => {
    if (!this._sortingProfile.sort) {
      return memos;
    }

    const copyOfMemos: Memo[] = [...memos];

    switch (this._sortingProfile.sort) {
      case "TITLE":
        return this._sortMemosByTitle(copyOfMemos);
      case "DUE_DATE":
        return this._sortMemosByDueDate(copyOfMemos);
      case "CREATION_DATE":
        return this._sortMemosByCreationDate(copyOfMemos);
      case "URGENCY_LEVEL":
        return this._sortMemosByUrgencyLevel(copyOfMemos);
      default:
        throw Error(
          "[getSortedMemos]:: default case should never happen, check everything!!!"
        );
    }
  };

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

  public getUrgencyLevelCounter = (urgencyLevel: UrgencyColor) => {
    let count = 0;
    Object.keys(this._memoUrgencyLevelMap).forEach((memoUUID) => {
      if (this._memoUrgencyLevelMap[memoUUID] === urgencyLevel) count++;
    });

    return count;
  };
}
