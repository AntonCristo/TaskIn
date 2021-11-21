import { MouseEvent } from "react";
import { SortingOption } from "src/stores/memos-store/memos-ui-store";
import checkedIcon from "src/assets/svg/check_box_checked_24dp.svg";
import uncheckedIcon from "src/assets/svg/check_box_uncehcked_24dp.svg";
import { customError } from "src/errors";

import classes from "./sorting-option-item.module.css";

export type SortingOptionItemProps = {
  rule: SortingOption;
  isSelcted: boolean;
  onClick: (event: MouseEvent<HTMLDivElement>) => void;
};

export const SortingOptionItem = (props: SortingOptionItemProps) => {
  const { rule, isSelcted, onClick } = props;

  const sortingRuleDisplayValue = () => {
    switch (rule) {
      case "CREATION_DATE":
        return "By creation date";
      case "DUE_DATE":
        return "By due date";
      case "TITLE":
        return "By title";
      case "URGENCY_LEVEL":
        return "By urgency level";
      default:
        throw customError.unexpectedSwitchDefaultCaseError("SortingOptionItem");
    }
  };

  return (
    <div
      data-rule={rule}
      onClick={onClick}
      className={classes.sortingOptionItem}
    >
      <div>
        {isSelcted ? (
          <img src={checkedIcon} alt="selected" />
        ) : (
          <img src={uncheckedIcon} alt="not-selected" />
        )}
        <div>{sortingRuleDisplayValue()}</div>
      </div>
    </div>
  );
};
