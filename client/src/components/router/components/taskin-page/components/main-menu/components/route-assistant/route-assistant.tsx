import { observer } from "mobx-react";
import { locationStore } from "src/stores";

import { MemosRouteAssistant } from "./components";

export const RouteAssistant = observer(() => {
  const { router_view } = locationStore;

  if (router_view.startsWith("/taskin/memos")) return <MemosRouteAssistant />;

  return null;
});
