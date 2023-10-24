import Product from '../models/product.model.js';

export const getAddProduct = (req, res) => {
	res.render('admin/add-product', {
		pageTitle: 'Add Product',
		// path: '/admin/add-product',
		formsCSS: true,
		productCSS: true,
		activeAddProduct: true,
	});
};

export const postAddProduct = (req, res) => {
	const {title, imageUrl, price, description} = req.body;
	const product = new Product(title, imageUrl, description, price);
	product.save();
	res.redirect('/');
};

export const getProducts = (req, res) => {
	Product.fetchAll((products) => {
		res.render('admin/products', {
			prods: products,
			pageTitle: 'Admin Products',
			// path: '/admin/products',
			hasProducts: products.length > 0,
			activeAdminProducts: true,
			productCSS: true,
		});
	});
};
