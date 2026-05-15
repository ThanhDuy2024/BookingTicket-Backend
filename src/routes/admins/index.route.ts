import { Router } from "express";
import adminRoute from "./admin.route";
import categoryAdmin from "./categories.route";
import { adminMiddleware } from "../../middlewares/adminMiddleware";
const route = Router();

route.use("/auth", adminRoute);
route.use("/category", adminMiddleware, categoryAdmin);
export default route;