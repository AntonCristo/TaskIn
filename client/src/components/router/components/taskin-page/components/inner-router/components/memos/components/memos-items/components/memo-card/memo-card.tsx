import { observer } from "mobx-react";
import { routerLocationSetter } from "src/actions";
import { Memo } from "src/client-types";
import { MAX_MEMO_CONTENT_LENGTH } from "src/constants";
import { memoStore } from "src/stores";
import { textUtils } from "src/utils";
import { WithTooltip } from "src/shared";

import { MemoDotPins, ControlPanel, CompletedMark } from "./components";

import classes from "./memo-card.module.css";

type MemoCardProps = {
  memo: Memo;
};

export const MemoCard = observer((props: MemoCardProps) => {
  const { memo } = props;
  const { uiStoreInstance } = memoStore;

  const isCollapsed = uiStoreInstance.memosCollapseStateMap[memo.uuid];
  const backgroundColorByUrgencyLevel =
    memoStore.uiStoreInstance.getMemoUrgencyLevel(memo);

  const onMemoCardClickedToEditHandler = () => {
    routerLocationSetter(`/taskin/memos/uuid=${memo.uuid}`);
  };

  return (
    <div data-memo={memo.uuid} className={classes.relativeWrapper}>
      <div
        onClick={memo.isDeleted ? () => {} : onMemoCardClickedToEditHandler}
        style={{ backgroundColor: backgroundColorByUrgencyLevel }}
        className={[
          classes.memoCard,
          memo.isDone && classes.completedMemoOpacity,
        ].join(" ")}
      >
        <MemoDotPins />
        <WithTooltip tip={memo.title}>
          <div className={classes.memoTitle}>{memo.title}</div>
        </WithTooltip>
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
