import { action } from "mobx";
import { locationStore } from "src/stores";

export const routerLocationSetter = action((newPathName: string) => {
  locationStore.router_view = newPathName;
  window.history.replaceState({}, "", newPathName);
});
