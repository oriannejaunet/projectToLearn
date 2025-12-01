import { Router } from 'express';
import homeRouter from './home.router.js';
import productRouter from './product.router.js'
import informationRouter from './information.router.js'
import adminRouter from './admin.router.js'

const router = Router();

// configuration du Router
router.use(homeRouter);
router.use(productRouter);
router.use(informationRouter);
router.use(adminRouter);



export default router;