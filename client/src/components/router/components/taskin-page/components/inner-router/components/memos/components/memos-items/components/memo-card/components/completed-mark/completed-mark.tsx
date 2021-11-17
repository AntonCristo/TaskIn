import { Memo } from "src/client-types";

import classes from "./completed-mark.module.css";

type CompletedMarkProps = {
  memo: Memo;
};

export const CompletedMark = (props: CompletedMarkProps) => {
  const { memo } = props;

  return memo.isDone ? <div className={classes.mark}>COMPLETED</div> : null;
};
