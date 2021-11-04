import { Memo } from "src/client-types";
import { textUtils } from "src/utils";

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

  //memo ui store map to hold collapsion
  const isCollapsed = false;

  return (
    <div
      className={[
        classes.memoCard,
        memo.isDone && classes.completedMemoBackground,
      ].join(" ")}
    >
      <MemoDotPins />
      <div className={classes.memoTitle}>{memo.title}</div>
      {isCollapsed ? null : (
        <div className={classes.memoContent}>
          {textUtils.sliceTextAndAddEllipsis(memo.content, MAX_CONTENT_LENGTH)}
        </div>
      )}

      <ControlPanel isCollapsed={isCollapsed} memo={memo} />
    </div>
  );
};
