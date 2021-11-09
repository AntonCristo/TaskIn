import { action } from "mobx";
import { UrgencyColor, Uuid, ValueOf } from "src/client-types";
import { memoStore, MemosCollapseStateMap } from "src/stores";
import { EditMemoProfile } from "src/stores";
import { MemosUrgencyLevelMap } from "src/stores/memos-store/memos-ui-store";

export const onChangeMemoSearchText = action((memoSearchText: string) => {
  memoStore.uiStoreInstance.memoSearchText = memoSearchText;
});

export const toggleSearchBoxVisibility = action(() => {
  memoStore.uiStoreInstance.isSearchBoxVisible =
    !memoStore.uiStoreInstance.isSearchBoxVisible;
});

export const calculateSingleMemoUrgencyLevelState = action(
  (memoUUID: Uuid, userMarkedMemoAsDone?: boolean) => {
    const copyOfUrgencyLevelMap: MemosUrgencyLevelMap = JSON.parse(
      JSON.stringify(memoStore.uiStoreInstance.memoUrgencyLevelMap)
    );

    //TODO: implement calculation of urgency level in uiStoreInstance to return
    //UrgencyColor by diff between dates of memo
    copyOfUrgencyLevelMap[memoUUID as string] = userMarkedMemoAsDone
      ? UrgencyColor.Done
      : UrgencyColor.Medium; //instead of Medium => user the method to calculate

    memoStore.uiStoreInstance.memoUrgencyLevelMap = copyOfUrgencyLevelMap;
  }
);

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
