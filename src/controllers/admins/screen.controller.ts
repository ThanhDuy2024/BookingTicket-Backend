import { Request, Response } from "express";
import { admin } from "../../interfaces/admin.interface";
import { createScreenService } from "../../services/admins/screen.service";
import { ScreenDto } from "../../interfaces/screen.interface";

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