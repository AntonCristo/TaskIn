import { observer } from "mobx-react";
import { locationStore } from "src/stores";
import { PageNotFound } from "src/shared";

import { Home, TaskinPage } from "./components";

type RouterProps = {};

export const Router = observer((props: RouterProps) => {
  const { router_view } = locationStore;

  //TODO: add gurads after setting auto logins and other protected locations

  if (router_view === "/" || router_view === "/login") {
    return <Home />;
  }

  if (router_view.startsWith("/taskin")) {
    return <TaskinPage />;
  }

  return <PageNotFound />;
});
