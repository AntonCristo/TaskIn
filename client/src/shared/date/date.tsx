import dayjs from "dayjs";

import classes from "./date.module.css";

type DateProps = {
  date: number;
  fontSize?: number;
  color?: string;
};

export const Date = (props: DateProps) => {
  const { date, fontSize = 16, color = "#000" } = props;

  return (
    <div
      style={{ fontSize: `${fontSize}px`, color: color }}
      className={classes.date}
    >
      {dayjs(date).format("DD.MM.YYYY")}
    </div>
  );
};
