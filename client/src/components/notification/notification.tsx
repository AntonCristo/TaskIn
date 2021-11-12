import { observer } from "mobx-react";

import { NotificationBox } from "./components";

import classes from "./notification.module.css";

export const Notification = observer(() => {
  return (
    <div className={classes.notificationWrapper}>
      <NotificationBox />
    </div>
  );
});
