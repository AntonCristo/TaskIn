import { useState, MouseEvent } from "react";
import { UrgencyColor } from "src/client-types";
import refreshIcon from "src/assets/svg/refresh_24dp.svg";
import { tooltipConstants } from "src/constants";
import { tooltipActions } from "src/actions";
import { tooltipStore, memoStore } from "src/stores";
import { observer } from "mobx-react";

import { MapItem } from "./components";

import classes from "./memo-color-map.module.css";

export const MemoColorMap = observer(() => {
  const [rotateRefreshIcon, setRotateRefreshICon] = useState(false);
  const { title } = tooltipStore;
  const { uiStoreInstance } = memoStore;
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

  const getUrgencyLevelCounterAndPercent = () => {
    const res: { [x: string]: { count: number; percent: number } } = {};
    let totalCount: number = 0;
    const urgencyColors = [
      UrgencyColor.Low,
      UrgencyColor.High,
      UrgencyColor.Medium,
      UrgencyColor.Done,
    ];

    urgencyColors.forEach((uc) => {
      res[uc] = { count: 0, percent: 0 };
    });

    urgencyColors.forEach((uc) => {
      res[uc].count = uiStoreInstance.getUrgencyLevelCounter(uc);
      totalCount += res[uc].count;
    });

    urgencyColors.forEach((uc) => {
      res[uc].percent = res[uc].count / totalCount;
    });

    return res;
  };

  const urgencyColorCountAndPercent = getUrgencyLevelCounterAndPercent();

  return (
    <div className={classes.memosColorMap}>
      <div onMouseEnter={onMouseOverHandler} onMouseLeave={onMouseOutHandler}>
        <MapItem
          counterOfThisUrgency={
            urgencyColorCountAndPercent[UrgencyColor.Low].count
          }
          percentOfThisUrgencyFromTotal={
            urgencyColorCountAndPercent[UrgencyColor.Low].percent
          }
          urgencyColor={UrgencyColor.Low}
        />
        <MapItem
          counterOfThisUrgency={
            urgencyColorCountAndPercent[UrgencyColor.Medium].count
          }
          percentOfThisUrgencyFromTotal={
            urgencyColorCountAndPercent[UrgencyColor.Medium].percent
          }
          urgencyColor={UrgencyColor.Medium}
        />
        <MapItem
          counterOfThisUrgency={
            urgencyColorCountAndPercent[UrgencyColor.High].count
          }
          percentOfThisUrgencyFromTotal={
            urgencyColorCountAndPercent[UrgencyColor.High].percent
          }
          urgencyColor={UrgencyColor.High}
        />
        <MapItem
          counterOfThisUrgency={
            urgencyColorCountAndPercent[UrgencyColor.Done].count
          }
          percentOfThisUrgencyFromTotal={
            urgencyColorCountAndPercent[UrgencyColor.Done].percent
          }
          urgencyColor={UrgencyColor.Done}
        />
      </div>
      <img
        onMouseDown={rotateRefreshIconHandler}
        className={rotateRefreshIcon ? classes.rotateImageOnClick : ""}
        src={refreshIcon}
        alt="refresh"
      />
    </div>
  );
});
