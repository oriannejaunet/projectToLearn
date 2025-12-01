import { Router } from 'express';
import homeController from '../controllers/home.controller.js';

const router = Router();

// route pour l'accueil (home)
router.get('/', homeController.homePage);

export default router;
