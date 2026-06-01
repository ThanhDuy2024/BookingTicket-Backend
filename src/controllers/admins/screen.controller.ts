import { Response } from "express";
import { admin } from "../../interfaces/admin.interface";
import { createScreenService, getScreenService } from "../../services/admins/screen.service";

export const postScreenController = async (req: admin, res: Response) => {
  try {
    const data: any = req.body;
    const message = await createScreenService(data, req.admin.id);
    return res.status(message.status).json({
      code: message.code,
      message: message.message,
    })
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      code: "error",
      message: "Bad request in controller"
    })
  }
}

export const getScreenController = async (req: admin, res: Response) => {
  try {
    const filter = {
      search: req.query.search,
      page: req.query.page,
      limit: req.query.limit
    }
    const message = await getScreenService(filter);
    return res.status(message.status).json({
      code: message.code,
      data: message.data,
      totalPage: message.totalPage
    })
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      code: "error",
      message: "Bad request in controller"
    })
  }
}