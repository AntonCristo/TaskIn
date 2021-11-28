import { observer } from "mobx-react";
import { memoUIActions } from "src/actions";
import { UrgencyColor } from "src/client-types";
import { WithTooltip } from "src/shared";
import { memoStore } from "src/stores";
import { setSessionPersistedUIState } from "src/utils";

import classes from "./map-item.module.css";

type MapItemProps = {
  urgencyColor: UrgencyColor;
  counterOfThisUrgency: number;
  percentOfThisUrgencyFromTotal: number;
  total: number;
};

export const MapItem = observer((props: MapItemProps) => {
  const {
    urgencyColor,
    percentOfThisUrgencyFromTotal,
    counterOfThisUrgency,
    total,
  } = props;

  const _isUrgencyColorActiveAsFilter =
    memoStore.uiStoreInstance.filterProfile.urgencyLevel?.includes(
      urgencyColor
    );

  const tooltipByUrgencyColor = () => {
    switch (urgencyColor) {
      case UrgencyColor.High:
        return "Less then 33% of the planned time remains.\nAccording to your schedule, those memos have the highest priority at the moment.";
      case UrgencyColor.Medium:
        return "Somewhere between 33% and 66% of the time had passed.\nTake a look at the due dates, make sure you're on track.";
      case UrgencyColor.Low:
        return "Less then 33% of the planned time had passed.";
      default:
        return "";
    }
  };

  const toggleUrgencyColorAsFilter = () => {
    memoUIActions.setFilterProfileByKeyAndValue("urgencyLevel", urgencyColor);
    setSessionPersistedUIState({
      MEMO_UI_STORE: [
        { key: "FILTER", value: memoStore.uiStoreInstance.filterProfile },
      ],
    });
  };

  return (
    <div
      onClick={toggleUrgencyColorAsFilter}
      style={{ backgroundColor: `${urgencyColor}` }}
      className={[
        classes.mapItem,
        _isUrgencyColorActiveAsFilter && classes.mapItemActiveAsFilter,
      ].join(" ")}
    >
      <div className={classes.percent}>
        {isNaN(percentOfThisUrgencyFromTotal)
          ? null
          : percentOfThisUrgencyFromTotal * 100 === 100
          ? "100%"
          : `${(percentOfThisUrgencyFromTotal * 100).toFixed(1)}%`}
      </div>
      <WithTooltip tip={tooltipByUrgencyColor()}>
        <div className={classes.counter}>
          {counterOfThisUrgency}/{total}
        </div>
      </WithTooltip>
    </div>
  );
});
