import express from "express";
import path from "path";
// import mongoose from "mongoose";

import { siteConfig } from "../site-config";

import routes from "./routes";
import { Database } from "./database";

Database.once("open", () => {
  console.log("Database connected");
});

const app = express();

app.use(express.json());
app.use(express.static("./dist"));

app.use(routes);

export default app;
