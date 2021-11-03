import { routerLocationSetter } from "src/actions";
import { Button } from "src/shared";

import { LoginCard } from "./components";

import classes from "./login-page.module.css";

export const LoginPage = () => {
  const onClickAnywhereHandler = () => {
    routerLocationSetter("/");
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
