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
import { LoginPage } from "../login-page";
import { Button } from "../../../../shared";
import { locationStore, userStore } from "../../../../stores";
import { routerLocationSetter } from "../../../../actions";

import classes from "./home.module.css";

type HomeProps = {};

export const Home = observer((props: HomeProps) => {
  const { router_view } = locationStore;
  const { getUserFromLocalStorage } = userStore;

  if (getUserFromLocalStorage()) {
    routerLocationSetter("/taskin/memos");
    return null;
  }

  const onLoginClickHandler = () => {
    routerLocationSetter("/login");
  };

  return (
    <div className={classes.home}>
      <div className={classes.loginButtonWrapper}>
        <Button onClick={onLoginClickHandler} title="Log In" />
      </div>
      {router_view.startsWith("/login") ? <LoginPage /> : null}
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
