import React, { ReactElement, MouseEvent, useEffect } from "react";
import { observer } from "mobx-react";
import { ReactNode } from "react";
import { tooltipStore } from "src/stores";
import { tooltipActions } from "src/actions";

type WithTooltipProps = {
  children: ReactNode;
  tip: string;
  showTooltip?: boolean;
  afterMouseLeaveDelayInMs?: number;
};

export const WithTooltip = observer((props: WithTooltipProps) => {
  const { children, tip, showTooltip = true, afterMouseLeaveDelayInMs } = props;
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

  useEffect(() => {
    return () => {
      tooltipActions.resetTooltip();
    };
  }, []);

  return showTooltip ? (
    <>{childrenWithInjectedTooltipProps}</>
  ) : (
    <>{children}</>
  );
});
