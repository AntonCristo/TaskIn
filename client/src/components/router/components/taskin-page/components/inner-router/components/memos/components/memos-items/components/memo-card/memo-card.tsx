import { Memo } from "../../../../../../../../../../../../client-types";
import { textUtils } from "../../../../../../../../../../../../utils";

import { MemoDotPins, ControlPanel } from "./components";

import classes from "./memo-card.module.css";

const MAX_CONTENT_LENGTH = 142;

type MemoCardProps = {
  memo: Memo;
};

export const MemoCard = (props: MemoCardProps) => {
  const { memo } = props;

  //TODO: create style updates accordion to diff between creation date and due date for the dots and title
  //like road light => green orange red
  //done #c6c5c6
  //green  #73bfa1
  //orange #d2cbc9
  //red #f75f3b

  return (
    <div
      className={[
        classes.memoCard,
        memo.isDone && classes.completedMemoBackground,
      ].join(" ")}
    >
      <MemoDotPins />
      <div className={classes.memoTitle}>{memo.title}</div>
      <div className={classes.memoContent}>
        {textUtils.sliceTextAndAddEllipsis(memo.content, MAX_CONTENT_LENGTH)}
      </div>
      <ControlPanel memo={memo} />
    </div>
  );
};
