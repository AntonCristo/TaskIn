import classes from "./label-box.module.css";

export type LabelBoxProps = {
  text: string;
};

export const LabelBox = (props: LabelBoxProps) => {
  const { text } = props;

  return <div className={classes.labelBox}>{text}</div>;
};
