import { action } from "mobx";
import { memoStore } from "../../stores";

export const onChangeMemoSearchText = action((memoSearchText: string) => {
  memoStore.uiStoreInstance.memoSearchText = memoSearchText;
});
