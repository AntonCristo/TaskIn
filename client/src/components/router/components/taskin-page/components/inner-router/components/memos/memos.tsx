import { locationStore } from "src/stores";
import { routerLocationSetter, memoUIActions } from "src/actions";
import { observer } from "mobx-react";

import { MemosHeader, MemosItems, EditMemo, SortMemos } from "./components";

import classes from "./memos.module.css";

export const Memos = observer(() => {
  const { reduceMemoUUIDFromUrl, router_view } = locationStore;
  const _memoUUIDFromUrl = reduceMemoUUIDFromUrl();
  const _isSortDialogOpen = router_view === "/taskin/memos/sort";

  const closeEditMemoDialog = () => {
    memoUIActions.resetEditMemoProfile();
    routerLocationSetter("/taskin/memos");
  };

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
      {_isSortDialogOpen ? (
        <div className={classes.sortDialogContainer}>
          <SortMemos />
        </div>
      ) : null}
    </div>
  );
});
