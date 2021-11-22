import { action } from "mobx";
import { tooltipStore } from "src/stores";

const TOOLTIP_MAX_WIDTH = 300;

export const showTooltip = action(
  (title: string, top: number, left: number, leaveDelayInMs?: number) => {
    tooltipStore.title = title;
    tooltipStore.leftPosition = left - TOOLTIP_MAX_WIDTH / 6;
    tooltipStore.topPosition = top;
    tooltipStore.leaveDelayInMs = leaveDelayInMs || 0;
  }
);

export const resetTooltip = action(() => {
  const ms = tooltipStore.leaveDelayInMs;

  setTimeout(() => {
    tooltipStore.title = "";
    tooltipStore.leftPosition = 0;
    tooltipStore.topPosition = 0;
    tooltipStore.leaveDelayInMs = 0;
  }, ms);
});
