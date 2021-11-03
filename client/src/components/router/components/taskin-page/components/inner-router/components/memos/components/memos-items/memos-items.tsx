import { observer } from "mobx-react";

import { Memo } from "../../../../../../../../../../client-types";
import { Spinner } from "../../../../../../../../../../shared";
import { TaskinTitle } from "../../../../../../../../../../shared/taskin-title/taskin-title";
import { memoStore } from "../../../../../../../../../../stores";
import { MemoCard } from "./components";

import classes from "./memos-items.module.css";

export const MemosItems = observer(() => {
  const { uiStoreInstance, dataStoreInstance } = memoStore;

  const memosFromDataStore = dataStoreInstance.getMemos();
  if (!memosFromDataStore) {
    return (
      <div className={classes.spinnerWrapper}>
        <Spinner />
      </div>
    );
  }

  const memosRenderPipeline = () => {
    const titleSearchResults = memosFromDataStore.filter((memo) =>
      memo.title
        .toLowerCase()
        .includes(uiStoreInstance.memoSearchText.toLowerCase())
    );
    //TODO: after filtering and sorting is implemented
    //continue the pipeline

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
