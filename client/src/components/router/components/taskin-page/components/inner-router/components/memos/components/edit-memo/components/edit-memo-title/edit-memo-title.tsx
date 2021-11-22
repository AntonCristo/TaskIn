import { ChangeEvent } from "react";
import { Memo } from "src/client-types";
import { memoUIActions, memosCrudActions } from "src/actions";
import { memoStore } from "src/stores";

import classes from "./edit-memo-title.module.css";
import { observer } from "mobx-react";
import { WithTooltip } from "src/shared";

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
            placeholder="Empty title..."
          />
        ) : (
          <WithTooltip tip={memo.title}>
            <div
              onClick={toggleTitleEditModeHandler}
              className={classes.titleAsLabel}
            >
              {memo.title || "Empty title..."}
            </div>
          </WithTooltip>
        )}
      </div>
    </div>
  );
});
