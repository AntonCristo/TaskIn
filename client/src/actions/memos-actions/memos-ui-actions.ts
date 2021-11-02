import { action } from "mobx";
import { memoStore } from "../../stores";

export const onChangeMemoSearchText = action((memoSearchText: string) => {
  memoStore.uiStoreInstance.memoSearchText = memoSearchText;
});

export const toggleSearchBoxVisibility = action(() => {
  memoStore.uiStoreInstance.isSearchBoxVisible =
    !memoStore.uiStoreInstance.isSearchBoxVisible;
});
