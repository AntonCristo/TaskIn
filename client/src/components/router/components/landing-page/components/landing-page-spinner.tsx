import React from "react";

import classes from "./landing-page-spinner.module.css";

export const LandingPageSpinner: React.FC = () => {
  return (
    <div className={classes.landingPageSpinner}>
      <div
        className={[classes.rainbowDiv, classes.rainbowPurple].join(" ")}
      ></div>
      <div className={[classes.rainbowDiv, classes.rainbowRed].join(" ")}></div>
      <div
        className={[classes.rainbowDiv, classes.rainbowOrange].join(" ")}
      ></div>
      <div
        className={[classes.rainbowDiv, classes.rainbowYellow].join(" ")}
      ></div>
      <div
        className={[classes.rainbowDiv, classes.rainbowGreen].join(" ")}
      ></div>
      <div
        className={[classes.rainbowDiv, classes.rainbowBlue].join(" ")}
      ></div>
    </div>
  );
};
