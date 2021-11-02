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

  public translateTaskinSystemRoutesToUserDisplay = (
    taskinSystemRoute: TaskinRoutes
  ) => {
    switch (taskinSystemRoute) {
      case "MEMOS":
        return "Memos";
      case "TEAM_NOTES":
        return "Team Notes";
      default:
        throw Error(
          "[NavigationMenu]:: default case should never happen, check !!!"
        );
    }
  };

  public translateTaskinSystemRoutesToUrlValue = (
    taskinSystemRoute: TaskinRoutes
  ) => {
    switch (taskinSystemRoute) {
      case "MEMOS":
        return "memos";
      case "TEAM_NOTES":
        return "team-notes";
      default:
        throw Error(
          "[NavigationMenu]:: default case should never happen, check !!!"
        );
    }
  };

  public reduceActiveRouteFromUrl = (): TaskinRoutes => {
    const routeValues = this.router_view
      .split("/")
      .filter((routeValue) => routeValue);
    const activeRouteValue = routeValues[1] ? routeValues[1] : "";

    switch (activeRouteValue) {
      case "memos":
        return "MEMOS";
      case "team-notes":
        return "TEAM_NOTES";
      default:
        throw Error(
          "[reduceActiveRouteFromUrl]:: default case should never happen, check everything!!!"
        );
    }
  };
}

export const locationStore = new LocationStore();
