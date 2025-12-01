import { Router } from 'express';
import adminController from '../controllers/admin.controller.js';

const router = Router();

router.get('/admin/addCoffee', adminController.addCoffeeForm);
router.post('/admin/addCoffee', adminController.addCoffee);

export default router;