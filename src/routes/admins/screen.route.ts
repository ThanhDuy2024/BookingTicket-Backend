import { Router } from "express";
import * as screenController from "../../controllers/admins/screen.controller"; 
const route = Router();

route.post("/create", screenController.postScreenController);
route.get("/list", screenController.getScreenController);
route.get("/detail/:id", screenController.getScreenDetailController);
export default route;