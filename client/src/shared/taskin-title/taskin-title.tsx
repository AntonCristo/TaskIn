import classes from "./taskin-title.module.css";

type TaskinTitleProps = {
  fontSize?: number;
};

export const TaskinTitle = (props: TaskinTitleProps) => {
  const { fontSize = 0 } = props;

  return (
    <div
      style={fontSize ? { fontSize: `${fontSize}px` } : {}}
      className={classes.taskinTitle}
    >
      T-Ask-In
    </div>
  );
};
