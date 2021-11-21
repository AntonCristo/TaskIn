import { MouseEvent } from "react";

class CustomError {
  public errorWithScopeAndMessage = (scope: string, message: string) => {
    return new Error(`SCOPE_NAME::[${scope}]: ERROR: ${message}.`);
  };
  public unexpectedSwitchDefaultCaseError = (scope: string) => {
    return new Error(
      `SCOPE_NAME::[${scope}]: Default case should never happen in this context.`
    );
  };
  public extractValueFromClickEventError = (
    scope: string,
    event: MouseEvent,
    attribute?: string
  ) => {
    console.error(
      `SCOPE_NAME::[${scope}]:` +
        `${attribute ? "tried to access " + attribute : ""}` +
        ", event =>",
      event
    );
    return new Error(`SCOPE_NAME::[${scope}]: check console.error log.`);
  };
}

export const customError = new CustomError();
