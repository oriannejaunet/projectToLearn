import { Router } from 'express';
import { directorNumberMovies } from '../controllers/director.controller.js';
import { moviesByDirector } from '../controllers/director.controller.js';


export const directorRouter = Router();

directorRouter.get('/director', directorNumberMovies );
directorRouter.get('/director/:directorName' , moviesByDirector );
