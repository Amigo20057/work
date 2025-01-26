export interface IConfig {
	get: <Type>(key: string) => Type;
}
