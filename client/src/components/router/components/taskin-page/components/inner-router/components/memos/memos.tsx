import { observer } from "mobx-react";
import { routerLocationSetter, memoUIActions } from "src/actions";
import { locationStore } from "src/stores";

import { MemosHeader, MemosItems, EditMemo } from "./components";

import classes from "./memos.module.css";

export const Memos = observer(() => {
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
});
