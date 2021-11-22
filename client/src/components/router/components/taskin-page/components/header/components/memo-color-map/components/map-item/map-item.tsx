import { UrgencyColor } from "src/client-types";
import { WithTooltip } from "src/shared";

import classes from "./map-item.module.css";

type MapItemProps = {
  urgencyColor: UrgencyColor;
  counterOfThisUrgency: number;
  percentOfThisUrgencyFromTotal: number;
  total: number;
};

export const MapItem = (props: MapItemProps) => {
  //TODO: add tooltip for urgency level
  const {
    urgencyColor,
    percentOfThisUrgencyFromTotal,
    counterOfThisUrgency,
    total,
  } = props;

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

  return (
    <WithTooltip tip={tooltipByUrgencyColor()}>
      <div
        style={{ backgroundColor: `${urgencyColor}` }}
        className={classes.mapItem}
      >
        <div className={classes.percent}>
          {isNaN(percentOfThisUrgencyFromTotal)
            ? null
            : percentOfThisUrgencyFromTotal * 100 === 100
            ? "100%"
            : `${(percentOfThisUrgencyFromTotal * 100).toFixed(1)}%`}
        </div>
        <div className={classes.counter}>
          {counterOfThisUrgency}/{total}
        </div>
      </div>
    </WithTooltip>
  );
};
