import { Request, Response, Router } from "express";
import { validationResult } from "express-validator";
import { ConfigService } from "../config/config.service";
import { AuthService } from "../services/auth.service";
import { UserService } from "../services/user.service";
import { logger } from "../utils/log";
import { loginValidator, registerValidator } from "../utils/validations";

const router = Router();
const authService = new AuthService(new UserService(), new ConfigService());

router.post("/login", loginValidator, async (req: Request, res: Response) => {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			res.status(400).json({ errors: errors.array() });
			return;
		}
		const user = await authService.login(req.body);
		res.status(200).json({ user });
	} catch (error: any) {
		logger.error(error.message);
		res.status(500).json({ error: error.message });
	}
});

router.post(
	"/register",
	registerValidator,
	async (req: Request, res: Response) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				res.status(400).json({ errors: errors.array() });
				return;
			}
			const user = await authService.register(req.body);
			res.status(200).json({ user });
		} catch (error: any) {
			logger.error(error.message);
			res.status(500).json({ error: error.message });
		}
	}
);

export const AuthRouter = router;
