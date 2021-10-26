import React, { useState } from "react";

import { routerLocationSetter } from "../../../../actions/location-actions";
import { RainbowSpinner } from "../../../../shared";

import classes from "./landing-page.module.css";

type LandingPagePros = {};

export const LandingPage: React.FC = (props: LandingPagePros) => {
  const [shouldRedirectToHome, setShouldRedirectToHome] = useState(false);

  if (!shouldRedirectToHome) {
    setTimeout(() => {
      setShouldRedirectToHome(true);
    }, 2500);
  } else {
    routerLocationSetter("/home");
  }

  return !shouldRedirectToHome ? (
    <div className={classes.landingPage}>
      <RainbowSpinner />
    </div>
  ) : null;
};
