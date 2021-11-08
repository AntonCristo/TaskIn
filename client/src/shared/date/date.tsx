import { ChangeEvent } from "react";
import dayjs from "dayjs";

import classes from "./date.module.css";
import { TEN_YEARS_IN_MS } from "src/constants";

type DateProps = {
  date: number;
  fontSize?: number;
  color?: string;
  editMode?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  minDate?: number;
};

export const Date = (props: DateProps) => {
  const {
    date,
    onChange,
    fontSize = 16,
    color = "#000",
    editMode = false,
    minDate = dayjs().valueOf(),
  } = props;

  const _onChange =
    editMode && onChange
      ? onChange
      : () => {
          throw Error(
            "[Date]:: Date component is not in edit mode, or/and 'onChange' handler was not provided"
          );
        };

  return (
    <div
      style={{ fontSize: `${fontSize}px`, color: color }}
      className={classes.date}
    >
      {editMode ? (
        <input
          min={dayjs(minDate).format("YYYY-MM-DD")}
          max={dayjs(minDate + TEN_YEARS_IN_MS).format("YYYY-MM-DD")}
          autoFocus
          style={{ fontSize: `${fontSize}px` }}
          className={classes.dateInput}
          type="date"
          value={dayjs(date).format("YYYY-MM-DD")}
          onChange={_onChange}
        />
      ) : (
        dayjs(date).format("DD/MM/YYYY")
      )}
    </div>
  );
};
