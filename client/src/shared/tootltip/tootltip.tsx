import { observer } from "mobx-react";
import { tooltipStore } from "src/stores/tooltip-store";
import classes from "./tooltip.module.css";

export const Tootltip = observer(() => {
  const { title, leftPosition, topPosition } = tooltipStore;
  return title ? (
    <div
      style={{ top: `${topPosition}px`, left: `${leftPosition}px` }}
      className={classes.tooltip}
    >
      {title}
    </div>
  ) : null;
});
