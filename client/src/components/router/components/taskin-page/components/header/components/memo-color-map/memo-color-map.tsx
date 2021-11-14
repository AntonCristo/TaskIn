import { useState, MouseEvent } from "react";
import { UrgencyColor } from "src/client-types";
import refreshIcon from "src/assets/svg/refresh_24dp.svg";
import { tooltipConstants } from "src/constants";
import { tooltipActions } from "src/actions";
import { locationStore, tooltipStore } from "src/stores";
import { observer } from "mobx-react";

import { MapItem } from "./components";

import classes from "./memo-color-map.module.css";

export const MemoColorMap = observer(() => {
  const [rotateRefreshIcon, setRotateRefreshICon] = useState(false);
  const { title } = tooltipStore;
  const { router_view } = locationStore;
  //TODO: click on a map sets a filter by clicked urgency color
  // active filter clas should be applied
  // refresh button clears filter
  const rotateRefreshIconHandler = () => {
    setRotateRefreshICon(true);

    setTimeout(() => {
      setRotateRefreshICon(false);
    }, 500);
  };

  const onMouseOverHandler = (event: MouseEvent<HTMLDivElement>) => {
    !title &&
      tooltipActions.showTooltip(
        tooltipConstants.quickHeaderFilter,
        event.clientY,
        event.clientX,
        1000
      );
  };

  const onMouseOutHandler = () => {
    tooltipActions.resetTooltip();
  };

  return router_view === "/taskin/memos" ? (
    <div className={classes.memosColorMap}>
      <div onMouseEnter={onMouseOverHandler} onMouseLeave={onMouseOutHandler}>
        <MapItem urgencyColor={UrgencyColor.Low} />
        <MapItem urgencyColor={UrgencyColor.Medium} />
        <MapItem urgencyColor={UrgencyColor.High} />
        <MapItem urgencyColor={UrgencyColor.Done} />
      </div>
      <img
        onMouseDown={rotateRefreshIconHandler}
        className={rotateRefreshIcon ? classes.rotateImageOnClick : ""}
        src={refreshIcon}
        alt="refresh"
      />
    </div>
  ) : null;
});
