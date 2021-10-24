import { observer } from "mobx-react";

import { locationStore } from "../../stores/location-store";
import { LandingPage } from "./components/landing-page";
import {} from "./components/taskin-routes/components/home";

type RouterProps = {};

export const Router = observer((props: RouterProps) => {
  const { router_view } = locationStore;

  switch (router_view) {
    case "/":
      return <LandingPage />;
    default:
      return <div>default</div>;
  }
});
