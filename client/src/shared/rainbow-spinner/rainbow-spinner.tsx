import classes from "./rainbow-spinner.module.css";

type RainbowSpinnerProps = {
  isRainbow?: boolean;
};

export const RainbowSpinner = (props: RainbowSpinnerProps) => {
  const { isRainbow = true } = props;

  return (
    <div className={classes.landingPageSpinner}>
      <div
        className={[
          classes.centerDot,
          !isRainbow && classes.grayBackgroundColor,
        ].join(" ")}
      ></div>
      <div
        className={[
          classes.rainbowDiv,
          classes.rainbowPurple,
          !isRainbow && classes.grayBackgroundColor,
        ].join(" ")}
      ></div>
      <div
        className={[
          classes.rainbowDiv,
          classes.rainbowPurpleOpace,
          !isRainbow && classes.blackBackgroundColor,
        ].join(" ")}
      ></div>
      <div
        className={[
          classes.rainbowDiv,
          classes.rainbowRed,
          !isRainbow && classes.grayBackgroundColor,
        ].join(" ")}
      ></div>
      <div
        className={[
          classes.rainbowDiv,
          classes.rainbowOrange,
          !isRainbow && classes.blackBackgroundColor,
        ].join(" ")}
      ></div>
      <div
        className={[
          classes.rainbowDiv,
          classes.rainbowYellow,
          !isRainbow && classes.grayBackgroundColor,
        ].join(" ")}
      ></div>
      <div
        className={[
          classes.rainbowDiv,
          classes.rainbowDeeperGreen,
          !isRainbow && classes.blackBackgroundColor,
        ].join(" ")}
      ></div>
      <div
        className={[
          classes.rainbowDiv,
          classes.rainbowGreen,
          !isRainbow && classes.grayBackgroundColor,
        ].join(" ")}
      ></div>
      <div
        className={[
          classes.rainbowDiv,
          classes.rainbowBlue,
          !isRainbow && classes.blackBackgroundColor,
        ].join(" ")}
      ></div>
    </div>
  );
};
