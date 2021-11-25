import { Box, Button } from "src/shared";
import returnIcon from "src/assets/svg/return_24dp.svg";
import refreshIcon from "src/assets/svg/refresh_24dp.svg";
import doneIcon from "src/assets/svg/done_24dp.svg";
import { routerLocationSetter } from "src/actions";
import { browserEventUtils } from "src/utils";

import classes from "./filter-memos.module.css";

const buttonStyleOVerride = {
  border: "none",
};

export const FilterMemos = () => {
  const returnToMemosPageHandler = () => {
    routerLocationSetter("/taskin/memos");
  };

  return (
    <Box>
      <div
        onClick={browserEventUtils.preventParentClickEventHandler}
        className={classes.filterContainer}
      >
        <div className={classes.filterHeader}>
          <Button
            styleOverride={buttonStyleOVerride}
            icon={returnIcon}
            title="Close"
            onClick={returnToMemosPageHandler}
          />
          <Button
            styleOverride={buttonStyleOVerride}
            icon={refreshIcon}
            title="Reset"
            onClick={() => {}}
          />
        </div>
        {/* <div className={classes.filerBody}>define</div> */}
        <div>
          <Button
            styleOverride={buttonStyleOVerride}
            icon={doneIcon}
            title="Apply Filter"
            onClick={() => {}}
          />
        </div>
      </div>
    </Box>
  );
};
