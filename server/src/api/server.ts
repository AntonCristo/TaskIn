import express from "express";
import { initRestRoutes } from "./routes";

export class Server {
  private readonly _app: express.Application = express();
  public get app(): express.Application {
    return this._app;
  }
  constructor() {
    initRestRoutes(this._app);
  }
}
