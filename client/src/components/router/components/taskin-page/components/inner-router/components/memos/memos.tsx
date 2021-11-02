import { observer } from "mobx-react";

import { MemosHeader } from "./components";

import classes from "./memos.module.css";

export const Memos = observer(() => {
  return (
    <div className={classes.memos}>
      <MemosHeader />
      <div>body</div>
    </div>
  );
});
