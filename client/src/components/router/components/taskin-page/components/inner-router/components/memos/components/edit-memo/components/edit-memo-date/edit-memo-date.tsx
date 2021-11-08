import { ChangeEvent, CSSProperties } from "react";
import { observer } from "mobx-react";
import { Memo, UrgencyColor } from "src/client-types";
import editIcon from "src/assets/svg/edit_24dp.svg";
import doneIcon from "src/assets/svg/done_24dp.svg";
import { Button, Date } from "src/shared";
import { memosCrudActions, memoUIActions } from "src/actions";
import { memoStore } from "src/stores";
import { ONE_DAY_IN_MS } from "src/constants";
import dayjs from "dayjs";

import classes from "./edit-memo-date.module.css";

type EditMemoDateProps = {
  memo: Memo;
  dateTitle: "creationDate" | "dueDate";
};

const buttonStyleOverride: CSSProperties = {
  minWidth: "32px",
  border: "none",
  backgroundColor: "transparent",
};

export const EditMemoDate = observer((props: EditMemoDateProps) => {
  const { memo, dateTitle } = props;
  const { uiStoreInstance } = memoStore;

  let _eidtedMemoDate: number;
  let _editMemoDisplayTitle: string;

  switch (dateTitle) {
    case "creationDate":
      _eidtedMemoDate = memo.creationDate;
      _editMemoDisplayTitle = "Created on:";
      break;
    case "dueDate":
      _eidtedMemoDate = memo.dueDate;
      _editMemoDisplayTitle = "Due date:";
      break;
    default:
      throw Error(
        "[EditMemoDate]:: default case should never happen, check everything"
      );
  }

  const _isDateInEditMode = uiStoreInstance.editMemoProfile[dateTitle];

  const toggleDateToEditModeHandler = () => {
    memoUIActions.editMemoProfile(
      dateTitle,
      !memoStore.uiStoreInstance.editMemoProfile[dateTitle]
    );
  };

  const onEditMemoChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    dayjs(event.target.value).isValid() &&
      memosCrudActions.updateSingleMemo(
        memo.uuid,
        dateTitle,
        dayjs(event.target.value).valueOf()
      );
  };

  return (
    <div className={classes.editMemoDate}>
      <div className={classes.editMemoTitle}>{_editMemoDisplayTitle}</div>
      <div className={classes.editMemoDateComponent}>
        <Date
          onChange={onEditMemoChangeHandler}
          editMode={_isDateInEditMode}
          color={dateTitle === "creationDate" ? "#fff" : UrgencyColor.Low}
          minDate={
            dateTitle === "dueDate" ? memo.creationDate + ONE_DAY_IN_MS : 0
          }
          fontSize={16}
          date={_eidtedMemoDate}
        />
      </div>
      <Button
        isDisabled={dateTitle === "creationDate" ? true : false}
        styleOverride={buttonStyleOverride}
        title=""
        icon={_isDateInEditMode ? doneIcon : editIcon}
        onClick={toggleDateToEditModeHandler}
      />
    </div>
  );
});
