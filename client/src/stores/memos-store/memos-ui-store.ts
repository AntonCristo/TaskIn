import dayjs from "dayjs";
import { action, makeAutoObservable } from "mobx";
import { Memo, UrgencyColor } from "src/client-types";
import { customError } from "src/errors";
import { getSessionPersistedUIState } from "src/utils";
import {
  EditMemoProfile,
  FilterProfile,
  MemosCollapseStateMap,
  MemosSortingProfile,
} from "./ui-store-types";

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

  private _editMemoProfile: EditMemoProfile = {
    content: false,
    creationDate: false,
    dueDate: false,
    title: false,
    hashtag: false,
  };
  get editMemoProfile() {
    return this._editMemoProfile;
  }
  set editMemoProfile(editUpdate: EditMemoProfile) {
    this._editMemoProfile = editUpdate;
  }

  private _initSortingProfileFromSession = () => {
    const sessionSortElement =
      getSessionPersistedUIState()?.MEMO_UI_STORE?.find(
        (uiElement) => uiElement.key === "SORT"
      );

    const sortValue = sessionSortElement?.value as MemosSortingProfile;

    return sortValue ? sortValue : null;
  };
  private _sortingProfile: MemosSortingProfile =
    this._initSortingProfileFromSession() || {
      sort: null,
      sortDirection: "DOWN",
    };
  get sortingProfile() {
    return this._sortingProfile;
  }
  set sortingProfile(sortUpdate: MemosSortingProfile) {
    this._sortingProfile = sortUpdate;
  }

  private _initFilterProfileFromSession = () => {
    const sessionSortElement =
      getSessionPersistedUIState()?.MEMO_UI_STORE?.find(
        (uiElement) => uiElement.key === "FILTER"
      );

    const filterValue = sessionSortElement?.value as FilterProfile;

    return Object.keys(filterValue).length ? filterValue : null;
  };
  private _filterProfile: FilterProfile =
    this._initFilterProfileFromSession() || {};
  get filterProfile() {
    return this._filterProfile;
  }
  set filterProfile(filterProfileUpdate: FilterProfile) {
    this._filterProfile = filterProfileUpdate;
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
        throw customError.unexpectedSwitchDefaultCaseError("_sortMemosByTitle");
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
        throw customError.unexpectedSwitchDefaultCaseError(
          "_sortMemosByCreationDate"
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
        throw customError.unexpectedSwitchDefaultCaseError(
          "_sortMemosByDueDate"
        );
    }
  };

  private _sortMemosByUrgencyLevel = (memos: Memo[]) => {
    const urgencyColorWithWeight = {
      [UrgencyColor.Low]: 0,
      [UrgencyColor.Medium]: 1,
      [UrgencyColor.High]: 2,
    };

    switch (this._sortingProfile.sortDirection) {
      case "DOWN":
        return memos.sort((memo1, memo2) =>
          urgencyColorWithWeight[this.getMemoUrgencyLevel(memo1)!] >
          urgencyColorWithWeight[this.getMemoUrgencyLevel(memo2)!]
            ? -1
            : 1
        );
      case "UP":
        return memos.sort((memo1, memo2) =>
          urgencyColorWithWeight[this.getMemoUrgencyLevel(memo1)!] >
          urgencyColorWithWeight[this.getMemoUrgencyLevel(memo2)!]
            ? 1
            : -1
        );
      default:
        throw customError.unexpectedSwitchDefaultCaseError(
          "_sortMemosByUrgencyLevel"
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
        throw customError.unexpectedSwitchDefaultCaseError("getSortedMemos");
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

  public nullifyUIStateOnLogout = action(() => {
    this._memosCollapseStateMap = {};
    this._sortingProfile = {
      sort: null,
      sortDirection: "DOWN",
    };
    this._filterProfile = {};
  });

  private _filterByTitle = (memos: Memo[], titleInFilter: string) => {
    return memos.filter((memo) =>
      memo.title.toLowerCase().includes(titleInFilter)
    );
  };

  private _filterByUrgencyLevel = (
    memos: Memo[],
    urgencyLevelsInFilter: UrgencyColor[]
  ) => {
    return memos.filter((memo) =>
      urgencyLevelsInFilter.includes(
        this.getMemoUrgencyLevel(memo) as UrgencyColor
      )
    );
  };

  public getFilteredMemos = (
    memos: Memo[],
    exclude?: (keyof FilterProfile)[]
  ) => {
    const activeFilterKeys = Object.keys(
      this._filterProfile
    ) as (keyof FilterProfile)[];

    let memosAfterFilter: Memo[] = memos.map((memo) =>
      JSON.parse(JSON.stringify(memo))
    );

    if (!activeFilterKeys.length) {
      return memos;
    }

    activeFilterKeys.forEach((filterKey) => {
      if (exclude && exclude.length && exclude.includes(filterKey)) {
        //exclude filtration
      } else {
        switch (filterKey) {
          case "title":
            memosAfterFilter = this._filterByTitle(
              memosAfterFilter,
              this._filterProfile[filterKey] || ""
            );
            break;
          case "urgencyLevel":
            memosAfterFilter = this._filterByUrgencyLevel(
              memosAfterFilter,
              this._filterProfile[filterKey] || []
            );
            break;
          default:
            break;
        }
      }
    });

    return memosAfterFilter;
  };
}
