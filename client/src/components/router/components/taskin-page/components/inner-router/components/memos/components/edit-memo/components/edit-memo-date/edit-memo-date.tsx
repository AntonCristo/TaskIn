import { CSSProperties } from "react";
import { observer } from "mobx-react";
import { Memo, UrgencyColor } from "src/client-types";
import editIcon from "src/assets/svg/edit_24dp.svg";
import { Button, Date } from "src/shared";

import classes from "./edit-memo-date.module.css";

type EditMemoDateProps = {
  memo: Memo;
  dateTitle: "creationDate" | "dueDate";
};

const buttonStyleOverride: CSSProperties = {
  minWidth: "32px",
};

export const EditMemoDate = observer((props: EditMemoDateProps) => {
  const { memo, dateTitle } = props;

  let _eidtedMemoDate: number;
  let _editMemoDisplayTitle: string;

  switch (dateTitle) {
    case "creationDate":
      _eidtedMemoDate = memo.creationDate;
      _editMemoDisplayTitle = "Created on:";
      break;
    case "dueDate":
      _eidtedMemoDate = memo.creationDate;
      _editMemoDisplayTitle = "Due date:";
      break;
    default:
      throw Error(
        "[EditMemoDate]:: default case should never happen, check everything"
      );
  }

  return (
    <div className={classes.editMemoDate}>
      <div className={classes.editMemoTitle}>{_editMemoDisplayTitle}</div>
      <div className={classes.editMemoDateComponent}>
        <Date
          color={dateTitle === "creationDate" ? "#fff" : UrgencyColor.Low}
          fontSize={16}
          date={_eidtedMemoDate}
        />
      </div>
      <Button
        styleOverride={buttonStyleOverride}
        title=""
        icon={editIcon}
        onClick={() => {}}
      />
    </div>
  );
});
