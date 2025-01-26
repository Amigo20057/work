import { Pool } from "pg";
import pool from "../db/pool";
import { IPort } from "../types/post.interface";
import { UserService } from "./user.service";

export class PostService {
	private pool: Pool = pool;
	public constructor(private readonly userService: UserService) {}

	public async findPostById(id: number) {
		return await this.pool.query("SELECT * FROM public.posts WHERE id = $1", [
			id,
		]);
	}

	public async findPostsByEmail(email: string) {
		const user = await this.userService.findUserByEmail(email);
		console.log(user.rows[0]);
		if (user.rowCount === 0) {
			throw new Error("User not found");
		}
		const posts = await this.pool.query(
			"SELECT * FROM public.posts WHERE recruiter_id = $1",
			[user.rows[0].id]
		);
		if (posts.rowCount === 0) {
			throw new Error("posts not found");
		}
		return posts;
	}

	public async create(dto: IPort) {
		return await this.pool.query(
			"INSERT INTO public.posts(title, description, tags, recruiter_id) VALUES($1, $2, $3::TEXT[], $4) RETURNING *",
			[dto.title, dto.description, dto.tags, dto.recruiterId]
		);
	}

	public async update(
		id: number,
		title?: string,
		description?: string,
		tags?: string[]
	) {
		if (title) {
			await this.pool.query(
				"UPDATE public.posts SET title = $1 WHERE id = $2",
				[title, id]
			);
		}
		if (description) {
			await this.pool.query(
				"UPDATE public.posts SET description = $1 WHERE id = $2",
				[description, id]
			);
		}
		if (tags) {
			await this.pool.query("UPDATE public.posts SET tags = $1 WHERE id = $2", [
				tags,
				id,
			]);
		}
		const updatedPost = await this.pool.query(
			"SELECT * FROM public.posts WHERE id = $1",
			[id]
		);
		return updatedPost.rows[0];
	}

	public async delete(id: number) {
		return await this.pool.query("DELETE FROM public.posts WHERE id = $1", [
			id,
		]);
	}
}
