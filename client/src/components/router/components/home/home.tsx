import { observer } from "mobx-react";
import { Button } from "src/shared";
import { locationStore, userStore } from "src/stores";
import { routerLocationSetter } from "src/actions";
import { UrgencyColor } from "src/client-types";

import { Title, FooterParagraph, CardLogo, LoginPage } from "./components/";

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
        <div className={classes.elementsWrapper}>
          <CardLogo logoText="Plan" color={UrgencyColor.Low} />
          <CardLogo logoText="Schedule" color={UrgencyColor.Medium} />
          <CardLogo logoText="Implement" color={UrgencyColor.High} />
        </div>
      </div>
      <FooterParagraph />
    </div>
  );
});
