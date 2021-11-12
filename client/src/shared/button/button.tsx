import { CSSProperties, useState } from "react";

import classes from "./button.module.css";

type ButtonProps = {
  title: string;
  icon?: string;
  onClick: () => void;
  isDisabled?: boolean;
  styleOverride?: CSSProperties;
};

export const Button = (props: ButtonProps) => {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const {
    title,
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

  const _onClick = isDisabled ? () => {} : onClick;

  return (
    <div
      tabIndex={0}
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
  );
};
