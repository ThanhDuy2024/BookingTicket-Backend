import { Router } from "express";
import * as adminController from "../../controllers/admins/admin.controller";
import { adminMiddleware } from "../../middlewares/adminMiddleware";
const route = Router()

route.post("/register", adminController.adminRegister);
route.post("/login", adminController.adminLogin);
route.get("/profile", adminMiddleware, adminController.profileAdminController);
export default route;