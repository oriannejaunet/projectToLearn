import { Router } from 'express';
import informationController from '../controllers/information.controller.js';

const router = Router();

router.get('/information/about' , informationController.about);
router.get('/information/access' , informationController.access);
router.get('/information/contact' , informationController.contact);

export default router;