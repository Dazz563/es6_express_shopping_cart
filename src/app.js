import {join} from 'path';
import rootdir from './utils/path.js';

import express from 'express';
import {engine} from 'express-handlebars';

const app = express();

app.engine(
	'hbs',
	engine({
		defaultLayout: false,
		layoutsDir: join(rootdir, 'views/layouts'),
		defaultLayout: 'main-layout',
		extname: 'hbs',
	})
);
app.set('view engine', 'hbs');
app.set('views', join(rootdir, 'views'));

import adminRouter from './routes/admin.routes.js';
import shopRouter from './routes/shop.routes.js';
import {get404Page} from './controllers/error.controller.js';

// Parse incoming JSON and form data
app.use(express.json());
app.use(express.urlencoded({extended: false}));
// Serve static files
app.use(express.static(join(rootdir, 'public')));

app.use('/admin', adminRouter);
app.use(shopRouter);
app.use(get404Page);

export default app;
