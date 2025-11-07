import { cityDetail, homePage } from "../controllers/main.controller.js";
import { Router } from "express";

export const router = Router();

router.get('/', homePage)
router.get('/city/:city', cityDetail)