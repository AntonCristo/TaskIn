import { ChangeEvent } from "react";
import classes from "./controlled-input.module.css";

type ControlledInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export const ControlledInput = (props: ControlledInputProps) => {
  const { value, onChange, placeholder = "type here..." } = props;

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const afterChangeValue = event.target.value;

    onChange(afterChangeValue);
  };

  return (
    <input
      onChange={onChangeHandler}
      value={value}
      placeholder={placeholder}
      className={classes.controlledInput}
      type="text"
    />
  );
};
