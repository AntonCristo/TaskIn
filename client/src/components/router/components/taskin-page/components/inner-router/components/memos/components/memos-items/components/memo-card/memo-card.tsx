import { MouseEvent } from "react";
import { observer } from "mobx-react";
import { routerLocationSetter, tooltipActions } from "src/actions";
import { Memo } from "src/client-types";
import { MAX_MEMO_CONTENT_LENGTH } from "src/constants";
import { memoStore, tooltipStore } from "src/stores";
import { textUtils } from "src/utils";

import { MemoDotPins, ControlPanel, CompletedMark } from "./components";

import classes from "./memo-card.module.css";

type MemoCardProps = {
  memo: Memo;
};

export const MemoCard = observer((props: MemoCardProps) => {
  const { memo } = props;
  const { uiStoreInstance } = memoStore;
  const { title } = tooltipStore;

  const isCollapsed = uiStoreInstance.memosCollapseStateMap[memo.uuid];
  const backgroundColorByUrgencyLevel =
    memoStore.uiStoreInstance.getMemoUrgencyLevel(memo);

  const onMemoCardClickedToEditHandler = () => {
    routerLocationSetter(`/taskin/memos/uuid=${memo.uuid}`);
  };

  const onMouseEnterHandler = (event: MouseEvent<HTMLDivElement>) => {
    !title &&
      tooltipActions.showTooltip(memo.title, event.clientY, event.clientX);
  };

  const onMouseLeaveHandler = () => {
    tooltipActions.resetTooltip();
  };

  return (
    <div className={classes.relativeWrapper}>
      <div
        onClick={memo.isDeleted ? () => {} : onMemoCardClickedToEditHandler}
        style={{ backgroundColor: backgroundColorByUrgencyLevel }}
        className={[
          classes.memoCard,
          memo.isDone && classes.completedMemoOpacity,
        ].join(" ")}
      >
        <MemoDotPins />
        <div
          onMouseEnter={onMouseEnterHandler}
          onMouseLeave={onMouseLeaveHandler}
          className={classes.memoTitle}
        >
          {memo.title}
        </div>
        {isCollapsed || !memo.content ? null : (
          <div className={classes.memoContent}>
            {textUtils.sliceTextAndAddEllipsis(
              memo.content,
              MAX_MEMO_CONTENT_LENGTH
            )}
          </div>
        )}
        <ControlPanel isCollapsed={isCollapsed} memo={memo} />
      </div>
      <CompletedMark memo={memo} />
    </div>
  );
});
