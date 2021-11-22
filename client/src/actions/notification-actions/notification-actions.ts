import { action } from "mobx";
import { notificationStore } from "src/stores";

export const popNotificationForUser = action(
  (
    highlightedText: string,
    content: string,
    confirmationCallback?: Function
  ) => {
    notificationStore.content = content;
    notificationStore.highlightedText = highlightedText;
    notificationStore.confirmationCallback = confirmationCallback || null;
  }
);

export const closeNotificationPopper = action(() => {
  notificationStore.content = "";
  notificationStore.highlightedText = "";
  notificationStore.confirmationCallback = null;
});
