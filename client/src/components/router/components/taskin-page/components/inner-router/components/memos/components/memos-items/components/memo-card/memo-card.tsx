import { Memo } from "../../../../../../../../../../../../client-types";
import { textUtils } from "../../../../../../../../../../../../utils";

import { MemoDotPins } from "./components";

import classes from "./memo-card.module.css";

const MAX_CONTENT_LENGTH = 142;

type MemoCardProps = {
  memo: Memo;
};

export const MemoCard = (props: MemoCardProps) => {
  const { memo } = props;

  return (
    <div className={classes.memoCard}>
      <MemoDotPins />
      <div className={classes.memoTitle}>{memo.title}</div>
      <div className={classes.memoContent}>
        {textUtils.sliceTextAndAddEllipsis(memo.content, MAX_CONTENT_LENGTH)}
      </div>
      <div>date/edit/show/del</div>
    </div>
  );
};
