const { Pool } = require("pg");
const dotenv = require("dotenv");
dotenv.config();
const pool = new Pool({
	connectionString: process.env.DB_URL ||"postgresql://postgres:admin@localhost:5432/social-media",
	max: 20, // Maximum number of connections in the pool
	idleTimeoutMillis: 30000, // Time to keep an idle connection before closing it (30 seconds)
	connectionTimeoutMillis: 2000, // Time to wait for a new connection (2 seconds)
});
module.exports = pool;
     