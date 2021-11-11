import React from "react";
import { DropdownMenu } from "./shared";
import { browserHistoryUtils } from "./utils";

import { Router } from "./components/router";

import classes from "./app.module.css";

const App: React.FC = () => {
  browserHistoryUtils.browserBackButtonEventListener();

  return (
    <div className={classes.app}>
      <Router />
      <DropdownMenu />
    </div>
  );
};

export default App;
