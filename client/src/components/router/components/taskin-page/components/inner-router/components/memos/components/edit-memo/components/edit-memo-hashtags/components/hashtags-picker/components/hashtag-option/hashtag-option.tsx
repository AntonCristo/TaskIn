import { MouseEvent } from "react";

import classes from "./hashtag-option.module.css";

export type HashtagOptionProps = {
  value: string;
  isSelected: boolean;
  onClick: (event: MouseEvent<HTMLInputElement>) => void;
};

export const HashtagOption = (props: HashtagOptionProps) => {
  const { value, isSelected, onClick } = props;
  return (
    <div
      onClick={onClick}
      data-hashtag={value}
      className={[
        classes.hashtagOption,
        isSelected && classes.selectedTag,
      ].join(" ")}
    >
      #{value}
    </div>
  );
};
