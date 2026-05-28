import { Router } from "express";
import adminRoute from "./admin.route";
import categoryRoute from "./categories.route";
import screenRoute from "./screen.route";
import movieRoute from "./movies.route";
import { adminMiddleware } from "../../middlewares/adminMiddleware";
const route = Router();

route.use("/auth", adminRoute);
route.use("/category", adminMiddleware, categoryRoute);
route.use("/movie", adminMiddleware, movieRoute);
route.use("/screen", adminMiddleware, screenRoute);
export default route;