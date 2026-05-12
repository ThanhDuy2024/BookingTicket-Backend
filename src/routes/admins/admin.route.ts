import { Router } from "express";
import * as adminController from "../../controllers/admins/admin.controller";
const route = Router()

route.post("/register", adminController.adminRegister);
route.post("/login", adminController.adminLogin);

export default route;