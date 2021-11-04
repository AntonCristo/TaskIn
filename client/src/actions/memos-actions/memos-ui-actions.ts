import { action } from "mobx";
import { Uuid } from "src/client-types";
import { memoStore, MemosCollapseStateMap } from "src/stores";

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
