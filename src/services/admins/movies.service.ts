import { Movie } from "../../interfaces/movie.interface"
import { Categories } from "../../models/Categories.model";
import { Movies } from "../../models/Movies.model";
import { Movies_Categories } from "../../models/Movies_Categories.mode";

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