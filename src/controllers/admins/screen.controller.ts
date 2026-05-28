import { Request, Response } from "express";
import { admin } from "../../interfaces/admin.interface";
import { createScreenService } from "../../services/admins/screen.service";

export const postScreenController = async (req: admin, res: Response) => {
  try {
    const message = await createScreenService();
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