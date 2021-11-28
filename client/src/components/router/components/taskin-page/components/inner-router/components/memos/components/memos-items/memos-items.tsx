import { observer } from "mobx-react";
import { Memo } from "src/client-types";
import { Spinner } from "src/shared";
import { memoStore } from "src/stores";
import { FilterProfile } from "src/stores/memos-store/ui-store-types";

import { MemoCard, AddMemoCard } from "./components";

import classes from "./memos-items.module.css";

export const MemosItems = observer(() => {
  const { uiStoreInstance, dataStoreInstance } = memoStore;

  const memosFromDataStore =
    dataStoreInstance.getMemosMapAsArrayByDisplayClass();
  if (!memosFromDataStore) {
    return (
      <div className={classes.spinnerWrapper}>
        <Spinner />
      </div>
    );
  }

  const setFilterExcludeArray = () => {
    const exclude: (keyof FilterProfile)[] = [];

    if (
      memoStore.dataStoreInstance.memosDisplayClass === "TRASH" ||
      memoStore.dataStoreInstance.memosDisplayClass === "COMPLETED"
    ) {
      exclude.push("urgencyLevel");
    }

    return exclude;
  };

  const memosRenderPipeline = () => {
    const filteredMemos = uiStoreInstance.getFilteredMemos(
      memosFromDataStore,
      setFilterExcludeArray()
    );

    const sortedMemos = uiStoreInstance.getSortedMemos(filteredMemos);

    return Array.from(new Set<Memo>([...sortedMemos]));
  };

  const memosRenderPipelineResults = memosRenderPipeline();

  return (
    <div className={classes.memosItems}>
      <AddMemoCard />
      {memosRenderPipelineResults.length
        ? memosRenderPipelineResults.map((memo, index) => (
            <MemoCard key={memo.uuid} memo={memo} />
          ))
        : null}
    </div>
  );
});
