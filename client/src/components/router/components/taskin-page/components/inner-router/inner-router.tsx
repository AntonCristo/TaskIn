import { observer } from "mobx-react";
import { locationStore } from "src/stores";

import { Memos } from "./components";

export const InnerRouter = observer(() => {
  const { reduceActiveRouteFromUrl } = locationStore;

  switch (reduceActiveRouteFromUrl()) {
    case "MEMOS":
      return <Memos />;
    case "NOTES":
      return <div>simple notes[not implemented]</div>;
    default:
      throw Error(
        "[InnerRouter]:: default case should never happen, check everything!!!"
      );
  }
});
