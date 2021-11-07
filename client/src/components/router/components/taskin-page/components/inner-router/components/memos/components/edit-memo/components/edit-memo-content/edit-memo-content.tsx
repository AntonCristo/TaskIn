import { ChangeEvent, CSSProperties, FocusEvent, Ref } from "react";
import { observer } from "mobx-react";
import { memosCrudActions, memoUIActions } from "src/actions";
import { Memo } from "src/client-types";
import editIcon from "src/assets/svg/edit_24dp.svg";
import doneIcon from "src/assets/svg/done_24dp.svg";
import { memoStore } from "src/stores";

import classes from "./edit-memo-content.module.css";
import { Button } from "src/shared";
import React from "react";

type EditMemoContentProps = {
  memo: Memo;
};

const buttonStyleOverride: CSSProperties = {
  minWidth: "20px",
  border: "none",
  backgroundColor: "transparent",
  position: "absolute",
  right: "-40px",
  top: "-5px",
};

export const EditMemoContent = observer((props: EditMemoContentProps) => {
  const { memo } = props;
  const { uiStoreInstance } = memoStore;
  const textareaRef: Ref<HTMLTextAreaElement> = React.createRef();

  const _isContentInEditMode = uiStoreInstance.editMemoProfile?.content;

  const toggleContentToEditModeHandler = () => {
    memoUIActions.editMemoProfile(
      "content",
      !memoStore.uiStoreInstance.editMemoProfile.content
    );
  };

  const onChangeMemoTitleHandler = (
    event: ChangeEvent<HTMLTextAreaElement>
  ) => {
    event.currentTarget.style.height = event.currentTarget.scrollHeight + "px";

    memosCrudActions.updateSingleMemo(memo.uuid, "content", event.target.value);
  };

  const onFocusHandler = (event: FocusEvent<HTMLTextAreaElement>) => {
    event.currentTarget.style.height = event.currentTarget.scrollHeight + "px";

    event.currentTarget.select();
  };

  return (
    <div className={classes.editMemoContentWrapper}>
      <div className={classes.editMemoContent}>
        {_isContentInEditMode ? (
          <textarea
            autoFocus
            onFocus={onFocusHandler}
            onChange={onChangeMemoTitleHandler}
            ref={textareaRef}
            value={memo.content}
            placeholder="Write your memo here..."
          />
        ) : (
          <div
            className={classes.contentAsLabel}
            onClick={toggleContentToEditModeHandler}
          >
            {memo.content}
          </div>
        )}
      </div>
      <Button
        styleOverride={buttonStyleOverride}
        icon={_isContentInEditMode ? doneIcon : editIcon}
        title=""
        onClick={toggleContentToEditModeHandler}
      />
      {/* <div className={classes.editMemo}>
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
      /> */}
    </div>
  );
});