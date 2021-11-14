import { UrgencyColor } from "src/client-types";
import classes from "./map-item.module.css";

type MapItemProps = {
  urgencyColor: UrgencyColor;
  counterOfThisUrgency: number;
  percentOfThisUrgencyFromTotal: number;
};

export const MapItem = (props: MapItemProps) => {
  //TODO: add tooltip for urgency level
  const { urgencyColor, percentOfThisUrgencyFromTotal, counterOfThisUrgency } =
    props;

  return (
    <div
      style={{ backgroundColor: `${urgencyColor}` }}
      className={classes.mapItem}
    >
      <div className={classes.pins}>
        <div></div>
        <div></div>
      </div>
      <div className={classes.percent}>
        {isNaN(percentOfThisUrgencyFromTotal)
          ? null
          : `${Math.round(percentOfThisUrgencyFromTotal * 100).toFixed(0)}%`}
      </div>
      <div className={classes.counter}>
        <strong>(</strong>
        {counterOfThisUrgency}
        <strong>)</strong>
      </div>
    </div>
  );
};
