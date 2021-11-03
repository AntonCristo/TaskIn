import { CSSProperties } from "react";
import dayjs from "dayjs";
import { Memo } from "../../../../../../../../../../../../../../client-types";
import rightArrowIcon from "../../../../../../../../../../../../../../assets/svg/east_24dp.svg";
import doneIcon from "../../../../../../../../../../../../../../assets/svg/done_24dp.svg";
import removeDoneIcon from "../../../../../../../../../../../../../../assets/svg/remove_done_24dp.svg";
import deleteIcon from "../../../../../../../../../../../../../../assets/svg/delete_24dp.svg";
import { Button } from "../../../../../../../../../../../../../../shared";

import classes from "./control-panel.module.css";

type ControlPanelProps = {
  memo: Memo;
};

const controlPanelButtonsStyleOverride: CSSProperties = {
  minWidth: "40px",
};

export const ControlPanel = (props: ControlPanelProps) => {
  const { memo } = props;

  return (
    <div className={classes.controlPanel}>
      {/* [date/edit/show/del] */}
      <div className={classes.memoDates}>
        <span
          className={[
            classes.startDate,
            memo.isDone && classes.finishedDate,
          ].join(" ")}
        >
          {dayjs(memo.creationDate).format("DD.MM.YYYY")}{" "}
        </span>
        <img src={rightArrowIcon} alt="direction" />
        <span
          className={[
            classes.endDate,
            memo.isDone && classes.finishedDate,
          ].join(" ")}
        >
          {dayjs(memo.dueDate).format("DD.MM.YYYY")}
        </span>
      </div>
      <div className={classes.memoButtons}>
        <Button
          styleOverride={controlPanelButtonsStyleOverride}
          title=""
          icon={memo.isDone ? removeDoneIcon : doneIcon}
          onClick={() => {}}
        />
        <Button
          styleOverride={controlPanelButtonsStyleOverride}
          title=""
          icon={deleteIcon}
          onClick={() => {}}
        />
      </div>
    </div>
  );
};
