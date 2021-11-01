import { observer } from "mobx-react";

import { locationStore } from "../../stores/location-store";
import { Home, TaskinPage } from "./components/taskin-routes";

type RouterProps = {};

export const Router = observer((props: RouterProps) => {
  const { router_view } = locationStore;

  //TODO: add gurads after setting auto logins and other protected locations

  switch (router_view) {
    case "/":
    case "/login":
      return <Home />;
    case "/taskin":
      return <TaskinPage />;
    default:
      return <div>404 not found</div>;
  }
});
