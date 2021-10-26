import { routerLocationSetter } from "../../../../../../actions";
import { Button } from "../../../../../../shared";

import { LoginCard } from "./components";

import classes from "./login-page.module.css";

export const LoginPage = () => {
  const onClickAnywhereHandler = () => {
    routerLocationSetter("/home");
  };

  return (
    <div onClick={onClickAnywhereHandler} className={classes.loginPage}>
      <div className={classes.loginPageButtonWrapper}>
        <Button title="Close" onClick={onClickAnywhereHandler} />
      </div>
      <LoginCard />
    </div>
  );
};
