import { action } from "mobx";

export const routerLocationSetter = action((newPathName: string) => {
  window.location.pathname = newPathName;
});
