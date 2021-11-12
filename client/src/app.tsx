import { DropdownMenu, Tootltip } from "./shared";
import { browserHistoryUtils } from "./utils";

import { Router, Notification } from "./components";

import classes from "./app.module.css";

const App = () => {
  browserHistoryUtils.browserBackButtonEventListener();

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
