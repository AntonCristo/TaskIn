import { observer } from "mobx-react";

import { Memos } from "./components";
import { locationStore } from "../../../../../../stores";

export const InnerRouter = observer(() => {
  const { reduceActiveRouteFromUrl } = locationStore;

  switch (reduceActiveRouteFromUrl()) {
    case "MEMOS":
      return <Memos />;
    case "TEAM_NOTES":
      return <div>team notes[not implemented]</div>;
    default:
      throw Error(
        "[InnerRouter]:: default case should never happen, check everything!!!"
      );
  }
});
