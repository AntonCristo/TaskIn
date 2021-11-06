import { CSSProperties } from "react";
import { observer } from "mobx-react";
import { Uuid } from "src/client-types";
import { Button } from "src/shared";
import { memoStore } from "src/stores";

import { EditMemoTitle } from "./components";

import classes from "./edit-memo.module.css";

type EditMemoProps = {
  memoUUID: Uuid;
  returnFromEditPage: () => void;
};

const buttonStyleOverride: CSSProperties = {
  height: "35px",
  width: "100px",
  marginTop: "40px",
  fontWeight: 600,
};

export const EditMemo = observer((props: EditMemoProps) => {
  const { memoUUID, returnFromEditPage } = props;
  const { dataStoreInstance } = memoStore;

  const _memoFromMap = dataStoreInstance.memosMap[memoUUID];
  if (!_memoFromMap) {
    throw Error(
      "[EditMemo]:: possible cause 1.refresh without api fetching(memos are not persisted yet)"
    );
  }

  return (
    <div className={classes.editMemo}>
      <EditMemoTitle memo={_memoFromMap} />
      <div>Content: {_memoFromMap.content}</div>
      <div>strat date: {_memoFromMap.creationDate}</div>
      <div>due date: {_memoFromMap.dueDate}</div>
      <div>done? {`${_memoFromMap.isDone}`}</div>
      <Button
        styleOverride={buttonStyleOverride}
        title="Done"
        onClick={returnFromEditPage}
      />
    </div>
  );
});
