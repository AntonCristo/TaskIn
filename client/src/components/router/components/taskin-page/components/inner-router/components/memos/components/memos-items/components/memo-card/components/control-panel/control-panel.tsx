import { CSSProperties, MouseEvent } from "react";
import dayjs from "dayjs";
import { Memo } from "src/client-types";
import rightArrowIcon from "src/assets/svg/east_24dp.svg";
import doneIcon from "src/assets/svg/done_24dp.svg";
import removeDoneIcon from "src/assets/svg/remove_done_24dp.svg";
import deleteIcon from "src/assets/svg/delete_24dp.svg";
import expandLessIcon from "src/assets/svg/expand_less_24dp.svg";
import expandMoreIcon from "src/assets/svg/expand_more_24dp.svg";
import restoreFromTrashIcon from "src/assets/svg/restore_from_trash_24dp.svg";
import { Button } from "src/shared";
import {
  memosCrudActions,
  memoUIActions,
  notificationActions,
} from "src/actions";

import classes from "./control-panel.module.css";

type ControlPanelProps = {
  memo: Memo;
  isCollapsed: boolean;
};

const controlPanelButtonsStyleOverride: CSSProperties = {
  minWidth: "40px",
  border: "none",
  boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
};

const controlPanelToggleCollapseButtonStyleOverride: CSSProperties = {
  border: "none",
  backgroundColor: "transparent",
};

export const ControlPanel = (props: ControlPanelProps) => {
  const { memo, isCollapsed } = props;

  const isMemoDoneToggler = () => {
    memosCrudActions.updateSingleMemo(memo.uuid, "isDone", !memo.isDone);
  };

  const popIsMemoDoneConfirmation = () => {
    notificationActions.popNotificationForUser(
      memo.title,
      memo.isDone
        ? `Will return to progress section.\nContinue?`
        : `Mark as completed?`,
      isMemoDoneToggler
    );
  };

  const deleteMemoFromMapHandler = () => {
    memosCrudActions.deleteSingleMemoFromMap(memo.uuid);
    memoUIActions.deleteSingleMemoCollapseState(memo.uuid);
  };

  const popDeleteConfirmation = () => {
    notificationActions.popNotificationForUser(
      memo.title,
      memo.isDeleted
        ? "Will be permanently removed.\nContinue?"
        : "Are you sure you want to delete this memo?",
      deleteMemoFromMapHandler
    );
  };

  const restoreDeletedMemo = () => {
    memosCrudActions.updateSingleMemo(memo.uuid, "isDeleted", false);
  };

  const popRestoreDeletedConfirmation = () => {
    notificationActions.popNotificationForUser(
      memo.title,
      `Wil be moved to ${
        memo.isDone ? `"Completed"` : `"In progress"`
      } section.\nContinue?`,
      restoreDeletedMemo
    );
  };

  const toggleMemoCollapsedState = () => {
    memoUIActions.toggleSingleMemoCollapseState(memo.uuid);
  };

  const preventClickPropogation = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  return (
    <div
      className={[
        classes.controlPanel,
        isCollapsed && classes.minimizedControlPanel,
      ].join(" ")}
    >
      {isCollapsed ? null : (
        <div className={classes.memoDates}>
          <span
            className={[
              classes.startDate,
              memo.isDone && classes.finishedDate,
            ].join(" ")}
          >
            {dayjs(memo.creationDate).format("DD/MM/YYYY")}{" "}
          </span>
          <img src={rightArrowIcon} alt="direction" />
          <span
            className={[
              classes.endDate,
              memo.isDone && classes.finishedDate,
            ].join(" ")}
          >
            {dayjs(memo.dueDate).format("DD/MM/YYYY")}
          </span>
        </div>
      )}
      <div onClick={preventClickPropogation} className={classes.memoButtons}>
        {memo.isDeleted ? (
          <Button
            styleOverride={controlPanelButtonsStyleOverride}
            title="Restore"
            icon={restoreFromTrashIcon}
            onClick={popRestoreDeletedConfirmation}
          />
        ) : (
          <>
            <Button
              isDisabled={memo.isDeleted}
              styleOverride={controlPanelButtonsStyleOverride}
              title=""
              icon={memo.isDone ? removeDoneIcon : doneIcon}
              onClick={popIsMemoDoneConfirmation}
            />
            <Button
              styleOverride={controlPanelToggleCollapseButtonStyleOverride}
              title=""
              icon={isCollapsed ? expandMoreIcon : expandLessIcon}
              onClick={toggleMemoCollapsedState}
            />
          </>
        )}
        <Button
          styleOverride={controlPanelButtonsStyleOverride}
          title={memo.isDeleted ? "Delete" : ""}
          icon={deleteIcon}
          onClick={popDeleteConfirmation}
        />
      </div>
    </div>
  );
};
