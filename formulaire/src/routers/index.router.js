import { Router } from "express";
import { foodRouter } from "./food.router.js";

export const router = Router();

router.use(foodRouter);
