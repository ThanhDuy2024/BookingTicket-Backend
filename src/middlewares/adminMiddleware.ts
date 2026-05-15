import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken"
import { admin } from "../interfaces/admin.interface"
export const adminMiddleware = async (req: admin, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.adminToken;

    const verify = jwt.verify(token, String(process.env.JWT_PASSWORD));
    if (!verify) {
      return res.status(404).json({
        code: "error",
        message: "You must login!"
      })
    }

    req.admin = verify
    next();
  } catch (error) {
    console.log(error);
    res.status(404).json({
      code: "error",
      message: "You must login!"
    })
  }
}