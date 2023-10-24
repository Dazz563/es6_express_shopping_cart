import express from 'express';
import {getAddProduct, getProducts, postAddProduct} from '../controllers/admin.controller.js';

const adminRouter = express.Router();

adminRouter.get('/add-product', getAddProduct);
adminRouter.get('/products', getProducts);
adminRouter.post('/add-product', postAddProduct);

export default adminRouter;
