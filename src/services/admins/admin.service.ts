import chalk from "chalk";
import { LoginDto, RegisterDto } from "../../interfaces/admin.interface";
import { Admin } from "../../models/Admin.model";
import { encrypt, compare} from "../../helpers/encrypt";

export const RegisterService = async (data: RegisterDto) => {
  try {
    const account = await Admin.findOne({
      where: {
        email: data.email
      }
    });

    if (account) {
      return {
        code: "error",
        message: "Your email is existed!"
      }
    }
    const hashPassword = encrypt(data.password);
    await Admin.create({
      name: data.name,
      email: data.email,
      password: hashPassword
    });
    return {
      code: "success",
      message: "Register successfully!"
    }
  } catch (error) {
    console.log(chalk.red(error))
    return {
      code: "error",
      message: "Bad request"
    }
  }
}

export const LoginService = async (data: LoginDto) => {
  try {
    const account = await Admin.findOne({
      where: {
        email: data.email
      }
    });

    if (!account) {
      return {
        status: 404,
        code: "error",
        message: "Email or password incorrect!"
      }
    }

    const password = compare(data.password, account.dataValues.password);

    if (!password) {
      return {
        status: 404,
        code: "error",
        message: "Email or password incorrect!"
      }
    }

    return {
      status: 200,
      code: "success",
      message: "Login successfully!",
      data: {
        id: account.dataValues.id,
        name: account.dataValues.name,
      }
    }
  } catch (error) {
    console.log(chalk.red(error));
    return {
      status: 400,
      code: "error",
      message: "Bad request!"
    }
  }
}

export const ProfileService = async (adminId: any) => {
  try {
    const admin = await Admin.findOne({
      where: {
        id: adminId,
      },
      attributes: ["id", "name", "email", "image", "address", "phone", "roleId"]
    })
    return {
      status: 200,
      code: "success",
      data: admin?.dataValues
    }
  } catch (error) {
    console.log(error);
    return {
      status: 400,
      code: "error", 
      message: "Data is not found!"
    }
  }
}