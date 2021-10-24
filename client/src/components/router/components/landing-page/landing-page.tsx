import React from "react";

import { LandingPageSpinner } from "./components";

import classes from "./landing-page.module.css";

type LandingPagePros = {};

export const LandingPage: React.FC = (props: LandingPagePros) => {
  return (
    <div className={classes.landingPage}>
      <LandingPageSpinner />
    </div>
  );
};
