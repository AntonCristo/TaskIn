export enum UrgencyColor {
  Low = "#73bfa1",
  Medium = "#ffc900",
  High = "#ff4833",
  Done = "#c6c5c6",
}

export type MemoUrgencyState =
  | { urgency: "LOW"; color: UrgencyColor.Low }
  | { urgency: "MEDIUM"; color: UrgencyColor.Medium }
  | { urgency: "HIGH"; color: UrgencyColor.High }
  | { urgency: "DONE"; color: UrgencyColor.Done };

export type Memo = {
  version: string;
  uuid: string;
  createdBy: string;
  title: string;
  creationDate: number;
  dueDate: number;
  content: string;
  //TOTO:after urgency level map is finished, remove isDone attribute
  isDone: boolean;
  isDeleted: boolean;
};
