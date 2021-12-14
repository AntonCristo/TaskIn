import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

export const registerMiddleware = (app: express.Router) => {
  app.use(cors());
  app.use(bodyParser.json());
};
