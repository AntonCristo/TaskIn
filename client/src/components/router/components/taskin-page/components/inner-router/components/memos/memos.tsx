import React, { RefObject, useEffect, KeyboardEvent } from "react";
import { locationStore } from "src/stores";
import { routerLocationSetter } from "src/actions";
import { observer } from "mobx-react";

import {
  MemosHeader,
  MemosItems,
  EditMemo,
  SortMemos,
  FilterMemos,
} from "./components";

import classes from "./memos.module.css";

export const Memos = observer(() => {
  const { reduceMemoUUIDFromUrl, router_view } = locationStore;
  const dialogContainerRef: RefObject<HTMLDivElement> = React.createRef();

  const _memoUUIDFromUrl = reduceMemoUUIDFromUrl();
  const _isEditMemoPageOpen = !!_memoUUIDFromUrl;
  const _isSortDialogOpen = router_view === "/taskin/memos/sort";
  const _isFilterDialogOpen = router_view === "/taskin/memos/filter";

  const closeDialog = () => {
    routerLocationSetter("/taskin/memos");
  };

  const onKeyDownHandler = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      routerLocationSetter("/taskin/memos");
    }
  };

  //[useEffect]:: gain focus abilities on render
  useEffect(() => {
    dialogContainerRef.current && dialogContainerRef.current?.focus();
  }, [dialogContainerRef]);

  return (
    <div className={classes.memos}>
      <MemosHeader />
      <MemosItems />
      {_isEditMemoPageOpen ? (
        <div
          tabIndex={0}
          onClick={closeDialog}
          onKeyDown={onKeyDownHandler}
          ref={dialogContainerRef}
          className={classes.dialogContainer}
        >
          <EditMemo memoUUID={_memoUUIDFromUrl} />{" "}
        </div>
      ) : null}
      {_isSortDialogOpen ? (
        <div
          tabIndex={0}
          onClick={closeDialog}
          onKeyDown={onKeyDownHandler}
          ref={dialogContainerRef}
          className={classes.dialogContainer}
        >
          <SortMemos />
        </div>
      ) : null}
      {_isFilterDialogOpen ? (
        <div
          tabIndex={0}
          onClick={closeDialog}
          onKeyDown={onKeyDownHandler}
          ref={dialogContainerRef}
          className={classes.dialogContainer}
        >
          <FilterMemos />
        </div>
      ) : null}
    </div>
  );
});
