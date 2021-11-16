import { UrgencyColor } from "src/client-types";
import { memoStore } from "src/stores";
import { observer } from "mobx-react";

import { MapItem } from "./components";

import classes from "./memo-color-map.module.css";

export const MemoColorMap = observer(() => {
  const { uiStoreInstance } = memoStore;
  let totalCount: number = 0;

  const getUrgencyLevelCounterAndPercent = () => {
    const res: { [x: string]: { count: number; percent: number } } = {};
    const urgencyColors = [
      UrgencyColor.Low,
      UrgencyColor.High,
      UrgencyColor.Medium,
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
      <MapItem
        total={totalCount}
        counterOfThisUrgency={
          urgencyColorCountAndPercent[UrgencyColor.Low].count
        }
        percentOfThisUrgencyFromTotal={
          urgencyColorCountAndPercent[UrgencyColor.Low].percent
        }
        urgencyColor={UrgencyColor.Low}
      />
      <MapItem
        total={totalCount}
        counterOfThisUrgency={
          urgencyColorCountAndPercent[UrgencyColor.Medium].count
        }
        percentOfThisUrgencyFromTotal={
          urgencyColorCountAndPercent[UrgencyColor.Medium].percent
        }
        urgencyColor={UrgencyColor.Medium}
      />
      <MapItem
        total={totalCount}
        counterOfThisUrgency={
          urgencyColorCountAndPercent[UrgencyColor.High].count
        }
        percentOfThisUrgencyFromTotal={
          urgencyColorCountAndPercent[UrgencyColor.High].percent
        }
        urgencyColor={UrgencyColor.High}
      />
    </div>
  );
});
