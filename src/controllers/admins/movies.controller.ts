import { Response } from "express";
import { admin } from "../../interfaces/admin.interface";
import { CreateMovieService } from "../../services/admins/movies.service";
import { Movie } from "../../interfaces/movie.interface";

export const postMovieController = async (req: admin, res: Response) => {
  try {
    if(req.file) {
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