import { MemoUrgencyState, UrgencyColor } from "src/client-types";
import checkedIcon from "src/assets/svg/check_box_checked_24dp.svg";
import uncheckedIcon from "src/assets/svg/check_box_uncehcked_24dp.svg";

import classes from "./urgency-list-item.module.css";

type UrgencyListItemProps = {
  isSelected: boolean;
  urgency: MemoUrgencyState;
  onClick: (urgencyColor: UrgencyColor) => void;
};

export const UrgencyListItem = (props: UrgencyListItemProps) => {
  const { isSelected, urgency, onClick } = props;

  const onListItemClick = () => {
    onClick(urgency.color);
  };

  return (
    <li onClick={onListItemClick} className={classes.urgencyListItem}>
      <img src={isSelected ? checkedIcon : uncheckedIcon} alt="selection-box" />
      <span style={{ color: urgency.color }}>
        {urgency.urgency.toLowerCase()}
      </span>
    </li>
  );
};
