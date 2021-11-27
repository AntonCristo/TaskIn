import React, { RefObject, useEffect, KeyboardEvent } from "react";
import { routerLocationSetter } from "src/actions";
import { Button } from "src/shared";

import { LoginCard } from "./components";

import classes from "./login-page.module.css";

export const LoginPage = () => {
  const loginPageRef: RefObject<HTMLDivElement> = React.createRef();

  const closeLoginPageHandler = () => {
    routerLocationSetter("/");
  };

  const onKeyDownHandler = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      closeLoginPageHandler();
    }
  };

  //[useEffect]:: gain focus abilities on render
  useEffect(() => {
    loginPageRef.current && loginPageRef.current?.focus();
  }, [loginPageRef]);

  return (
    <div
      tabIndex={0}
      onKeyDown={onKeyDownHandler}
      ref={loginPageRef}
      onClick={closeLoginPageHandler}
      className={classes.loginPage}
    >
      <div className={classes.loginPageButtonWrapper}>
        <Button title="Close" onClick={closeLoginPageHandler} />
      </div>
      <LoginCard />
    </div>
  );
};
