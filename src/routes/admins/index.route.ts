import { Router } from "express";
import adminRoute from "./admin.route";
import categoryAdmin from "./categories.route";
import movieRoute from "./movies.route";
import { adminMiddleware } from "../../middlewares/adminMiddleware";
const route = Router();

route.use("/auth", adminRoute);
route.use("/category", adminMiddleware, categoryAdmin);
route.use("/movie", adminMiddleware, movieRoute);
export default route;