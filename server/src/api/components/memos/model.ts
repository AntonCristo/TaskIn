import { Memo as MemoType } from "../server-types";
import { randomUUID } from "crypto";

export class Memo implements MemoType {
  constructor(
    _version: string,
    _uuid: string,
    _createdBy: string,
    _title: string,
    _creationDate: number,
    _dueDate: number,
    _content: string,
    _isDone: boolean,
    _isDeleted: boolean,
    _hashtag: string[]
  ) {
    this.version = _version;
    this.uuid = _uuid;
    this.createdBy = _createdBy;
    this.title = _title;
    this.creationDate = _creationDate;
    this.dueDate = _dueDate;
    this.content = _content;
    this.isDone = _isDone;
    this.isDeleted = _isDeleted;
    this.hashtag = _hashtag;
  }

  public version: string;
  public uuid: string;
  public createdBy: string;
  public title: string;
  public creationDate: number;
  public dueDate: number;
  public content: string;
  public isDone: boolean;
  public isDeleted: boolean;
  public hashtag: string[];

  //methods
  /**
   * deserialize memo object
   * @returns new copy of memo instance
   */
  public getDeserializedCopy = () => {
    return JSON.parse(JSON.stringify(this));
  };

  public static getMemoMock = () => {
    const memoMock: MemoType = {
      version: "0.1",
      isDone: false,
      uuid: randomUUID(),
      content: "Mock memo content",
      createdBy: randomUUID(),
      title: "Mock memo title",
      isDeleted: false,
      hashtag: [],
      creationDate: Date.now(),
      dueDate: Date.now() + 1000,
    };

    return memoMock;
  };
}
