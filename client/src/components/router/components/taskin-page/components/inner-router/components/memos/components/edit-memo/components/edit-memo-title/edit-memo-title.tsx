import { CSSProperties, useEffect } from "react";
import { Memo } from "src/client-types";
import editIcon from "src/assets/svg/edit_24dp.svg";
import doneIcon from "src/assets/svg/done_24dp.svg";
import { Button, ControlledInput } from "src/shared";
import { memoUIActions, memosCrudActions } from "src/actions";
import { memoStore } from "src/stores";

import classes from "./edit-memo-title.module.css";
import { observer } from "mobx-react";

type EditMemoProps = {
  memo: Memo;
};

const buttonStyleOverride: CSSProperties = {
  minWidth: "30px",
  marginLeft: "auto",
};

export const EditMemoTitle = observer((props: EditMemoProps) => {
  const { memo } = props;
  const { uiStoreInstance } = memoStore;

  //TODO: after urgency map store is done,
  //add switch case for the border bottom
  //according to memo urgency level
  //css classes already exist in css file

  const _isTitleInEditMode = uiStoreInstance.editMemoProfile?.title;

  const toggleTitleToEditModeHandler = () => {
    memoUIActions.editMemoProfile(
      "title",
      !memoStore.uiStoreInstance.editMemoProfile.title
    );
  };

  const onChangeMemoTitleHandler = (changeEventValue: string) => {
    memosCrudActions.updateSingleMemo(memo.uuid, "title", changeEventValue);
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
      <div className={[classes.editMemo, classes.lowUrgencyColor].join(" ")}>
        {_isTitleInEditMode ? (
          <ControlledInput
            autoSelcet
            autoFocus
            onChange={onChangeMemoTitleHandler}
            value={memo.title}
          />
        ) : (
          <div
            onClick={toggleTitleToEditModeHandler}
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
        onClick={toggleTitleToEditModeHandler}
      />
    </div>
  );
});
