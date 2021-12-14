import { createServer, Server as HttpServer } from "http";
import express from "express";
import { config } from "dotenv";
import { Server } from "./api/server";
import { env } from "./config";

config();

// (async function main() {
//   try {

//   } catch (error) {
//     console.log(error);
//   }
// })();

const app: express.Application = new Server().app;
const server: HttpServer = createServer(app);

server.listen(env.NODE_PORT);

server.on("listening", () => {
  console.log(
    `Server is listening on port ${env.NODE_PORT}, environment=${env.NODE_ENV}`
  );
});

server.on("close", () => {
  console.log("Express server finished");
});
