import { makeAutoObservable } from "mobx";

class TooltipStore {
  constructor() {
    makeAutoObservable(this);
  }

  private _title: string = "";
  get title() {
    return this._title;
  }
  set title(newTitle: string) {
    this._title = newTitle;
  }

  private _topPosition: number = 0;
  get topPosition() {
    return this._topPosition;
  }
  set topPosition(positionUpdate: number) {
    this._topPosition = positionUpdate;
  }

  private _leftPosition: number = 0;
  get leftPosition() {
    return this._leftPosition;
  }
  set leftPosition(positionUpdate: number) {
    this._leftPosition = positionUpdate;
  }

  private _leaveDelayInMs: number = 0;
  get leaveDelayInMs() {
    return this._leaveDelayInMs;
  }
  set leaveDelayInMs(milisecondsToDelay: number) {
    this._leaveDelayInMs = milisecondsToDelay;
  }
}

export const tooltipStore = new TooltipStore();
