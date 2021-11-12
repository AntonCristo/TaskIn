import classes from "./switch.module.css";

export type SwtichProps = {
  switchValues: string[];
  value: string;
  onChange: () => void;
};

export const Switch = (props: SwtichProps) => {
  const { switchValues, value, onChange } = props;

  let buttonPositionByValue = {};
  if (value === switchValues[0]) buttonPositionByValue = { left: "-1px" };
  if (value === switchValues[1]) buttonPositionByValue = { right: "-1px" };

  return (
    <div onClick={onChange} className={classes.swtich}>
      <div style={buttonPositionByValue} className={classes.switchButton}></div>
    </div>
  );
};
