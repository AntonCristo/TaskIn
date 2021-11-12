import { observer } from "mobx-react";
import { Memo } from "src/client-types";
import { Spinner, TaskinTitle } from "src/shared";
import { memoStore } from "src/stores";

import { MemoCard } from "./components";

import classes from "./memos-items.module.css";

export const MemosItems = observer(() => {
  const { uiStoreInstance, dataStoreInstance } = memoStore;

  const memosFromDataStore = dataStoreInstance.getMemosAsArray();
  if (!memosFromDataStore) {
    return (
      <div className={classes.spinnerWrapper}>
        <Spinner />
      </div>
    );
  }

  const memosRenderPipeline = () => {
    //TODO: filter the deleted memos(this filter must happen on the server)
    const nonDeletedMemos = memosFromDataStore.filter(
      (memo) => !memo.isDeleted
    );

    const sortedMemos =
      memoStore.uiStoreInstance.getSortedMemos(nonDeletedMemos);

    const titleSearchResults = sortedMemos.filter((memo) =>
      memo.title
        .toLowerCase()
        .includes(uiStoreInstance.memoSearchText.toLowerCase())
    );

    return Array.from(new Set<Memo>([...titleSearchResults]));
  };

  const renderPipelineResults = memosRenderPipeline();

  return (
    <div className={classes.memosItems}>
      {/* //TODO: add mobile memo card design */}
      {renderPipelineResults.length ? (
        renderPipelineResults.map((memo, index) => (
          <MemoCard key={memo.uuid} memo={memo} />
        ))
      ) : (
        <div className={classes.emptyMapPlacholder}>
          <TaskinTitle />
        </div>
      )}
    </div>
  );
});
