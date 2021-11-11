import { routerLocationSetter } from "src/actions";

export const browserBackButtonEventListener = () => {
  window.addEventListener("popstate", () => {
    routerLocationSetter(window.location.pathname);
  });
};
