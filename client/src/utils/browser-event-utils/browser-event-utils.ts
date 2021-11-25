import { MouseEvent } from "react";
import { routerLocationSetter } from "src/actions";

export const browserBackButtonEventListener = () => {
  window.addEventListener("popstate", () => {
    routerLocationSetter(window.location.pathname);
  });
};

export const preventParentClickEventHandler = (
  event: MouseEvent<HTMLDivElement>
) => {
  event.stopPropagation();
};
