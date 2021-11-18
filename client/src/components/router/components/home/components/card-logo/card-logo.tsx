import { UrgencyColor } from "src/client-types";

import { MemoDotPins } from "./components";

import classes from "./card-logo.module.css";

type CardLogoProps = {
  color: UrgencyColor;
  logoText?: string;
};

export const CardLogo = (props: CardLogoProps) => {
  const { color, logoText } = props;

  return (
    <div style={{ backgroundColor: color }} className={classes.cardLogo}>
      <MemoDotPins />
      <div className={classes.lineSeperator}></div>
      <div className={classes.logoText}>{logoText}</div>
    </div>
  );
};
