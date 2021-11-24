import React, { RefObject, useEffect, KeyboardEvent } from "react";
import { observer } from "mobx-react";
import { notificationActions } from "src/actions";
import { notificationStore } from "src/stores";

import { NotificationBox } from "./components";

import classes from "./notification.module.css";

export const Notification = observer(() => {
  const { content, confirmationCallback, highlightedText } = notificationStore;
  const notificationWrapperRef: RefObject<HTMLDivElement> = React.createRef();

  const onNotificationApprovedHandler = () => {
    confirmationCallback && confirmationCallback();
    notificationActions.closeNotificationPopper();
  };

  const onNotificationCanceledHandler = () => {
    notificationActions.closeNotificationPopper();
  };

  const onKeyDownHandler = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      onNotificationCanceledHandler();
    }
  };

  useEffect(() => {
    notificationWrapperRef && notificationWrapperRef.current?.focus();
  }, [notificationWrapperRef]);

  return content ? (
    <div
      ref={notificationWrapperRef}
      onKeyDown={onKeyDownHandler}
      tabIndex={0}
      className={classes.notificationWrapper}
    >
      <NotificationBox
        highlightedText={highlightedText}
        content={content}
        confirmationCallback={confirmationCallback}
        approve={onNotificationApprovedHandler}
        cancel={onNotificationCanceledHandler}
      />
    </div>
  ) : null;
});
