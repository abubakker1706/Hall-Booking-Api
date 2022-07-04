import express from "express";

import {
  CreateRoom,
  BookRoom,
  GetAllRooms,
  GetAllCustomers,
} from "../controls.js";

const Router = express.Router();

Router.post("/create-room", CreateRoom);
Router.post("/book-room", BookRoom);
Router.get("/allrooms", GetAllRooms);
Router.get("/allcustomers", GetAllCustomers);

export const AllRouters = Router;
