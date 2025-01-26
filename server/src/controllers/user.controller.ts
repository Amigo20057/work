import { Request, Response, Router } from "express";
import { UserService } from "../services/user.service";
import { logger } from "../utils/log";
import { AuthCheck } from "../utils/middlewares/auth.middleware";

const router = Router();
const userService = new UserService();

router.get(
	"/profile",
	AuthCheck,
	async (req: Request & { id?: number; email?: string }, res: Response) => {
		try {
			const userId = req.id;
			if (!userId) {
				res.status(400).json({ error: "User ID is missing" });
				return;
			}
			const user = await userService.findUserById(userId);
			res.status(200).json(user.rows[0]);
		} catch (error: any) {
			logger.error(error.message);
			res.status(500).json({ error: error.message });
		}
	}
);

router.get("/profile/:id", AuthCheck, async (req: Request, res: Response) => {
	try {
		const userId = parseInt(req.params.id);
		const user = await userService.findUserById(userId);
		res.status(200).json(user);
	} catch (error: any) {
		logger.error(error.message);
		res.status(500).json({ error: error.message });
	}
});

export const UserRouter = router;
