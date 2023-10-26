import mysql from 'mysql2/promise';

const db = mysql.createPool({
	host: 'localhost',
	user: 'root',
	database: 'node_shopping_cart',
	password: 'root',
	port: 8889,
});

export default db;
