import { ChangeEvent, CSSProperties, useEffect } from "react";
import { Memo } from "src/client-types";
import editIcon from "src/assets/svg/edit_24dp.svg";
import doneIcon from "src/assets/svg/done_24dp.svg";
import { Button } from "src/shared";
import { memoUIActions, memosCrudActions } from "src/actions";
import { memoStore } from "src/stores";

import classes from "./edit-memo-title.module.css";
import { observer } from "mobx-react";

type EditMemoProps = {
  memo: Memo;
};

const buttonStyleOverride: CSSProperties = {
  minWidth: "30px",
  border: "none",
  backgroundColor: "transparent",
};

export const EditMemoTitle = observer((props: EditMemoProps) => {
  const { memo } = props;
  const { uiStoreInstance } = memoStore;
  const _isTitleInEditMode = uiStoreInstance.editMemoProfile?.title;
  const _memoUrgencyLevelColor = uiStoreInstance.memoUrgencyLevelMap[memo.uuid];

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
      <div
        style={{ borderBottom: `2px solid ${_memoUrgencyLevelColor}` }}
        className={classes.editMemo}
      >
        {_isTitleInEditMode ? (
          <input
            autoFocus
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
      <Button
        styleOverride={buttonStyleOverride}
        icon={_isTitleInEditMode ? doneIcon : editIcon}
        title=""
        onClick={toggleTitleEditModeHandler}
      />
    </div>
  );
});
