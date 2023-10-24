import express from 'express';
import {getCart, getCheckout, getIndex, getOrders, getProductById, getProducts, postCart} from '../controllers/shop.controller.js';

const shopRouter = express.Router();

shopRouter.get('/', getIndex);
shopRouter.get('/products', getProducts);
shopRouter.get('/products/:productId', getProductById);
shopRouter.get('/cart', getCart);
shopRouter.post('/cart', postCart);
shopRouter.get('/orders', getOrders);
shopRouter.get('/checkout', getCheckout);

export default shopRouter;
