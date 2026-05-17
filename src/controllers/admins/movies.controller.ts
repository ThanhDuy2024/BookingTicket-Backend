import { Response } from "express";
import { admin } from "../../interfaces/admin.interface";
import { CreateMovieService, DeleteMovieService, MovieDetailService, MovieListService, UpdateMovieService } from "../../services/admins/movies.service";
import { Movie } from "../../interfaces/movie.interface";

export const postMovieController = async (req: admin, res: Response) => {
  try {
    if (req.file) {
      req.body.image = req.file.path
    } else {
      delete req.body.image
    }
    const data: Movie = req.body;
    const message = await CreateMovieService(data, req.admin.id);
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

export const getMovieController = async (req: admin, res: Response) => {
  try {
    const filter = {
      search: req.query.search,
      duration: req.query.duration,
      country: req.query.country,
      status: req.query.status,
      imdbRating: req.query.imdbRating,
      page: req.query.page,
      limit: req.query.limit
    }
    const message = await MovieListService(filter);
    return res.status(message.status).json({
      code: message.code,
      data: message.data,
      totalPage: message.totalPage
    })
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      code: "error",
      message: "Bad request in controller"
    })
  }
}

export const movieDetailController = async (req: admin, res: Response) => {
  try {
    const message = await MovieDetailService(String(req.params.id));
    return res.status(message.status).json({
      code: message.code,
      data: message.data,
    })
  } catch (error) {
    console.log(error)
    return res.status(400).json({
      code: "error",
      message: "Bad request in controller"
    })
  }
}

export const updateMovieController = async (req: admin, res: Response) => {
  try {
    if (req.file) {
      req.body.image = req.file.path;
    } else {
      delete req.body.image;
    }
    const data: Movie = req.body
    const message = await UpdateMovieService(data, String(req.params.id), req.admin.id);
    return res.status(message.status).json({
      code: message.code,
      message: message.message
    })
  } catch (error) {
    console.log(error)
    return res.status(400).json({
      code: "error",
      message: "Bad request in controller"
    })
  }
}

export const deleteMovieController = async (req: admin, res: Response) => {
  try {
    const message = await DeleteMovieService(String(req.params.id), req.admin.id);
    return res.status(message.status).json({
      code: message.code,
      message: message.message
    })
  } catch (error) {
    console.log(error)
    return res.status(400).json({
      code: "error",
      message: "Bad request in controller"
    })
  }
}