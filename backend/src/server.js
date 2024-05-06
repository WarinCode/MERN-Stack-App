import express, { json, urlencoded } from "express";
import { configDotenv } from "dotenv";
import { MongoError } from "mongodb";
import cors from "cors";
import morgan from "morgan";
import connectToDB from "./database/connect.js";
import router from "./router/router.js";

configDotenv();
const port = parseInt(process.env.PORT_NUMBER);

const app = express();
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));
app.use(router);

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.use("*", (req, res) => {
  res.status(404);
});

connectToDB()
  .then(() => {
    app.listen(port, () => console.log("Server is running on port:", port));
  })
  .catch(() => {
    console.error(new MongoError("Database connection failed!"));
  });
