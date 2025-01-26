import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Pool } from "pg";
import { ConfigService } from "../config/config.service";
import pool from "../db/pool";
import { ILogin } from "../types/login.interface";
import { IRegister } from "../types/register.interface";
import { UserService } from "./user.service";

export class AuthService {
	private pool: Pool = pool;

	public constructor(
		private readonly userService: UserService,
		private readonly config: ConfigService
	) {}

	public async register(dto: IRegister) {
		const userExists = await this.userService.findUserByEmail(dto.email);
		if (userExists.rowCount! > 0) {
			throw new Error("User already exists");
		}
		const salt = bcrypt.genSaltSync(10);
		dto.password = bcrypt.hashSync(dto.password, salt);
		const userResult = await this.userService.create(dto);
		const token = jwt.sign(
			{
				id: userResult.rows[0].id,
				email: userResult.rows[0].email,
			},
			this.config.get<string>("SECRET"),
			{
				expiresIn: "30d",
			}
		);
		return {
			user: userResult.rows[0],
			token,
		};
	}

	public async login(dto: ILogin) {
		const userExists = await this.userService.findUserByEmail(dto.email);
		if (userExists.rowCount === 0) {
			throw new Error("User not exists");
		}
		const user = userExists.rows[0];
		const isPasswordValid = bcrypt.compareSync(dto.password, user.password);
		if (!isPasswordValid) {
			throw new Error("Wrong data");
		}
		const token = jwt.sign(
			{
				id: user.id,
				email: user.email,
			},
			this.config.get<string>("SECRET"),
			{
				expiresIn: "30d",
			}
		);
		return {
			user,
			token,
		};
	}
}
