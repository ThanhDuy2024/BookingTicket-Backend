import moment from "moment";
import { ScreenDto } from "../../interfaces/screen.interface";
import { Screens } from "../../models/Screens.model";
import { Seats } from "../../models/Seates.model";
import { Admin } from "../../models/Admin.model";
import { Op } from "sequelize";
import { paginationHelper } from "../../helpers/pagination.helper";
import { UUID } from "node:crypto";

export const createScreenService = async (data: ScreenDto, adminId: any) => {
  try {
    const screen = await Screens.create({
      name: data.name,
      seatNumber: data.seatNumber,
      updatedBy: adminId,
      createdBy: adminId,
    });

    for (let i = 1; i <= data.seatNumber; i++) {
      await Seats.create({
        name: `${data.name}-${i}`,
        screenId: screen.dataValues.id,
        updatedBy: adminId,
        createdBy: adminId,
      })
    }
    return {
      status: 200,
      code: "success",
      message: "Screen create successfully!"
    }
  } catch (error) {
    console.log(error);
    return {
      status: 400,
      code: "error",
      message: "error screen service!"
    }
  }
}

export const getScreenService = async (filter: any) => {
  try {
    const query: any = {
      nest: true,
      distinct: true,
      include: {
        model: Admin,
        as: "updator",
        attributes: ["id", "name"]
      },
      where: {},
      order: [
        ["updatedAt", "desc"]
      ],
      offset: 0,
      limit: filter.limit ? filter.limit : 10
    }

    if (filter.search) {
      query.where.name = {
        [Op.iLike]: `%${filter.search}%`
      }
    }

    const totalItem = await Screens.count(query);
    let pagination: any
    if (filter.page) {
      pagination = paginationHelper(Number(filter.page), Number(totalItem), 0, filter.limit);
      query.offset = pagination.skip;
    }

    const screens = await Screens.findAll(query)

    const data: any = [];
    for (const item of screens) {
      const createdAt = item.dataValues.createdAt;
      const updatedAt = item.dataValues.updatedAt;
      const createdAtFormat = moment(createdAt).format("HH:mm DD/MM/YYYY");
      const updatedAtFormat = moment(updatedAt).format("HH:mm DD/MM/YYYY");
      data.push({
        ...item.dataValues,
        createdAtFormat: createdAtFormat,
        updatedAtFormat: updatedAtFormat
      })
    }

    return {
      status: 200,
      code: "success",
      data: screens,
      totalPage: pagination.totalPage
    }
  } catch (error) {
    console.log(error);
    return {
      status: 400,
      code: "error",
      message: "error screen service!"
    }
  }
}

export const getScreenDetailService = async (screenId: any, adminId: any) => {
  try {
    const screen = await Screens.findOne({
      include: [
        {
          model: Admin,
          as: "updator",
          attributes: ["id", "name"]
        },
        {
          model: Seats,
          as: "seats",
          attributes: ["id", "name"]
        }
      ],
      where: {
        id: screenId,
      }
    })

    if (!screen) {
      return {
        status: 404,
        code: "error",
        message: "Screen not found!"
      }
    }

    const data: any = screen.dataValues;
    data.createdAtFormat = moment(data.createdAt).format("HH:mm DD/MM/YYYY");
    data.updatedAtFormat = moment(data.updatedAt).format("HH:mm DD/MM/YYYY");
    
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
      message: "error screen service!"
    }
  }
}