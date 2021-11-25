import { DropdownMenu, Tootltip } from "./shared";
import { browserEventUtils } from "./utils";

import { Router, Notification } from "./components";

import classes from "./app.module.css";

const App = () => {
  browserEventUtils.browserBackButtonEventListener();

  return (
    <div className={classes.app}>
      <Router />
      <DropdownMenu />
      <Tootltip />
      <Notification />
    </div>
  );
};

export default App;
