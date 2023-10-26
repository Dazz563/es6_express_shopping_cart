import Product from '../models/product.model.js';
import Cart from '../models/cart.model.js';

export const getProducts = async (req, res) => {
	try {
		let [rows, fieldData] = await Product.fetchAll();
		res.render('shop/product-list', {
			prods: rows,
			pageTitle: 'All products',
			hasProducts: rows.length > 0,
			activeProducts: true,
			productCSS: true,
		});
	} catch (err) {}
};

export const getProductById = async (req, res) => {
	try {
		const prodId = req.params.productId;
		let [product] = await Product.findById(prodId);
		// console.log(product[0].title);
		res.render('shop/product-detail', {
			product: product[0],
			pageTitle: product[0].title,
			activeProducts: true,
		});
	} catch (err) {}
};

export const getIndex = async (req, res) => {
	try {
		let [rows, fieldData] = await Product.fetchAll();
		res.render('shop/index', {
			prods: rows,
			pageTitle: 'Shop',
			hasProducts: rows.length > 0,
			activeShop: true,
			productCSS: true,
		});
	} catch (err) {}
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
