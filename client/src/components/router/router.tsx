import { observer } from "mobx-react";

import { locationStore } from "../../stores/location-store";
import { LandingPage } from "./components/landing-page";
import { Home } from "./components/taskin-routes";

type RouterProps = {};

export const Router = observer((props: RouterProps) => {
  const { router_view } = locationStore;
  //TODO: add gurads after setting auto logins and other protected locations

  switch (router_view) {
    case "/":
      return <LandingPage />;
    case "/home":
      return <Home />;
    default:
      return <div>default</div>;
  }
});
