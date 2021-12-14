import { NextFunction, Request, Response } from "express";
import { Memo } from "./model";

export class MemosController {
  public getMock = (req: Request, res: Response, next: NextFunction) => {
    res.send({ data: Memo.getMemoMock() });
  };
  //db instance
  //crud methods
}
