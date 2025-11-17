import { Router } from "express";
import { displayHomePage } from "../controllers/food.controller.js";
import { showCreateFoodForm } from "../controllers/food.controller.js";
import { createFood } from "../controllers/food.controller.js";

export const foodRouter = Router();

foodRouter.get('/', displayHomePage );
foodRouter.get('/create', showCreateFoodForm);
foodRouter.post('/create', createFood);
