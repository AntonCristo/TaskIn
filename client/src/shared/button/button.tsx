import { CSSProperties, useState, MouseEvent, KeyboardEvent } from "react";
import { WithTooltip } from "..";

import classes from "./button.module.css";

type ButtonProps = {
  title: string;
  tooltipText?: string;
  icon?: string;
  onClick: (event?: MouseEvent<HTMLDivElement>) => void;
  isDisabled?: boolean;
  styleOverride?: CSSProperties;
};

export const Button = (props: ButtonProps) => {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const {
    title,
    tooltipText = "",
    onClick,
    isDisabled = false,
    styleOverride = {},
    icon = "",
  } = props;

  const mouseIsDownHandler = () => {
    setIsMouseDown(true);
  };

  const mouseIsNOTDownHandler = () => {
    setIsMouseDown(false);
  };

  function _onClick(event: MouseEvent<HTMLDivElement>) {
    if (!isDisabled) {
      onClick(event);
    }
  }

  const onKeyDownHandler = (event: KeyboardEvent<HTMLDivElement>) => {
    switch (event.code) {
      case "Enter":
        onClick();
        return;
      default:
        return;
    }
  };

  return (
    <WithTooltip tip={tooltipText}>
      <div
        tabIndex={0}
        onKeyDown={onKeyDownHandler}
        onMouseDown={mouseIsDownHandler}
        onMouseUp={mouseIsNOTDownHandler}
        style={styleOverride}
        onClick={_onClick}
        className={[
          classes.defaultButtonStyle,
          isMouseDown && classes.clickedButtonAnimation,
          //disabled class should stay last in the array
          isDisabled && classes.disabled,
        ].join(" ")}
      >
        <div>{title}</div>
        <div>
          {icon ? (
            <img
              className={title ? classes.buttonIconWithTitle : ""}
              src={icon}
              alt="button-icon"
            />
          ) : null}
        </div>
      </div>
    </WithTooltip>
  );
};
