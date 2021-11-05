import { UrgencyColor } from "src/client-types";
import classes from "./map-item.module.css";

type MapItemProps = {
  urgencyColor: UrgencyColor;
};

export const MapItem = (props: MapItemProps) => {
  //TODO: add tooltip for urgency level
  const { urgencyColor } = props;

  return (
    <div
      style={{ backgroundColor: `${urgencyColor}` }}
      className={classes.mapItem}
    >
      <div></div>
      <div></div>
    </div>
  );
};
