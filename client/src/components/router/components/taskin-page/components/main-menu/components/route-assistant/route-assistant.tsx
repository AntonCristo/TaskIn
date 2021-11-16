import { observer } from "mobx-react";
import { locationStore } from "src/stores";

import { MemosRouteAssistant } from "./components";

export const RouteAssistant = observer(() => {
  const { router_view } = locationStore;

  switch (router_view) {
    case "/taskin/memos":
      return <MemosRouteAssistant />;
    default:
      return null;
  }
});
