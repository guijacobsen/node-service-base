import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";

import db from "./app/models";

import dotenv from "dotenv";
dotenv.config();

const app = express();

import appRoutes from "./app/routes";

app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());
app.use((req, res, next) => {
  req.db = db;
  next();
});

app.use("/", appRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`-- Node base Project running on port ${PORT} --`)
);
