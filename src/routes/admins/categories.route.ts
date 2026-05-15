import { Router } from "express";
import * as categoryController from "../../controllers/admins/categories.controller";
import multer from "multer";
import { storage } from "../../configs/cloudinary.config";
const route = Router();
const upload = multer({
  storage: storage
})

route.post("/create", upload.single("image"), categoryController.postCategoriesController);
route.get("/list", categoryController.getCategoriesController);
route.get("/detail/:id", categoryController.categoriesDtailController);
route.put("/update/:id", upload.single("image"), categoryController.putCategoriesController);
route.delete("/delete/:id", categoryController.deleteCategoriesController);
export default route;