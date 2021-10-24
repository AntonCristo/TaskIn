import React from "react";
import { observer } from "mobx-react";

import { Title, TitleUnderline } from "./components/";

import classes from "./home.module.css";

type HomeProps = {};

export const Home: React.FC = observer((props: HomeProps) => {
  return (
    <div className={classes.home}>
      <div className={classes.homeCenterItems}>
        <Title />
        <TitleUnderline />
      </div>
    </div>
  );
});
