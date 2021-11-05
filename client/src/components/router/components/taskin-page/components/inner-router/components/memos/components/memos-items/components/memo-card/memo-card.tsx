import { observer } from "mobx-react";
import { Memo } from "src/client-types";
import { memoStore } from "src/stores";
import { textUtils } from "src/utils";

import { MemoDotPins, ControlPanel } from "./components";

import classes from "./memo-card.module.css";

const MAX_CONTENT_LENGTH = window.innerWidth <= 800 ? 260 : 142;

type MemoCardProps = {
  memo: Memo;
};

export const MemoCard = observer((props: MemoCardProps) => {
  const { memo } = props;
  const { uiStoreInstance } = memoStore;

  //TODO: create style updates accordion to diff between creation date and due date for the dots and title
  //like road light => green orange red
  // Low = "#73bfa1",
  // Medium = "#ff853b",
  // High = "#ff4833",
  // Done = "#c6c5c6",

  const isCollapsed = uiStoreInstance.memosCollapseStateMap[memo.uuid];

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
});
