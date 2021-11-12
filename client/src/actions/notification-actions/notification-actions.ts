import { action } from "mobx";
import { notificationStore } from "src/stores";

export const popNotificationForUser = action(
  (header: string, content: string, confirmationCallback?: Function) => {
    notificationStore.header = header;
    notificationStore.content = content;
    notificationStore.confirmationCallback = confirmationCallback || null;
  }
);

export const closeNotificationPopper = action(() => {
  notificationStore.header = "";
  notificationStore.content = "";
  notificationStore.confirmationCallback = null;
});
