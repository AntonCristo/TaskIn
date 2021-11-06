import React, { ChangeEvent, FocusEvent } from "react";

import classes from "./controlled-input.module.css";

type ControlledInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
  autoSelcet?: boolean;
};

export const ControlledInput = (props: ControlledInputProps) => {
  const {
    value,
    onChange,
    placeholder = "type here...",
    autoFocus = false,
    autoSelcet = false,
  } = props;

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const afterChangeValue = event.target.value;

    onChange(afterChangeValue);
  };

  const onFocusHandler = (event: FocusEvent<HTMLInputElement>) => {
    autoSelcet && event.target.select();
  };

  return (
    <input
      autoFocus={autoFocus}
      onFocus={onFocusHandler}
      onChange={onChangeHandler}
      value={value}
      placeholder={placeholder}
      className={classes.controlledInput}
      type="text"
    />
  );
};
