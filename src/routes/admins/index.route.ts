import { Router } from "express";
import adminRoute from "./admin.route";
const route = Router();

route.use("/auth", adminRoute);

export default route;