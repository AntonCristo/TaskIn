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
  set router_view(routeUpdate: string) {
    this._router_view = routeUpdate;
    window.history.pushState(null, null || "", this._router_view);
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

  public reduceMemoUUIDFromUrl = () => {
    const v4 = new RegExp(
      /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
    );

    const routeValues = this.router_view
      .split("/")
      .filter((routeValue) => routeValue);

    if (
      routeValues.length >= 3 &&
      this.router_view.startsWith("/taskin/memos/uuid=")
    ) {
      const memoUUID = routeValues[2].split("=")[1];

      return v4.test(memoUUID) ? memoUUID : undefined;
    }

    return undefined;
  };
}

export const locationStore = new LocationStore();
