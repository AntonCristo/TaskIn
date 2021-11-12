import { MouseEvent } from "react";
import { Button } from "src/shared";
import { tooltipActions } from "src/actions";
import { tooltipStore } from "src/stores";
import { observer } from "mobx-react";

import classes from "./notification-box.module.css";

export const NotificationBox = observer(() => {
  const { title } = tooltipStore;

  const _notificationHeader = "Notification" || "Notification";
  const _notificationText =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum tincidunt commodo magna sed iaculis. Donec sagittis dolor at enim ultricies, nec ultrices magna auctor. Cras aliquet, ligula ut commodo maximus, lorem ipsum bibendum magna, et lobortis purus lacus id ex. Nulla convallis eget risus sit amet elementum. ";

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

  return (
    <div className={classes.notificationBox}>
      <div
        onMouseLeave={onMouseLeaveHandler}
        onMouseEnter={onMouseEnterHandler}
        className={classes.header}
      >
        {_notificationHeader}
      </div>
      <div className={classes.body}>{_notificationText}</div>
      <div className={classes.footer}>
        <Button title="Cancel" onClick={() => {}} />
        <Button title="OK" onClick={() => {}} />
      </div>
    </div>
  );
});
