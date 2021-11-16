import { MouseEvent } from "react";
import { Button } from "src/shared";
import { tooltipActions } from "src/actions";
import { tooltipStore } from "src/stores";
import { notificationActions } from "src/actions";

import classes from "./notification-box.module.css";

type NotificationBoxProps = {
  confirmationCallback?: Function | null;
  header: string;
  content: string;
};

const buttonStyleOVerride = {
  border: "none",
};

export const NotificationBox = (props: NotificationBoxProps) => {
  const { content, header, confirmationCallback } = props;
  const { title } = tooltipStore;

  const _notificationHeader = header || "Notification";

  const onMouseEnterHandler = (event: MouseEvent<HTMLDivElement>) => {
    !title &&
      tooltipActions.showTooltip(
        _notificationHeader,
        event.clientY,
        event.clientX
      );
  };

  const onMouseLeaveHandler = () => {
    tooltipActions.resetTooltip();
  };

  const onNotificationApprovedHandler = () => {
    confirmationCallback && confirmationCallback();
    notificationActions.closeNotificationPopper();
  };

  const onNotificationCanceledHandler = () => {
    notificationActions.closeNotificationPopper();
  };

  return (
    <div className={classes.notificationBox}>
      <div
        onMouseLeave={onMouseLeaveHandler}
        onMouseEnter={onMouseEnterHandler}
        className={classes.header}
      >
        {_notificationHeader}
      </div>
      <div className={classes.body}>{content}</div>
      <div className={classes.footer}>
        {confirmationCallback ? (
          <Button
            styleOverride={buttonStyleOVerride}
            title="Cancel"
            onClick={onNotificationCanceledHandler}
          />
        ) : null}
        <Button
          styleOverride={buttonStyleOVerride}
          title="OK"
          onClick={onNotificationApprovedHandler}
        />
      </div>
    </div>
  );
};
