export const enum UrgencyColor {
  Low = "#73bfa1",
  Medium = "#ffc900",
  High = "#ff4833",
}

export type MemoUrgencyState =
  | { urgency: "LOW"; color: UrgencyColor.Low }
  | { urgency: "MEDIUM"; color: UrgencyColor.Medium }
  | { urgency: "HIGH"; color: UrgencyColor.High };

export type Memo = {
  version: string;
  uuid: string;
  createdBy: string;
  title: string;
  creationDate: number;
  dueDate: number;
  content: string;
  isDone: boolean;
  isDeleted: boolean;
  hashtag: string[];
};
