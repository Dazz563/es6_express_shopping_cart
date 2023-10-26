import Product from '../models/product.model.js';

export const getAddProduct = (req, res) => {
	res.render('admin/edit-product', {
		pageTitle: 'Add Product',
		formsCSS: true,
		productCSS: true,
		activeAddProduct: true,
		editing: false,
	});
};

export const postAddProduct = async (req, res) => {
	try {
		const {title, imageUrl, price, description} = req.body;
		const product = new Product(null, title, imageUrl, description, price);
		let result = await product.save();
		res.redirect('/');
	} catch (err) {
		console.log(err);
	}
};

export const getEditProduct = (req, res) => {
	const editMode = req.query.edit;
	if (!editMode) {
		return res.redirect('/');
	}
	const prodId = req.params.productId;
	Product.findById(prodId, (product) => {
		if (!product) {
			return res.redirect('/');
		}
		res.render('admin/edit-product', {
			pageTitle: 'Edit Product',
			formsCSS: true,
			productCSS: true,
			activeAdminProducts: true,
			editing: editMode,
			product: product,
		});
	});
};

export const postEditProduct = (req, res) => {
	const {productId, title, imageUrl, price, description} = req.body;
	const updatedProduct = new Product(productId, title, imageUrl, description, price);
	updatedProduct.save();
	res.redirect('/admin/products');
};

export const getProducts = (req, res) => {
	Product.fetchAll((products) => {
		res.render('admin/products', {
			prods: products,
			pageTitle: 'Admin Products',
			hasProducts: products.length > 0,
			activeAdminProducts: true,
			productCSS: true,
		});
	});
};

export const postDeleteProduct = (req, res) => {
	const prodId = req.body.productId;
	Product.deleteById(prodId);
	res.redirect('/admin/products');
};
