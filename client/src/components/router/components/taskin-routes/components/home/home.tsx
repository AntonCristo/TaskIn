import React from "react";
import { observer } from "mobx-react";

import {
  Title,
  TitleUnderline,
  ElementsBox,
  TriangleElement,
  CircleElement,
  SqaureElement,
} from "./components/";

import classes from "./home.module.css";

type HomeProps = {};

export const Home: React.FC = observer((props: HomeProps) => {
  return (
    <div className={classes.home}>
      <div className={classes.homeCenterItems}>
        <Title />
        <TitleUnderline />
        <div className={classes.elementsWrapper}>
          <ElementsBox>
            <TriangleElement />
            <div>- Define -</div>
          </ElementsBox>
          <ElementsBox>
            <CircleElement />
            <div>- Create -</div>
          </ElementsBox>
          <ElementsBox>
            <SqaureElement />
            <div>- Implement -</div>
          </ElementsBox>
        </div>
        <TitleUnderline />
      </div>
    </div>
  );
});
