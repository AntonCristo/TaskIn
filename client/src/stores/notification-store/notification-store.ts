import { makeAutoObservable } from "mobx";

class NotificationStore {
  constructor() {
    makeAutoObservable(this);
  }

  private _header: string = "";
  get header() {
    return this._header;
  }
  set header(newHeader: string) {
    this._header = newHeader;
  }

  private _content: string = "";
  get content() {
    return this._content;
  }
  set content(newContent: string) {
    this._content = newContent;
  }

  private _confirmationCallback: Function | null = null;
  get confirmationCallback() {
    return this._confirmationCallback;
  }
  set confirmationCallback(callback: Function | null) {
    this._confirmationCallback = callback;
  }
}

export const notificationStore = new NotificationStore();
