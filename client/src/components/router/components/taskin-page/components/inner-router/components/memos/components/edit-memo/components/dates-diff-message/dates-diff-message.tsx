import dayjs from "dayjs";
import announceIcon from "src/assets/svg/announce_24dp.svg";
import { Memo } from "src/client-types";

import classes from "./dates-diff-message.module.css";

export type DatesDiffMessageProps = {
  memo: Memo;
};

export const DatesDiffMessage = (props: DatesDiffMessageProps) => {
  const { memo } = props;
  const dueDateInStringFormat = dayjs(memo.dueDate).format("YYYY-MM-DD");
  const _diffBetweenDueDateAndNow = dayjs(dueDateInStringFormat).diff(
    dayjs().format("YYYY-MM-DD"),
    "days"
  );

  return (
    <div className={classes.datesDiffMessage}>
      <img src={announceIcon} alt="announce-icon" />
      {memo.isDone ? (
        <strong>This memo is marked as DONE!</strong>
      ) : (
        <div>
          {"This memo is"}
          &nbsp;
          <strong>
            {_diffBetweenDueDateAndNow < 0
              ? _diffBetweenDueDateAndNow * -1
              : _diffBetweenDueDateAndNow}
          </strong>
          &nbsp;
          {_diffBetweenDueDateAndNow < 0
            ? "days behind schedule"
            : "days ahead of schedule"}
        </div>
      )}
    </div>
  );
};
