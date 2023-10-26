import express from 'express';
import {getAddProduct, getEditProduct, getProducts, postAddProduct, postDeleteProduct, postEditProduct} from '../controllers/admin.controller.js';

const adminRouter = express.Router();

adminRouter.get('/add-product', getAddProduct);
adminRouter.get('/products', getProducts);
adminRouter.post('/add-product', postAddProduct);
adminRouter.get('/edit-product/:productId', getEditProduct);
adminRouter.post('/edit-product', postEditProduct);
adminRouter.post('/delete-product', postDeleteProduct);

export default adminRouter;
