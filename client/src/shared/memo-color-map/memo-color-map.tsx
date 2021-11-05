import { useState } from "react";
import { UrgencyColor } from "src/client-types";
import refreshIcon from "src/assets/svg/refresh_24dp.svg";

import { MapItem } from "./components";

import classes from "./memo-color-map.module.css";

export const MemoColorMap = () => {
  const [rotateRefreshIcon, setRotateRefreshICon] = useState(false);
  //TODO: click on a map sets a filter by clicked urgency color
  // active filter clas should be applied
  // refresh button clears filter
  const rotateRefreshIconHandler = () => {
    setRotateRefreshICon(true);

    setTimeout(() => {
      setRotateRefreshICon(false);
    }, 500);
  };

  return (
    <div className={classes.memosColorMap}>
      <MapItem urgencyColor={UrgencyColor.Low} />
      <MapItem urgencyColor={UrgencyColor.Medium} />
      <MapItem urgencyColor={UrgencyColor.High} />
      <MapItem urgencyColor={UrgencyColor.Done} />
      <img
        onMouseDown={rotateRefreshIconHandler}
        className={rotateRefreshIcon ? classes.rotateImageOnClick : ""}
        src={refreshIcon}
        alt="refresh"
      />
    </div>
  );
};
