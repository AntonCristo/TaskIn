import { observer } from "mobx-react";
import { notificationStore } from "src/stores";

import { NotificationBox } from "./components";

import classes from "./notification.module.css";

export const Notification = observer(() => {
  const { content, header, confirmationCallback } = notificationStore;

  return header && content ? (
    <div className={classes.notificationWrapper}>
      <NotificationBox
        header={header}
        content={content}
        confirmationCallback={confirmationCallback}
      />
    </div>
  ) : null;
});
