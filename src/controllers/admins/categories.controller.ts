import { Response } from "express";
import { admin } from "../../interfaces/admin.interface";
import { CategoriesDto } from "../../interfaces/category.interface";
import { categoriesService, getCategoriesService } from "../../services/admins/categories.service";

export const postCategoriesController = async (req: admin, res: Response) => {
  try {
    if(req.file) {
      req.body.image = req.file.path;
    } else {
      delete req.body.image;
    }

    const data: CategoriesDto = req.body;
    const message = await categoriesService(data, req.admin.id);

    return res.status(message.status).json({
      code: message.code,
      message: message.message
    })
  } catch (error) {
    console.log(error);
    res.status(400).json({
      code: "error",
      message: "Bad Request"
    })
  }
}

export const getCategoriesController = async (req: admin, res: Response) => {
  try {
    const filter: any = {
      search: req.query.search,
      status: req.query.status,
      page: req.query.page,
      limit: req.query.limit
    }
    const message = await getCategoriesService(filter);
    res.status(message.status).json({
      code: message.code,
      data: message.data,
      totalPage: message.totalPage
    })
  } catch (error) {
    console.log(error);
    res.status(400).json({
      code: "error",
      message: "Bad Request!"
    })
  }
}