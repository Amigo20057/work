import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ConfigService } from "../../config/config.service";
import { DecodedToken } from "../../types/token.types";

const config = new ConfigService();

export const AuthCheck = (
	req: Request & { id?: number; email?: string },
	res: Response,
	next: NextFunction
): void => {
	const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");
	if (token) {
		try {
			const decoded = jwt.verify(
				token,
				config.get<string>("SECRET")
			) as DecodedToken;
			req.id = decoded.id;
			req.email = decoded.email;
			next();
		} catch (error) {
			res.status(403).json({ message: "No access" });
		}
	} else {
		res.status(401).json({ message: "No token provided" });
	}
};
