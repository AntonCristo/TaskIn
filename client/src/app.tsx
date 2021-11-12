import React from "react";
import { DropdownMenu, Tootltip } from "./shared";
import { browserHistoryUtils } from "./utils";

import { Router, Notification } from "./components";

import classes from "./app.module.css";

const App: React.FC = () => {
  browserHistoryUtils.browserBackButtonEventListener();

  return (
    <div className={classes.app}>
      <Router />
      <DropdownMenu />
      <Tootltip />
      {/* <Notification /> */}
    </div>
  );
};

export default App;
