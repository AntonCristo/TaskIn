import { ChangeEvent, useEffect } from "react";
import { Memo } from "src/client-types";
import { memoUIActions, memosCrudActions } from "src/actions";
import { memoStore } from "src/stores";

import classes from "./edit-memo-title.module.css";
import { observer } from "mobx-react";

type EditMemoProps = {
  memo: Memo;
};

export const EditMemoTitle = observer((props: EditMemoProps) => {
  const { memo } = props;
  const { uiStoreInstance } = memoStore;
  const _isTitleInEditMode = uiStoreInstance.editMemoProfile?.title;

  const toggleTitleEditModeHandler = () => {
    memoUIActions.editMemoProfile(
      "title",
      !memoStore.uiStoreInstance.editMemoProfile.title
    );
  };

  const onChangeMemoTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    memosCrudActions.updateSingleMemo(memo.uuid, "title", event.target.value);
  };

  useEffect(() => {
    return () => {
      if (!memo.title) {
        memosCrudActions.updateSingleMemo(
          memo.uuid,
          "title",
          `Memo ${Date.now().toString().slice(6, -1)}`
        );
      }
    };
  }, [memo.title, memo.uuid]);

  return (
    <div className={classes.editMemoWrapper}>
      <div className={classes.editMemo}>
        {_isTitleInEditMode ? (
          <input
            autoFocus
            onBlur={toggleTitleEditModeHandler}
            className={classes.titleAsInput}
            onChange={onChangeMemoTitleHandler}
            value={memo.title}
            type="text"
          />
        ) : (
          <div
            onClick={toggleTitleEditModeHandler}
            className={classes.titleAsLabel}
          >
            {memo.title}
          </div>
        )}
      </div>
    </div>
  );
});
