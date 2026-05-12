import { Request, Response } from "express";
import { LoginDto, RegisterDto } from "../../interfaces/admin.interface";
import { LoginService, RegisterService } from "../../services/admins/admin.service";
import jwt from "jsonwebtoken"
export const adminRegister = async (req: Request, res: Response) => {
  try {
    const data: RegisterDto = req.body;
    const message = await RegisterService(data);

    if(message.code === "error") {
      return res.status(400).json(message);
    }

    return res.status(200).json(message)
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      code: "error",
      message: "Bad Request"
    })
  }
}

export const adminLogin = async (req: Request, res: Response) => {
  try {
    const data: LoginDto = req.body;
    const message = await LoginService(data);
    let token
    if(message.code === "success") {
      token = jwt.sign({
        name: message.data?.name,
        id: message.data?.id
      }, String(process.env.JWT_PASSWORD));

      res.cookie("adminToken", token, {
        maxAge: 60 * 60 * 1000,
        httpOnly: true,
        secure: true,
        sameSite: process.env.PRODUCTION === "false" ? "lax" : "none",
        partitioned: true,
        path: "/"
      })
    }

    return res.status(message.status).json({
      code: message.code,
      message: message.message,
      cookie: token
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      code: "error",
      message: "Bad request!"
    })
  }
}