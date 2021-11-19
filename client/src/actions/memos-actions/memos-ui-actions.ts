import { action } from "mobx";
import { Uuid, ValueOf } from "src/client-types";
import {
  memoStore,
  MemosCollapseStateMap,
  MemosDisplayClass,
} from "src/stores";
import { EditMemoProfile } from "src/stores";
import {
  MemosSortingProfile,
  MemosUrgencyLevelMap,
  SortingOption,
} from "src/stores/memos-store/memos-ui-store";

export const onChangeMemoSearchText = action((memoSearchText: string) => {
  memoStore.uiStoreInstance.memoSearchText = memoSearchText;
});

export const calculateSingleMemoUrgencyLevelColor = action((memoUUID: Uuid) => {
  const copyOfUrgencyLevelMap: MemosUrgencyLevelMap = JSON.parse(
    JSON.stringify(memoStore.uiStoreInstance.memoUrgencyLevelMap)
  );

  const memoRef = memoStore.dataStoreInstance.memosMap[memoUUID];

  copyOfUrgencyLevelMap[memoUUID as string] =
    memoStore.uiStoreInstance.getMemoUrgencyLevel(memoRef);

  memoStore.uiStoreInstance.memoUrgencyLevelMap = copyOfUrgencyLevelMap;
});

export const deleteSingleMemoUrgencyLevelState = action((memoUUID: Uuid) => {
  const copyOfUrgencyLevelMap: MemosUrgencyLevelMap = JSON.parse(
    JSON.stringify(memoStore.uiStoreInstance.memoUrgencyLevelMap)
  );

  delete copyOfUrgencyLevelMap[memoUUID];

  memoStore.uiStoreInstance.memoUrgencyLevelMap = copyOfUrgencyLevelMap;
});

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
