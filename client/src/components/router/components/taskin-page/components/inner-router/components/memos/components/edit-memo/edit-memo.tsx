import { CSSProperties, useEffect } from "react";
import { observer } from "mobx-react";
import { Uuid } from "src/client-types";
import { Button, Spinner } from "src/shared";
import { memoStore } from "src/stores";
import {
  memosCrudActions,
  memoUIActions,
  routerLocationSetter,
} from "src/actions";
import { browserEventUtils } from "src/utils";
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
};

export const EditMemo = observer((props: EditMemoProps) => {
  const { memoUUID } = props;
  const { dataStoreInstance, uiStoreInstance } = memoStore;

  useEffect(() => {
    return () => {
      memoUIActions.resetEditMemoProfile();
    };
  }, []);

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
    marginLeft: "auto",
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

    routerLocationSetter("/taskin/memos");
  };

  return (
    <div
      onClick={browserEventUtils.preventParentClickEventHandler}
      className={classes.editMemo}
    >
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
