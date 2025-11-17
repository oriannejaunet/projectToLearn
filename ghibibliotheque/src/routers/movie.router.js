/* eslint-disable eol-last */
import { Router } from 'express';
import { displayMovie, displayMovies, displayCurrentMovies } from '../controllers/movie.controller.js';
import { checkId } from '../middlewares/id.middleware.js';

export const movieRouter = Router();


movieRouter.get('/movies', displayMovies );
movieRouter.get('/movies/recent' , displayCurrentMovies );
movieRouter.get('/movies/:id' , checkId , displayMovie );
