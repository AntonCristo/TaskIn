import { Button } from "src/shared";
import { WithTooltip } from "src/shared";

import classes from "./notification-box.module.css";

type NotificationBoxProps = {
  confirmationCallback?: Function | null;
  highlightedText: string;
  content: string;
  approve: () => void;
  cancel: () => void;
};

const buttonStyleOVerride = {
  border: "none",
};

export const NotificationBox = (props: NotificationBoxProps) => {
  const { content, confirmationCallback, highlightedText, approve, cancel } =
    props;

  return (
    <div className={classes.notificationBox}>
      <div className={classes.body}>
        <WithTooltip tip={highlightedText}>
          <div className={classes.highlightedText}>{highlightedText}</div>
        </WithTooltip>
        <div>{content}</div>
      </div>
      <div className={classes.footer}>
        {confirmationCallback ? (
          <Button
            styleOverride={buttonStyleOVerride}
            title="Cancel"
            onClick={cancel}
          />
        ) : null}
        <Button title="OK" onClick={approve} />
      </div>
    </div>
  );
};
