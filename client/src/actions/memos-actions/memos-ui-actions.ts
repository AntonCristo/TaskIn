import { action } from "mobx";
import { Uuid, ValueOf } from "src/client-types";
import { memoStore, MemosCollapseStateMap } from "src/stores";
import { EditMemoProfile } from "src/stores";

export const onChangeMemoSearchText = action((memoSearchText: string) => {
  memoStore.uiStoreInstance.memoSearchText = memoSearchText;
});

export const toggleSearchBoxVisibility = action(() => {
  memoStore.uiStoreInstance.isSearchBoxVisible =
    !memoStore.uiStoreInstance.isSearchBoxVisible;
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
