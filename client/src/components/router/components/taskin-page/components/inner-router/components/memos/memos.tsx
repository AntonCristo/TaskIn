import { locationStore } from "src/stores";
import { routerLocationSetter, memoUIActions } from "src/actions";

import { MemosHeader, MemosItems, EditMemo } from "./components";

import classes from "./memos.module.css";

export const Memos = () => {
  const { reduceMemoUUIDFromUrl } = locationStore;

  const closeEditMemoDialog = () => {
    memoUIActions.resetEditMemoProfile();
    routerLocationSetter("/taskin/memos");
  };

  const _memoUUIDFromUrl = reduceMemoUUIDFromUrl();

  return (
    <div className={classes.memos}>
      <MemosHeader />
      <MemosItems />
      {_memoUUIDFromUrl ? (
        <EditMemo
          returnFromEditPage={closeEditMemoDialog}
          memoUUID={_memoUUIDFromUrl}
        />
      ) : null}
    </div>
  );
};
