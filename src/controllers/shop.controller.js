import Product from '../models/product.model.js';
import Cart from '../models/cart.model.js';

export const getProducts = (req, res) => {
	Product.fetchAll((products) => {
		res.render('shop/product-list', {
			prods: products,
			pageTitle: 'All products',
			hasProducts: products.length > 0,
			activeProducts: true,
			productCSS: true,
		});
	});
};

export const getProductById = (req, res) => {
	const prodId = req.params.productId;
	Product.findById(prodId, (product) => {
		res.render('shop/product-detail', {
			product: product,
			pageTitle: product.title,
			activeProducts: true,
		});
	});
	res;
};

export const getIndex = (req, res) => {
	Product.fetchAll((products) => {
		res.render('shop/index', {
			prods: products,
			pageTitle: 'Shop',
			hasProducts: products.length > 0,
			activeShop: true,
			productCSS: true,
		});
	});
};

export const getCart = (req, res) => {
	Cart.getCart((cart) => {
		Product.fetchAll((products) => {
			const cartProducts = [];
			for (let product of products) {
				const cartProductData = cart.products.find((prod) => prod.id === product.id);
				if (cartProductData) {
					cartProducts.push({productData: product, qty: cartProductData.qty});
				}
			}
			res.render('shop/cart', {
				pageTitle: 'Your Cart',
				activeCart: true,
				products: cartProducts,
				hasProducts: cartProducts.length > 0,
			});
		});
	});
};

export const postCart = (req, res) => {
	const prodId = req.body.productId;
	Product.findById(prodId, (product) => {
		Cart.addProduct(prodId, product.price);
	});
	res.redirect('/cart'); // problem
};

export const postCartDeleteProduct = (req, res) => {
	const prodId = req.body.productId;
	Product.findById(prodId, (product) => {
		Cart.deleteProduct(prodId, product.price);
		res.redirect('/cart'); // problem
	});
};

export const getOrders = (req, res) => {
	res.render('shop/orders', {
		pageTitle: 'Your Orders',
		activeOrders: true,
	});
};

export const getCheckout = (req, res) => {
	res.render('shop/checkout', {
		path: '/checkout',
		pageTitle: 'Checkout',
		// activeCheckout: true,
	});
};
