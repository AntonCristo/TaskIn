import { UrgencyColor } from "src/client-types";

export type MemosUrgencyLevelMap = {
  [x: string]: UrgencyColor | undefined;
};

export type MemosCollapseStateMap = {
  [x: string]: boolean;
};

export type EditMemoProfile = {
  title: boolean;
  content: boolean;
  creationDate: boolean;
  dueDate: boolean;
  hashtag: boolean;
};

export type SortingOption =
  | "TITLE"
  | "CREATION_DATE"
  | "DUE_DATE"
  | "URGENCY_LEVEL"
  | null;

export type MemosSortingProfile = {
  sort: SortingOption;
  sortDirection: "UP" | "DOWN";
};

export type FilterProfile = {
  title?: string;
  urgencyLevel?: UrgencyColor[];
  hashtag?: string[];
  dueDate?: number;
  creationDate?: number;
};
