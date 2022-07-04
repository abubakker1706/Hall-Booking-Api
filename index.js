import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { AllRouters } from "./Routes/routers.js";

const app = express();

dotenv.config();

//Middleware
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Hello World !!!");
});

app.use("/", AllRouters);

//Create MonogDB connection
const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;
mongoose.connect(`${MONGO_URL}`, () => {
  app.listen(PORT, () =>
    console.log(`Server is running on ${PORT} && Mongo is connected `)
  );
});
