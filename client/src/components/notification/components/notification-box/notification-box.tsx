import { Button } from "src/shared";
import { notificationActions } from "src/actions";

import classes from "./notification-box.module.css";

type NotificationBoxProps = {
  confirmationCallback?: Function | null;
  highlightedText: string;
  content: string;
};

const buttonStyleOVerride = {
  border: "none",
};

export const NotificationBox = (props: NotificationBoxProps) => {
  const { content, confirmationCallback, highlightedText } = props;

  const onNotificationApprovedHandler = () => {
    confirmationCallback && confirmationCallback();
    notificationActions.closeNotificationPopper();
  };

  const onNotificationCanceledHandler = () => {
    notificationActions.closeNotificationPopper();
  };

  return (
    <div className={classes.notificationBox}>
      <div className={classes.body}>
        <div title={highlightedText} className={classes.highlightedText}>
          {highlightedText}
        </div>
        <div>{content}</div>
      </div>
      <div className={classes.footer}>
        {confirmationCallback ? (
          <Button
            styleOverride={buttonStyleOVerride}
            title="Cancel"
            onClick={onNotificationCanceledHandler}
          />
        ) : null}
        <Button title="OK" onClick={onNotificationApprovedHandler} />
      </div>
    </div>
  );
};
