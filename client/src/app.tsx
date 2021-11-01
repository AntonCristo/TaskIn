import React from "react";

import { Router } from "./components/router";
import { DropdownMenu } from "./shared";

import classes from "./app.module.css";

const App: React.FC = () => {
  return (
    <div className={classes.app}>
      <Router />
      <DropdownMenu />
    </div>
  );
};

export default App;
