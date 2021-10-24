import { makeAutoObservable } from "mobx";

class LocationStore {
  constructor() {
    makeAutoObservable(this);
  }

  private _router_view: string = window.location.pathname;
  get router_view() {
    return this._router_view;
  }
}

export const locationStore = new LocationStore();
