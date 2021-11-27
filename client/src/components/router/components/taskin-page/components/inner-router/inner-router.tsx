import { observer } from "mobx-react";
import { locationStore } from "src/stores";
import { PageNotFound } from "src/shared";

import { Memos } from "./components";

export const InnerRouter = observer(() => {
  const { reduceActiveRouteFromUrl } = locationStore;

  switch (reduceActiveRouteFromUrl()) {
    case "MEMOS":
      return <Memos />;
    case "LIST":
    case "FOLDERS":
      return <div>folders[not implemented]</div>;
    default:
      return <PageNotFound />;
  }
});
