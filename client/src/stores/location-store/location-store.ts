import { makeAutoObservable } from "mobx";

export type TaskinRoutes = "MEMOS" | "TEAM_NOTES";
class LocationStore {
  constructor() {
    makeAutoObservable(this);
  }

  private _router_view: string = window.location.pathname;
  get router_view() {
    return this._router_view;
  }

  private _taskinActiveRoute: TaskinRoutes = "MEMOS";
  get taskinActiveRoute() {
    return this._taskinActiveRoute;
  }
  set taskinActiveRoute(routeUpdate: TaskinRoutes) {
    this._taskinActiveRoute = routeUpdate;
  }
}

export const locationStore = new LocationStore();
