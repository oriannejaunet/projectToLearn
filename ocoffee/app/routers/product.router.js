import { Router } from 'express';
import productController from '../controllers/product.controller.js';

const router = Router();

router.get('/product/list' , productController.list);
router.get('/product/:reference' , productController.coffeeId);

export default router;
