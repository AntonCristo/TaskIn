import { CSSProperties } from "react";
import { Button, LabelBox, WithTooltip } from "src/shared";
import { Memo } from "src/client-types";
import editIcon from "src/assets/svg/edit_24dp.svg";
import doneIcon from "src/assets/svg/done_24dp.svg";
import { memoUIActions } from "src/actions";
import { memoStore } from "src/stores";
import { observer } from "mobx-react";

import { HashtagsPicker } from "./components";

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
        <div className={classes.hashtagsSelect}>
          <HashtagsPicker memo={memo} hashtagsConstList={tagsMock} />
        </div>
      ) : (
        <div className={classes.hashtagsList}>
          <WithTooltip tip="Filters/Hashtags">
            <div
              onClick={toggleHashtagEditModeHandler}
              className={classes.hashtagMark}
            >
              #
            </div>
          </WithTooltip>
          {memo.hashtag?.map((tag, index) => {
            return <LabelBox key={tag + index} text={"#" + tag} />;
          })}
        </div>
      )}
      <Button
        styleOverride={buttonStyleOverride}
        icon={_isHashtagsInEditMode ? doneIcon : editIcon}
        title=""
        onClick={toggleHashtagEditModeHandler}
      />
    </div>
  );
});
