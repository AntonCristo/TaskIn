import { CSSProperties, useState } from "react";
import classes from "./button.module.css";

type ButtonProps = {
  title: string;
  onClick: () => void;
  isDisabled?: boolean;
  styleOverride?: CSSProperties;
};

export const Button = (props: ButtonProps) => {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const { title, onClick, isDisabled = false, styleOverride = {} } = props;

  const mouseIsDownHandler = () => {
    setIsMouseDown(true);
  };

  const mouseIsNOTDownHandler = () => {
    setIsMouseDown(false);
  };

  const _onClick = isDisabled ? () => {} : onClick;

  return (
    <div
      onMouseDown={mouseIsDownHandler}
      onMouseUp={mouseIsNOTDownHandler}
      style={styleOverride}
      onClick={_onClick}
      className={[
        classes.defaultButtonStyle,
        isMouseDown && classes.clickedButtonAnimation,
      ].join(" ")}
    >
      {title}
    </div>
  );
};
