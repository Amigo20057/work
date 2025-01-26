import { Pool } from "pg";
import pool from "../db/pool";
import { IRegister } from "../types/register.interface";

export class UserService {
	private pool: Pool = pool;

	public async findUserById(id: number) {
		return await this.pool.query("SELECT * FROM public.users WHERE id = $1", [
			id,
		]);
	}

	public async findUserByEmail(email: string) {
		return await this.pool.query(
			"SELECT * FROM public.users WHERE email = $1",
			[email]
		);
	}

	public async create(dto: IRegister) {
		return await this.pool.query(
			"INSERT INTO public.users(user_name, user_surname, email, password, roles, name_company, address_company) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
			[
				dto.userName,
				dto.userSurname,
				dto.email,
				dto.password,
				dto.role,
				dto.nameCompany,
				dto.addressCompany,
			]
		);
	}
}
