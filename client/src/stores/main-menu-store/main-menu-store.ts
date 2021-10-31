import { makeAutoObservable } from "mobx";

class MainMenuStore {
  constructor() {
    makeAutoObservable(this);
  }

  public _isOpen: boolean = window.innerWidth <= 800 ? false : true;
  get isOpen() {
    return this._isOpen;
  }
  set isOpen(isOpenState: boolean) {
    this._isOpen = isOpenState;
  }
}

export const mainMenuStore = new MainMenuStore();
