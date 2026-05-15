import chalk from "chalk";
import { CategoriesDto } from "../../interfaces/category.interface";
import { Categories } from "../../models/Categories.model";
import { Admin } from "../../models/Admin.model";
import moment from "moment"
import { Op } from "sequelize";
import { paginationHelper } from "../../helpers/pagination.helper";
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

export const getCategoriesService = async (filter: any) => {
  try {
    const query: any = {
      nest: true,
      where: {
        status: ["active", "inactive"]
      },
      include: [
        {
          model: Admin,
          as: "createdByAdmin",
          attributes: ["id", "name"]
        },
        {
          model: Admin,
          as: "updatedByAdmin",
          attributes: ["id", "name"]
        }
      ],
      order: [
        ["updatedAt", "desc"]
      ],
      limit: filter.limit,
      offset: 0,
    }

    if (filter.search !== "null") {
      query.where.name = {
        [Op.iLike]: `%${filter.search.trim()}%`
      }
    }

    if (filter.status === "active" || filter.status === "inactive") {
      query.where.status = filter.status;
    }

    const totalItem = await Categories.count(query);
    let pagination;
    if (filter.page) {
      pagination = paginationHelper(Number(filter.page), Number(totalItem), 0, Number(filter.limit));
      query.offset = pagination.skip;
    }

    const categories = await Categories.findAll(query);

    const data: any = []
    for (const item of categories) {
      const itemData = item.toJSON();
      let rawData = {
        ...itemData,
        createdFormat: moment(itemData.createdAt).format("HH:mm DD-MM-YYYY"),
        updatedFormat: moment(itemData.updatedAt).format("HH:mm DD-MM-YYYY"),
      }
      data.push(rawData)
    }
    return {
      status: 200,
      code: "success",
      data: data,
      totalPage: pagination?.totalPage
    }
  } catch (error) {
    return {
      status: 400,
      code: "error",
      message: "Bad Request!"
    }
  }
}

export const categoriesDetailService = async (id: string) => {
  try {
    const category: any = await Categories.findOne({
      nest: true,
      raw: true,
      where: {
        id: id,
        status: ["active", "inactive"]
      },
      include: [
        {
          model: Admin,
          as: "createdByAdmin",
          attributes: ["id", "name"]
        },
        {
          model: Admin,
          as: "updatedByAdmin",
          attributes: ["id", "name"]
        }
      ]
    });

    const data = {
      ...category,
      createdFormat: moment(category.createdAt).format("HH:mm DD/MM/YYYY"),
      updatedFormat: moment(category.updatedAt).format("HH:mm DD/MM/YYYY"),
    }
    return {
      status: 200,
      code: "success",
      data: data
    }
  } catch (error) {
    console.log(error);
    return {
      status: 400,
      code: "error",
      message: "Bad request in service!"
    }
  }
}

export const putCategoriesService = async (data: CategoriesDto, id: string, categoryId: string) => {
  try {
    const category = await Categories.findOne({
      where: {
        id: categoryId,
      }
    });

    if (!category) {
      return {
        status: 404,
        code: "error",
        message: "Category not found!"
      }
    }

    await category.update({
      name: data.name,
      image: data.image,
      status: data.status,
      updatedBy: id
    })

    return {
      status: 200,
      code: "success",
      message: "Update category successfully!"
    }
  } catch (error) {
    console.log(error);
    return {
      status: 400,
      code: "error",
      message: "Bad request in service!"
    }
  }
}

export const deleteCategoryService = async (categoryId: string, adminId: string) => {
  try {
    const category = await Categories.findOne({
      where: {
        id: categoryId,
        status: ["active", "inactive"]
      }
    });

    if (!category) {
      return {
        status: 404,
        code: "error",
        message: "Category not found!"
      }
    };

    await category.update({
      status: "deleted",
      updatedBy: adminId,
    });
    return {
      status: 200,
      code: "success",
      message: "Delete category successfully!"
    }
  } catch (error) {
    console.log(error)
    return {
      status: 400,
      code: "error",
      message: "Bad request in service!"
    }
  }
}