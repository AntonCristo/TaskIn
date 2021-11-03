import dayjs from "dayjs";
import { observer } from "mobx-react";

import { Memo } from "../../../../../../../../../../client-types";
import { memoStore } from "../../../../../../../../../../stores";
import { MemoCard } from "./components";

import classes from "./memos-items.module.css";

const memoMocks: Memo[] = [
  {
    content: "Mock memo content, this text is a description of the memo card",
    createdBy: "asd-qwe234-asdassd-1qwerq",
    creationDate: dayjs().valueOf(),
    dueDate: dayjs().add(4, "day").valueOf(),
    title: "Mock Mock",
    uuid: "zxc-yukyuk-2rrr23eds-r32re",
    version: "0.1",
    label: "Urgent",
    isDone: false,
  },
  {
    content:
      "Mock memo content, this text is a description of the memo card,Mock memo content, this text is a description of the memo card,Mock memo content, this text is a description of the memo card,Mock memo content, this text is a description of the memo card",
    createdBy: "asd-qwe234-asdassd-jaskldj",
    creationDate: dayjs().valueOf(),
    dueDate: dayjs().add(4, "day").valueOf(),
    title: "My Memo 12",
    uuid: "zqc-yukyuk-2rrr23eds-r32re",
    version: "0.1",
    label: "Ok",
    isDone: true,
  },
  {
    content:
      "Mock memo content, this text is a description of the memo card,Mock memo content, this text is a description of the memo card,Mock memo content, this text is a description of the memo card,Mock memo content, this text is a description of the memo card",
    createdBy: "asd-qwe234-asdassd-jaskldj",
    creationDate: dayjs().valueOf(),
    dueDate: dayjs().add(4, "day").valueOf(),
    title: "My Memo 25",
    uuid: "zql-yukyuk-2rrr23eds-r32re",
    version: "0.1",
    label: "Ok",
    isDone: true,
  },
  {
    content:
      "Mock memo content, this text is a description of the memo card,Mock memo content, this text is a description of the memo card,Mock memo content, this text is a description of the memo card,Mock memo content, this text is a description of the memo card",
    createdBy: "asd-qwe234-asdassd-jaskldj",
    creationDate: dayjs().valueOf(),
    dueDate: dayjs().add(4, "day").valueOf(),
    title: "My Memo",
    uuid: "zqz-yukyuk-2rrr23eds-r32re",
    version: "0.1",
    label: "Ok",
    isDone: false,
  },
];

export const MemosItems = observer(() => {
  const { uiStoreInstance } = memoStore;

  const memosRenderPipeline = () => {
    const titleSearchResults = memoMocks.filter((memo) =>
      memo.title.includes(uiStoreInstance.memoSearchText)
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
        <div>empty</div>
      )}
    </div>
  );
});
