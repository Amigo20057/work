import { config } from "dotenv";
import { IConfig } from "./config.interface";

export class ConfigService implements IConfig {
	private readonly envConfig: Record<string, string>;

	public constructor() {
		const { parsed, error } = config();
		if (error || !parsed) {
			throw new Error("Failed to load configuration from .env file");
		}
		this.envConfig = parsed;
	}

	public get<Type>(key: string): Type {
		const value = this.envConfig[key];
		if (value === undefined) {
			throw new Error(`Configuration key "${key}" not found`);
		}
		try {
			return JSON.parse(value) as Type;
		} catch {
			return value as unknown as Type;
		}
	}
}
