import { observer } from "mobx-react";
import { Uuid } from "src/client-types";
import { Button, Spinner } from "src/shared";
import { memoStore } from "src/stores";
import { memosCrudActions, memoUIActions } from "src/actions";

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
      memoUIActions.calculateSingleMemoUrgencyLevelColor(memoUUID);
    }, 0);
  }

  const ensureTitleIsNotEmptyBeforeReturning = () => {
    !_memoFromMap.title &&
      memosCrudActions.updateSingleMemo(
        memoUUID,
        "title",
        `Memo ${Date.now().toString().slice(6)}`
      );

    returnFromEditPage();
  };

  return (
    <div className={classes.editMemoAbsolute}>
      <div className={classes.editMemo}>
        <EditMemoTitle memo={_memoFromMap} />
        <EditMemoHashtags memo={_memoFromMap} />
        <EditMemoContent memo={_memoFromMap} />
        <EditMemoDate dateTitle="creationDate" memo={_memoFromMap} />
        <EditMemoDate dateTitle="dueDate" memo={_memoFromMap} />
        <Button
          styleOverride={{ marginTop: "20px" }}
          title="Return"
          onClick={ensureTitleIsNotEmptyBeforeReturning}
        />
      </div>
      <div className={classes.desktopSchduleStateAnnouncement}>
        <DatesDiffMessage memo={_memoFromMap} />
      </div>
    </div>
  );
});
