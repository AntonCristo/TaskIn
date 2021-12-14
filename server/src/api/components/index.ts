import { Router } from "express";
import { MemosRoutes } from "./memos/routes";

export const registerApiRoutes = (router: Router, prefix: string) => {
  router.use(`${prefix}/memos`, new MemosRoutes().router);
};
