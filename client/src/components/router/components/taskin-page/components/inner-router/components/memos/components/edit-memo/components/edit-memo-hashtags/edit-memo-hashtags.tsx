import { CSSProperties } from "react";
import { Button, LabelBox } from "src/shared";
import { Memo } from "src/client-types";
import editIcon from "src/assets/svg/edit_24dp.svg";
import { memoUIActions } from "src/actions";
import { memoStore } from "src/stores";
import { observer } from "mobx-react";

import classes from "./edit-memo-hashtags.module.css";

type EditMemoHashtagsProps = {
  memo: Memo;
};

const buttonStyleOverride: CSSProperties = {
  minWidth: "30px",
  border: "none",
};

//TODO: get tags from store with a service call
const tagsMock: string[] = [
  "job",
  "home",
  "personal",
  "bug",
  "list",
  "extrattention",
  "simple",
  "research",
  "withothermemo",
];

export const EditMemoHashtags = observer((props: EditMemoHashtagsProps) => {
  const { memo } = props;
  const { uiStoreInstance } = memoStore;
  const _isHashtagsInEditMode = uiStoreInstance.editMemoProfile?.hashtag;

  const toggleHashtagEditModeHandler = () => {
    memoUIActions.editMemoProfile(
      "hashtag",
      !memoStore.uiStoreInstance.editMemoProfile.hashtag
    );
  };

  return (
    <div className={classes.editMemoHashtags}>
      {_isHashtagsInEditMode ? (
        <div>edit</div>
      ) : (
        <div className={classes.hashtagsList}>
          <div className={classes.hashtagMark}>#</div>
          {memo.hashtag?.map((tag, index) => {
            return <LabelBox key={tag + index} text={tag} />;
          })}
        </div>
      )}

      <Button
        styleOverride={buttonStyleOverride}
        icon={editIcon}
        title=""
        onClick={toggleHashtagEditModeHandler}
      />
    </div>
  );
});
