import { Router } from "express";
import * as screenController from "../../controllers/admins/screen.controller"; 
const route = Router();

route.post("/create", screenController.postScreenController);

export default route;