import { CSSProperties } from "react";
import { observer } from "mobx-react";
import { Uuid } from "src/client-types";
import { Button, Spinner } from "src/shared";
import { memoStore } from "src/stores";
import { memosCrudActions } from "src/actions";
import returnIcon from "src/assets/svg/return_24dp.svg";

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
  const { dataStoreInstance, uiStoreInstance } = memoStore;

  const _memoFromMap = dataStoreInstance.memosMap[memoUUID];
  if (!_memoFromMap) {
    return (
      <div className={classes.editMemoLoading}>
        <Spinner />
      </div>
    );
  }
  const _memoUrgencyLevelColor =
    uiStoreInstance.getMemoUrgencyLevel(_memoFromMap);

  const buttonStyleOverride: CSSProperties = {
    marginTop: "auto",
    border: `2px solid ${_memoUrgencyLevelColor}`,
    backgroundColor: _memoUrgencyLevelColor,
  };

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
    <div className={classes.editMemo}>
      <EditMemoTitle memo={_memoFromMap} />
      <EditMemoHashtags memo={_memoFromMap} />
      <EditMemoContent memo={_memoFromMap} />
      <EditMemoDate dateTitle="creationDate" memo={_memoFromMap} />
      <EditMemoDate dateTitle="dueDate" memo={_memoFromMap} />
      <DatesDiffMessage memo={_memoFromMap} />
      <Button
        styleOverride={buttonStyleOverride}
        icon={returnIcon}
        title="Return"
        onClick={ensureTitleIsNotEmptyBeforeReturning}
      />
    </div>
  );
});
