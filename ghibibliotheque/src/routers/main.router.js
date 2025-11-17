import { Router } from 'express';
import { displayHomepage } from '../controllers/main.controller.js';

export const mainRouter = Router();

mainRouter.get('/', displayHomepage);

