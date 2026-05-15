import chalk from "chalk";
import { CategoriesDto } from "../../interfaces/category.interface";
import { Categories } from "../../models/Categories.model";

export const categoriesService = async (data: CategoriesDto, id: string) => {
  try {
    await Categories.create({
      name: data.name,
      image: data.image,
      status: data.status,
      createdBy: id,
      updatedBy: id,
    });
    return {
      status: 200,
      code: "success",
      message: "Create category successfully!"
    }
  } catch (error) {
    console.log(chalk.red(error));
    return {
      status: 400,
      code: "error",
      message: "Bad Request"
    }
  }
}