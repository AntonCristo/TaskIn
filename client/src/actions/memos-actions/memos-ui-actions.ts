import { action } from "mobx";
import { UrgencyColor, Uuid, ValueOf } from "src/client-types";
import {
  memoStore,
  MemosCollapseStateMap,
  MemosDisplayClass,
} from "src/stores";
import { EditMemoProfile } from "src/stores";
import {
  FilterProfile,
  MemosSortingProfile,
  SortingOption,
} from "src/stores/memos-store/ui-store-types";

export const initSingleMemoCollapseState = action((memoUUID: Uuid) => {
  const copyOfCollapseStateMap: MemosCollapseStateMap = JSON.parse(
    JSON.stringify(memoStore.uiStoreInstance.memosCollapseStateMap)
  );
  if (copyOfCollapseStateMap[memoUUID as string] === undefined) {
    copyOfCollapseStateMap[memoUUID as string] = false;
    memoStore.uiStoreInstance.memosCollapseStateMap = copyOfCollapseStateMap;
  }
});

export const deleteSingleMemoCollapseState = action((memoUUID: Uuid) => {
  const copyOfCollapseStateMap: MemosCollapseStateMap = JSON.parse(
    JSON.stringify(memoStore.uiStoreInstance.memosCollapseStateMap)
  );

  delete copyOfCollapseStateMap[memoUUID];

  memoStore.uiStoreInstance.memosCollapseStateMap = copyOfCollapseStateMap;
});

export const toggleSingleMemoCollapseState = action((memoUUID: Uuid) => {
  const copyOfCollapseStateMap: MemosCollapseStateMap = JSON.parse(
    JSON.stringify(memoStore.uiStoreInstance.memosCollapseStateMap)
  );

  copyOfCollapseStateMap[memoUUID] = !copyOfCollapseStateMap[memoUUID];

  memoStore.uiStoreInstance.memosCollapseStateMap = copyOfCollapseStateMap;
});

export const shouldCollapseAllMemos = action((isCollapsed: boolean) => {
  const copyOfCollapseStateMap: MemosCollapseStateMap = JSON.parse(
    JSON.stringify(memoStore.uiStoreInstance.memosCollapseStateMap)
  );

  [...Object.keys(copyOfCollapseStateMap)].forEach(
    (key) => (copyOfCollapseStateMap[key] = isCollapsed)
  );

  memoStore.uiStoreInstance.memosCollapseStateMap = copyOfCollapseStateMap;
});

export const editMemoProfile = action(
  (key: keyof EditMemoProfile, value: ValueOf<EditMemoProfile>) => {
    const copyOfEditMemoProfile: EditMemoProfile = JSON.parse(
      JSON.stringify(memoStore.uiStoreInstance.editMemoProfile)
    );

    copyOfEditMemoProfile[key] = value;

    memoStore.uiStoreInstance.editMemoProfile = copyOfEditMemoProfile;
  }
);

export const resetEditMemoProfile = action(() => {
  const copyOfEditMemoProfile: EditMemoProfile = JSON.parse(
    JSON.stringify(memoStore.uiStoreInstance.editMemoProfile)
  );

  Object.keys(copyOfEditMemoProfile).forEach((key) => {
    copyOfEditMemoProfile[key as keyof EditMemoProfile] = false;
  });

  memoStore.uiStoreInstance.editMemoProfile = copyOfEditMemoProfile;
});

export const setMemosSortingProfile = action(
  (sortBy: SortingOption, sortDirection: "UP" | "DOWN") => {
    const copyOfSortingProfile: MemosSortingProfile = JSON.parse(
      JSON.stringify(memoStore.uiStoreInstance.sortingProfile)
    );

    copyOfSortingProfile.sort = sortBy;
    copyOfSortingProfile.sortDirection = sortDirection;

    memoStore.uiStoreInstance.sortingProfile = copyOfSortingProfile;
  }
);

export const setMemosDisplayClass = action(
  (displayClassUpdate: MemosDisplayClass) => {
    memoStore.dataStoreInstance.memosDisplayClass = displayClassUpdate;
  }
);

export const scrollToViewNewAddedMemo = action((newMemo: Uuid) => {
  const _newMemoCard = document.querySelector(`div[data-memo="${newMemo}"]`);

  _newMemoCard?.scrollIntoView({
    behavior: "smooth",
    block: "end",
    inline: "center",
  });
});

export const clearFilterProfile = action(() => {
  memoStore.uiStoreInstance.filterProfile = {};
});

export const clearFilterProfileByKey = action(
  (keyToRemove: keyof FilterProfile) => {
    const copyOfFilterProfile: FilterProfile = JSON.parse(
      JSON.stringify(memoStore.uiStoreInstance.filterProfile)
    );

    delete copyOfFilterProfile[keyToRemove];

    memoStore.uiStoreInstance.filterProfile = copyOfFilterProfile;
  }
);

const urgencyLevelHelper = (
  value: UrgencyColor,
  copyOfFilterProfileReference: FilterProfile
) => {
  const urgencyLevelUpdate = value as UrgencyColor;
  if (!copyOfFilterProfileReference.urgencyLevel) {
    copyOfFilterProfileReference.urgencyLevel = [urgencyLevelUpdate];
    return copyOfFilterProfileReference;
  }

  if (copyOfFilterProfileReference.urgencyLevel.includes(urgencyLevelUpdate)) {
    copyOfFilterProfileReference.urgencyLevel =
      copyOfFilterProfileReference.urgencyLevel.filter(
        (uc) => uc !== urgencyLevelUpdate
      );

    if (!copyOfFilterProfileReference.urgencyLevel.length) {
      clearFilterProfileByKey("urgencyLevel");
      return;
    }
    return copyOfFilterProfileReference;
  }

  copyOfFilterProfileReference.urgencyLevel.push(urgencyLevelUpdate);
  return copyOfFilterProfileReference;
};

export const setFilterProfileByKeyAndValue = action(
  (key: keyof FilterProfile, value: ValueOf<FilterProfile>) => {
    let copyOfFilterProfile: FilterProfile = JSON.parse(
      JSON.stringify(memoStore.uiStoreInstance.filterProfile)
    );

    switch (key) {
      case "title":
        copyOfFilterProfile.title = value as string;
        break;
      case "urgencyLevel":
        const helperResult = urgencyLevelHelper(
          value as UrgencyColor,
          copyOfFilterProfile
        );

        if (!helperResult) {
          //this case handles when setter function
          // deletes the key from the filter profile
          return;
        } else {
          copyOfFilterProfile = helperResult;
        }

        break;
      //TODO: add filter profile by key type
      default:
        return;
    }

    memoStore.uiStoreInstance.filterProfile = copyOfFilterProfile;
  }
);
