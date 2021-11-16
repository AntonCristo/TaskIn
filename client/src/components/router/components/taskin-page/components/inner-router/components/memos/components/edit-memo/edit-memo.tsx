import { observer } from "mobx-react";
import { Uuid } from "src/client-types";
import { Button, Spinner } from "src/shared";
import { memoStore } from "src/stores";
import { memoUIActions } from "src/actions";

import {
  EditMemoTitle,
  EditMemoContent,
  EditMemoDate,
  EditMemoHashtags,
  DatesDiffMessage,
} from "./components";

import classes from "./edit-memo.module.css";

type EditMemoProps = {
  memoUUID: Uuid;
  returnFromEditPage: () => void;
};

export const EditMemo = observer((props: EditMemoProps) => {
  const { memoUUID, returnFromEditPage } = props;
  const { dataStoreInstance } = memoStore;

  const _memoFromMap = dataStoreInstance.memosMap[memoUUID];
  if (!_memoFromMap) {
    return (
      <div className={classes.editMemoLoading}>
        <Spinner />
      </div>
    );
  } else {
    setTimeout(() => {
      memoUIActions.calculateSingleMemoUrgencyLevelState(memoUUID);
    }, 0);
  }

  return (
    <div className={classes.editMemoAbsolute}>
      <div
        className={[
          classes.editMemo,
          _memoFromMap.isDeleted && classes.editBlocked,
        ].join(" ")}
      >
        <EditMemoTitle memo={_memoFromMap} />
        <EditMemoHashtags memo={_memoFromMap} />
        <EditMemoContent memo={_memoFromMap} />
        <EditMemoDate dateTitle="creationDate" memo={_memoFromMap} />
        <EditMemoDate dateTitle="dueDate" memo={_memoFromMap} />
        {_memoFromMap.isDeleted ? null : (
          <Button
            styleOverride={{ marginTop: "20px" }}
            title="Return"
            onClick={returnFromEditPage}
          />
        )}
      </div>
      <div className={classes.desktopSchduleStateAnnouncement}>
        {_memoFromMap.isDeleted ? (
          <Button
            styleOverride={{
              position: "absolute",
              bottom: "20px",
              left: "20px",
            }}
            title="Return"
            onClick={returnFromEditPage}
          />
        ) : (
          <DatesDiffMessage memo={_memoFromMap} />
        )}
      </div>
    </div>
  );
});
