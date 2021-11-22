import { observer } from "mobx-react";
import { notificationStore } from "src/stores";

import { NotificationBox } from "./components";

import classes from "./notification.module.css";

export const Notification = observer(() => {
  const { content, confirmationCallback, highlightedText } = notificationStore;

  return content ? (
    <div className={classes.notificationWrapper}>
      <NotificationBox
        highlightedText={highlightedText}
        content={content}
        confirmationCallback={confirmationCallback}
      />
    </div>
  ) : null;
});
