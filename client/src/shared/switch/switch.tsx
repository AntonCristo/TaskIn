import { customError } from "src/errors";
import classes from "./switch.module.css";

export type SwtichProps = {
  switchValues: [string, string];
  value: string;
  onChange: () => void;
};

export const Switch = (props: SwtichProps) => {
  const { switchValues, value, onChange } = props;

  if (!switchValues.includes(value)) {
    throw customError.errorWithScopeAndMessage(
      "Switch",
      "Please make sure that the 'value' prop is included in 'switchValues' array"
    );
  }

  const switchButtonPositin = () => {
    if (value === switchValues[0]) {
      return classes.leftPosition;
    }

    if (value === switchValues[1]) {
      return classes.righPosition;
    }
  };

  return (
    <div onClick={onChange} className={classes.swtich}>
      <div
        className={[classes.switchButton, switchButtonPositin()].join(" ")}
      ></div>
    </div>
  );
};
