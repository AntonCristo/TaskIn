import { observer } from "mobx-react";
import { locationStore } from "src/stores";

import { Memos } from "./components";

export const InnerRouter = observer(() => {
  const { reduceActiveRouteFromUrl } = locationStore;

  switch (reduceActiveRouteFromUrl()) {
    case "MEMOS":
      return <Memos />;
    case "FOLDERS":
      return <div>folders[not implemented]</div>;
    default:
      return <div>404 not found</div>;
  }
});
