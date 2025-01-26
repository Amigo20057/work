import compression from "compression";
import express, { NextFunction, Request, Response } from "express";
import helmet from "helmet";
import { ConfigService } from "../config/config.service";
import { AuthRouter } from "../controllers/auth.controller";
import { PostRouter } from "../controllers/post.controller";
import { UserRouter } from "../controllers/user.controller";
import { logger } from "../utils/log";

export class Application {
	private app: express.Application;
	private port: number;
	public constructor(private readonly config: ConfigService) {
		this.port = this.config.get<number>("PORT");
		this.app = this.createApplication();
	}

	private createApplication(): express.Application {
		const app = express();
		app.use(helmet());
		app.use(compression());
		app.use(express.json());

		app.use("/auth", AuthRouter);
		app.use("/users", UserRouter);
		app.use("/posts", PostRouter);

		app.all("*", (req: Request, res: Response) => {
			res.status(404).json({ message: "Not found" });
		});

		app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
			logger.info(err.stack);
			res.status(500).json(err.stack);
		});

		return app;
	}

	private createServer() {
		this.app.listen(this.port, () => {
			logger.info(`server is running on port ${this.port} `);
		});
	}

	public start() {
		this.createServer();
	}
}
