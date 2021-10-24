import React from "react";

import { Router } from "./components/router";

import classes from "./app.module.css";

const App: React.FC = () => {
  return (
    <div className={classes.app}>
      <Router />
    </div>
  );
};

export default App;
