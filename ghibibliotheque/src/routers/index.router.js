import { Router } from 'express';
import { movieRouter } from './movie.router.js';
import { mainRouter } from './main.router.js';
import { directorRouter } from './director.router.js';

// Le rôle de ce routeur est de centraliser tous les autres routeurs
export const router = Router();

// On utilise les routeurs importés
router.use(movieRouter);
router.use(mainRouter);
router.use(directorRouter);

