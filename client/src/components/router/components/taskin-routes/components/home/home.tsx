import React from "react";
import { observer } from "mobx-react";

import {
  Title,
  TitleUnderline,
  ElementsBox,
  TriangleElement,
  CircleElement,
  SqaureElement,
  FooterParagraph,
} from "./components/";
import { Button } from "../../../../../../shared";

import classes from "./home.module.css";

type HomeProps = {};

export const Home: React.FC = observer((props: HomeProps) => {
  const onLoginClickHandler = () => {
    alert("login button clicked");
  };

  return (
    <div className={classes.home}>
      <div className={classes.loginButtonWrapper}>
        <Button onClick={onLoginClickHandler} title="Log In" />
      </div>
      <div className={classes.homeCenterItems}>
        <Title />
        <TitleUnderline />
        <div className={classes.elementsWrapper}>
          <ElementsBox>
            <TriangleElement />
            <div>Define</div>
          </ElementsBox>
          <ElementsBox>
            <CircleElement />
            <div>Create</div>
          </ElementsBox>
          <ElementsBox>
            <SqaureElement />
            <div>Implement</div>
          </ElementsBox>
        </div>
        <TitleUnderline />
      </div>
      <FooterParagraph />
    </div>
  );
});
