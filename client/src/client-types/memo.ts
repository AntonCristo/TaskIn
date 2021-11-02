export type Memo = {
  version: string;
  uuid: string;
  createdBy: string;
  title: string;
  creationDate: number;
  dueDate: number;
  content: string;
  label?: string;
};
