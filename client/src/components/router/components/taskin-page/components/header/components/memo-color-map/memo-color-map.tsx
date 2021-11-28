import { UrgencyColor } from "src/client-types";
import { memoStore } from "src/stores";
import { observer } from "mobx-react";

import { MapItem, ResetUrgencyFilter } from "./components";

import classes from "./memo-color-map.module.css";

export const MemoColorMap = observer(() => {
  const { uiStoreInstance, dataStoreInstance } = memoStore;
  let totalCount: number = 0;

  const urgencyColors = [
    UrgencyColor.Low,
    UrgencyColor.Medium,
    UrgencyColor.High,
  ];

  const getUrgencyLevelCounterAndPercent = () => {
    const res: { [x: string]: { count: number; percent: number } } = {};

    urgencyColors.forEach((uc) => {
      res[uc] = { count: 0, percent: 0 };
    });

    const memosInProgress =
      dataStoreInstance.getMemosMapAsArrayByDisplayClass("IN_PROGRESS") || [];

    urgencyColors.forEach((uc) => {
      memosInProgress.forEach((memo) => {
        const memoUC = uiStoreInstance.getMemoUrgencyLevel(memo);
        if (memoUC === uc) {
          res[uc].count++;
          totalCount++;
        }
      });
    });

    urgencyColors.forEach((uc) => {
      res[uc].percent = res[uc].count / totalCount;
    });

    return res;
  };

  const urgencyColorCountAndPercent = getUrgencyLevelCounterAndPercent();

  return (
    <div className={classes.memosColorMap}>
      <ResetUrgencyFilter />
      {urgencyColors.map((urgencyColor, index) => (
        <MapItem
          key={urgencyColor + index}
          total={totalCount}
          counterOfThisUrgency={urgencyColorCountAndPercent[urgencyColor].count}
          percentOfThisUrgencyFromTotal={
            urgencyColorCountAndPercent[urgencyColor].percent
          }
          urgencyColor={urgencyColor}
        />
      ))}
    </div>
  );
});
