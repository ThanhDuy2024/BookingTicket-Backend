import { Router } from "express";
import * as moviesController from "../../controllers/admins/movies.controller";
import multer from "multer";
import { storage } from "../../configs/cloudinary.config";
const route = Router();
const upload = multer({
  storage: storage
})
route.post("/create", upload.single("image"), moviesController.postMovieController);

export default route;