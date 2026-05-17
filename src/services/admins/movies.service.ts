import { Op } from "sequelize";
import { Movie } from "../../interfaces/movie.interface"
import { Admin } from "../../models/Admin.model";
import { Categories } from "../../models/Categories.model";
import { Movies } from "../../models/Movies.model";
import { Movies_Categories } from "../../models/Movies_Categories.mode";
import moment from "moment";
import { paginationHelper } from "../../helpers/pagination.helper";

export const CreateMovieService = async (data: Movie, adminId: string) => {
  try {
    data.duration = Number(data.duration);
    data.imdbRating = Number(data.imdbRating);
    const categoryList = JSON.parse(data.categoryList);

    const categories = await Categories.findAll({
      where: {
        id: categoryList,
        status: "active"
      },
    })

    if (categories.length !== categoryList.length) {
      return {
        status: 400,
        code: "error",
        message: "Invalid categories!"
      }
    };

    const movie: any = await Movies.create({
      name: data.name,
      originalName: data.originalName,
      description: data.description,
      trailerUrl: data.trailerUrl,
      duration: data.duration,
      releaseDate: data.releaseDate,
      country: data.country,
      ageRating: data.ageRating,
      status: data.status,
      imdbRating: data.imdbRating,
      actors: data.actors,
      image: data.image,
      createdBy: adminId,
      updatedBy: adminId
    });

    const movieCategories = categoryList.map((categoryId: string) => ({
      movieId: movie.id,
      categoryId,
    }));

    await Movies_Categories.bulkCreate(movieCategories);
    return {
      status: 200,
      code: "success",
      message: "Create Movies Successfully!"
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

export const MovieListService = async (filter: any) => {
  try {
    const query: any = {
      distinct: true,
      where: {},
      include: [
        {
          model: Admin,
          as: "creator",
          attributes: ["id", "name"]
        },
      ],
      order: [
        ["updatedAt", "desc"]
      ],
      limit: filter.limit || 10,
      offset: 0
    }

    if (filter.search !== 'null') {
      query.where.name = {
        [Op.iLike]: `%${filter.search}%`
      }
    }

    if (filter.duration) {
      query.order = [
        ["duration", String(filter.duration)]
      ]
    }

    if (filter.country) {
      query.where.country = filter.country
    }

    if (filter.status === "active" || filter.status === "inactive") {
      query.where.status = filter.status
    }

    if (filter.imdbRating) {
      query.order = [
        ["imdbRating", String(filter.imdbRating)]
      ]
    }

    const totalItem = await Movies.count(query)
    let pagination: any;
    if (filter.page) {
      pagination = paginationHelper(Number(filter.page), Number(totalItem), 0, Number(filter.limit))
      query.offset = pagination.skip
    }
    const movies = await Movies.findAll(query);

    const data: any = []
    for (const item of movies) {
      const itemData = item.toJSON();
      const rawData = {
        ...itemData,
        createdFormat: moment(itemData.createdAt).format("HH:mm DD/MM/YYYY"),
        updatedFormat: moment(itemData.updatedAt).format("HH:mm DD/MM/YYYY")
      }
      data.push(rawData);
    }
    return {
      status: 200,
      code: "success",
      data: data,
      totalPage: pagination.totalPage
    }
  } catch (error) {
    console.log(error);
    return {
      status: 400,
      code: "error",
      message: "error in movie service"
    }
  }
}

export const MovieDetailService = async (movieId: string) => {
  try {
    const movie = await Movies.findOne({
      where: {
        id: movieId
      },
      include: [
        {
          model: Admin,
          as: "creator",
          attributes: ["id", "name"]
        },
        {
          model: Categories,
          as: "categories",
          attributes: ["id", "name"],
          where: {
            status: "active"
          }
        }
      ],
    })
    return {
      status: 200,
      code: "success",
      data: movie
    }
  } catch (error) {
    console.log(error)
    return {
      status: 400,
      code: "error",
      message: "error in movie service"
    }
  }
}