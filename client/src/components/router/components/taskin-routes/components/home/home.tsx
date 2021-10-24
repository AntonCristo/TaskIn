import React from "react";
import { observer } from "mobx-react";

import classes from "./home.module.css";

type HomeProps = {};

export const Home: React.FC = observer((props: HomeProps) => {
  return (
    <div className={classes.home}>
      <div>T-Ask-In</div>
      <div>some sub text in Ubuntu style</div>
    </div>
  );
});
