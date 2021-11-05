import { observer } from "mobx-react";
import { memosCrudActions } from "src/actions";
import { Uuid } from "src/client-types";

import classes from "./edit-memo.module.css";

type EditMemoProps = {
  memoUUID: Uuid;
  returnFromEditPage: () => void;
};

export const EditMemo = observer((props: EditMemoProps) => {
  const { memoUUID, returnFromEditPage } = props;

  const _memoFromMap = memosCrudActions.getCopyOfMemoFromMap(memoUUID);
  if (!_memoFromMap) {
    return <div>ERROR PAGE</div>;
  }

  return (
    <div className={classes.editMemo}>
      <button onClick={returnFromEditPage}>Return</button>
      <div>
        Title:
        {_memoFromMap.title}
      </div>
      <div>UUID: {_memoFromMap.uuid}</div>
      <div>Content: {_memoFromMap.content}</div>
      <div>strat date: {_memoFromMap.creationDate}</div>
      <div>due date: {_memoFromMap.dueDate}</div>
      <div>done? {`${_memoFromMap.isDone}`}</div>
    </div>
  );
});
