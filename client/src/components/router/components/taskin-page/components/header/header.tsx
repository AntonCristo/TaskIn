import { memosService } from "src/services";
import { UserInfo, MemoColorMap, MobileMenuButton } from "./components";

import classes from "./header.module.css";

export const Header = () => {
  const testPingTemp = () => {
    memosService.testApiPing();
  };

  const testInsertMock = () => {
    memosService.testInsertMockToDB();
  };

  return (
    <div className={classes.header}>
      <UserInfo />
      <MobileMenuButton />
      <div className={classes.memoColorsMapWrapper}>
        <MemoColorMap />
      </div>
      <button onClick={testPingTemp}>ping</button>
      <button onClick={testInsertMock}>insert mock</button>
    </div>
  );
};
