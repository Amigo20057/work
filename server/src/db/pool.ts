import pg from "pg";
import { ConfigService } from "../config/config.service";
import { logger } from "../utils/log";
const { Pool } = pg;
const config = new ConfigService();
const pool = new Pool({
	host: config.get<string>("DB_HOST"),
	user: config.get<string>("DB_USER"),
	password: String(config.get<string>("DB_PASSWORD")),
	database: config.get<string>("DB_DATABASE"),
	port: config.get<number>("DB_PORT"),
});
(async () => {
	try {
		await pool.connect();
		logger.info("Database connected successfully");
	} catch (error) {
		logger.error("Error connecting to the database:", error);
		process.exit(1);
	}
})();
export default pool;
