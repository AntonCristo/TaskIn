import React, { ReactElement, MouseEvent } from "react";
import { observer } from "mobx-react";
import { ReactNode } from "react";
import { tooltipStore } from "src/stores";
import { tooltipActions } from "src/actions";

type WithTooltipProps = {
  children: ReactNode;
  tip: string;
  afterMouseLeaveDelayInMs?: number;
};

export const WithTooltip = observer((props: WithTooltipProps) => {
  const { children, tip, afterMouseLeaveDelayInMs } = props;
  const { title } = tooltipStore;

  const onMouseEnterHandler = (event: MouseEvent<HTMLDivElement>) => {
    !title &&
      tooltipActions.showTooltip(
        tip,
        event.clientY,
        event.clientX,
        afterMouseLeaveDelayInMs
      );
  };

  const onMouseLeaveHandler = () => {
    tooltipActions.resetTooltip();
  };

  const childrenWithInjectedTooltipProps = React.cloneElement(
    children as ReactElement,
    {
      onMouseEnter: onMouseEnterHandler,
      onMouseLeave: onMouseLeaveHandler,
    }
  );

  return <>{childrenWithInjectedTooltipProps}</>;
});
