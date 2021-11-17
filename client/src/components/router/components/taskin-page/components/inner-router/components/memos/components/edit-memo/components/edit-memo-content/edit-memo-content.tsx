import { ChangeEvent, FocusEvent } from "react";
import { observer } from "mobx-react";
import { memosCrudActions, memoUIActions } from "src/actions";
import { Memo } from "src/client-types";
import { memoStore } from "src/stores";

import classes from "./edit-memo-content.module.css";

type EditMemoContentProps = {
  memo: Memo;
};

export const EditMemoContent = observer((props: EditMemoContentProps) => {
  const { memo } = props;
  const { uiStoreInstance } = memoStore;
  const _memoUrgencyLevelColor = uiStoreInstance.getMemoUrgencyLevel(memo);

  const _isContentInEditMode = uiStoreInstance.editMemoProfile?.content;

  const toggleContentEditModeHandler = () => {
    memoUIActions.editMemoProfile(
      "content",
      !memoStore.uiStoreInstance.editMemoProfile.content
    );
  };

  const onChangeMemoTitleHandler = (
    event: ChangeEvent<HTMLTextAreaElement>
  ) => {
    memosCrudActions.updateSingleMemo(memo.uuid, "content", event.target.value);
  };

  const onFocusHandler = (event: FocusEvent<HTMLTextAreaElement>) => {
    event.currentTarget.select();
  };

  return (
    <div
      style={{
        borderBottom: `2px solid ${_memoUrgencyLevelColor}`,
        borderTop: `2px solid ${_memoUrgencyLevelColor}`,
      }}
      className={classes.editMemoContentWrapper}
    >
      <div className={classes.editMemoContent}>
        {_isContentInEditMode ? (
          <textarea
            onBlur={toggleContentEditModeHandler}
            autoFocus
            onFocus={onFocusHandler}
            onChange={onChangeMemoTitleHandler}
            value={memo.content}
            placeholder="Type your memo..."
          />
        ) : (
          <div
            className={classes.contentAsLabel}
            onClick={toggleContentEditModeHandler}
          >
            {memo.content}
          </div>
        )}
      </div>
    </div>
  );
});
