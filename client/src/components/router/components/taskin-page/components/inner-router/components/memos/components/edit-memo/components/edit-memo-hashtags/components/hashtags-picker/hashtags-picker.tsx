import { MouseEvent } from "react";
import { memosCrudActions } from "src/actions";
import { Memo } from "src/client-types";
import { customError } from "src/errors";

import { HashtagOption } from "./components";

import classes from "./hashtags-picker.module.css";

export type HashtagsPickerProps = {
  hashtagsConstList: string[];
  memo: Memo;
};

export const HashtagsPicker = (props: HashtagsPickerProps) => {
  const { hashtagsConstList, memo } = props;

  const onChangeMemoHashtagsHandler = (event: MouseEvent<HTMLInputElement>) => {
    const copyOfMemosHashtags: string[] = [...memo.hashtag];
    const clickedHashtag = event.currentTarget.getAttribute("data-hashtag");
    if (!clickedHashtag) {
      throw customError.extractValueFromClickEventError(
        "onChangeMemoHashtagsHandler",
        event,
        "data-hashtag"
      );
    }
    if (copyOfMemosHashtags.includes(clickedHashtag)) {
      memosCrudActions.updateSingleMemo(
        memo.uuid,
        "hashtag",
        copyOfMemosHashtags.filter((hashtag) => hashtag !== clickedHashtag)
      );
    } else {
      copyOfMemosHashtags.push(clickedHashtag);
      memosCrudActions.updateSingleMemo(
        memo.uuid,
        "hashtag",
        copyOfMemosHashtags
      );
    }
  };

  return (
    <div className={classes.hashtagsPikcer}>
      {hashtagsConstList?.map((hashtagOption, index) => {
        return (
          <HashtagOption
            onClick={onChangeMemoHashtagsHandler}
            isSelected={memo.hashtag?.includes(hashtagOption)}
            value={hashtagOption}
            key={hashtagOption + index}
          />
        );
      })}
    </div>
  );
};
